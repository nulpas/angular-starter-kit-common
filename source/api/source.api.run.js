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
     * @requires $tools
     * @requires $api
     * @requires $alert
     *
     * @description
     * Run statement for API module.
     */
    .run(apiRun);

  apiRun.$inject = ['Restangular', '$state', '$tools', '$api', '$alert'];

  function apiRun(Restangular, $state, $tools, $api, $alert) {
    var _apiConfiguration = $api.getApiConfig();
    Restangular.setBaseUrl(_apiConfiguration.apiBaseUrl);

    Restangular.setErrorInterceptor(function(rejection, deferred) {
      var _formatCondition = (rejection.hasOwnProperty('status') && rejection.hasOwnProperty('statusText'));
      if (angular.isObject(rejection) && _formatCondition && rejection.hasOwnProperty('data')) {
        var _errorSchema = _apiConfiguration.errorDefinition.errorSchema;
        var _receivedError = $tools.setObjectUsingSchema(_errorSchema, rejection.data, $api.$.MERGE);
        var _structureCondition01 = _receivedError.hasOwnProperty(_apiConfiguration.errorDefinition.errorMessage);
        var _structureCondition02 = _receivedError.hasOwnProperty(_apiConfiguration.errorDefinition.errorStatus);
        if (_structureCondition01 && _structureCondition02) {
          var _receivedStatus = _receivedError[_apiConfiguration.errorDefinition.errorStatus];
          var _receivedMessage = _receivedError[_apiConfiguration.errorDefinition.errorMessage];
          var _status = (_receivedStatus) ? _receivedStatus : rejection.status ;
          var _message = (_receivedMessage) ? _receivedMessage : rejection.statusText;
          _status = (_status === -1) ? 500 : _status ;
          _message = (!_message) ? 'Unable to access resource.' : _message ;
          if (_apiConfiguration.errorDefinition.loginGoIf401 && _status === 401 && $state.current.name !== 'login') {
            $state.go('login');
          } else {
            $alert.error('ERROR ' + _status + ': ' + _message);
          }
          console.error(new Error(_message + ' (' + _status + ')'));
          deferred.reject(rejection);
        } else {
          throw new ReferenceError('Incorrect error definition. Check "$apiProvider.setApiConfig" in your project.');
        }
      } else {
        throw new Error('Invalid format of rejection object');
      }
    });
  }
})();
