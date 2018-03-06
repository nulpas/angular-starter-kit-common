(function() {
  'use strict';

  /**
   * @namespace localStorageServiceProvider
   * @memberof LocalStorageModule
   */

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
      'ngMaterial',
      'md.time.picker',
      'chart.js',
      'LocalStorageModule',
      'dndLists',
      /* Source Core Modules */
      'source._shared',
      'source.api',
      'source.date-time',
      'source.numbers',
      'source.router',
      'source.static',
      'source.toast',
      'source.translate',
      'source.view-logic'
    ]);
})();
