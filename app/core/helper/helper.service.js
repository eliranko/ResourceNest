'use strict';

angular.module('core.helper')
.factory('Helper', [function() {
  return {
    parsePath: function(path) {
      if(!angular.isString(path)) {
        return '';
      }

      return path.substr(1);
    }
  };
}]);
