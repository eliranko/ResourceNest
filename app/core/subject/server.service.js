'use strict';

angular.module('core.server').factory('Server', ['$resource', 'Logger',
function($resource, Logger) {
  var resource = $resource('/api/:subject', {}, {
    _getFields: {
      method: 'GET',
      url: '/api/fields',
      isArray: true
    },
    _postField: {
      method: 'POST',
      url: '/api/fields'
    },
    _getSubjectInfo: {
      method: 'GET',
      isArray: true
    },
    _postSubjectInfo: {
      method: 'POST',
    },
    _deleteSubjectInfo: {
      method: 'DELETE'
    }
  });

  resource.getFields = function(succCallBack, errCallBack) {
    Logger.debug('Trying to get fields list');

    if(!angular.isFunction(succCallBack)) {
      Logger.error('resource.getFields received succCallBack which isn\'t a function');
    }
    if(angular.isDefined(errCallBack) && !angular.isFunction(errCallBack)) {
      Logger.error('resource.getFields received errCallBack which isn\'t a function');
    }

    return resource._getFields(function(data) {
      Logger.debug('Retreived the fields list successfully: ' + angular.toJson(data, true));
      succCallBack(data);
    }, function(err) {
      Logger.error('Unable to retreive the fields list: ' + angular.toJson(err, true));

      if(angular.isDefined(errCallBack)) {
        errCallBack(err);
      }
    });
  };

  resource.postField = function(data, succCallBack, errCallBack) {
    Logger.debug('Trying to post field with data: ' + angular.toJson(data, true));

    if(!angular.isFunction(succCallBack)) {
      Logger.error('resource.postField received succCallBack which isn\'t a function');
    }
    if(angular.isDefined(errCallBack) && !angular.isFunction(errCallBack)) {
      Logger.error('resource.postField received errCallBack which isn\'t a function');
    }

    return resource._postField({params: data}, function() {
      Logger.debug('Posted the field successfully: ' + angular.toJson(data, true));
      succCallBack(data);
    }, function(err) {
      Logger.error('Unable to post the field with error: ' + angular.toJson(err, true));

      if(angular.isDefined(errCallBack)) {
        errCallBack(err);
      }
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

  resource.postSubjectInfo = function(url, data, succCallBack, errCallBack) {
    Logger.debug('Trying to post subject with data: ' + angular.toJson(data, true));

    if(!angular.isFunction(succCallBack)) {
      Logger.error('resource.postSubjectInfo received succCallBack which isn\'t a function');
    }
    if(!angular.isFunction(errCallBack)) {
      Logger.error('resource.postSubjectInfo received errCallBack which isn\'t a function');
    }

    return resource._postSubjectInfo({subject: url, params: data}, function() {
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
      Logger.debug('Deleted the subject info of: ' + url + ' successfully');
      succCallBack();
    }, function(err) {
      Logger.error('Unable to delete the subject info of: ' + url + ' with error: ' + angular.toJson(err, true));
      errCallBack();
    });
  };

  return resource;
}]);
