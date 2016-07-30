'use strict';

angular.
  module('sidebar').
  component('sidebar', {
    templateUrl: 'sidebar/sidebar.template.html',
    controller: ['$rootScope', '$scope', '$location', 'Logger', 'Subject', 'Helper',
      function SidebarController($rootScope, $scope, $location, Logger, Subject, Helper){
        var currentPath = '';
        var toolbarItemUnclickedClass = 'sidebar-toolbar-unclicked';
        var toolbarItemClickedClass = 'sidebar-toolbar-clicked';
        $scope.toolbarItemsClassObject = {
          addItemClass: toolbarItemUnclickedClass,
          removeItemClass: toolbarItemUnclickedClass
        };
        $scope.subjectInfo = {};

        $scope.$on('$locationChangeStart', function (event) {
          currentPath = Helper.parsePath($location.path());

          if(currentPath === '') {
            $scope.subjectInfo = {};
          }
          else {
            Subject.getSubjectInfo(currentPath, function(data) {
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

        var setNewToolbarItemClass = function (oldValue) {
          return oldValue === toolbarItemUnclickedClass ? toolbarItemClickedClass : toolbarItemUnclickedClass;
        };

        var setDefaultToolbarItemsClass = function () {
          $scope.toolbarItemsClassObject.addItemClass = toolbarItemUnclickedClass;
          $scope.toolbarItemsClassObject.removeItemClass = toolbarItemUnclickedClass;
        };

        $scope.toolbarItemClick = function (toolbarButton) {
          var toolbarItemOldValue = toolbarButton === 'add' ? $scope.toolbarItemsClassObject.addItemClass : $scope.toolbarItemsClassObject.removeItemClass;

          setDefaultToolbarItemsClass();

          switch (toolbarButton) {
            case 'add':
              $scope.toolbarItemsClassObject.addItemClass = setNewToolbarItemClass(toolbarItemOldValue);
              BootstrapDialog.show({
                title: 'Add subject info',
                message: $('<div></div>').load('sidebar/sidebar.template.add.popup.html')
              });
              break;
            case 'remove':
              $scope.toolbarItemsClassObject.removeItemClass = setNewToolbarItemClass(toolbarItemOldValue);
              break;
            default:
          }
        };
      }
    ]
  });
