'use strict';

angular.
  module('navbar').
  component('navbar', {
    templateUrl: 'navbar/navbar.template.html',
    controller: ['$scope', 'Field',
      function NavbarController($scope, Field) {

        var getFields = function() {
          $scope.fields = Field.getFieldsList();
        };

        getFields();

        $scope.$on('fieldsChanged', function(event) {
          getFields();
        });
}]});
