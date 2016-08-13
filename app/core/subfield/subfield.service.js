'use strict';

angular.module('core.subfield')
  .factory('Subfield', ['$rootScope', '$location', '$window', 'Logger', 'Server', 'Helper',
  function($rootScope, $location, $window, Logger, Server, Helper) {
    var subfieldsList = [
      {
        type: 'term',
        name: 'Term1',
        href: '#/Term1'
      },
      {
        type: 'subject',
        name: 'Subject1',
        href: '#/Subject1'
      },
      {
        type: 'header',
        name: 'Header1',
        href: '#/Header1'
      }
    ];

    var headerUrl = '';

    var getSubfields = function(url) {
      Server.getSubfields(url, function(data) {
        switch(data.type) {
          case 'header':
            $rootScope.$broadcast('subFieldsChanged');
            subfieldsList = data.data;
            headerUrl = url;
            break;
          case 'term':
          case 'subject':
            $rootScope.$broadcast('mainviewChanged', data.data);
            // Retrieve the subfield list as well
            getSubfields(Helper.removeSubstringAfterLastCharOccurrence(url));

            break;
        }
      });
    };

    getSubfields($location.path());

    $rootScope.$on('$locationChangeStart', function (event) {
      getSubfields($location.path());
    });

    return {
      getSubfields: function(url) {
        var newList = [];
        angular.copy(subfieldsList, newList);
        return newList;
      },
      addSubfield: function(data) {
        Server.postSubfield($location.path(), data, function() {
          subfieldsList.push(data);
        }, function() {
          $window.alert('could not add ' + angular.toJson(data));
        });
      },
      deleteSubfield: function(data, succ, err) {
        Server.deleteSubfield(headerUrl, data, angular.isFunction(succ) ? succ : function() {

        }, angular.isFunction(err) ? err : function() {
          $window.alert('Could not delete the subfield ' + angular.toJson(data));
        });
      }
    };
}]);
