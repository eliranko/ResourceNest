'use strict';

angular.module('core.log')
.factory('Logger', ['$log',
function($log) {
  var undefinedMessageHandler = function() {
    $log.warn('Received undefined message to log');
  };

  return {
    log: function(message) {
      if(!angular.isDefined(message)) {
        undefinedMessageHandler();
        return;
      }

      $log.log(message);
    },
    debug: function(message) {
      if(!angular.isDefined(message)) {
        undefinedMessageHandler();
        return;
      }

      $log.debug(message);
    },
    info: function(message) {
      if(!angular.isDefined(message)) {
        undefinedMessageHandler();
        return;
      }

      $log.info(message);
    },
    warn: function(message) {
      if(!angular.isDefined(message)) {
        undefinedMessageHandler();
        return;
      }

      $log.warn(message);
    },
    error: function(message) {
      if(!angular.isDefined(message)) {
        undefinedMessageHandler();
        return;
      }

      $log.error(message);
    }
  };
}]);
