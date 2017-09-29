(function() {
  'use strict';

  angular
    /**
     * @namespace source
     *
     * @description
     * Definition of main module "Core".
     */
    .module('afs.core', [
      /* External Modules */
      'ngAnimate',
      'ngSanitize',
      'chart.js',
      /* Source Core Modules */
      'source._shared',
      'source.api',
      'source.literals',
      'source.router',
      'source.toast',
      'source.translate'
    ]);
})();

(function() {
  'use strict';
})();

(function() {
  'use strict';

  angular
    /**
     * @namespace api
     * @memberof source
     *
     * @description
     * Definition of module "api" for API calling services.
     */
    .module('source.api', [
      /* External Modules */
      'restangular'
    ]);
})();

(function() {
  'use strict';

  angular
    /**
     * @namespace router
     * @memberof source
     *
     * @description
     * Definition of module "router" for URL routing services.
     */
    .module('source.router', [
      /* External Modules */
      'ui.router'
    ]);
})();

(function() {
  'use strict';

  angular
  /**
   * @namespace literals
   * @memberof source
   *
   * @description
   * Module Literals definition.
   */
    .module('source.literals', []);
})();

(function() {
  'use strict';

  angular
    /**
     * @namespace toast
     * @memberof source
     *
     * @description
     * Definition of module "toast" for alert messages services.
     */
    .module('source.toast', [
      /* External Modules */
      'toastr'
    ]);
})();

(function() {
  'use strict';

  angular
    /**
     * @namespace translate
     * @memberof source
     *
     * @description
     * Definition of module "translate" for translation services.
     */
    .module('source.translate', []);
})();

(function() {
  'use strict';

  angular
    /**
     * @namespace _shared
     * @memberof source
     *
     * @description
     * Definition of module "_shared" for common minor services.
     */
    .module('source._shared', []);
})();

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

(function() {
  'use strict';

  angular
    .module('source.toast')
    /**
     * @namespace toastConfig
     * @memberof source.toast
     *
     * @requires 'toastrConfig'
     *
     * @description
     * Config statement for alert module.
     */
    .config(toastConfig);

  toastConfig.$inject = ['toastrConfig'];

  function toastConfig(toastrConfig) {
    angular.extend(toastrConfig, {
      allowHtml: true,
      autoDismiss: false,
      containerId: 'toast-container',
      maxOpened: 0,
      extendedTimeOut: 3600,
      newestOnTop: true,
      positionClass: 'toast-bottom-full-width',
      preventDuplicates: false,
      preventOpenDuplicates: false,
      target: 'body'
    });
  }
})();

