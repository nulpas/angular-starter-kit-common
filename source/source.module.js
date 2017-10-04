(function() {
  'use strict';

  angular
    /**
     * @namespace source
     *
     * @description
     * Definition of main module "Core".
     */
    .module('afs.core', [
      /* External Modules */
      'ngAnimate',
      'ngSanitize',
      'chart.js',
      /* Source Core Modules */
      'source._shared',
      'source.api',
      'source.date-time',
      'source.literals',
      'source.router',
      'source.toast',
      'source.translate',
      'source.view-logic'
    ]);
})();
