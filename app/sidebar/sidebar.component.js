'use strict';

angular.
  module('sidebar').
  component('sidebar', {
    templateUrl: 'sidebar/sidebar.template.html',
    controller: ['$rootScope', '$interval', '$scope', 'Field', 'Subfield',
      function SidebarController($rootScope, $interval, $scope, Field, Subfield){
        $scope.addType = 'term';
        $scope.removePopupList = [];
        $scope.toBeRemovedList = [];
        $scope.addNameTaken = false;
        $scope.fieldsList = Field.getFieldsList();
        $scope.subfieldsList = Subfield.getSubfields();

        $scope.$on('subFieldsChanged', function (event) {
          $scope.subfieldsList = Subfield.getSubfields();
        });

        $scope.$on('fieldsChanged', function(event) {
          $scope.fieldsList = Field.getFieldsList();
        });
}]});
