'use strict';

angular.module('core.helper')
.factory('Helper', [function() {
  return {
    parsePath: function(path) {
      if(!angular.isString(path)) {
        return '';
      }

      return path.substr(1);
    },

    removeIf: function(arr, value, callback) {
      var i = 0;
      while (i < arr.length) {
          if (callback(arr[i], value)) {
              arr.splice(i, 1);
          }
          else {
              ++i;
          }
      }
    }
  };
}]);
