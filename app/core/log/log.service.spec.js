'use strict';

describe("Logger service", function() {
  // Stubs
  var $log;

  // Spies
  var debugEnabledSpy;

  // Tested
  var Logger;

  beforeEach(module('core.log'));

  beforeEach(function() {
    $log = {
      log: jasmine.createSpy('logSpy'),
      debug: jasmine.createSpy('debugSpy'),
      info: jasmine.createSpy('infoSpy'),
      warn: jasmine.createSpy('warnSpy'),
      error: jasmine.createSpy('errorSpy')
    };
    debugEnabledSpy = jasmine.createSpy('debugEnabledSpy');

    module(function($provide) {
      $provide.value('$logProvider', {
        debugEnabled: debugEnabledSpy
      });
      $provide.service('$log', function() {
        this.log = $log.log;
        this.debug = $log.debug;
        this.info = $log.info;
        this.warn = $log.warn;
        this.error = $log.error;
      });
    });
  });

  beforeEach(inject(function(_Logger_) {
    Logger = _Logger_;
  }));

  xdescribe("log function", function() {
    it("logLevel argument is missing", function() {
      Logger.log("Hi");
      expect($log.debug).toHaveBeenCalled();
    });
  });
});
