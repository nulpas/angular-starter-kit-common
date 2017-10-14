(function() {
  'use strict';

  angular
    .module('source._shared')
    /**
     * @namespace _sharedRun
     * @memberof source._shared
     *
     * @requires $tools
     * @requires deviceDetector
     *
     * @description
     * Run statement for shared module.
     */
    .run(_sharedRun);

  _sharedRun.$inject = ['$tools', 'deviceDetector'];

  function _sharedRun($tools, deviceDetector) {
    $tools.setDeviceInfo(deviceDetector);
  }
})();
