'use strict';

angular.
  module('navbar').
  component('navbar', {
    templateUrl: 'navbar/navbar.template.html',
    controller: ['$scope', '$timeout', 'Logger',  'Server', 'Field',
      function NavbarController($scope, $timeout, Logger,  Server, Field) {

        var getFields = function() {
          $scope.fields = Field.getFieldsList();
        };

        getFields();

        $scope.$on('fieldsChanged', function(event) {
          getFields();
        });
}]});
