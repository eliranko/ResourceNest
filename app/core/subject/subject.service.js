'use strict';

angular.module('core.subject').factory('Subject', ['$resource', 'Logger',
function($resource, Logger) {
  var resource = $resource('/api/subjects/:subjectId', {}, {
    _getSubjects: {
      method: 'GET',
      url: '/api/subjects',
      isArray: true
    }
  });

  resource.getSubjects = function(succCallBack, errCallBack) {
    Logger.debug('Trying to get subjects list');

    if(!angular.isFunction(succCallBack)) {
      Logger.error('resource.getSubjects received succCallBack which isn\'t a function');
    }
    if(!angular.isFunction(errCallBack)) {
      Logger.error('resource.getSubjects received errCallBack which isn\'t a function');
    }

    return resource._getSubjects(function(data) {
      Logger.debug('Retreived the subjects list successfully: ' + data);
      succCallBack(data);
    }, function(err) {
      Logger.error('Unable to retreive the subjects list: ' + err);
      errCallBack(err);
    });
  };

  return resource;
}]);