(function() {
  'use strict';

  angular
    .module('source.api')
    /**
     * @namespace apiModelProvider
     * @memberof source.api
     *
     * @requires $toolsProvider
     *
     * @description
     * Provider that gets constants for API services.
     */
    .provider('apiModel', apiModel);

  apiModel.$inject = ['$toolsProvider'];

  function apiModel($toolsProvider) {
    var _constants = {
      AUTHENTICATED: true,
      PUBLIC: false,

      API_SERVER: 'SERVER',
      API_LOCAL: 'LOCAL',

      QUERY: 'QUERY',
      NEW: 'NEW',
      UPDATE: 'UPDATE',
      DELETE: 'DELETE',
      ASSIGN: 'ASSIGN'
    };
    var $ = angular.extend({}, _constants, $toolsProvider.$);

    var _providerModel = {
      schemas: {
        /* API general configuration schema */
        apiGeneralConfig: {
          localJson: null,
          apiBaseUrl: null,
          apiToken: null,
          apiLanguage: null,
          isSuperAdmin: null
        },

        /* Connection object schema */
        connectionObject: {
          source: null,
          access: null,
          mode: null,
          entityObject: null,
          checkSuperAdmin: null
        },

        /* Entity object schema */
        entityObject: {
          entityName: null,
          entityId: null,
          verb: null,
          forceToOne: null,
          objectSent: null,
          headers: null,
          params: null
        },

        /* API promise schema */
        apiPromise: {
          _cursor: null,
          error: null
        },

        /* Partial request param object schema */
        paramObject: {
          queryFilter: [],
          order: [],
          top: 30,
          skip: 30,
          lastPage: 0
        },
        /* BPM request param object schema */
        bpmParamObject: {
          bpmFilter: null
        },
        /* API param object Schema */
        apiParams: {
          $filter: null,
          $orderby: null,
          $top: null,
          $skip: null
        }
      }
    };

    return {
      $: $,
      get: getProvider,
      $get: ['Restangular', $get]
    };

    /**
     * @name _getModelSource
     * @memberof source.api.apiModelProvider
     *
     * @description
     * Returns API model depending on the applicant: Provider or Service.
     *
     * @param {Boolean} source
     * @param {Object} [serviceObject = null]
     * @returns {Object}
     * @private
     */
    function _getModelSource(source, serviceObject) {
      serviceObject = serviceObject || null;
      return (source === $.PROVIDER) ? _providerModel : angular.extend({}, _providerModel, serviceObject) ;
    }

    /**
     * @name getProvider
     * @memberof source.api.apiModelProvider
     *
     * @description
     * Returns API model for Provider.
     *
     * @returns {Object}
     */
    function getProvider() {
      return _getModelSource($.PROVIDER);
    }

    /**
     * @namespace apiModel
     * @memberof source.api.apiModelProvider
     *
     * @requires Restangular
     *
     * @description
     * Factory that gets constants for API services.
     */
    function $get(Restangular) {
      var _defaults = {
        defaultHeaders: {
          'Content-Type': 'application/json'
        },
        defaultParams: {}
      };

      var _serviceModel = {
        service: {
          QUERY: {
            SERVER: {
              defaults: {
                defaultHeaders: _defaults.defaultHeaders,
                defaultParams: _defaults.defaultParams
              },
              /**
               * @name QUERY.SERVER.subProcess
               * @memberof source.api.apiModelProvider
               *
               * @description
               * It makes a "GET" Api call through Restangular. If the requestObject provided has an entity that have
               * an entityId, it will make a call to retrieve that concrete entity. Otherwise, it will make a call
               * to retrieve all existing entities.
               *
               * @param {Object} requestObject
               * @returns {Promise}
               */
              subProcess: function(requestObject) {
                var e = requestObject.entity;
                var hasId = e.hasOwnProperty('entityId');
                var hasVerb = e.hasOwnProperty('verb');
                var forceToOne = (e.hasOwnProperty('forceToOne')) ? e.forceToOne : false ;
                var requestUrlArray = null;
                var subProcess = Restangular.all(e.entityName).getList;
                if (hasId && hasVerb) {
                  requestUrlArray = [requestObject.baseUrl, e.entityName, e.entityId, e.verb];
                  subProcess = Restangular.oneUrl(e.entityName, requestUrlArray.join('/')).get;
                } else if (hasVerb) {
                  requestUrlArray = [requestObject.baseUrl, e.entityName, e.verb];
                  subProcess = Restangular.oneUrl(e.entityName, requestUrlArray.join('/')).get;
                } else if (hasId) {
                  subProcess = Restangular.one(e.entityName, e.entityId).get;
                } else if (forceToOne) {
                  requestUrlArray = [requestObject.baseUrl, e.entityName];
                  subProcess = Restangular.oneUrl(e.entityName, requestUrlArray.join('/')).get;
                }
                return subProcess(requestObject.params, requestObject.headers);
              }
            },
            LOCAL: {
              defaults: {
                defaultHeaders: _defaults.defaultHeaders,
                defaultParams: _defaults.defaultParams
              },
              /**
               * @name QUERY.LOCAL.subProcess
               * @memberof source.api.apiModelProvider
               *
               * @description
               * It makes a local "GET" API call through Restangular.
               *
               * @param {Object} requestObject
               * @returns {Promise}
               */
              subProcess: function(requestObject) {
                var e = requestObject.entity;
                var eUrl = requestObject.json + '/' + e.entityName + '.json';
                var forceToOne = (e.hasOwnProperty('forceToOne')) ? e.forceToOne : false ;
                var subProcess = (forceToOne) ?
                  Restangular.oneUrl(e.entityName, eUrl).get : Restangular.allUrl(e.entityName, eUrl).getList ;
                return subProcess(requestObject.params, requestObject.headers);
              }
            },
            /**
             * @name QUERY.process
             * @memberof source.api.apiModelProvider
             *
             * @description
             * It makes "GET" API call through Restangular.
             *
             * @param {Object} requestObject
             * @returns {Promise}
             */
            process: function(requestObject) {
              return requestObject.source.subProcess(requestObject);
            }
          },
          NEW: {
            SERVER: {
              defaults: {
                defaultHeaders: _defaults.defaultHeaders,
                defaultParams: _defaults.defaultParams
              }
            },
            /**
             * @name NEW.process
             * @memberof source.api.apiModelProvider
             *
             * @description
             * It makes "POST" API call through Restangular.
             *
             * @param {Object} requestObject
             * @returns {Promise}
             */
            process: function(requestObject) {
              var e = requestObject.entity;
              return Restangular.all(e.entityName).post(e.objectSent, requestObject.params, requestObject.headers);
            }
          },
          UPDATE: {
            SERVER: {
              defaults: {
                defaultHeaders: _defaults.defaultHeaders,
                defaultParams: _defaults.defaultParams
              }
            },
            /**
             * @name UPDATE.process
             * @memberof source.api.apiModelProvider
             *
             * @description
             * It makes "PUT" API call through Restangular.
             *
             * @param {Object} rO --> Request Object
             * @returns {Promise}
             */
            process: function(rO) {
              var e = rO.entity;
              return Restangular.one(e.entityName, e.entityId).customPUT(e.objectSent, '', rO.params, rO.headers);
            }
          },
          DELETE: {
            SERVER: {
              defaults: {
                defaultHeaders: _defaults.defaultHeaders,
                defaultParams: _defaults.defaultParams
              }
            }
          },
          ASSIGN: {
            SERVER: {
              defaults: {
                defaultHeaders: _defaults.defaultHeaders,
                defaultParams: _defaults.defaultParams
              }
            }
          }
        }
      };

      return {
        $: $,
        get: getFactory
      };

      /**
       * @name getFactory
       * @memberof source.api.apiModelProvider.apiModel
       *
       * @description
       * Returns API model for Factory service.
       *
       * @returns {Object}
       */
      function getFactory() {
        return _getModelSource($.SERVICE, _serviceModel);
      }
    }
  }
})();

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
            promise.error = (reject.error.plain) ? reject.error.plain() : reject.error ;
            if (reject.errorAlert) {
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

(function() {
  'use strict';

  /**
   * @type Object
   * @property {String} documentName
   */

  angular
    .module('source.literals')
    /**
     * @namespace $literalsProvider
     * @memberof source.literals
     *
     * @requires globalConstantsProvider
     *
     * @description
     * Provider statement to manage literal variables for application.
     */
    .provider('$literals', $literals);

  $literals.$inject = ['globalConstantsProvider'];

  function $literals(globalConstantsProvider) {
    var $ = globalConstantsProvider.get();
    var _source = null;
    var _sourceTest = null;
    var _literals = null;

    return {
      /* Global Constants */
      $: $,
      /* Provider LITERALS tools */
      setSource: setProviderSource,
      setSourceTest: setProviderSourceTest,
      /* API Factory */
      $get: ['$q', '$api', $get]
    };

    /**
     * @name _setSource
     * @memberof source.literals.$literalsProvider
     *
     * @description
     * Private method to set JSON source files containing the application literals.
     *
     * @param {String|Array} source
     * @returns [Array]
     * @private
     */
    function _setSource(source) {
      if (typeof source === 'string' || Array.isArray(source)) {
        _source = (typeof source === 'string') ? [source] : source ;
      } else {
        throw new TypeError('Wrong type argument: Literals source must be string or array of strings.');
      }
      return _source;
    }

    /**
     * LOOK!!!!
     * @param source
     * @return {*}
     * @private
     */
    function _setSourceTest(source) {
      var _isStringSource = (typeof source === 'string');
      if (_isStringSource || angular.isObject(source)) {
        _sourceTest = (_isStringSource) ? [source] : source ;
      } else {
        throw new TypeError('Wrong type argument: Literals source must be string or array of strings.');
      }
      return _sourceTest;
    }

    /**
     * @name setProviderSource
     * @memberof source.literals.$literalsProvider
     *
     * @description
     * Provider public function to set JSON source files containing the application literals.
     *
     * @param {String|Array} source
     * @returns {Array}
     */
    function setProviderSource(source) {
      return _setSource(source);
    }

    /**
     * LOOK!!!!
     * @param source
     * @return {*}
     */
    function setProviderSourceTest(source) {
      return _setSourceTest(source);
    }

    /**
     * @namespace $literals
     * @memberof source.literals.$literalsProvider
     *
     * @requires $api
     *
     * @description
     * Factory statement to manage literal variables for application.
     */
    function $get($q, $api) {
      return {
        $: $,
        get: getLiterals
      };

      /**
       * LOOK!!!!
       * @return {{}}
       * @private
       */
      // function _getLiteralsPromisesTest() {
      //   var _isArraySource = (angular.isArray(_sourceTest));
      //   var _literalPromises = (_isArraySource) ? [] : {} ;
      //   angular.forEach(_sourceTest, function(itemDir, keyDir) {
      //     if (_isArraySource) {
      //       var entityObject = $api.createEntityObject({
      //         entityName: itemDir,
      //         forceToOne: true
      //       });
      //       _literalPromises.push($api.getLocalEntity(entityObject));
      //     } else {
      //       _literalPromises[keyDir] = [];
      //       angular.forEach(itemDir, function(itemFile) {
      //         var entityObject = $api.createEntityObject({
      //           entityName: keyDir + '/' + itemFile,
      //           forceToOne: true
      //         });
      //         _literalPromises[keyDir].push($api.getLocalEntity(entityObject));
      //       });
      //     }
      //   });
      //   return _literalPromises;
      // }

      /**
       * @name _getLiteralsPromises
       * @memberof source.literals.$literalsProvider.$literals
       *
       * @description
       * Build an array with promises of all sources of literals that are defined in the application.
       *
       * @returns {Array}
       * @private
       */
      function _getLiteralsPromises() {
        var _literalPromises = [];
        angular.forEach(_source, function(item) {
          var entityObject = $api.createEntityObject({
            entityName: item,
            forceToOne: true
          });
          _literalPromises.push($api.getLocalEntity(entityObject));
        });
        return _literalPromises;
      }

      /**
       * @name _getLiterals
       * @memberof source.literals.$literalsProvider.$literals
       *
       * @description
       * Create a promise with all literals processed and merged into a single object.
       * Set literals object.
       *
       * @returns {Promise}
       * @private
       */
      function _getLiterals() {
        var _promisesToResolve = _getLiteralsPromises() ;
        var _itemObject = {};
        var _defer = $q.defer();
        _literals = {};
        $q.all(_promisesToResolve).then(function(response) {
          angular.forEach(response, function(item) {
            if (item.hasOwnProperty('documentName')) {
              _itemObject[item.documentName] = item;
            } else {
              _itemObject = item;
            }
            _literals = angular.extend({}, _literals, _itemObject);
          });
          _defer.resolve(_literals);
        });
        return _defer.promise;
      }

      /**
       * @name getLiterals
       * @memberof source.literals.$literalsProvider.$literals
       *
       * @description
       * Returns literals object or its promise depending on whether the literals have been set.
       *
       * @param property
       * @returns {Object|Promise}
       */
      function getLiterals(property) {
        var _property = property || null;
        var output = null;
        if (_literals && _property) {
          if (_literals.hasOwnProperty(property)) {
            output = _literals[property];
          } else {
            throw new ReferenceError('Trying to get literals property that does not exist: ("' + property + '")');
          }
        } else if (_literals) {
          output = _literals;
        } else {
          output = _getLiterals();
        }
        return output;
      }
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('source.toast')
    /**
     * @namespace toastModelProvider
     * @memberof source.toast
     *
     * @description
     * Provider that gets constants for toast services.
     */
    .provider('toastModel', toastModel);

  toastModel.$inject = ['$toolsProvider'];

  function toastModel($toolsProvider) {
    var _constants = {
      SUCCESS: 'SUCCESS',
      INFO: 'INFO',
      WARNING: 'WARNING',
      ERROR: 'ERROR'
    };
    var $ = angular.extend({}, _constants, $toolsProvider.$);

    return {
      $: $,
      $get: ['toastr', $get]
    };

    /**
     * @namespace toastModel
     * @memberof source.toast.toastModelProvider
     *
     * @requires toastr
     *
     * @description
     * Factory that gets constants for toast services.
     */
    function $get(toastr) {
      var _serviceModel = {
        SUCCESS: toastr.success,
        INFO: toastr.info,
        WARNING: toastr.warning,
        ERROR: toastr.error
      };

      return {
        $: $,
        get: getFactory
      };

      /**
       * @name getFactory
       * @memberof source.toast.toastModelProvider.toastModel
       *
       * @description
       * Returns API model for Factory service.
       *
       * @returns {Object}
       */
      function getFactory() {
        return _serviceModel;
      }
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('source.toast')
    /**
     * @namespace $alertProvider
     * @memberof source.toast
     *
     * @description
     * Provider custom statement to use toast alert's messages.
     */
    .provider('$alert', $alert);

  $alert.$inject = ['toastModelProvider'];

  function $alert(toastModelProvider) {
    var $ = toastModelProvider.$;
    var _toastOptions = {
      timeOut: 9999
    };

    return {
      $: $,
      setDuration: _setDuration,
      $get: ['toastModel', $get]
    };

    /**
     * @name _setDuration
     * @memberof source.toast.$alertProvider
     *
     * @description
     * Set duration of toast message for provider configuration.
     *
     * @param {Integer} time
     * @private
     */
    function _setDuration(time) {
      _toastOptions.timeOut = time;
    }

    /**
     * @name _launchToast
     * @memberof source.toast.$alertProvider
     *
     * @description
     * Launch angular-toaster alert message.
     *
     * @param {Object} toastFactoryModel
     * @param {String|Array} message
     * @param {String} type
     * @param {String|Undefined} title
     * @param {Integer|Undefined} duration
     * @private
     */
    function _launchToast(toastFactoryModel, message, type, title, duration) {
      if (title !== undefined && typeof title !== 'string' && !duration) {
        duration = title;
        title = undefined;
      }

      var toastOptions = (duration) ? angular.extend({}, _toastOptions, { timeOut: duration }) : _toastOptions ;
      message = (angular.isArray(message)) ? message.join('<br>') : message ;
      toastFactoryModel[type](message, title, toastOptions);
    }

    /**
     * @namespace $alert
     * @memberof source.toast.$alertProvider
     *
     * @requires toastr
     *
     * @description
     * Factory statement for toast alert's messages.
     */
    function $get(toastModel) {
      var toastFactoryModel = toastModel.get();

      return {
        $: $,
        success: success,
        info: info,
        warning: warning,
        error: error
      };

      /**
       * @name success
       * @memberof source.toast.$alertProvider.$alert
       *
       * @description
       * Displays success toast message.
       *
       * @param {String} message
       * @param {String} title
       * @param {Integer|Undefined} duration
       */
      function success(message, title, duration) {
        _launchToast(toastFactoryModel, message, $.SUCCESS, title, duration);
      }

      /**
       * @name info
       * @memberof source.toast.$alertProvider.$alert
       *
       * @description
       * Displays info toast message.
       *
       * @param {String} message
       * @param {String} title
       * @param {Integer|Undefined} duration
       */
      function info(message, title, duration) {
        _launchToast(toastFactoryModel, message, $.INFO, title, duration);
      }

      /**
       * @name warning
       * @memberof source.toast.$alertProvider.$alert
       *
       * @description
       * Displays warning toast message.
       *
       * @param {String} message
       * @param {String} title
       * @param {Integer|Undefined} duration
       */
      function warning(message, title, duration) {
        _launchToast(toastFactoryModel, message, $.WARNING, title, duration);
      }

      /**
       * @name error
       * @memberof source.toast.$alertProvider.$alert
       *
       * @description
       * Displays error toast message.
       *
       * @param {String} message
       * @param {String} title
       * @param {Integer|Undefined} duration
       */
      function error(message, title, duration) {
        _launchToast(toastFactoryModel, message, $.ERROR, title, duration);
      }
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('source.translate', [])
    /**
     * @namespace translate
     * @memberof source.translate
     *
     * @requires $translate
     *
     * @description
     * Filter for translating labels.
     */
    .filter('translate', translate);

  translate.$inject = ['$translate'];

  function translate($translate) {
    return function(input) {
      return $translate.getTranslations()[input] !== undefined ? $translate.getTranslations()[input] : input;
    };
  }
})();

(function() {
  'use strict';

  angular
    .module('source.translate')
    /**
     * @namespace $translateProvider
     * @memberof source.translate
     *
     * @requires $apiProvider
     *
     * @description
     * Provider definition for translation labels.
     */
    .provider('$translate', $translate);

  $translate.$inject = ['$apiProvider'];

  function $translate($apiProvider) {
    var _translateConfig = {
      apiTranslationSource: null,
      apiTranslationSections: null,
      localTranslationSource: null,
      localTranslationSections: null,
      preferredDefaultLanguage: null
    };

    return {
      setApiTranslationSource: setApiTranslationSource,
      setApiTranslationSections: setApiTranslationSections,
      setLocalTranslationSource: setLocalTranslationSource,
      setLocalTranslationSections: setLocalTranslationSections,
      setPreferredLanguage: setPreferredLanguage,
      $get: ['$api', 'availableLanguages', $get]
    };

    /**
     * @name _setTranslationConfigProperty
     * @memberof source.translate.$translateProvider
     *
     * @description
     * Set configurations for _translateConfig object.
     *
     * @param {String} configKey
     * @param {String|Object} value
     * @returns {Object}
     * @private
     */
    function _setTranslationConfigProperty(configKey, value) {
      value = (typeof value === 'string') ? $apiProvider.createEntityObject({ entityName: value }) : value ;
      if (value && typeof value === 'object') {
        _translateConfig[configKey] = value;
        return _translateConfig;
      } else {
        throw new Error('Lost parameter or type parameter wrong');
      }
    }

    /**
     * @name setApiTranslationSource
     * @memberof source.translate.$translateProvider
     *
     * @description
     * Set entity name for calling API to return translation labels.
     *
     * @param {String} entityName
     * @returns {Object}
     */
    function setApiTranslationSource(entityName) {
      return _setTranslationConfigProperty('apiTranslationSource', entityName);
    }

    /**
     * @name setApiTranslationSections
     * @memberof source.translate.$translateProvider
     *
     * @description
     * Set sections from API response where will be found translations labels.
     *
     * @param {Object} sections
     * @returns {Object}
     */
    function setApiTranslationSections(sections) {
      return _setTranslationConfigProperty('apiTranslationSections', sections);
    }

    /**
     * @name setLocalTranslationSource
     * @memberof source.translate.$translateProvider
     *
     * @description
     * Set file name for local JSON file where we will be found translation labels.
     *
     * @param {String} jsonFileName
     * @returns {Object}
     */
    function setLocalTranslationSource(jsonFileName) {
      return _setTranslationConfigProperty('localTranslationSource', jsonFileName);
    }

    /**
     * @name setLocalTranslationSections
     * @memberof source.translate.$translateProvider
     *
     * @description
     * Set sections from local JSON file where will be found translations labels.
     *
     * @param {Object} sections
     * @returns {Object}
     */
    function setLocalTranslationSections(sections) {
      return _setTranslationConfigProperty('localTranslationSections', sections);
    }

    /**
     * @name setPreferredLanguage
     * @memberof source.translate.$translateProvider
     *
     * @description
     * Set chosen language for application, defined by a locale code.
     *
     * @param {String} preferredLocale --> Locale code
     * @returns {Object}
     */
    function setPreferredLanguage(preferredLocale) {
      _translateConfig.preferredDefaultLanguage = preferredLocale;
      return _translateConfig;
    }

    /**
     * @namespace $translate
     * @memberof source.translate.$translateProvider
     *
     * @requires $api
     * @requires availableLanguages
     *
     * @description
     * Factory definition for translation labels.
     */
    function $get($api, availableLanguages) {
      var _translations = {};
      var _appLanguage = null;

      var $apiConstants = $api.$;

      return {
        initTranslationModule: initTranslationModule,
        getTranslations: getTranslations,
        getActualLanguage: getActualLanguage,
        getAvailableLanguages: getAvailableLanguages
      };

      /**
       * @name _initTranslationModule
       * @memberof source.translate.$translateProvider.$translate
       *
       * @description
       * Search for translation labels in source given by "source" parameter.
       *
       * @param {String} source --> Can be LOCAL or SERVER
       * @returns {Promise|Null}
       * @private
       */
      function _initTranslationModule(source) {
        var config = {
          source: _translateConfig.apiTranslationSource,
          sections: _translateConfig.apiTranslationSections,
          process: $api.getEntity
        };
        if (source === $apiConstants.API_LOCAL) {
          config.source = _translateConfig.localTranslationSource;
          config.sections = _translateConfig.localTranslationSections;
          config.process = $api.getLocalEntity;
        }
        if (config.source) {
          return config.process(config.source, function(success) {
            var localTranslations = success.data;
            if (config.sections) {
              angular.forEach(config.sections, function(item) {
                if (localTranslations.hasOwnProperty(item) && typeof localTranslations[item] === 'object') {
                  _translations = angular.extend({}, _translations, localTranslations[item]);
                }
              });
            } else {
              _translations = angular.extend({}, _translations, localTranslations);
            }
          });
        }

        return null;
      }

      /**
       * @name initTranslationModule
       * @memberof source.translate.$translateProvider.$translate
       *
       * @description
       * Search for translation labels in both sources: LOCAL and SERVER.
       *
       * @returns {Array}
       */
      function initTranslationModule() {
        var translationsModules = [
          _initTranslationModule($apiConstants.API_LOCAL),
          _initTranslationModule($apiConstants.API_SERVER)
        ];
        var terms = {
          one: _translateConfig.preferredDefaultLanguage,
          two: typeof _translateConfig.preferredDefaultLanguage === 'string',
          three: availableLanguages.languages.hasOwnProperty(_translateConfig.preferredDefaultLanguage)
        };
        if (terms.one && terms.two && terms.three) {
          _appLanguage = availableLanguages.languages[_translateConfig.preferredDefaultLanguage];
        } else {
          _appLanguage = availableLanguages.default;
          throw new Error('Locale code not found. Setting "en" automatically. Please, revise config statement.');
        }

        return translationsModules;
      }

      /**
       * @name getTranslations
       * @memberof source.translate.$translateProvider.$translate
       *
       * @description
       * Catch general translation object: "_translations"
       *
       * @returns {Object}
       */
      function getTranslations() {
        return _translations;
      }

      /**
       * @name getActualLanguage
       * @memberof source.translate.$translateProvider.$translate
       *
       * @description
       * Catch actual defined language variable: "_appLanguage"
       *
       * @returns {Object}
       */
      function getActualLanguage() {
        return _appLanguage;
      }

      /**
       * @name getAvailableLanguages
       * @memberof source.translate.$translateProvider.$translate
       *
       * @description
       * Returns all application available languages, defined in "availableLanguages" service.
       *
       * @returns {Object}
       */
      function getAvailableLanguages() {
        return availableLanguages.languages;
      }
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('source.translate')
    /**
     * @namespace availableLanguages
     * @memberof source.translate
     *
     * @description
     * Service to setting all available languages into app. Languages are defined by its locale codes.
     */
    .service('availableLanguages', availableLanguages);

  function availableLanguages() {
    /* jshint validthis: true */
    this.languages = {
      en: {
        locale: 'en',
        name: 'English',
        sourceName: 'English'
      },
      es: {
        locale: 'es',
        name: 'Spanish',
        sourceName: 'Español'
      },
      fr: {
        locale: 'fr',
        name: 'French',
        sourceName: 'Français'
      },
      de: {
        locale: 'de',
        name: 'German',
        sourceName: 'Deutsch'
      },
      pt: {
        locale: 'pt',
        name: 'Portuguese',
        sourceName: 'Português'
      }
    };

    this.default = this.languages.en;
  }
})();

(function() {
  'use strict';

  angular
    .module('source._shared')
    /**
     * @namespace globalConstantsProvider
     * @memberof source._shared
     *
     * @description
     * Provider that gets the global constants of the application.
     */
    .provider('globalConstants', globalConstants);

  function globalConstants() {
    var _constants = {
      NO_OBJECT: {},

      FROM_CAMELCASE_TO_OTHER: true,
      FROM_OTHER_TO_CAMELCASE: false,

      MODE_KEY: true,
      MODE_VALUE: false,

      ENCODE: true,
      DECODE: false,

      TITLE: 1,
      SUBTITLE: 2,

      PROCESSES: 'processes',
      MODULES: 'modules',
      STATES: 'states',

      PROVIDER: true,
      SERVICE: false,

      MERGE: true,
      NO_MERGE: false,

      KEY: {
        ESCAPE: {
          NAME: 'Escape',
          CODE: 27
        },
        ENTER: {
          NAME: 'Enter',
          CODE: 13
        },
        ARROW_DOWN: {
          NAME: 'ArrowDown',
          CODE: 40
        },
        ARROW_UP: {
          NAME: 'ArrowUp',
          CODE: 38
        }
      }
    };

    return {
      get: getProvider,
      $get: [$get]
    };

    /**
     * @name getProvider
     * @memberof source._shared.globalConstantsProvider
     *
     * @description
     * Get constants object for provider.
     *
     * @returns {Object}
     */
    function getProvider() {
      return _constants;
    }

    /**
     * @namespace globalConstants
     * @memberof source._shared.globalConstantsProvider
     *
     * @description
     * Factory that provides the global constants of the application.
     */
    function $get() {
      return {
        get: getFactory
      };

      /**
       * @name getFactory
       * @memberof source._shared.globalConstantsProvider.globalConstants
       *
       * @description
       * Get constants object for factory.
       *
       * @returns {Object}
       */
      function getFactory() {
        return _constants;
      }
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('source._shared')
    /**
     * @namespace $toolsProvider
     * @memberof source._shared
     *
     * @description
     * Provider statement for several useful tools.
     */
    .provider('$tools', $tools);

  $tools.$inject = ['globalConstantsProvider'];

  function $tools(globalConstantsProvider) {
    var $ = globalConstantsProvider.get();

    return {
      /* Global constants */
      $: $,
      /* Object tools */
      setObjectUsingSchema: setObjectUsingSchemaProvider,
      $get: [$get]
    };

    /**
     * @name _convertString
     * @memberof source._shared.$toolsProvider
     *
     * @description
     * Function that encoding camelCase, or decoding camelCase, a given string.
     *
     * @param {String} string
     * @param {String} char
     * @param {Boolean} conversionType
     * @returns {String}
     * @private
     */
    function _convertString(string, char, conversionType) {
      if (string !== undefined && conversionType !== undefined) {
        var defaultChar = (char) ? char : '-' ;
        if (conversionType === $.FROM_CAMELCASE_TO_OTHER) {
          return string.replace(/([A-Z])/g, function($1) {
            return defaultChar + $1.toLowerCase();
          });
        } else {
          var output = string.split(defaultChar).map(function(item) {
            return item.charAt(0).toUpperCase() + item.slice(1);
          }).join('');
          return output.charAt(0).toLowerCase() + output.slice(1);
        }
      } else {
        throw new ReferenceError('Function parameters missing.');
      }
    }

    /**
     * @name _ucWords
     * @memberof source._shared.$toolsProvider
     *
     * @description
     * Returns given string with first letter in uppercase.
     *
     * @param {String} string
     * @returns {string}
     * @private
     */
    function _ucWords(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    /**
     * @name _getRandomString
     * @memberof source._shared.$toolsProvider
     *
     * @description
     * Returns random string with given number of chars.
     *
     * @param {Number} stringLength --> Number of chars for random string
     * @returns {string}
     * @private
     */
    function _getRandomString(stringLength) {
      var output = '';
      var possibilities = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      for (var i = 0; i < stringLength; i++) {
        output += possibilities.charAt(Math.floor(Math.random() * possibilities.length));
      }
      return output;
    }

    /**
     * @name _removeFromArray
     * @memberof source._shared.$toolsProvider
     *
     * @description
     * Removes an element from an array from a given value or from a given key. Returns given array without the
     * element we want to remove.
     *
     * @param {Array} arrayVar
     * @param {Number|String|Object} givenVar
     * @param {Boolean} mode
     * @returns {Array}
     * @private
     */
    function _removeFromArray(arrayVar, givenVar, mode) {
      var key = givenVar;
      if (mode === $.MODE_VALUE) {
        key = arrayVar.indexOf(givenVar);
      }
      if ((key) && (key > -1)) {
        arrayVar.splice(key, 1);
      }
      return arrayVar;
    }

    /**
     * @name _arrayMerge
     * @memberof source._shared.$toolsProvider
     *
     * @description
     * Merges two arrays avoiding duplicate items.
     *
     * @param {Array} array1
     * @param {Array} array2
     * @returns {Array}
     * @private
     */
    function _arrayMerge(array1, array2) {
      if (angular.isArray(array1) && angular.isArray(array2)) {
        return array2.reduce(function(array, key) {
          if (array.indexOf(key) < 0) {
            array.push(key);
          }
          return array;
        }, array1);
      } else {
        var error = 'The "_arrayMerge" method expects two array arguments and at least one of them is not array.';
        throw new TypeError(error);
      }
    }

    /**
     * @name _index
     * @memberof source._shared.$toolsProvider
     *
     * @description
     * Auxiliary function used for reduction in getValueFromDotedKey.
     *
     * @param {Object} object
     * @param {String} index
     * @returns {*}
     * @private
     */
    function _index(object, index) {
      return object[index];
    }

    /**
     * @name _getValueFromDotedKey
     * @memberof source._shared.$toolsProvider
     *
     * @description
     * Allows dot notation traversing (Example: object["a.b.c"] in object["a"]["b"]["c"]).
     * Returns undefined value instead of exception if no key in object.
     *
     * @param {Object} object
     * @param {String} dotedKey
     * @returns {*|Undefined}
     * @private
     */
    function _getValueFromDotedKey(object, dotedKey) {
      if (object[dotedKey] !== undefined) {
        return object[dotedKey];
      }
      try {
        return dotedKey.split('.').reduce(_index, object);
      } catch (e) {
        if (e instanceof TypeError) {
          return undefined;
        } else {
          throw e;
        }
      }
    }

    /**
     * @name _parseObjectValues
     * @memberof source._shared.$toolsProvider
     *
     * @description
     * Parses keysObject to assign correct values from collection valuesObject.
     *
     * @param {Object} keysObject
     * @param {Object} valuesObject
     * @returns {Object}
     */
    function _parseObjectValues(keysObject, valuesObject) {
      var output = {};
      if (typeof keysObject === 'object') {
        output = angular.copy(keysObject);
        for (var index in keysObject) {
          if (keysObject.hasOwnProperty(index) && valuesObject.hasOwnProperty(keysObject[index])) {
            output[index] = valuesObject[keysObject[index]];
          }
        }
      }
      return output;
    }

    /**
     * @name _setObjectUsingSchema
     * @memberof source._shared.$toolsProvider
     *
     * @description
     * Returns an object with values given in "objectSettings" following the pattern given by "objectSchema".
     * Throws an exception error if "objectSettings" does not fit "objectSchema".
     * Settings Object will be merged depending on variable "mergeOption".
     *
     * @param {Object} objectSchema
     * @param {Object} objectSettings
     * @param {Boolean|Object} mergeOption --> If Boolean: true to merge with schema, false no merge with schema.
     *                                     --> If Object, merge with given object.
     * @returns {Object}
     * @private
     */
    function _setObjectUsingSchema(objectSchema, objectSettings, mergeOption) {
      var output = {};
      angular.forEach(objectSettings, function(item, key) {
        if (objectSchema.hasOwnProperty(key)) {
          output[key] = item;
        } else {
          throw new Error('Trying to set an unknown property ("' + key + '") in target object.');
        }
      });
      if (mergeOption) {
        var mergeCondition = (typeof mergeOption === 'object');
        return (mergeCondition) ? angular.extend({}, mergeOption, output) : angular.extend({}, objectSchema, output) ;
      } else {
        return output;
      }
    }

    /**
     * @name setObjectUsingSchemaProvider
     * @memberof source._shared.$toolsProvider
     *
     * @description
     * Returns an object with values given in "objectSettings" following the pattern given by "objectSchema".
     * Settings Object will be merged depending on optional variable "mergeOption".
     * Provider function.
     *
     * @param {Object} objectSchema
     * @param {Object} objectSettings
     * @param {Boolean|Object} [mergeOption = false] --> If Boolean: true to merge schema, false no merge with schema.
     *                                               --> If Object, merge with given object.
     * @returns {Object}
     */
    function setObjectUsingSchemaProvider(objectSchema, objectSettings, mergeOption) {
      mergeOption = mergeOption || $.NO_MERGE;
      return _setObjectUsingSchema(objectSchema, objectSettings, mergeOption);
    }

    /**
     * @namespace $tools
     * @memberof source._shared.$toolsProvider
     *
     * @description
     * Factory statement for several useful tools.
     */
    function $get() {
      return {
        /* Global Constants */
        $: $,
        /* String tools */
        camelCaseTo: camelCaseTo,
        toCamelCase: toCamelCase,
        ucWords: ucWords,
        getRandomString: getRandomString,
        /* Array tools */
        removeArrayItem: removeArrayItem,
        removeArrayKey: removeArrayKey,
        arrayMerge: arrayMerge,
        /* Object tools */
        getValueFromDotedKey: getValueFromDotedKey,
        parseObjectValues: parseObjectValues,
        setObjectUsingSchema: setObjectUsingSchema
      };

      /**
       * @name camelCaseTo
       * @memberof source._shared.$toolsProvider.$tools
       *
       * @description
       * Returns a string decoded from camelCase to a char separator way.
       *
       * @param {String} string
       * @param {String} char
       * @returns {String}
       */
      function camelCaseTo(string, char) {
        return _convertString(string, char, $.FROM_CAMELCASE_TO_OTHER);
      }

      /**
       * @name toCamelCase
       * @memberof source._shared.$toolsProvider.$tools
       *
       * @description
       * Returns a string encoded in camelCase way from any string with char separator.
       *
       * @param {String} string
       * @param {String} char
       * @returns {String}
       */
      function toCamelCase(string, char) {
        return _convertString(string, char, $.FROM_OTHER_TO_CAMELCASE);
      }

      /**
       * @name ucWords
       * @memberof source._shared.$toolsProvider.$tools
       *
       * @description
       * Public factory method for using _ucWords. Returns given string with first letter in uppercase.
       *
       * @param {String} string
       * @returns {string}
       */
      function ucWords(string) {
        return _ucWords(string);
      }

      /**
       * @name getRandomString
       * @memberof source._shared.$toolsProvider.$tools
       *
       * @description
       * Returns random string with given number of chars.
       *
       * @param {Number} stringLength --> Number of chars for random string
       * @returns {string}
       */
      function getRandomString(stringLength) {
        return _getRandomString(stringLength);
      }

      /**
       * @name removeArrayItem
       * @memberof source._shared.$toolsProvider.$tools
       *
       * @description
       * Removes a value given from an array. Returns modified array.
       *
       * @param {Array} arrayVar
       * @param {String|Object} item
       * @returns {Array}
       */
      function removeArrayItem(arrayVar, item) {
        return _removeFromArray(arrayVar, item, $.MODE_VALUE);
      }

      /**
       * @name removeArrayKey
       * @memberof source._shared.$toolsProvider.$tools
       *
       * @description
       * Removes a key given from an array. Returns modified array.
       *
       * @param {Array} arrayVar
       * @param {Number} key
       * @returns {Array}
       */
      function removeArrayKey(arrayVar, key) {
        return _removeFromArray(arrayVar, key, $.MODE_KEY);
      }

      /**
       * @name arrayMerge
       * @memberof source._shared.$toolsProvider.$tools
       *
       * @description
       * Public factory method for using _arrayMerge. Merges two arrays avoiding duplicate items.
       *
       * @param {Array} array1
       * @param {Array} array2
       * @returns {Array}
       */
      function arrayMerge(array1, array2) {
        return _arrayMerge(array1, array2);
      }

      /**
       * @name getValueFromDotedKey
       * @memberof source._shared.$toolsProvider.$tools
       *
       * @description
       * Allows dot notation traversing (Example: object["a.b.c"] in object["a"]["b"]["c"]).
       * Returns undefined value instead of exception if no key in object.
       *
       * @param {Object} object
       * @param {String} dotedKey
       * @returns {*|Undefined}
       */
      function getValueFromDotedKey(object, dotedKey) {
        return _getValueFromDotedKey(object, dotedKey);
      }

      /**
       * @name parseObjectValues
       * @memberof source._shared.$toolsProvider.$tools
       *
       * @description
       * Parses keysObject to assign correct values from collection valuesObject.
       *
       * @param {Object} keysObject
       * @param {Object} valuesObject
       * @returns {Object}
       */
      function parseObjectValues(keysObject, valuesObject) {
        return _parseObjectValues(keysObject, valuesObject);
      }

      /**
       * @name setObjectUsingSchema
       * @memberof source._shared.$toolsProvider.$tools
       *
       * @description
       * Returns an object with values given in "objectSettings" following the pattern given by "objectSchema".
       * Settings Object will be merged depending on optional variable "mergeOption".
       *
       * @param {Object} objectSchema
       * @param {Object} objectSettings
       * @param {Boolean|Object} [mergeOption = true] --> If Boolean: true to merge schema, false no merge with schema.
       *                                              --> If Object, merge with given object.
       * @returns {Object}
       */
      function setObjectUsingSchema(objectSchema, objectSettings, mergeOption) {
        mergeOption = mergeOption || $.NO_MERGE;
        return _setObjectUsingSchema(objectSchema, objectSettings, mergeOption);
      }
    }
  }
})();
