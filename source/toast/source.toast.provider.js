(function() {
  'use strict';

  angular
    .module('source.toast')
    /**
     * @namespace $alertProvider
     * @memberof source.toast
     *
     * @description
     * Provider custom statement to use toast alert's messages.
     */
    .provider('$alert', $alert);

  $alert.$inject = ['toastModelProvider'];

  function $alert(toastModelProvider) {
    var $ = toastModelProvider.$;
    var _toastOptions = {
      timeOut: 9999
    };

    return {
      $: $,
      setDuration: _setDuration,
      $get: ['toastModel', $get]
    };

    /**
     * @name _setDuration
     * @memberof source.toast.$alertProvider
     *
     * @description
     * Set duration of toast message for provider configuration.
     *
     * @param {Integer} time
     * @private
     */
    function _setDuration(time) {
      _toastOptions.timeOut = time;
    }

    /**
     * @name _launchToast
     * @memberof source.toast.$alertProvider
     *
     * @description
     * Launch angular-toaster alert message.
     *
     * @param {Object} toastFactoryModel
     * @param {String|Array} message
     * @param {String} type
     * @param {String|Undefined} title
     * @param {Integer|Undefined} duration
     * @private
     */
    function _launchToast(toastFactoryModel, message, type, title, duration) {
      if (title !== undefined && typeof title !== 'string' && !duration) {
        duration = title;
        title = undefined;
      }

      var toastOptions = (duration) ? angular.extend({}, _toastOptions, { timeOut: duration }) : _toastOptions ;
      message = (angular.isArray(message)) ? message.join('<br>') : message ;
      toastFactoryModel[type](message, title, toastOptions);
    }

    /**
     * @namespace $alert
     * @memberof source.toast.$alertProvider
     *
     * @requires toastr
     *
     * @description
     * Factory statement for toast alert's messages.
     *
     * @param {Object} toastModel
     * @returns {Object}
     */
    function $get(toastModel) {
      var toastFactoryModel = toastModel.get();

      return {
        $: $,
        success: success,
        info: info,
        warning: warning,
        error: error
      };

      /**
       * @name success
       * @memberof source.toast.$alertProvider.$alert
       *
       * @description
       * Displays success toast message.
       *
       * @param {String} message
       * @param {String} title
       * @param {Integer|Undefined} duration
       */
      function success(message, title, duration) {
        _launchToast(toastFactoryModel, message, $.SUCCESS, title, duration);
      }

      /**
       * @name info
       * @memberof source.toast.$alertProvider.$alert
       *
       * @description
       * Displays info toast message.
       *
       * @param {String} message
       * @param {String} title
       * @param {Integer|Undefined} duration
       */
      function info(message, title, duration) {
        _launchToast(toastFactoryModel, message, $.INFO, title, duration);
      }

      /**
       * @name warning
       * @memberof source.toast.$alertProvider.$alert
       *
       * @description
       * Displays warning toast message.
       *
       * @param {String} message
       * @param {String} title
       * @param {Integer|Undefined} duration
       */
      function warning(message, title, duration) {
        _launchToast(toastFactoryModel, message, $.WARNING, title, duration);
      }

      /**
       * @name error
       * @memberof source.toast.$alertProvider.$alert
       *
       * @description
       * Displays error toast message.
       *
       * @param {String} message
       * @param {String} title
       * @param {Integer|Undefined} duration
       */
      function error(message, title, duration) {
        _launchToast(toastFactoryModel, message, $.ERROR, title, duration);
      }
    }
  }
})();
