(function() {
  'use strict';

  angular
  .module('source.router')
  /**
   * @namespace routerData
   * @memberof source.router
   *
   * @description
   * Service to set some needed constants.
   */
  .service('routerData', routerData);

  function routerData() {
    /* jshint validthis: true */
    this.constants = {
      //# Router param object format:
      routerParams: {
        param1: null,
        param2: null,
        param3: null
      }
    };
  }
})();
