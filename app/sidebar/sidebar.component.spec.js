'use strict';

describe('sidebar component', function() {
  var $rootScope, $location, $scope, Subject, setGetSubjectInfoRetType, setLocation, createController;

  beforeEach(module('sidebar'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $location = $injector.get('$location');

    // Create Subject stub
    var getSubjectInfoRetType;
    Subject = {
      getSubjectInfo: jasmine.createSpy('getSubjectInfoSpy')
    };
    Subject.getSubjectInfo.and.callFake(function(path, succCallBack, errCallBack) {
      switch (getSubjectInfoRetType) {
        case 'header':
          succCallBack({
            type: 'header',
            data: [1, 2, 3]
          });
          break;
        case 'url':
        succCallBack({
          type: 'mainview',
          data: 'SomeUrl'
          });
          break;
        case 'err':
          errCallBack('Some error');
          break;
      }
    });
    setGetSubjectInfoRetType = function(type) {
      getSubjectInfoRetType = type;
    };

    setLocation = function(url){
      $location.path(url);
      $scope.$broadcast("$locationChangeStart");
    };

    $scope = $rootScope.$new();
    var $componentController = $injector.get('$componentController');
    createController = function() {
      return $componentController('sidebar', {$rootScope: $rootScope, $scope: $scope, $location: $location, Subject: Subject});
    };
  }));

  it('should set subject info to empty when url is empty', function() {
    createController();
    setLocation('#');
    expect($scope.subjectInfo).toEqual({});
  });

  it('should fetch subject info on url changes', function() {
    createController();
    setLocation('#/a/b');
    Subject.getSubjectInfo.and.callFake(function(path, succCallBack, errCallBack) {
      expect(path).toBe('/a/b');
    });
    expect(Subject.getSubjectInfo).toHaveBeenCalled();
  });

  it('should set subject info after fetching new header', function() {
    setGetSubjectInfoRetType('header');
    createController();
    setLocation('#/a/b');
    expect($scope.subjectInfo).toEqual([1, 2, 3]);
  });

  it('should broadcast urlChanged event after fetching new url', function() {
    setGetSubjectInfoRetType('url');
    createController();
    spyOn($rootScope, '$broadcast').and.callThrough();
    setLocation('#/a/b');
    expect($rootScope.$broadcast).toHaveBeenCalledWith('mainviewChanged', 'SomeUrl');
  });

  it('should set subject info to empty when fetching error occurs', function() {
    setGetSubjectInfoRetType('err');
    createController();
    setLocation('#/a/b');
    expect(Subject.getSubjectInfo).toHaveBeenCalled();
    expect($scope.subjectInfo).toEqual({});
  });
});
