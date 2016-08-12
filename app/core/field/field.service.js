'use strict';

angular.module('core.field')
  .service('Field', ['$rootScope', '$window', 'Logger', 'Server',
  function($rootScope, $window, Logger, Server) {
    var fieldsList = [
      {
        name: 'Field1',
        href: '#/Field1'
      },
      {
        name: 'Field2',
        href: '#/Field2'
      }
    ];

    var getFields = function() {
      Server.getFields(function(data) {
        fieldsList = data;
      });
    };

    getFields();

    return {
      getFieldsList: function() {
        var newList = [];
        angular.copy(fieldsList, newList);
        return newList;
      },
      addField: function(data) {
        Server.postField(data, function(field) {
          fieldsList.push(field);
          $rootScope.$broadcast('fieldsChanged');
        }, function() {
          $window.alert('Could not add the subject ' + data);
        });
      }
    };
}]);
