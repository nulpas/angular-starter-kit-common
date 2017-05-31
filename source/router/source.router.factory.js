(function() {
  'use strict';

  angular.module('source.router')
    .factory('$router', [
      '$state',
      '$timeout',
      function($state, $timeout) {
        /**
         * _resolveStateGo
         * Executes $state.go function into $timeout for use into state resolve.
         *
         * @param {String} stateName
         * @private
         */
        var _resolveStateGo = function(stateName) {
          $timeout(function() {
            $state.go(stateName);
          });
        };
        return {
          $state: $state,
          resolveStateGo: function(stateName) {
            _resolveStateGo(stateName);
          }
        };
      }
    ]);
})();
