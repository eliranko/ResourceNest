'use strict';

angular.
  module('sidebar').
  component('sidebar', {
    templateUrl: 'sidebar/sidebar.template.html',
    controller: ['$rootScope', '$scope', 'Helper', 'Field', 'Subfield',
      function SidebarController($rootScope, $scope, Field, Subfield){
        $scope.addType = 'term';
        $scope.removeType = 'subjects';
        $scope.removePopupList = [];
        $scope.toBeRemovedList = [];
        $scope.removeButtonDisabled = false;
        $scope.addNameTaken = false;
        $scope.fieldsList = Field.getFieldsList();
        $scope.subfieldsList = Subfield.getSubfields();

        $scope.$on('subFieldsChanged', function (event) {
          $scope.subfieldsList = Subfield.getSubfields();
        });
}]});
