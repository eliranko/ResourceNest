'use strict';

describe('mainview component' , function() {
  var $rootScope, $scope, createController;

  beforeEach(module('mainview'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');

    $scope = $rootScope.$new();
    var $componentController = $injector.get('$componentController');
    createController = function() {
      return $componentController('mainview', {$rootScope: $rootScope, $scope: $scope});
    };
  }));

  it('changes url on mainviewChanged event', function() {
    createController();
    $rootScope.$broadcast('mainviewChanged', {type: 'url', data: 'www.google.com'});
    expect($scope.url + '').toBe('www.google.com');
  });

});
