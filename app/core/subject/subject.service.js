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
    },
    _postSubjectInfo: {
      method: 'POST'
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

  resource.getSubjectInfo = function(url, succCallBack, errCallBack) {
    Logger.debug('Trying to get subject info of: ' + url);

    if(!angular.isFunction(succCallBack)) {
      Logger.error('resource.getSubjectInfo received succCallBack which isn\'t a function');
    }
    if(!angular.isFunction(errCallBack)) {
      Logger.error('resource.getSubjectInfo received errCallBack which isn\'t a function');
    }

    return resource._getSubjectInfo({subject: url}, function(data) {
      Logger.debug('Retreived the subject info of: ' + url + ' successfully: ' + data);
      succCallBack(data);
    }, function(err) {
      Logger.error('Unable to retreive the subject info of: ' + url + ' with error: ' + err);
      errCallBack(err);
    });
  };

  resource.postSubjectInfo = function(url, data, succCallBack, errCallBack) {
    Logger.debug('Trying to post subject info to url: ' + url + ' with data: ' + data);

    if(!angular.isFunction(succCallBack)) {
      Logger.error('resource.postSubjectInfo received succCallBack which isn\'t a function');
    }
    if(!angular.isFunction(errCallBack)) {
      Logger.error('resource.postSubjectInfo received errCallBack which isn\'t a function');
    }

    return resource._postSubjectInfo({subject: url, params: data}, function(data) {
      Logger.debug('Posted the subject info of: ' + url + ' successfully: ' + data);
      succCallBack(data);
    }, function(err) {
      Logger.error('Unable to post the subject info of: ' + url + ' with error: ' + err);
      errCallBack(err);
    });
  };

  return resource;
}]);
