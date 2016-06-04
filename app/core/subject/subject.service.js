'use strict';

angular.module('core.subject').factory('Subject', ['$http', 'Logger',
function($http, Logger) {
  // Cached list
  var promise;

  return {
    fetchSubjectList: function() {
      if(angular.isDefined(promise)) {
        return promise;
      }

      promise = $http.get('/subject-list').then(function (response) {
        Logger.debug('Received the following subject list: ' + response.data);

        return response.data;
      });

      return promise;
    }
  };
}]);
