(function() {
  'use strict';

  angular.module('source.router')
    .service('routerData', [
      function() {
        this.constants = {
          //# Router param object format:
          routerParams: {
            param1: null,
            param2: null,
            param3: null
          }
        };
      }
    ]);
})();
