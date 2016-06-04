'use strict';

angular.
  module('subjectList').
  component('subjectListComponent', {
    templateUrl: 'subject-list/subject-list.template.html',
    controller: ['$scope', 'Subject',
      function SubjectListController($scope, Subject) {
        $scope.subjects = [];
        Subject.fetchSubjectList().then(function(data) {
          $scope.subjects = data;
        });
      }
    ]
  });
