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
      if (rejection.status) {
        var ownReject = angular.copy(rejection);
        if () {

        }

        if (ownReject.data.error) {
          ownReject.error = ownReject.data.error;
          delete ownReject.data;
        }
        var message = (ownReject.status !== -1) ? ownReject.error : 'Unable to access resource.' ;
        if (ownReject.status === 401 && $state.current.name !== 'login') {
          $state.go('login');
        } else {
          $alert.error(message);
        }
        console.error(new Error(message + ' (' + ownReject.status + ')'));
        deferred.reject(ownReject);
      } else {
        throw new Error('Invalid format of rejection object');
      }
    });
  }
})();
