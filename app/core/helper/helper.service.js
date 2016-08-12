'use strict';

angular.module('core.helper', ['core.log'])
.factory('Helper', ['Logger', function(Logger) {
  return {
    parsePath: function(path) {
      if(!angular.isString(path)) {
        return '';
      }

      return path.substr(1);
    },

    removeIf: function(arr, value, callback) {
      if(!angular.isArray(arr)) {
        return;
      }

      var i = 0;
      while (i < arr.length) {
          if (callback(arr[i], value)) {
              arr.splice(i, 1);
          }
          else {
              ++i;
          }
      }
    },

    removeSubstringAfterLastCharOccurrence: function(str) {
      if(!angular.isString(str)) {
        return;
      }

      var endIndex = str.lastIndexOf("/");
      if(endIndex !== -1) {
        return str.subsring(0, endIndex);
      }
      else {
        return str;
      }
    }
  };
}]);
