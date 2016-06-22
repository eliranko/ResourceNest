 'use strict';

describe('navbar component', function() {
  var $rootScope, createController, setGetSubjectListSucc, setGetSubjectListErr;

  // Stubs
  var $scope, Subject, subjectListResponse;

  beforeEach(module('navbar'));

  beforeEach(inject(function($injector) {
    // Get services
    $rootScope = $injector.get('$rootScope');

    // Create spy
    subjectListResponse = [{subject: 'CS'}, {subject: 'Physics'}];
    Subject = {
      getSubjects: jasmine.createSpy('getSubjectsSpy')
    };
    var success;
    Subject.getSubjects.and.callFake(function(succCallBack, errCallBack) {
      return success ? succCallBack(subjectListResponse) : errCallBack("Some error");
    });
    setGetSubjectListSucc = function() {
      success = true;
    };
    setGetSubjectListErr = function() {
      success = false;
    };
    $scope = $rootScope.$new();
    var $componentController = $injector.get('$componentController');
    createController = function() {
      return $componentController('navbar', {$scope: $scope, Subject: Subject});
    };
  }));

  it('should fetch subject list', function() {
    createController();
    expect(Subject.getSubjects).toHaveBeenCalled();
  });

  it('should set subjects to the fetced list on success', function() {
    setGetSubjectListSucc();
    createController();
    expect($scope.subjects).toEqual(subjectListResponse);
  });

});
