'use strict';

angular.
  module('sidebar').
  component('sidebar', {
    templateUrl: 'sidebar/sidebar.template.html',
    controller: ['$rootScope', '$scope', '$location', 'Logger', 'Subject',
      function SidebarController($rootScope, $scope, $location, Logger, Subject){
        var currentPath = '';
        $scope.subjectInfo = {};

        var parsePath = function(path) {
          if(!angular.isString(path)) {
            return '';
          }

          return path.substr(1);
        };

        $scope.$on('$locationChangeStart', function (event) {
          currentPath = parsePath($location.path());

          if(currentPath === '') {
            $scope.subjectInfo = {};
          }
          else {
            Subject.getSubjectInfo(currentPath, function(data) {
              switch (data.type) {
                case 'header':
                  $scope.subjectInfo = data.data;
                  break;
                case 'url':
                  $rootScope.$broadcast('urlChanged', data.data);
                  break;
                default:
                  Logger.error('Received unsupported data type: ' + data.type);
              }
            }, function (err) {
              $scope.subjectInfo = {};
            });
          }
        });
      }
    ]
  });
