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
      var getList = (operation === 'getList');
      var get = (operation === 'get');
      var post = (operation === 'post');
      var put = (operation === 'put');
      if (getList || get || post || put) {
        var newData = _.values(data);
        /* Collect errors that come with 20X code. */
        if (!data.result && !data._cursor && !data.error) {
          var errorMessage = {
            alert: 'Data property undefined.',
            console: 'You\'re probably trying to read JSON file that does not exist.',
            helper: 'Entity: (' + what + '), URL: (' + url + ')'
          };
          newData.error = [errorMessage.alert + ' ' + errorMessage.console + ' ' + errorMessage.helper];
          newData.errorAlert = [errorMessage.alert];
          deferred.reject(newData);
          throw new Error(errorMessage.alert + ' ' + errorMessage.console + ' ' + errorMessage.helper);
        }
        newData.data = data.result;
        newData._cursor = data._cursor;
        newData.error = data.error;
        return newData;
      }
      return data;
    });
  }
})();
