'use strict';

angular.
  module('mainview').
  component('mainview', {
    templateUrl: 'mainview/mainview.template.html',
    controller: ['$scope', 'Logger',
      function MainviewController($scope, Logger) {
        $scope.url = 'www.google.com';

        $scope.$on('mainviewChanged', function(event, data) {
          Logger.debug('event mainviewChanged fired with: ' + data);

          switch (data.type) {
            case 'url':
              $scope.url = data.data;
              break;
            default:
              Logger.error('Received unsupported data type: ' + data.type);
          }
        });
      }
    ]
  });
