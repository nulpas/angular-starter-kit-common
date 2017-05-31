(function() {
  'use strict';

  angular
    /**
     * @namespace source
     *
     * @description
     * Definition of main module "BCA Core".
     */
    .module('bca.core', [
      /* External Modules */
      'ngAnimate',
      'ui.sortable',
      'ngSanitize',
      'chart.js',
      'dragularModule',
      'ADM-dateTimePicker',
      'LocalStorageModule',
      /* Source Core Modules */
      'source._shared',
      'source.api',
      'source.router',
      'source.toast',
      'source.translate'
    ]);
})();
