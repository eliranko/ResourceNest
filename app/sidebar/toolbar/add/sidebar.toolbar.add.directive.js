'use strict';

angular.module('sidebar')
  .directive('sidebarToolbarAdd', ['Field', 'Subfield',
    function(Field, Subfield) {
    return {
      templateUrl: 'sidebar/toolbar/add/sidebar.toolbar.add.template.html',
      link: function(scope, el, attrs, formCtrl) {

        scope.addPopupClearClick = function() {
          scope.addNameTaken = false;
          // Reset form's fields
          $.each(scope.info, function(key) {
            scope.info[key] = "";
          });

          scope.$broadcast('show-form-errors-reset');
        };

        $('#addModal').on('hidden.bs.modal', function(e) {
          scope.addPopupClearClick();
          scope.$digest();
        });

        scope.addPopupHeaderClick = function(type) {
          scope.addType = type;
          scope.addPopupClearClick();
        };

        scope.addPopupAddClick = function() {
          var invalid = true;
          if(angular.isDefined(scope.info)) {
            scope.info.type = scope.addType;

            // Check if the name is taken
            scope.addNameTaken = false;
            if(angular.isDefined(scope.info.name)) {
              if(scope.addType !== 'field') {
                scope.subfieldsList.forEach(function(subfield) {
                  if(scope.info.name.toLowerCase() === subfield.name.toLowerCase()) {
                    scope.addNameTaken = true;
                  }
                });
              }
              else if(scope.addType === 'field') {
                scope.fieldsList.forEach(function(field) {
                  if(scope.info.name.toLowerCase() === field.name.toLowerCase()) {
                    scope.addNameTaken = true;
                  }
                });
              }
            }

            // Check if all the fields were filled correctly
            invalid = (scope.addType === 'term' && scope.addTermForm.$invalid) ||
              (scope.addType === 'subject' && scope.addSubjectForm.$invalid) ||
              (scope.addType === 'header' && scope.addHeaderForm.$invalid) ||
              (scope.addType === 'field' && scope.addFieldForm.$invalid) ||
              scope.addNameTaken;
          }

          // Cue the directive to show error if needed
          scope.$broadcast('show-form-errors');

          // Do not close modal if form is invalid
          // Used 'one' so invalid will change in closure
          $('#addModal').one('hide.bs.modal', function(e) {
            if(invalid) {
              e.preventDefault();
              e.stopImmediatePropagation();
              return false;
            }
          });

          // Send request to the server
          if(!invalid && scope.addType !== 'term') {
            Subfield.addSubfield(scope.info);
            scope.addPopupClearClick();
          }
          else if(!invalid && scope.addType === 'term') {
            Field.addField(scope.info.name);
            scope.addPopupClearClick();
          }
        };
      }
    };
  }]);
