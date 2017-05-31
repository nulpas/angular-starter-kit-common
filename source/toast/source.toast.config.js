(function() {
  'use strict';

  angular
    .module('source.toast')
    /**
     * @namespace toastConfig
     * @memberof source.toast
     *
     * @requires 'toastrConfig'
     *
     * @description
     * Config statement for alert module.
     */
    .config(toastConfig);

  toastConfig.$inject = ['toastrConfig'];

  function toastConfig(toastrConfig) {
    angular.extend(toastrConfig, {
      allowHtml: true,
      autoDismiss: false,
      containerId: 'toast-container',
      maxOpened: 0,
      extendedTimeOut: 3600,
      newestOnTop: true,
      positionClass: 'toast-bottom-full-width',
      preventDuplicates: false,
      preventOpenDuplicates: false,
      target: 'body'
    });
  }
})();
