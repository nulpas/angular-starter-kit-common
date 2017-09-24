(function() {
  'use strict';

  angular
    .module('source.api')
    /**
     * @namespace apiConfig
     * @memberof source.api
     *
     * @requires Restangular
     *
     * @description
     * Config statement for API module.
     */
    .config(apiConfig);

  apiConfig.$inject = ['RestangularProvider'];

  function apiConfig(RestangularProvider) {
    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
      var newData = {};
      /* Collect errors that come with 20X code. */
      if (!angular.isObject(data)) {
        var errorMessage = {
          alert: 'Unexpected response from API.',
          console: 'You\'re probably trying to read JSON file that does not exist.',
          helper: 'Entity: (' + what + '), URL: (' + url + ')'
        };
        newData.error = [errorMessage.alert + ' ' + errorMessage.console + ' ' + errorMessage.helper];
        newData.errorAlert = [errorMessage.alert];
        deferred.reject(newData);
        throw new Error(errorMessage.alert + ' ' + errorMessage.console + ' ' + errorMessage.helper);
      }
      return data;
    });
  }
})();
