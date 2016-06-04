'use strict';

describe('subject list component', function() {
  var $rootScope, createController, deferredGetList, returnSubjectListValue;

  // Stubs
  var $scope, Subject, subjectListResponse;

  beforeEach(module('subjectList'));

  beforeEach(inject(function($injector) {
    // Get services
    var $q = $injector.get('$q');
    $rootScope = $injector.get('$rootScope');

    // Create spy
    subjectListResponse = [{subject: 'CS'}, {subject: 'Physics'}];
    Subject = {
      fetchSubjectList: jasmine.createSpy('fetchSubjectListSpy')
    };
    deferredGetList = $q.defer();
    Subject.fetchSubjectList.and.callFake(function() {
      return deferredGetList.promise;
    });
    returnSubjectListValue = function(value) {
      // Set returned subject list value
      deferredGetList.resolve(value);
      // Propagate promise
      $rootScope.$apply();
    };

    $scope = $rootScope.$new();
    var $componentController = $injector.get('$componentController');
    createController = function() {
      return $componentController('subjectListComponent', {$scope: $scope, Subject: Subject});
    };
  }));

  it('should fetch subject list', function() {
    createController();
    expect(Subject.fetchSubjectList).toHaveBeenCalled();
  });

  it('should set subjects to the fetced list', function() {
    createController();
    returnSubjectListValue(subjectListResponse);
    expect($scope.subjects).toEqual(subjectListResponse);
  });

});
