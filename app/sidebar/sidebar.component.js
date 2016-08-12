'use strict';

angular.
  module('sidebar').
  component('sidebar', {
    templateUrl: 'sidebar/sidebar.template.html',
    controller: ['$rootScope', '$scope', '$window', '$location', '$interval', 'Logger', 'Server', 'Helper', 'Field',
      function SidebarController($rootScope, $scope, $window, $location, $interval, Logger, Server, Helper, Field){
        $scope.currentPath = '';
        $scope.subjectInfo = [];
        $scope.addType = 'term';
        $scope.removeType = 'subjects';
        $scope.removePopupList = [];
        $scope.toBeRemoved = [];
        $scope.removeButtonDisabled = false;
        $scope.addInfoNameTaken = false;
        $scope.fieldsList = Field.getFieldsList();

        var setSubjectInfo = function(data) {
          if(data == null) {
            $scope.subjectInfo = [
              {
                type: 'term',
                name: 'Term1',
                href: '#/Term1'
              },
              {
                type: 'subject',
                name: 'Subject1',
                href: '#/Subject1'
              },
              {
                type: 'header',
                name: 'Hedear1',
                href: '#/Header1'
              }
            ];
          }
          else {
            $scope.subjectInfo = data;
          }

          angular.copy($scope.subjectInfo, $scope.removePopupSubjectInfoList);
          $scope.toBeRemoved = [];
        };

        $scope.$on('$locationChangeStart', function (event) {
          $scope.currentPath = Helper.parsePath($location.path());

          if($scope.currentPath === '') {
            setSubjectInfo();
          }
          else {
            Server.getSubjectInfo($scope.currentPath, function(data) {
              switch (data.type) {
                case 'header':
                  $scope.subjectInfo = data.data;
                  break;
                case 'term':
                case 'subject':
                  $rootScope.$broadcast('mainviewChanged', data.data);
                  break;
                default:
                  Logger.error('Received unsupported data type: ' + data.type);
              }
            }, function (err) {
              setSubjectInfo();
            });
          }
        });

        /**********************************************************************
         ***************************Add Subject Info***************************
         *********************************************************************/
        $scope.addPopupClearClick = function() {
          $scope.addInfoNameTaken = false;
          if(angular.isDefined($scope.info)) {
            $scope.info.name = "";
            $scope.info.content = "";
            $scope.info.url = "";
          }

          $scope.$broadcast('show-form-errors-reset');
        };

        $scope.addPopupHeaderClick = function(type) {
          $scope.addType = type;
          $scope.addPopupClearClick();
        };

        $scope.addPopupAddClick = function() {
          var invalid = true;
          if(angular.isDefined($scope.info)) {
            $scope.info.type = $scope.addType;

            // Check if the name is taken
            $scope.addInfoNameTaken = false;
            if(angular.isDefined($scope.info.name)) {
              if($scope.addType !== 'field') {
                $scope.subjectInfo.forEach(function(subjectInfo) {
                  if($scope.info.name.toLowerCase() === subjectInfo.name.toLowerCase()) {
                    $scope.addInfoNameTaken = true;
                  }
                });
              }
              else if($scope.addType === 'field') {
                var fields = Field.getFieldsList();
                fields.forEach(function(field) {
                  if($scope.info.name.toLowerCase() === field.name.toLowerCase()) {
                    $scope.addInfoNameTaken = true;
                  }
                });
              }
            }

            // Check if all the fields were filled correctly
            invalid = ((($scope.addType === 'term' && $scope.addTermForm.$invalid) ||
              ($scope.addType === 'subject' && $scope.addSubjectForm.$invalid) ||
              ($scope.addType === 'header' && $scope.addHeaderForm.$invalid) ||
              ($scope.addType === 'field' && $scope.addFieldForm.$invalid)) &&
              angular.isDefined($scope.info.name)) ||
              $scope.addInfoNameTaken;
          }

          // Cue the directive to show error if needed
          $scope.$broadcast('show-form-errors');

          // Do not close modal if form is invalid
          // Used 'one' so invalid will change in closure
          $('#addSubjectInfoModal').one('hide.bs.modal', function(e) {
            if(invalid) {
              e.preventDefault();
              e.stopImmediatePropagation();
              return false;
            }
          });

          // Send request to the server
          if(!invalid && $scope.addType !== 'term') {
            Server.postSubjectInfo($scope.currentPath, $scope.info, function() {
              // Clear form on success
              $scope.addPopupClearClick();
            });
          }
          else if(!invalid && $scope.addType === 'term') {
            Field.addField($scope.info.name);
          }
        };

        /**********************************************************************
         **************************Remove Subject Info*************************
         *********************************************************************/

        $scope.removePopupHeaderClick = function(type)  {
          $scope.removeType = type;
          $scope.removePopupClearClicked();
        };

        $window.removePopupDragStarted = function(e) {
          e.target.style.opacity = '0.4';

          // Extract info name from the event object and remove white space
          var name = e.target.innerHTML.split('>')[1].split('<')[0].replace(/\s/g, "");
          e.dataTransfer.setData("text/plain", name);
          e.dataTransfer.dropEffect = "move";
        };

        $window.removePopupDragEnd = function(e) {
          e.target.style.opacity = '1';
        };

        $window.removePopupOnDrop = function (e) {
          var data = e.dataTransfer.getData('text');
          if($scope.toBeRemoved.indexOf(data) === -1) {
            Helper.removeIf($scope.removePopupList, data, function(info, name) {
              return info.name === name;
            });
            $scope.toBeRemoved.push(data);
            $scope.$digest();
          }
        };

        $window.removePopupOnDragOver = function(e) {
          e.preventDefault();
          e.dataTransfer.dropEffect = "move";
        };

       $scope.removePopupClearClicked = function() {
         angular.copy($scope.removeType === 'subjects' ?
         $scope.subjectInfo : $scope.fieldsList, $scope.removePopupList);

         $scope.toBeRemoved = [];
       };

       $scope.removePopupRemoveClicked = function() {
         $scope.removeButtonDisabled = true;
         var finishedDeletionCount = 0;
         var deletedList = [];
         $scope.toBeRemoved.forEach(function(name) {
           Server.deleteSubjectInfo($scope.currentPath + '/' + name, function() {
             finishedDeletionCount++;
             deletedList.push(name);
           }, function() {
             finishedDeletionCount++;
           });
         });

         // Wait for the server to reponse to all of the requests
         // TODO: find a better way
         var promise = $interval(function() {
           if(finishedDeletionCount === $scope.toBeRemoved.length) {
             $interval.cancel(promise);
           }
         }, 500, 0);

         // Notify client about the unsuccessful deletions
         var diffArr = $scope.toBeRemoved.filter(function(item) {
           return deletedList.indexOf(item) === -1;
         });
         if(diffArr.length > 0) {
           $window.alert('Could not delete ' + diffArr.join(','));
         }

         // Clear lists from unrelevant items
         $scope.toBeRemoved = [];
         Helper.removeIf($scope.subjectInfo, deletedList, function(info, list) {
           return list.indexOf(info.name) !== -1;
         });
         angular.copy($scope.subjectInfo, $scope.removePopupList);

         $scope.removeButtonDisabled = false;
       };
}]});
