'use strict';

angular.module('core.log')
.factory('Logger', ['$log',
function($log) {
  var undefinedMessage = function() {
    $log.warn('Received undefined message to log');
  };

  return {
    log: function(message) {
      if(!angular.isDefined(message)) {
        undefinedMessage();
        return;
      }

      $log.log(message);
    },
    debug: function(message) {
      if(!angular.isDefined(message)) {
        undefinedMessage();
        return;
      }

      $log.debug(message);
    },
    info: function(message) {
      if(!angular.isDefined(message)) {
        undefinedMessage();
        return;
      }

      $log.info(message);
    },
    warn: function(message) {
      if(!angular.isDefined(message)) {
        undefinedMessage();
        return;
      }

      $log.warn(message);
    },
    error: function(message) {
      if(!angular.isDefined(message)) {
        undefinedMessage();
        return;
      }

      $log.error(message);
    }
  };
}]);
