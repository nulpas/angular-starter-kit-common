(function() {
  'use strict';

  angular
    .module('source._shared')
    /**
     * @namespace globalConstantsProvider
     * @memberof source._shared
     *
     * @description
     * Provider that gets the global constants of the application.
     */
    .provider('globalConstants', globalConstants);

  function globalConstants() {
    var _constants = {
      NO_OBJECT: {},

      FROM_CAMELCASE_TO_OTHER: true,
      FROM_OTHER_TO_CAMELCASE: false,

      MODE_KEY: true,
      MODE_VALUE: false,

      ENCODE: true,
      DECODE: false,

      TITLE: 1,
      SUBTITLE: 2,

      PROCESSES: 'processes',
      MODULES: 'modules',
      STATES: 'states',

      PROVIDER: true,
      SERVICE: false,

      MERGE: true,
      NO_MERGE: false,

      KEY: {
        ESCAPE: {
          NAME: 'Escape',
          CODE: 27
        },
        ENTER: {
          NAME: 'Enter',
          CODE: 13
        },
        ARROW_DOWN: {
          NAME: 'ArrowDown',
          CODE: 40
        },
        ARROW_UP: {
          NAME: 'ArrowUp',
          CODE: 38
        }
      },

      DEVICE_INFO_OS: 'os',
      DEVICE_INFO_BROWSER: 'browser',
      DEVICE_INFO_DEVICE: 'device',
      DEVICE_INFO_OS_VERSION: 'os_version',
      DEVICE_INFO_BROWSER_VERSION: 'browser_version',

      BROWSER_IE: 'ie',
      BROWSER_EDGE: 'ms-edge',
      BROWSER_CHROME: 'chrome'
    };

    return {
      get: getProvider,
      $get: [$get]
    };

    /**
     * @name getProvider
     * @memberof source._shared.globalConstantsProvider
     *
     * @description
     * Get constants object for provider.
     *
     * @returns {Object}
     */
    function getProvider() {
      return _constants;
    }

    /**
     * @namespace globalConstants
     * @memberof source._shared.globalConstantsProvider
     *
     * @description
     * Factory that provides the global constants of the application.
     */
    function $get() {
      return {
        get: getFactory
      };

      /**
       * @name getFactory
       * @memberof source._shared.globalConstantsProvider.globalConstants
       *
       * @description
       * Get constants object for factory.
       *
       * @returns {Object}
       */
      function getFactory() {
        return _constants;
      }
    }
  }
})();
