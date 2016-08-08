'use strict';

angular.module('sidebar')
  .directive('sidebarToolbar', function() {
    return {
      templateUrl: 'sidebar/toolbar/sidebar.toolbar.template.html'
    };
  });
