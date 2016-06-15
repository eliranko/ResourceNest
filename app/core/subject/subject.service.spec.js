'use strict';

describe('subject service', function() {
  var createController;

  // Stubs
  var $httpBackend, subjectListResponse;

  // Tested
  var Subject;

  beforeEach(module('core.subject'));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    subjectListResponse = [{subject: 'CS'}, {subject: 'Physics'}];

    Subject = $injector.get('Subject');
  }));

  afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

   it('should fetch the subjects list from /api/subjects', function() {
     $httpBackend.expectGET('/api/subjects').respond(subjectListResponse);
     var result;
     Subject.getSubjects(function(data) {
       result = data;
     });
     $httpBackend.flush();

     expect(result[0].subject).toEqual("CS");
     expect(result[1].subject).toEqual("Physics");
   });

});
