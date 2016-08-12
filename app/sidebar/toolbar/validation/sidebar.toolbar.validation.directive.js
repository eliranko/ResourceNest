'use strict';

angular.module('sidebar')
  .directive('sidebarToolbarValidation', ['$timeout', function($timeout) {
    return {
      restrict: 'A',
      require: '^form',
      link: function(scope, el, attrs, formCtrl) {
        if(!angular.isDefined(scope.showFormError)) {
          scope.showFormError = [];
        }

        // Get element that has 'name' attribute
        var inputNameEl = el[0].querySelector('[name]');

        // Convert the element to an angular element
        var inputNameNg = angular.element(inputNameEl);

        // get the name on the text box so we know the property to check on the form controller
        var inputName = inputNameNg.attr('name');

        var element = formCtrl[inputName];

        // apply validation when the element loses focus
        inputNameNg.bind('blur', function() {
          el.toggleClass('has-error', !angular.isDefined(element) || formCtrl[inputName].$invalid);
        });

        scope.$on('show-form-errors', function() {
          var invalid = !angular.isDefined(element) || formCtrl[inputName].$invalid || inputName === 'name' && scope.addNameTaken;
          el.toggleClass('has-error', invalid);
          scope.showFormError[inputName] = invalid;
        });

        scope.$on('show-form-errors-reset', function() {
          $timeout(function() {
            el.removeClass('has-error');
            scope.showFormError[inputName] = false;
            scope.$digest();
          }, 0, false);
        });
      }
    };
  }]);
