'use strict';

angular.
  module('sidebar').
  component('sidebar', {
    templateUrl: 'sidebar/sidebar.template.html',
    controller: ['$rootScope', '$scope', '$location', 'Logger', 'Subject', 'Helper',
      function SidebarController($rootScope, $scope, $location, Logger, Subject, Helper){
        $scope.currentPath = '';
        var toolbarItemUnclickedClass = 'sidebar-toolbar-unclicked';
        var toolbarItemClickedClass = 'sidebar-toolbar-clicked';
        $scope.toolbarItemsClassObject = {
          removeItemClass: toolbarItemUnclickedClass
        };
        $scope.subjectInfo = {};
        $scope.addType = 'term';

        $scope.$on('$locationChangeStart', function (event) {
          $scope.currentPath = Helper.parsePath($location.path());

          if($scope.currentPath === '') {
            $scope.subjectInfo = {};
          }
          else {
            Subject.getSubjectInfo($scope.currentPath, function(data) {
              switch (data.type) {
                case 'header':
                  $scope.subjectInfo = data.data;
                  break;
                case 'mainview':
                  $rootScope.$broadcast('mainviewChanged', data.data);
                  break;
                default:
                  Logger.error('Received unsupported data type: ' + data.type);
              }
            }, function (err) {
              $scope.subjectInfo = {};
            });
          }
        });

        var setNewToolbarItemClass = function(oldValue) {
          return oldValue === toolbarItemUnclickedClass ? toolbarItemClickedClass : toolbarItemUnclickedClass;
        };

        var setDefaultToolbarItemsClass = function() {
          $scope.toolbarItemsClassObject.removeItemClass = toolbarItemUnclickedClass;
        };

        $scope.toolbarItemClick = function(toolbarButton) {
          var toolbarItemOldValue;
          switch (toolbarButton) {
            case 'remove':
              toolbarItemOldValue = $scope.toolbarItemsClassObject.removeItemClass;
              break;
            default:

          }

          setDefaultToolbarItemsClass();

          switch (toolbarButton) {
            case 'remove':
              $scope.toolbarItemsClassObject.removeItemClass = setNewToolbarItemClass(toolbarItemOldValue);
              break;
            default:
          }
        };

        $scope.addPopupClick = function(type) {
          $scope.addType = type;
        };
      }
    ]
  });
