'use strict';

angular.
  module('navbar').
  component('navbar', {
    templateUrl: 'navbar/navbar.template.html',
    controller: ['$scope', '$timeout', 'Logger',  'Subject',
      function NavbarController($scope, $timeout, Logger,  Subject) {
        var fetchSubjectsFailureCounter = 0;

        // Get subjects
        Subject.getFields(function(data) {
          $scope.fields = data;
        }, function() {

        });

        $scope.fields = ['a', 'b', 'aa', 'aaa', 'aaaa', 'aax', 'aav', 'aaas', 'aavvvvvvv', 'aaxqqq', 'aaxxccc', 'aabbbbb', 'aaqwewerrr', 'aaccccccccccccccccc'];
}]});
