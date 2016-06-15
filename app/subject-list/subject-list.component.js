'use strict';

angular.
  module('subjectList').
  component('subjectList', {
    templateUrl: 'subject-list/subject-list.template.html',
    controller: ['$scope', '$timeout', 'Logger',  'Subject',
      function SubjectListController($scope, $timeout, Logger,  Subject) {
        var fetchSubjectsFailureCounter = 0;
        var getSubjects = function() {
          var stopFetchInterval;
          Subject.getSubjects(function(data) {
            $scope.subjects = data;
          }, function(err) {
            if(++fetchSubjectsFailureCounter === 3) {
              Logger.warn('Failed fetching subject list for the third and last time: ' + err);
              return;
            }

            Logger.warn('Failed fetching subject list for the ' + fetchSubjectsFailureCounter + ' time: ' + err);
            $timeout(function() {
              getSubjects();
            }, 500);
          });
        };

        $scope.subjects = ['a', 'b'];
        getSubjects();
      }
    ]
  });
