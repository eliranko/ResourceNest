 'use strict';

describe('subject list component', function() {
  var $rootScope, createController, getSubjectListSucc, getSubjectListErr;

  // Stubs
  var $scope, Subject, subjectListResponse;

  beforeEach(module('subjectList'));

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
      if(success) {
        succCallBack(subjectListResponse);
      }
      else {
        errCallBack("Some error");
      }
    });
    getSubjectListSucc = function() {
      success = true;
    };
    getSubjectListErr = function() {
      success = false;
    };
    $scope = $rootScope.$new();
    var $componentController = $injector.get('$componentController');
    createController = function() {
      return $componentController('subjectList', {$scope: $scope, Subject: Subject});
    };
  }));

  it('should fetch subject list', function() {
    createController();
    expect(Subject.getSubjects).toHaveBeenCalled();
  });

  it('should set subjects to the fetced list on success', function() {
    getSubjectListSucc();
    createController();
    expect($scope.subjects).toEqual(subjectListResponse);
  });

});
