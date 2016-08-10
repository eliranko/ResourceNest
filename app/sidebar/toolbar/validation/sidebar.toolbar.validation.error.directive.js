'use strict';

angular.module('sidebar')
  .directive('showErrorMessage', function() {
    return {
      replace: true,
      restrict: 'E',
      scope: {
        content: '=content'
      },
      templateUrl: 'sidebar/toolbar/validation/sidebar.toolbar.validation.error.template.html'
    };
  }
);
