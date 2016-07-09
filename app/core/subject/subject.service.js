'use strict';

angular.module('core.subject').factory('Subject', ['$resource', 'Logger',
function($resource, Logger) {
  var resource = $resource('/api/subjects/:subject', {}, {
    _getSubjects: {
      method: 'GET',
      url: '/api/subjects',
      isArray: true
    },
    _getSubjectInfo: {
      method: 'GET',
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

  resource.getSubjectInfo = function(concat, succCallBack, errCallBack) {
    Logger.debug('Trying to get subject info of: ' + concat);

    if(!angular.isFunction(succCallBack)) {
      Logger.error('resource.getSubjectInfo received succCallBack which isn\'t a function');
    }
    if(!angular.isFunction(errCallBack)) {
      Logger.error('resource.getSubjectInfo received errCallBack which isn\'t a function');
    }

    return resource._getSubjectInfo({subject: concat}, function(data) {
      Logger.debug('Retreived the subject info of: ' + concat + ' successfully: ' + data);
      succCallBack(data);
    }, function(err) {
      Logger.error('Unable to retreive the subject info of: ' + concat + ' with error: ' + err);
      errCallBack(err);
    });
  };

  return resource;
}]);
