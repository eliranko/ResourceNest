'use strict';

angular.module('sidebar')
  .directive('sidebarToolbarRemove', ['$window', '$interval', 'Helper', 'Subfield', 'Field',
   function($window, $interval, Helper, Subfield, Field) {
    return {
      templateUrl: 'sidebar/toolbar/remove/sidebar.toolbar.remove.template.html',
      link: function(scope, el, attrs, formCtrl) {

        var clearRemoveModal = function(ignoreRemoveType) {
          if(ignoreRemoveType === false) {
            scope.removeType = 'subfields';
          }

           scope.toBeRemoved = [];
           scope.removeButtonDisabled = true;

           if(scope.removeType === 'subfields') {
             angular.copy(scope.subfieldsList, scope.removePopupList);
           }
           else {
             angular.copy(scope.fieldsList, scope.removePopupList);
           }
         };

         clearRemoveModal();

         $('#removeModal').on('hidden.bs.modal', function(e) {
           clearRemoveModal();
           scope.$digest();
         });

        scope.removePopupHeaderClick = function(type)  {
          scope.removeType = type;
          clearRemoveModal(true);
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
          if(scope.toBeRemoved.indexOf(data) === -1) {
            Helper.removeIf(scope.removePopupList, data, function(info, name) {
              return info.name === name;
            });
            scope.toBeRemoved.push(data);
            scope.removeButtonDisabled = false;
            scope.$digest();
          }
        };

        $window.removePopupOnDragOver = function(e) {
          e.preventDefault();
          e.dataTransfer.dropEffect = "move";
        };

       scope.removePopupClearClicked = function() {
         clearRemoveModal(true);
       };

       scope.removePopupRemoveClicked = function() {
         scope.removeButtonDisabled = true;
         var finishedDeletionCount = 0;
         var deletedList = [];

         scope.toBeRemoved.forEach(function(name) {
           if(scope.removeType === 'subfields') {
             Subfield.deleteSubfield(name, function() {
               finishedDeletionCount++;
               deletedList.push(name);
             }, function() {
               finishedDeletionCount++;
             });
           }
           else {
             Field.deleteField(name, function() {
               finishedDeletionCount++;
               deletedList.push(name);
             }, function() {
               finishedDeletionCount++;
             });
           }
         });

         // Wait for the server to reponse to all of the requests
         // TODO: find a better way
         var promise = $interval(function() {
           if(finishedDeletionCount === scope.toBeRemoved.length) {
             // Notify client about the unsuccessful deletions
             var diffArr = scope.toBeRemoved.filter(function(item) {
               return deletedList.indexOf(item) === -1;
             });
             if(diffArr.length > 0) {
               $window.alert('Could not delete ' + diffArr.join(','));
             }

             // Clear lists from unrelevant items
             scope.toBeRemoved = [];
             Helper.removeIf(scope.removeType === 'subfields' ? scope.subfieldsList : scope.fieldsList, deletedList, function(info, list) {
               return list.indexOf(info.name) !== -1;
             });
             angular.copy(scope.removeType === 'subfields' ? scope.subfieldsList : scope.fieldsList, scope.removePopupList);

             scope.removeButtonDisabled = false;
             $('#removeModal').modal('hide');
             $interval.cancel(promise);
           }
           else {
             // Do not close modal
             // Used 'one' so it will not close on the current occasion
             $('#removeModal').one('hide.bs.modal', function(e) {
               e.preventDefault();
               e.stopImmediatePropagation();
               return false;
             });
           }
         }, 500, 0);
       };
      }
    };
  }]);
