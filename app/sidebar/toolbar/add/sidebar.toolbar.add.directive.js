'use strict';

angular.module('sidebar')
  .directive('sidebarToolbarAdd', ['Field', 'Subfield',
    function(Field, Subfield) {
    return {
      templateUrl: 'sidebar/toolbar/add/sidebar.toolbar.add.template.html',
      link: function(scope, el, attrs, formCtrl) {
        scope.addPopupClearClick = function() {
          scope.addInfoNameTaken = false;
          if(angular.isDefined(scope.info)) {
            scope.info.name = "";
            scope.info.content = "";
            scope.info.url = "";
          }

          scope.$broadcast('show-form-errors-reset');
        };

        scope.addPopupHeaderClick = function(type) {
          scope.addType = type;
          scope.addPopupClearClick();
        };

        scope.addPopupAddClick = function() {
          var invalid = true;
          if(angular.isDefined(scope.info)) {
            scope.info.type = scope.addType;

            // Check if the name is taken
            scope.addInfoNameTaken = false;
            if(angular.isDefined(scope.info.name)) {
              if(scope.addType !== 'field') {
                scope.subjectInfo.forEach(function(subjectInfo) {
                  if(scope.info.name.toLowerCase() === subjectInfo.name.toLowerCase()) {
                    scope.addInfoNameTaken = true;
                  }
                });
              }
              else if(scope.addType === 'field') {
                var fields = Field.getFieldsList();
                fields.forEach(function(field) {
                  if(scope.info.name.toLowerCase() === field.name.toLowerCase()) {
                    scope.addInfoNameTaken = true;
                  }
                });
              }
            }

            // Check if all the fields were filled correctly
            invalid = (((scope.addType === 'term' && scope.addTermForm.$invalid) ||
              (scope.addType === 'subject' && scope.addSubjectForm.$invalid) ||
              (scope.addType === 'header' && scope.addHeaderForm.$invalid) ||
              (scope.addType === 'field' && scope.addFieldForm.$invalid)) &&
              angular.isDefined(scope.info.name)) ||
              scope.addInfoNameTaken;
          }

          // Cue the directive to show error if needed
          scope.$broadcast('show-form-errors');

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
          if(!invalid && scope.addType !== 'term') {
            Subfield.addSubfield(scope.info);
          }
          else if(!invalid && scope.addType === 'term') {
            Field.addField(scope.info.name);
          }

          scope.addPopupClearClick();
        };
      }
    };
  }]);
