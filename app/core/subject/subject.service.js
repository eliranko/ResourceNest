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
      method: 'POST',
      url: '/api/subjects/add'
    },
    _deleteSubjectInfo: {
      method: 'DELETE'
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
      Logger.debug('Retreived the subjects list successfully: ' + angular.toJson(data, true));
      succCallBack(data);
    }, function(err) {
      Logger.error('Unable to retreive the subjects list: ' + angular.toJson(err, true));
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
      Logger.debug('Retreived the subject info of: ' + url + ' successfully: ' + angular.toJson(data, true));
      succCallBack(data);
    }, function(err) {
      Logger.error('Unable to retreive the subject info of: ' + url + ' with error: ' + angular.toJson(err, true));
      errCallBack(err);
    });
  };

  resource.postSubjectInfo = function(data, succCallBack, errCallBack) {
    Logger.debug('Trying to post subject with data: ' + angular.toJson(data, true));

    if(!angular.isFunction(succCallBack)) {
      Logger.error('resource.postSubjectInfo received succCallBack which isn\'t a function');
    }
    if(!angular.isFunction(errCallBack)) {
      Logger.error('resource.postSubjectInfo received errCallBack which isn\'t a function');
    }

    return resource._postSubjectInfo({params: data}, function() {
      Logger.debug('Posted the subject successfully: ' + angular.toJson(data, true));
      succCallBack(data);
    }, function(err) {
      Logger.error('Unable to post the subject with error: ' + angular.toJson(err, true));
      errCallBack(err);
    });
  };

  resource.deleteSubjectInfo = function(url, succCallBack, errCallBack) {
    Logger.debug('Trying to delete subject info of url: ' + url);

    if(!angular.isFunction(succCallBack)) {
      Logger.error('resource.deleteSubjectInfo received succCallBack which isn\'t a function');
    }
    if(!angular.isFunction(errCallBack)) {
      Logger.error('resource.deleteSubjectInfo received errCallBack which isn\'t a function');
    }

    return resource._deleteSubjectInfo({subject: url}, function() {
      Logger.debug('Posted the subject info of: ' + url + ' successfully');
      succCallBack();
    }, function(err) {
      Logger.error('Unable to post the subject info of: ' + url + ' with error: ' + angular.toJson(err, true));
      errCallBack();
    });
  };

  return resource;
}]);
