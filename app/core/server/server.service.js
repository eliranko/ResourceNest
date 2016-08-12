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
    _deleteField: {
      method: 'DELETE',
      url: '/api/fields'
    },
    _getSubfields: {
      method: 'GET',
      isArray: true
    },
    _postSubfield: {
      method: 'POST',
    },
    _deleteSubfield: {
      method: 'DELETE'
    }
  });

  resource.getFields = function(succCallBack, errCallBack) {
    Logger.debug('Trying to get fields list');

    if(!angular.isFunction(succCallBack)) {
      Logger.error('resource.getSubjects received succCallBack which isn\'t a function');
    }
    if(angular.isDefined(errCallBack) && !angular.isFunction(errCallBack)) {
      Logger.error('resource.getSubjects received errCallBack which isn\'t a function');
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

  resource.deleteField = function(data, succCallBack, errCallBack) {
    Logger.debug('Trying to delete the field: ' + angular.toJson(data));

    if(!angular.isFunction(succCallBack)) {
      Logger.error('resource.deleteField received succCallBack which isn\'t a function');
    }
    if(angular.isDefined(errCallBack) && !angular.isFunction(errCallBack)) {
      Logger.error('resource.deleteField received errCallBack which isn\'t a function');
    }

    return resource._deleteSubjectInfo({params: data}, function() {
      Logger.debug('Deleted the field: ' + angular.toJson(data) + ' successfully');
      succCallBack(data);
    }, function(err) {
      Logger.error('Unable to delete the field: ' + angular.toJson(data) + ' with error: ' + angular.toJson(err, true));

      if(angular.isDefined(errCallBack)) {
        errCallBack(data);
      }
    });
  };

  resource.getSubfields = function(url, succCallBack, errCallBack) {
    Logger.debug('Trying to get the subfields of: ' + url);

    if(!angular.isFunction(succCallBack)) {
      Logger.error('resource.getSubfields received succCallBack which isn\'t a function');
    }
    if(angular.isDefined(errCallBack) && !angular.isFunction(errCallBack)) {
      Logger.error('resource.getSubfields received errCallBack which isn\'t a function');
    }

    return resource._getSubjectInfo({subject: url}, function(data) {
      Logger.debug('Retreived the subfields of: ' + url + ' successfully: ' + angular.toJson(data, true));
      succCallBack(data);
    }, function(err) {
      Logger.error('Unable to retreive the subfields of: ' + url + ' with error: ' + angular.toJson(err, true));

      if(angular.isDefined(errCallBack)) {
        errCallBack(err);
      }
    });
  };

  resource.postSubfield = function(url, data, succCallBack, errCallBack) {
    Logger.debug('Trying to post subfield with data: ' + angular.toJson(data, true) + ' to: ' + url);

    if(!angular.isFunction(succCallBack)) {
      Logger.error('resource.postSubfield received succCallBack which isn\'t a function');
    }
    if(angular.isDefined(errCallBack) && !angular.isFunction(errCallBack)) {
      Logger.error('resource.postSubfield received errCallBack which isn\'t a function');
    }

    return resource._postSubField({subject: url, params: data}, function() {
      Logger.debug('Posted the subfield successfully: ' + angular.toJson(data, true));
      succCallBack(data);
    }, function(err) {
      Logger.error('Unable to post the subfield with error: ' + angular.toJson(err, true));

      if(angular.isDefined(errCallBack)) {
        errCallBack(err);
      }
    });
  };

  resource.deleteSubfield = function(url, data, succCallBack, errCallBack) {
    Logger.debug('Trying to delete subfield of url: ' + url + ' with data: ' + angular.toJson(data));

    if(!angular.isFunction(succCallBack)) {
      Logger.error('resource.deleteSubjectInfo received succCallBack which isn\'t a function');
    }
    if(angular.isDefined(errCallBack) && !angular.isFunction(errCallBack)) {
      Logger.error('resource.deleteSubjectInfo received errCallBack which isn\'t a function');
    }

    return resource._deleteSubfield({subject: url, params: data}, function() {
      Logger.debug('Deleted the subfield of: ' + url + ' successfully' + ' with data: ' + angular.toJson(data));
      succCallBack();
    }, function(err) {
      Logger.error('Unable to delete the subfield of: ' + url + ' with error: ' + angular.toJson(err, true));

      if(angular.isDefined(errCallBack)) {
        errCallBack(err);
      }
    });
  };

  return resource;
}]);
