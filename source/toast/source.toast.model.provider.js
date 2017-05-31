(function() {
  'use strict';

  angular
    .module('source.toast')
    /**
     * @namespace toastModelProvider
     * @memberof source.toast
     *
     * @description
     * Provider that gets constants for toast services.
     */
    .provider('toastModel', toastModel);

  toastModel.$inject = ['$toolsProvider'];

  function toastModel($toolsProvider) {
    var _constants = {
      SUCCESS: 'SUCCESS',
      INFO: 'INFO',
      WARNING: 'WARNING',
      ERROR: 'ERROR'
    };
    var $ = angular.extend({}, _constants, $toolsProvider.$);

    return {
      $: $,
      $get: ['toastr', $get]
    };

    /**
     * @namespace toastModel
     * @memberof source.toast.toastModelProvider
     *
     * @requires toastr
     *
     * @description
     * Factory that gets constants for toast services.
     */
    function $get(toastr) {
      var _serviceModel = {
        SUCCESS: toastr.success,
        INFO: toastr.info,
        WARNING: toastr.warning,
        ERROR: toastr.error
      };

      return {
        $: $,
        get: getFactory
      };

      /**
       * @name getFactory
       * @memberof source.toast.toastModelProvider.toastModel
       *
       * @description
       * Returns API model for Factory service.
       *
       * @returns {Object}
       */
      function getFactory() {
        return _serviceModel;
      }
    }
  }
})();
