'use strict';

angular.
  module('sidebar').
  component('sidebar', {
    templateUrl: 'sidebar/sidebar.template.html',
    controller: ['$scope', 'Logger', 'Subject',
      function NavbarController($scope, Logger, Subject){
        $scope.$on('$locationChangeStart', function (event) {
          
        });
      }
    ]
  });
