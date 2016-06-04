'use strict';

describe('subject service', function() {
  var createController;

  // Stubs
  var $httpBackend, subjectListRequestHandler, subjectListResponse;

  // Tested
  var Subject;

  beforeEach(module('core.subject'));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    subjectListResponse = [{subject: 'CS'}, {subject: 'Physics'}];
    subjectListRequestHandler = $httpBackend.when('GET', '/subject-list').respond(subjectListResponse);

    Subject = $injector.get('Subject');
  }));

  afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

   describe('subjects list request', function() {
     it('should fetch subject list', function() {
       $httpBackend.expectGET('/subject-list');
       Subject.fetchSubjectList().then(function (data) {
         expect(data).toEqual(subjectListResponse);
       });
       $httpBackend.flush();
     });
   });
});
