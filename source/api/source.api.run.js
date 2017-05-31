(function() {
  'use strict';

  angular
    .module('source.api')
    /**
     * @namespace apiRun
     * @memberof source.api
     *
     * @requires Restangular
     * @requires $state
     * @requires $api
     * @requires $alert
     *
     * @description
     * Run statement for API module.
     */
    .run(apiRun);

  apiRun.$inject = ['Restangular', '$state', '$api', '$alert'];

  function apiRun(Restangular, $state, $api, $alert) {
    var configuredApi = $api.getApiConfig();
    Restangular.setBaseUrl(configuredApi.apiBaseUrl);

    Restangular.setErrorInterceptor(function(rejection, deferred) {
      if (rejection.status && angular.isObject(rejection.data)) {
        var ownRejection = rejection;
        if (ownRejection.data.error) {
          ownRejection.error = ownRejection.data.error;
          delete ownRejection.data;
        }
        var message = (ownRejection.status !== -1) ? ownRejection.error : 'Unable to access resource.' ;
        if (ownRejection.status === 401 && $state.current.name !== 'login') {
          $state.go('login');
        } else {
          $alert.error(message);
        }
        console.error(new Error(message + ' (' + ownRejection.status + ')'));
        deferred.reject(ownRejection);
      } else {
        throw new Error('Invalid format of rejection object');
      }
    });
  }
})();
