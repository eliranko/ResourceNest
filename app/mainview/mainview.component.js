'use strict';

angular.
  module('mainview').
  component('mainview', {
    templateUrl: 'mainview/mainview.template.html',
    controller: ['$scope', '$sce', '$window', '$timeout', 'Logger',
      function MainviewController($scope, $sce, $window, $timeout, Logger) {
        $scope.xFrameOptionsFree = true;

        // Horrible hack to check if the framed site is X-Frame-Options free
        var iframeLoadTime = false;
        var setUrl = function(url) {
          $scope.url = $sce.trustAsResourceUrl(url);
          $timeout(function () {
            iframeLoadTime = true;
          }, 1000);
        };

        $window.iframeOnLoad = function() {
          $scope.xFrameOptionsFree = iframeLoadTime;
          Logger.debug('set xFrameOptionsFree to ' + iframeLoadTime);
        };

        //$scope.url = $sce.trustAsResourceUrl('http://www.tinywebgallery.com/blog/advanced-iframe/free-iframe-checker');
        setUrl('http://www.google.com');
        $scope.$on('mainviewChanged', function(event, data) {
          Logger.debug('event mainviewChanged fired with: ' + data);

          switch (data.type) {
            case 'url':
              setUrl(data.data);
              break;

            default:
              Logger.error('Received unsupported data type: ' + data.type);
          }
        });

        $scope.openTab = function() {
          $window.open($scope.url, '_blank');
        };

      }
    ]
  });
