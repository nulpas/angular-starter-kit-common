(function() {
  'use strict';

  angular
    .module('source.api')
    /**
     * @namespace $apiProvider
     * @memberof source.api
     *
     * @requires $toolsProvider
     * @requires apiModelProvider
     *
     * @description
     * Provider statement to make API calls.
     */
    .provider('$api', $api);

  $api.$inject = ['$toolsProvider', 'apiModelProvider'];

  function $api($toolsProvider, apiModelProvider) {
    var $ = apiModelProvider.$;
    var $c = apiModelProvider.get();
    var _apiGeneralConfig = $c.schemas.apiGeneralConfig;

    return {
      /* Global Constants */
      $: $,
      /* Provider API tools */
      setApiConfig: setProviderApiConfig,
      getApiConfig: getProviderApiConfig,
      createEntityObject: createProviderEntityObject,
      /* API Factory */
      $get: ['$q', '$tools', '$alert', 'apiModel', $get]
    };

    /**
     * @name _setApiConfig
     * @memberof source.api.$apiProvider
     *
     * @description
     * Private function to setting API configuration object (_apiGeneralConfig).
     *
     * @param {Object} config --> Given API configuration object.
     * @returns {Object}
     * @private
     */
    function _setApiConfig(config) {
      _apiGeneralConfig = $toolsProvider.setObjectUsingSchema($c.schemas.apiGeneralConfig, config, _apiGeneralConfig);
      if (_apiGeneralConfig.errorDefinition) {
        var _eDef = angular.copy(_apiGeneralConfig.errorDefinition);
        _eDef = $toolsProvider.setObjectUsingSchema($c.schemas.errorDefinition, _eDef, $.MERGE);
        _apiGeneralConfig.errorDefinition = _eDef;
      }
      return _apiGeneralConfig;
    }

    /**
     * @name _createEntityObject
     * @memberof source.api.$apiProvider
     *
     * @description
     * Private method for provider createProviderEntityObject and factory createEntityObject.
     *
     * @param {Object} entityObject
     * @returns {Object}
     * @private
     */
    function _createEntityObject(entityObject) {
      return $toolsProvider.setObjectUsingSchema($c.schemas.entityObject, entityObject);
    }

    /**
     * @name setProviderApiConfig
     * @memberof source.api.$apiProvider
     *
     * @description
     * Provider public function to setting API configuration object (_apiGeneralConfig).
     *
     * @param {Object} apiConfigObject
     * @returns {Object}
     */
    function setProviderApiConfig(apiConfigObject) {
      return _setApiConfig(apiConfigObject);
    }

    /**
     * @name getProviderApiConfig
     * @memberof source.api.$apiProvider
     *
     * @description
     * Provider public function to get API configuration object (_apiGeneralConfig).
     *
     * @returns {Object}
     */
    function getProviderApiConfig() {
      return _apiGeneralConfig;
    }

    /**
     * @name createProviderEntityObject
     * @memberof source.api.$apiProvider
     *
     * @description
     * Provider public method that returns an API Entity Object.
     *
     * @param {Object} entityObject
     * @returns {Object}
     */
    function createProviderEntityObject(entityObject) {
      return _createEntityObject(entityObject);
    }

    /**
     * @namespace $api
     * @memberof source.api.$apiProvider
     *
     * @requires $q
     * @requires $tools
     * @requires $alert
     * @requires apiModel
     *
     * @description
     * Factory statement for API calls.
     */
    function $get($q, $tools, $alert, apiModel) {
      var $ = apiModel.$;
      var $c = apiModel.get();
      var _connectionObject = $tools.setObjectUsingSchema($c.schemas.connectionObject, {
        source: $.API_SERVER,
        access: $.AUTHENTICATED,
        mode: $.QUERY,
        checkSuperAdmin: true
      });

      return {
        /* Global Constants */
        $: $,
        /* API tools */
        setApiConfig: setApiConfig,
        getApiConfig: getApiConfig,
        createEntityObject: createEntityObject,
        /* GET actions */
        getEntity: getEntity,
        getLocalEntity: getLocalEntity,
        /* POST actions */
        auth: auth,
        postEntity: postEntity,
        /* PUT actions */
        update: update
      };

      /**
       * @name _assembleQueryHeaders
       * @memberof source.api.$apiProvider.$api
       *
       * @description
       * Mount the request headers.
       *
       * @param {Object} defaultHeaders
       * @param {Object} sentHeaders
       * @param {Boolean} access
       * @returns {Object}
       * @private
       */
      function _assembleQueryHeaders(defaultHeaders, sentHeaders, access) {
        var output = defaultHeaders;
        if (_apiGeneralConfig.apiToken && (access === $.AUTHENTICATED)) {
          output = angular.extend({}, output, { 'Authorization': _apiGeneralConfig.apiToken });
        }
        if (_apiGeneralConfig.apiLanguage) {
          output = angular.extend({}, output, { 'Accept-Language': _apiGeneralConfig.apiLanguage });
        }
        return (sentHeaders) ? angular.extend({}, output, sentHeaders) : output ;
      }

      /**
       * @name _assembleQueryParams
       * @memberof source.api.$apiProvider.$api
       *
       * @description
       * Mount the request parameters.
       *
       * @param {Object} defaultParams
       * @param {Object} sentParams
       * @returns {Object}
       * @private
       */
      function _assembleQueryParams(defaultParams, sentParams) {
        var output = defaultParams;
        return (sentParams) ? angular.extend({}, output, sentParams) : output ;
      }

      /**
       * @name _connectionInit
       * @memberof source.api.$apiProvider.$api
       *
       * @description
       * Initializes the set of variables needed to make an API call.
       *
       * @param {Object} cO
       * @returns {Object} --> Request Object
       * @private
       */
      function _connectionInit(cO) {
        var request = $c.service[cO.mode];
        if (request[cO.source]) {
          var defaults = request[cO.source].defaults;
          var headers = _assembleQueryHeaders(defaults.defaultHeaders, cO.entityObject.headers, cO.access);
          var params = _assembleQueryParams(defaults.defaultParams, cO.entityObject.params);
          var connectionObject = angular.copy(cO);
          if (cO.checkSuperAdmin && _apiGeneralConfig.isSuperAdmin) {
            connectionObject.entityObject.entityName = 'priv/' + connectionObject.entityObject.entityName;
          }
          return {
            request: request,
            source: request[cO.source],
            entity: connectionObject.entityObject,
            headers: headers,
            params: params,
            json: _apiGeneralConfig.localJson,
            baseUrl: _apiGeneralConfig.apiBaseUrl
          };
        } else {
          throw new Error('API call ' + cO.mode + ' not allowed in ' + cO.source + ' mode.');
        }
      }

      /**
       * @name _processConnection
       * @memberof source.api.$apiProvider.$api
       *
       * @description
       * Process API call.
       *
       * @param {Object} cO
       * @param {Function} callback
       * @param {Function} callbackError
       * @returns {Promise}
       * @private
       */
      function _processConnection(cO, callback, callbackError) {
        if (typeof cO.entityObject === 'object') {
          var boot = _connectionInit(cO);
          var process = boot.request.process(boot);
          var deferred = $q.defer();
          var promise = {};
          process.then(function(success) {
            promise = (success.plain) ? success.plain() : success ;
            if (success._cursor) {
              promise._cursor = success._cursor;
            }
            deferred.resolve(promise);
            if (typeof callback === 'function') {
              callback(promise);
            }
          }, function(reject) {
            if (reject.hasOwnProperty('error')) {
              promise.error = (reject.error && reject.error.plain) ? reject.error.plain() : reject.error ;
            }
            if (reject.hasOwnProperty('data')) {
              promise.data = (reject.data && reject.data.plain) ? reject.data.plain() : reject.data ;
            }
            if (reject.hasOwnProperty('errorAlert')) {
              $alert.error(reject.errorAlert);
            }
            deferred.reject(promise);
            if (typeof callbackError === 'function') {
              callbackError(promise);
            }
          });
          return deferred.promise;
        } else {
          throw new Error('The entityObject ' + cO.entityObject + ' can only be object type.');
        }
      }

      /**
       * @name setApiConfig
       * @memberof source.api.$apiProvider.$api
       *
       * @description
       * Factory public function to setting API configuration object (_apiGeneralConfig).
       *
       * @param {Object} apiConfigObject
       * @returns {Object}
       */
      function setApiConfig(apiConfigObject) {
        return _setApiConfig(apiConfigObject);
      }

      /**
       * @name getApiConfig
       * @memberof source.api.$apiProvider.$api
       *
       * @description
       * Factory public function to get API configuration object (_apiGeneralConfig).
       *
       * @returns {Object}
       */
      function getApiConfig() {
        return _apiGeneralConfig;
      }

      /**
       * @name createEntityObject
       * @memberof source.api.$apiProvider.$api
       *
       * @description
       * Returns an API Entity Object.
       *
       * @param {Object} entityObject
       * @returns {Object}
       */
      function createEntityObject(entityObject) {
        return _createEntityObject(entityObject);
      }

      /**
       * @name getEntity
       * @memberof source.api.$apiProvider.$api
       *
       * @description
       * Makes a GET request to API.
       *
       * @param {Object} entityObject
       * @param {Function} callback
       * @param {Function} callbackError
       * @returns {Promise}
       */
      function getEntity(entityObject, callback, callbackError) {
        var connectionObject = $tools.setObjectUsingSchema($c.schemas.connectionObject, {
          entityObject: entityObject
        }, _connectionObject);
        return _processConnection(connectionObject, callback, callbackError);
      }

      /**
       * @name getLocalEntity
       * @memberof source.api.$apiProvider.$api
       *
       * @description
       * Makes a GET request to local JSON directory.
       *
       * @param {Object} entityObject
       * @param {Function} callback
       * @param {Function} callbackError
       * @returns {Promise}
       */
      function getLocalEntity(entityObject, callback, callbackError) {
        var connectionObject = $tools.setObjectUsingSchema($c.schemas.connectionObject, {
          source: $.API_LOCAL,
          access: $.PUBLIC,
          entityObject: entityObject,
          checkSuperAdmin: false
        }, _connectionObject);
        return _processConnection(connectionObject, callback, callbackError);
      }

      /**
       * @name auth
       * @memberof source.api.$apiProvider.$api
       *
       * @description
       * Makes a POST request with public access. This special call is done for login form.
       *
       * @param {Object} entityObject
       * @param {Function} callback
       * @param {Function} callbackError
       * @returns {Promise}
       */
      function auth(entityObject, callback, callbackError) {
        var connectionObject = $tools.setObjectUsingSchema($c.schemas.connectionObject, {
          access: $.PUBLIC,
          mode: $.NEW,
          entityObject: entityObject,
          checkSuperAdmin: false
        }, _connectionObject);
        return _processConnection(connectionObject, callback, callbackError);
      }

      /**
       * @name postEntity
       * @memberof source.api.$apiProvider.$api
       *
       * @description
       * Makes a POST request to API.
       *
       * @param {Object} entityObject
       * @param {Function} callback
       * @param {Function} callbackError
       * @returns {Promise}
       */
      function postEntity(entityObject, callback, callbackError) {
        var connectionObject = $tools.setObjectUsingSchema($c.schemas.connectionObject, {
          mode: $.NEW,
          entityObject: entityObject
        }, _connectionObject);
        return _processConnection(connectionObject, callback, callbackError);
      }

      /**
       * @name update
       * @memberof .api.$apiProvider.$api
       *
       * @description
       * Makes a PUT request to API.
       *
       * @param {Object} entityObject
       * @param {Function} callback
       * @param {Function} callbackError
       * @returns {Promise}
       */
      function update(entityObject, callback, callbackError) {
        var connectionObject = $tools.setObjectUsingSchema($c.schemas.connectionObject, {
          mode: $.UPDATE,
          entityObject: entityObject
        }, _connectionObject);
        return _processConnection(connectionObject, callback, callbackError);
      }
    }
  }
})();
