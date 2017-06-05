(function() {
  'use strict';

  angular
  .module('source.router')
  /**
   * @namespace $router
   * @memberof source.router
   *
   * @requires $state
   * @requires $timeout
   *
   * @description
   * Provider statement manage routing of the application.
   */
  .factory('$router', $router);

  $router.$inject = ['$state', '$timeout'];

  function $router($state, $timeout) {

    return {
      $state: $state,
      resolveStateGo: resolveStateGo
    };

    /**
     * @name _resolveStateGo
     * @memberof source.router.$router
     *
     * @description
     * Executes $state.go function into $timeout for use into state resolve.
     *
     * @param {String} stateName
     */
    function _resolveStateGo(stateName) {
      $timeout(function() {
        $state.go(stateName);
      });
    }

    /**
     * @name resolveStateGo
     * @memberof source.router.$router
     *
     * @description
     * Executes _resolveStateGo function.
     *
     * @param {String} stateName
     */
    function resolveStateGo(stateName) {
      _resolveStateGo(stateName);
    }
  }
})();
