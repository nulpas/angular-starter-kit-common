(function() {
  'use strict';

  /**
   * @namespace localStorageServiceProvider
   * @memberof LocalStorageModule
   */

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
      'ngMaterial',
      'md.time.picker',
      'chart.js',
      'LocalStorageModule',
      'dndLists',
      /* Source Core Modules */
      'source._shared',
      'source.api',
      'source.date-time',
      'source.numbers',
      'source.router',
      'source.static',
      'source.strings',
      'source.toast',
      'source.translate',
      'source.view-logic'
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
     * @namespace date-time
     * @memberof source
     *
     * @description
     * Definition of module "date time" for several tools and filters about datetime data.
     */
    .module('source.date-time', []);
})();

(function() {
  'use strict';

  /**
   * //namespace $urlRouterProvider
   * @memberof ui.router
   *
   * @namespace $stateProvider
   * @memberof ui.router
   */

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
     * @namespace source.numbers
     * @memberof source
     *
     * @description
     * Definition of module "numbers" for several tools and filters about numbers and currency data.
     */
    .module('source.numbers', []);
})();

(function() {
  'use strict';

  angular
    /**
     * @namespace static
     * @memberof source
     *
     * @description
     * Module static definition for manage static data in application like literals or config variables.
     */
    .module('source.static', []);
})();

(function() {
  'use strict';

  angular
    /**
     * @namespace source.strings
     * @memberof source
     *
     * @description
     * Definition of module "strings" for several tools and filters tools.
     */
    .module('source.strings', []);
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
     * @namespace view-logic
     * @memberof source
     *
     * @description
     * Module View Logic definition: helper for application view presentations.
     */
    .module('source.view-logic', []);
})();

(function() {
  'use strict';

  /**
   * @namespace deviceDetector
   * @memberof ng.deviceDetector
   */

  angular
    /**
     * @namespace _shared
     * @memberof source
     *
     * @description
     * Definition of module "_shared" for common minor services.
     */
    .module('source._shared', [
      'ng.deviceDetector'
    ]);
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
      }
      return data;
    });
  }
})();

(function() {
  'use strict';

  angular
    .module('source.date-time')
    /**
     * @namespace dateTimeConfig
     * @memberof source.date-time
     *
     * @description
     * Config statement for datetime module.
     */
    .config(dateTimeConfig);

  dateTimeConfig.$inject = ['$mdDateLocaleProvider'];

  function dateTimeConfig($mdDateLocaleProvider) {
    moment.tz.setDefault(moment.tz.guess());

    $mdDateLocaleProvider.formatDate = function(date) {
      return (date) ? moment(date).format('DD/MM/YYYY') : '' ;
    };
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
          isSuperAdmin: null,
          errorDefinition: null
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

        /* Error definition schema */
        errorDefinition: {
          errorSchema: null,
          errorStatus: null,
          errorMessage: null,
          loginGoIf401: null
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
      $get: ['Restangular', '$tools', $get]
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
    function $get(Restangular, $tools) {
      var _defaults = {
        defaultHeaders: {
          'Content-Type': 'application/json;charset=UTF-8'
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
                var eUrl = requestObject.json + '/' + $tools.cleanApiUrlForLocalUse(e.entityName) + '.json';
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
            if (reject.hasOwnProperty('errorAlert') && reject.hasOwnProperty('error')) {
              $alert.error(reject.errorAlert);
              console.error(Error(reject.error));
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
    var $ = $api.$;
    Restangular.setBaseUrl(_apiConfiguration.apiBaseUrl);

    Restangular.setErrorInterceptor(function(rejection, deferred) {
      var _formatCondition = (rejection.hasOwnProperty('status') && rejection.hasOwnProperty('statusText'));
      if (angular.isObject(rejection) && _formatCondition && rejection.hasOwnProperty('data')) {
        var _errorSchema = _apiConfiguration.errorDefinition.errorSchema;
        var _receivedError = $tools.setObjectUsingSchema(_errorSchema, rejection.data, $.NO_MERGE, [$.NO_EXCEPTIONS]);
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

(function() {
  'use strict';

  angular
    .module('source.date-time')
    /**
     * @namespace onlyHour
     * @memberof source.date-time
     *
     * @description
     * Filter that shows hour in "0-24" format for a complete date given.
     */
    .filter('onlyHour', onlyHour)

    /**
     * @namespace untilNow
     * @memberof source.date-time
     *
     * @requires dateTimeModel
     *
     * @description
     * Filter that shows human string for elapsed time.
     */
    .filter('untilNow', untilNow)

    /**
     * @namespace dateReducedHour
     * @memberof source.date-time
     *
     * @description
     * Filter that shows hour in "0-24" format and date with string month but without year.
     */
    .filter('dateReducedHour', dateReducedHour)

    /**
     * @namespace dateMonthReduced
     * @memberof source.date-time
     *
     * @description
     * Filter that shows date with string abbreviated month.
     */
    .filter('dateMonthReduced', dateMonthReduced)

    /**
     * @namespace age
     * @memberof source.date-time
     *
     * @description
     * Filter that shows number of years between given date and current dateTime.
     */
    .filter('age', age)

    /**
     * @namespace completeDateHour
     * @memberof source.date-time
     *
     * @description
     * Filter that shows complete date and complete hour.
     */
    .filter('completeDateHour', completeDateHour)

    /**
     * @namespace onlyDate
     * @memberof source.date-time
     *
     * @description
     * Filter that shows only date without hour.
     */
    .filter('onlyDate', onlyDate);

  function onlyHour() {
    return _onlyHour;

    /**
     * @name _onlyHour
     * @memberof source.date-time.onlyHour
     *
     * @description
     * Private function for "onlyHour" filter.
     * Returns date formatted if variable "date" is a valid date or the same input data.
     *
     * @param {*} date
     * @returns {String|*}
     * @private
     */
    function _onlyHour(date) {
      return (Date.parse(date)) ? moment(date).format('HH:mm') : date ;
    }
  }

  untilNow.$inject = ['dateTimeModel'];

  function untilNow(dateTimeModel) {
    return _untilNow;

    /**
     * @name _untilNow
     * @memberof source.date-time.untilNow
     *
     * @description
     * Private function for "untilNow" filter.
     * Returns locale string expressing elapsed time if variable "date" is a valid date or the same input data.
     *
     * @param {*} date
     * @returns {String|*}
     * @private
     */
    function _untilNow(date) {
      return (Date.parse(date)) ? moment(date).calendar(null, dateTimeModel.momentCalendarFormat) : date ;
    }
  }

  function dateReducedHour() {
    return _dateReducedHour;

    /**
     * @name _dateReducedHour
     * @memberof source.date-time.dateReducedHour
     *
     * @description
     * Private function for "dateReducedHour" filter.
     * Returns date formatted if variable "date" is a valid date or the same input data.
     *
     * @param {*} date
     * @returns {String|*}
     * @private
     */
    function _dateReducedHour(date) {
      return (Date.parse(date)) ? moment(date).format('D MMMM - HH:mm') : date ;
    }
  }

  function dateMonthReduced() {
    return _dateMonthReduced;

    /**
     * @name _dateMonthReduced
     * @memberof source.date-time.dateMonthReduced
     *
     * @description
     * Private function for "dateMonthReduced" filter.
     * Returns date formatted if variable "date" is a valid date or the same input data.
     *
     * @param {*} date
     * @returns {String|*}
     * @private
     */
    function _dateMonthReduced(date) {
      return (Date.parse(date)) ? moment(date).format('D MMM YYYY') : date ;
    }
  }

  function age() {
    return _age;

    /**
     * @name _age
     * @memberof source.date-time.age
     *
     * @description
     * Private function for "age" filter.
     * Returns date formatted if variable "date" is a valid date or the same input data.
     *
     * @param {*} date
     * @returns {String|*}
     * @private
     */
    function _age(date) {
      return (Date.parse(date)) ? Math.abs(moment(date).diff(moment(), 'years')) : date ;
    }
  }

  function completeDateHour() {
    return _completeDateHour;

    /**
     * @name _completeDateHour
     * @memberof source.date-time.completeDateHour
     *
     * @description
     * Returns complete date with numbers and complete hour.
     *
     * @param {*} date
     * @returns {String|*}
     * @private
     */
    function _completeDateHour(date) {
      return (Date.parse(date)) ? moment(date).format('DD/MM/YYYY HH:mm:ss') : date ;
    }
  }

  function onlyDate() {
    return _onlyDate;

    /**
     * @name _onlyDate
     * @memberof source.date-time.onlyDate
     *
     * @description
     * Returns only date without hour.
     *
     * @param {*} date
     * @returns {String|*}
     * @private
     */
    function _onlyDate(date) {
      return (Date.parse(date)) ? moment(date).format('DD/MM/YYYY') : date ;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('source.date-time')
    /**
     * @namespace dateTimeModel
     * @memberof source.date-time
     *
     * @description
     * Service that defines constants for date time module.
     */
    .service('dateTimeModel', dateTimeModel);

  function dateTimeModel() {
    /* jshint validthis: true */
    /**
     * @name momentCalendarFormat
     * @memberof source.date-time.dateTimeModel
     *
     * @type {Object}
     * @property {String} sameDay
     * @property {String} nextDay
     * @property {String} nextWeek
     * @property {String} lastDay
     * @property {String} lastWeek
     * @property {String} sameElse
     */
    this.momentCalendarFormat = {
      sameDay: '[hoy]',
      nextDay: '[mañana]',
      nextWeek: '[próximo] dddd',
      lastDay: '[ayer]',
      lastWeek: 'dddd [pasado]',
      sameElse: 'DD/MM/YYYY'
    };
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

  angular
    .module('source.numbers')
    /**
     * @namespace $numbers
     * @memberof source.numbers
     *
     * @requires $tools
     * @requires numbersModel
     *
     * @description
     * Helper service to numbers module.
     */
    .factory('$numbers', $numbers);

  $numbers.$inject = ['$tools', 'numbersModel'];

  function $numbers($tools, numbersModel) {
    var $ = angular.extend({}, numbersModel.constants, $tools.$);

    return {
      $: $,
      setParams: _setParams
    };

    /**
     * @name _setParams
     * @memberof source.numbers.$numbers
     *
     * @description
     * Set the filter params to define several numeric filter configurations.
     *
     * @param {Object} filterParams
     * @param {String} [paramsMode]
     * @return {Object}
     * @private
     */
    function _setParams(filterParams, paramsMode) {
      filterParams = filterParams || {};
      paramsMode = paramsMode || $.NUMBER;
      var _output = {};
      if (numbersModel.schemas.hasOwnProperty(paramsMode)) {
        if (filterParams && angular.isObject(filterParams)) {
          var _params = $tools.setObjectUsingSchema(numbersModel.schemas[paramsMode], filterParams, {});
          angular.forEach(_params, function(value, property) {
            var _condition = (filterParams.hasOwnProperty(property) && value);
            _output[property] = (_condition) ? value : undefined ;
          });
          _output[$.SYMBOL] = (_output[$.SYMBOL]) ? ' ' + _output[$.SYMBOL] : undefined ;
          _output[$.COMPOUND] = (_output[$.COMPOUND]) ? _output[$.COMPOUND] : '' ;
        }
        return _output;
      } else {
        throw new ReferenceError('Unknown numeric params mode: ' + paramsMode);
      }
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('source.numbers')
    /**
     * @namespace money
     * @memberof source.numbers
     *
     * @requires $filter
     * @requires $numbers
     *
     * @description
     * Filter that shows numbers as currency format with currency symbol.
     */
    .filter('money', money)

    /**
     * @namespace numeric
     * @memberof source.numbers
     *
     * @requires $filter
     * @requires $tools
     *
     * @description
     * Filter that shows numbers as numeric format.
     */
    .filter('numeric', numeric);

  money.$inject = ['$filter', '$numbers'];

  function money($filter, $numbers) {
    return _money;

    /**
     * @name _money
     * @memberof source.numbers.money
     *
     * @description
     * Private function for "money" filter.
     * Returns data formatted if variable "data" is a valid number or returns the same input data.
     *
     * @param {*} data
     * @param {Object} [filterParams]
     * @returns {String|*}
     * @private
     */
    function _money(data, filterParams) {
      var _output = data;
      if (angular.isNumber(data)) {
        var _params = $numbers.setParams(filterParams, $numbers.$.CURRENCY);
        _output = $filter('currency')(data, _params[$numbers.$.SYMBOL], _params[$numbers.$.FRACTION]);
        _output += (_params[$numbers.$.COMPOUND]) ? ' ' + _params[$numbers.$.COMPOUND] : '' ;
      }
      return _output;
    }
  }

  numeric.$inject = ['$filter', '$numbers'];

  function numeric($filter, $numbers) {
    return _numeric;

    /**
     * @name _numeric
     * @memberof source.numbers.numeric
     *
     * @description
     * Private function for "numeric" filter.
     * Returns data formatted if variable "data" is a valid number or returns the same input data.
     *
     * @param {*} data
     * @param {Object} [filterParams]
     * @returns {String|*}
     * @private
     */
    function _numeric(data, filterParams) {
      var _output = data;
      if (angular.isNumber(data)) {
        var _params = $numbers.setParams(filterParams, $numbers.$.CURRENCY);
        _output = $filter('number')(data, _params[$numbers.$.FRACTION]);
        _output += (_params[$numbers.$.SYMBOL]) ? _params[$numbers.$.SYMBOL] : '' ;
        _output += (_params[$numbers.$.COMPOUND]) ? ' ' + _params[$numbers.$.COMPOUND] : '' ;
      }
      return _output;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('source.numbers')
    /**
     * @namespace numbersModel
     * @memberof source.numbers
     *
     * @description
     * Service that defines constants and schemas for numbers module.
     */
    .service('numbersModel', numbersModel);

  function numbersModel() {
    /* jshint validthis: true */
    /**
     * @name constants
     * @memberof source.numbers.numbersModel
     *
     * @type {Object}
     * @property {String} CURRENCY
     * @property {String} NUMBER
     * @property {String} SYMBOL
     * @property {String} FRACTION
     * @property {String} COMPOUND
     */
    this.constants = {
      CURRENCY: 'currency',
      NUMBER: 'number',

      SYMBOL: 'symbol',
      FRACTION: 'fractionSize',
      COMPOUND: 'compound'
    };

    /**
     * @name schemas
     * @memberof source.numbers.numbersModel
     *
     * @type {Object}
     * @property {Object} currency
     * @property {String} currency.symbol
     * @property {Number} currency.fractionSize
     * @property {Number|String} currency.compound
     * @property {Object} number
     * @property {String} number.symbol
     * @property {Number} number.fractionSize
     * @property {Number|String} number.compound
     */
    this.schemas = {
      currency: {
        symbol: null,
        fractionSize: null,
        compound: null
      },
      number: {
        symbol: null,
        fractionSize: null,
        compound: null
      }
    };
  }
})();

(function() {
  'use strict';

  /**
   * @type Object
   * @property {String} documentName
   * @property {String} documentType
   */

  angular
    .module('source.static')
    /**
     * @namespace $staticProvider
     * @memberof source.static
     *
     * @requires globalConstantsProvider
     *
     * @description
     * Provider statement to manage static variables for application.
     */
    .provider('$static', $static);

  $static.$inject = ['globalConstantsProvider'];

  function $static(globalConstantsProvider) {
    var $ = globalConstantsProvider.get();
    var _source = null;
    var _statics = null;

    return {
      /* Global Constants */
      $: $,
      /* Provider LITERALS tools */
      setSource: setProviderSource,
      /* API Factory */
      $get: ['$q', '$api', $get]
    };

    /**
     * @name _setSource
     * @memberof source.static.$staticProvider
     *
     * @description
     * Private method to set JSON source files containing the application static variables.
     *
     * @param {String|Array|Object} source
     * @returns {Array|Object}
     * @private
     */
    function _setSource(source) {
      var _isStringSource = (typeof source === 'string');
      if (_isStringSource || angular.isObject(source)) {
        _source = (_isStringSource) ? [source] : source ;
      } else {
        throw new TypeError('Wrong type argument: Static source must be string or array or object.');
      }
      return _source;
    }

    /**
     * @name setProviderSource
     * @memberof source.static.$staticProvider
     *
     * @description
     * Provider public function to set JSON source files containing the application static variables.
     *
     * @param {String|Array|Object} source
     * @returns {Array|Object}
     */
    function setProviderSource(source) {
      return _setSource(source);
    }

    /**
     * @namespace $static
     * @memberof source.static.$staticProvider
     *
     * @requires $q
     * @requires $api
     *
     * @description
     * Factory statement to manage static variables for application.
     */
    function $get($q, $api) {
      return {
        $: $,
        get: getStatics
      };

      /**
       * @name _getStaticPromises
       * @memberof source.static.$staticProvider.$static
       *
       * @description
       * Build an array with promises of all sources of static variables that are defined in the application.
       *
       * @returns {Array}
       * @private
       */
      function _getStaticPromises() {
        var _literalPromises = [];
        angular.forEach(_source, function(itemDir, keyDir) {
          if (angular.isArray(_source)) {
            var entityObject = $api.createEntityObject({
              entityName: itemDir,
              forceToOne: true
            });
            _literalPromises.push($api.getLocalEntity(entityObject));
          } else {
            angular.forEach(itemDir, function(itemFile) {
              var entityObject = $api.createEntityObject({
                entityName: keyDir + '/' + itemFile,
                forceToOne: true
              });
              _literalPromises.push($api.getLocalEntity(entityObject));
            });
          }
        });
        return _literalPromises;
      }

      /**
       * @name _getStatics
       * @memberof source.static.$staticProvider.$static
       *
       * @description
       * Create a promise with all statics processed and merged into a single object.
       * Set statics object.
       *
       * @returns {Promise}
       * @private
       */
      function _getStatics() {
        var _promisesToResolve = _getStaticPromises() ;
        var _itemObject = {};
        var _defer = $q.defer();
        _statics = {};
        $q.all(_promisesToResolve).then(function(success) {
          angular.forEach(success, function(item) {
            if (item.hasOwnProperty('documentName') && item.hasOwnProperty('documentType')) {
              if (!angular.isObject(_itemObject[item.documentName])) {
                _itemObject[item.documentName] = {};
              }
              _itemObject[item.documentName][item.documentType] = item;
            } else {
              var errorText = 'No required properties are found in static files';
              throw new TypeError(errorText + ': "documentName" or "documentType"');
            }
            _statics = angular.extend({}, _statics, _itemObject);
          });
          _defer.resolve(_statics);
        });
        return _defer.promise;
      }

      /**
       * @name getStatics
       * @memberof source.static.$staticProvider.$static
       *
       * @description
       * Returns literals object or its promise depending on whether the static variables have been set.
       *
       * @param {String} property
       * @returns {Object|Promise}
       */
      function getStatics(property) {
        var _property = property || null;
        var output = null;
        if (_statics && _property) {
          if (_statics.hasOwnProperty(property)) {
            output = _statics[property];
          } else {
            throw new ReferenceError('Trying to get statics property that does not exist: ("' + property + '")');
          }
        } else if (_statics) {
          output = _statics;
        } else {
          output = _getStatics();
        }
        return output;
      }
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('source.strings')
    /**
     * @namespace $strings
     * @memberof source.strings
     *
     * @requires $tools
     * @requires stringsModel
     *
     * @description
     * Helper service to strings module.
     */
    .factory('$strings', $strings);

  $strings.$inject = ['$tools', 'stringsModel'];

  function $strings($tools, stringsModel) {
    var $ = angular.extend({}, stringsModel.constants, $tools.$);

    return {
      $: $,
      setParams: _setParams
    };

    /**
     * @name _setParams
     * @memberof source.strings.$strings
     *
     * @description
     * Set the filter params to define several string filter configurations.
     *
     * @param {Object} filterParams
     * @param {String} [paramsMode]
     * @return {Object}
     * @private
     */
    function _setParams(filterParams, paramsMode) {
      filterParams = filterParams || {};
      paramsMode = paramsMode || $.TRUNCATE;
      var _output = {};
      if (stringsModel.schemas.hasOwnProperty(paramsMode)) {
        if (filterParams && angular.isObject(filterParams)) {
          var _params = $tools.setObjectUsingSchema(stringsModel.schemas[paramsMode], filterParams, {});
          angular.forEach(_params, function(value, property) {
            var _condition = (filterParams.hasOwnProperty(property) && value);
            _output[property] = (_condition) ? value : undefined ;
          });
        }
        return _output;
      } else {
        throw new ReferenceError('Unknown numeric params mode: ' + paramsMode);
      }
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('source.strings')
    /**
     * @namespace truncate
     * @memberof source.strings
     *
     * @requires $filter
     * @requires $numbers
     *
     * @description
     * Filter that truncates string in a given number of words.
     */
    .filter('truncate', truncate);

  truncate.$inject = ['$filter', '$strings'];

  function truncate($filter, $strings) {
    return _truncate;

    /**
     * @name _truncate
     * @memberof source.strings.truncate
     *
     * @description
     * Private function for "truncate" filter.
     * Returns data truncated if variable "data" is a valid string or returns the same input data.
     * TODO: Select string to separate words.
     * TODO: Select string to scape truncate string ('...').
     * TODO: Select truncate by words or by characters number.
     * TODO: Compare last char in last item with array of possibilities (['.', ',', ';', ':']).
     * TODO: Develop best errors control.
     *
     * @param {*} data
     * @param {Object} [filterParams]
     * @returns {String|*}
     * @private
     */
    function _truncate(data, filterParams) {
      var _output = data;
      if (typeof data === 'string') {
        var _params = $strings.setParams(filterParams, $strings.$.TRUNCATE);
        if (angular.isNumber(_params[$strings.$.WORDS])) {
          var _auxArray = data.split(' ');
          var _newArray = _auxArray.slice(0, _params[$strings.$.WORDS]);
          if (_auxArray.length > _newArray.length) {
            var _lastItem = _newArray.pop();
            var _lastChar = _lastItem.substr(-1);
            if (_lastChar === '.' || _lastChar === ',' || _lastChar === ';' || _lastChar === ':') {
              _lastItem = _lastItem.slice(0, (_lastItem.length - 1));
            }
            _newArray.push(_lastItem + '...');
          }
          _output = _newArray.join(' ');
        } else {
          throw new TypeError('Param "words" must be a number.');
        }
      }
      return _output;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('source.strings')
    /**
     * @namespace stringsModel
     * @memberof source.strings
     *
     * @description
     * Service that defines constants and schemas for strings module.
     */
    .service('stringsModel', stringsModel);

  function stringsModel() {
    /* jshint validthis: true */
    /**
     * @name constants
     * @memberof source.strings.stringsModel
     *
     * @type {Object}
     * @property {String} TRUNCATE
     * @property {String} WORDS
     */
    this.constants = {
      TRUNCATE: 'truncate',

      WORDS: 'words'
    };

    /**
     * @name schemas
     * @memberof source.strings.stringsModel
     *
     * @type {Object}
     * @property {Object} truncate
     * @property {Number} truncate.words
     */
    this.schemas = {
      truncate: {
        words: null
      }
    };
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

  translate.$inject = ['$tools', '$translate', 'translateModel'];

  function translate($tools, $translate, translateModel) {
    var $ = translateModel.$;
    var $c = translateModel.get();
    return _translate;

    /**
     * @name _translate
     * @memberof source.translate.translate
     *
     * @description
     * Filter that search for translation of given content.
     *
     * @param {String|Object} input
     * @returns {String}
     * @throws TypeError
     * @throws ReferenceError
     * @private
     */
    function _translate(input) {
      var _output = $.NO_TRANSLATION;
      if (typeof input === 'string') {
        _output = input;
      } else if (angular.isObject(input)) {
        var _config = $tools.setObjectUsingSchema($c.schemas.dataConfig, input, $.NO_MERGE, [$.NO_EXCEPTIONS]);
        if (_config.hasOwnProperty($.DATA_CONFIG_LITERAL)) {
          _output = _config[$.DATA_CONFIG_LITERAL];
        } else if (_config.hasOwnProperty($.DATA_CONFIG_NAME)) {
          _output = _config[$.DATA_CONFIG_NAME];
        } else {
          console.warn('Config given does not have properties "name" or "literal": ' + input);
        }
      } else {
        throw new TypeError('Type not allowed for input: (' + typeof input + ').');
      }
      var _inputDotCase = _output.split('.');
      var _lookingFor = angular.copy(_inputDotCase).pop();
      var _t = $translate.getTranslations();
      if (angular.isObject(_t) && Object.keys(_t).length) {
        if (_t.hasOwnProperty(_output)) {
          _output = _t[_output];
        } else if ((_inputDotCase.length > 1) && _t.hasOwnProperty(_lookingFor)) {
          _output = _t[_lookingFor];
        } else {
          console.warn('No translation for "' + _output + '".');
        }
      } else {
        throw new ReferenceError('There are no translations available. Revise $translate service initialization.');
      }
      if (angular.isArray(_output)) {
        _output = _output.join('<br>');
      }
      return _output;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('source.translate')
    /**
     * @namespace translateModelProvider
     * @memberof source.translate
     *
     * @requires $toolsProvider
     *
     * @description
     * Provider that gets constants and models for translate services.
     */
    .provider('translateModel', translateModel);

  translateModel.$inject = ['$toolsProvider'];

  function translateModel($toolsProvider) {
    var _constants = {
      API_TRANSLATION_SOURCE: 'apiTranslationSource',
      API_TRANSLATION_SECTIONS: 'apiTranslationSections',
      LOCAL_TRANSLATION_SOURCE: 'localTranslationSource',
      LOCAL_TRANSLATION_SECTIONS: 'localTranslationSections',
      LOCAL_TRANSLATIONS_PATH: 'localTranslationsPath',
      DEFAULT_LANGUAGE_CLIENT: 'preferredDefaultLanguage',

      LANGUAGE_OBJECT_LOCALE: 'locale',
      LANGUAGE_OBJECT_NAME: 'name',
      LANGUAGE_OBJECT_SOURCE_NAME: 'sourceName',
      LANGUAGE_OBJECT_FIRST_DAY_OF_WEEK: 'firstDayOfWeek',

      NO_TRANSLATION: 'noTranslationAvailable',

      DATA_CONFIG_NAME: 'name',
      DATA_CONFIG_LITERAL: 'literal',

      AVAILABLE_LANGUAGES: {
        en: {
          locale: 'en',
          name: 'English',
          sourceName: 'English'
        },
        es: {
          locale: 'es',
          name: 'Spanish',
          sourceName: 'Español',
          firstDayOfWeek: 1
        },
        fr: {
          locale: 'fr',
          name: 'French',
          sourceName: 'Français',
          firstDayOfWeek: 1
        },
        de: {
          locale: 'de',
          name: 'German',
          sourceName: 'Deutsch',
          firstDayOfWeek: 1
        },
        pt: {
          locale: 'pt',
          name: 'Portuguese',
          sourceName: 'Português',
          firstDayOfWeek: 1
        }
      }
    };

    var _defaults = {
      DEFAULT_LANGUAGE: _constants.AVAILABLE_LANGUAGES.en
    };

    var _localConstants = angular.extend({}, _constants, _defaults);
    var $ = angular.extend({}, _localConstants, $toolsProvider.$);

    /**
     * @name _providerModel
     * @memberof source.translate.translateModelProvider
     *
     * @type {Object}
     * @property {Object} schemas
     *
     * @property {Object} schemas.translateConfig
     * @property {Array} schemas.translateConfig.apiTranslationSource
     * @property {Array} schemas.translateConfig.apiTranslationSections
     * @property {Array} schemas.translateConfig.localTranslationSource
     * @property {Array} schemas.translateConfig.localTranslationSections
     * @property {String} schemas.translateConfig.localTranslationsPath
     * @property {String} schemas.translateConfig.preferredDefaultLanguage
     *
     * @property {Object} schemas.dataConfig
     * @property {String} schemas.dataConfig.name
     * @property {String} schemas.dataConfig.literal
     * @private
     */
    var _providerModel = {
      schemas: {
        translateConfig: {
          apiTranslationSource: null,
          apiTranslationSections: null,
          localTranslationSource: null,
          localTranslationSections: null,
          localTranslationsPath: '',
          preferredDefaultLanguage: ''
        },
        dataConfig: {
          name: null,
          literal: null
        }
      }
    };

    return {
      $: $,
      get: getProvider,
      $get: [$get]
    };

    /**
     * @name _getModelSource
     * @memberof source.translate.translateModelProvider
     *
     * @description
     * Returns translate model depending on the applicant: Provider or Service.
     *
     * @param {Boolean} source
     * @param {Object} [factoryModel = null]
     * @returns {Object}
     * @private
     */
    function _getModelSource(source, factoryModel) {
      factoryModel = factoryModel || null;
      return (source === $.PROVIDER) ? _providerModel : angular.extend({}, _providerModel, factoryModel) ;
    }

    /**
     * @name getProvider
     * @memberof source.translate.translateModelProvider
     *
     * @description
     * Returns translate model for Provider.
     *
     * @returns {Object}
     */
    function getProvider() {
      return _getModelSource($.PROVIDER);
    }

    /**
     * @namespace translateModel
     * @memberof source.translate.translateModelProvider
     *
     * @description
     * Factory that gets constants and models for translate services.
     */
    function $get() {
      return {
        $: $,
        get: getService
      };

      /**
       * @name getService
       * @memberof source.translate.translateModelProvider.translateModel
       *
       * @description
       * Returns translate model for Factory.
       *
       * @returns {Object}
       */
      function getService() {
        return _getModelSource($.SERVICE);
      }
    }
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
     * @requires $toolsProvider
     * @requires $apiProvider
     * @requires translateModelProvider
     *
     * @description
     * Provider definition for translation labels.
     */
    .provider('$translate', $translate);

  $translate.$inject = ['$toolsProvider', '$apiProvider', 'translateModelProvider'];

  function $translate($toolsProvider, $apiProvider, translateModelProvider) {
    var $ = translateModelProvider.$;
    var $c = translateModelProvider.get();
    var _translateConfig = $c.schemas.translateConfig;

    return {
      $: $,
      setApiTranslationSource: setApiTranslationSource,
      setApiTranslationSections: setApiTranslationSections,
      setLocalTranslationSource: setLocalTranslationSource,
      setLocalTranslationSections: setLocalTranslationSections,
      setTranslationsPath: setTranslationsPath,
      setPreferredLanguage: setPreferredLanguage,
      $get: ['$q', '$mdDateLocale', '$api', 'translateModel', $get]
    };

    /**
     * @name _setTranslationConfigProperty
     * @memberof source.translate.$translateProvider
     *
     * @description
     * Set configurations for _translateConfig object.
     *
     * @param {String} configKey
     * @param {String|Object|Array} value
     * @param {String|Array} valueProperties
     * @param {String} valueType
     * @returns {Object}
     * @private
     */
    function _setTranslationConfigProperty(configKey, value, valueProperties, valueType) {
      if (configKey && typeof configKey === 'string') {
        if (_translateConfig.hasOwnProperty(configKey)) {
          switch (valueType) {
            case $.TYPE_STRING:
              if (value && typeof value === 'string') {
                _translateConfig[configKey] = value;
              } else {
                throw new Error('Value for ' + configKey + ' is missing or type does not match: (' + value + ').');
              }
              break;
            case $.TYPE_LIST:
              _translateConfig[configKey] = $toolsProvider.readStringListUnique(value, valueProperties);
              break;
            default:
              throw new Error('Unknown value type: (' + valueType + ').');
          }
          return _translateConfig;
        } else {
          var _referenceError = [
            'Trying to set an unknown property ("' + configKey + '")',
            'into translate configuration object.'
          ];
          throw new ReferenceError(_referenceError.join(' '));
        }
      } else {
        var _error = [
          'Key of translate configuration object is missing',
          'or type does not match: (' + configKey + ').'
        ];
        throw new Error(_error.join(' '));
      }
    }

    /**
     * @name setApiTranslationSource
     * @memberof source.translate.$translateProvider
     *
     * @description
     * Set list of API entity names to calling translations for external resources.
     *
     * @param {String|Array|Object} value
     * @param {String|Array} [valueProperties = null]
     * @returns {Object}
     */
    function setApiTranslationSource(value, valueProperties) {
      valueProperties = valueProperties || null;
      return _setTranslationConfigProperty($.API_TRANSLATION_SOURCE, value, valueProperties, $.TYPE_LIST);
    }

    /**
     * @name setApiTranslationSections
     * @memberof source.translate.$translateProvider
     *
     * @description
     * Set sections from API response where will be found translations labels.
     *
     * @param {String|Array|Object} value
     * @param {String|Array} [valueProperties = null]
     * @returns {Object}
     */
    function setApiTranslationSections(value, valueProperties) {
      valueProperties = valueProperties || null;
      return _setTranslationConfigProperty($.API_TRANSLATION_SECTIONS, value, valueProperties, $.TYPE_LIST);
    }

    /**
     * @name setLocalTranslationSource
     * @memberof source.translate.$translateProvider
     *
     * @description
     * Set files names list for local JSON files where we will be found translation labels.
     *
     * @param {String|Array|Object} value
     * @param {String|Array} [valueProperties = null]
     * @returns {Object}
     */
    function setLocalTranslationSource(value, valueProperties) {
      valueProperties = valueProperties || null;
      return _setTranslationConfigProperty($.LOCAL_TRANSLATION_SOURCE, value, valueProperties, $.TYPE_LIST);
    }

    /**
     * @name setLocalTranslationSections
     * @memberof source.translate.$translateProvider
     *
     * @description
     * Set sections from local JSON file where will be found translations labels.
     *
     * @param {String|Array|Object} value
     * @param {String|Array} [valueProperties = null]
     * @returns {Object}
     */
    function setLocalTranslationSections(value, valueProperties) {
      valueProperties = valueProperties || null;
      return _setTranslationConfigProperty($.LOCAL_TRANSLATION_SECTIONS, value, valueProperties, $.TYPE_LIST);
    }

    /**
     * @name setTranslationsPath
     * @memberof source.translate.$translateProvider
     *
     * @description
     * Set directory path to local JSON files that contains translations.
     *
     * @param {String} pathToTranslations
     * @returns {Object}
     */
    function setTranslationsPath(pathToTranslations) {
      return _setTranslationConfigProperty($.LOCAL_TRANSLATIONS_PATH, pathToTranslations, undefined, $.TYPE_STRING);
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
      return _setTranslationConfigProperty($.DEFAULT_LANGUAGE_CLIENT, preferredLocale, undefined, $.TYPE_STRING);
    }

    /**
     * @namespace $translate
     * @memberof source.translate.$translateProvider
     *
     * @requires $q
     * @requires $api
     * @requires translateModel
     *
     * @description
     * Factory definition for translation labels.
     */
    function $get($q, $mdDateLocale, $api, translateModel) {
      var $ = translateModel.$;
      var _appLanguage = null;
      var _appTranslations = {};

      return {
        $: $,
        initTranslationModule: initTranslationModule,
        getTranslations: getTranslations,
        getCurrentLanguage: getCurrentLanguage,
        getAvailableLanguages: getAvailableLanguages
      };

      /**
       * @name _setCurrentLanguage
       * @memberof source.translate.$translateProvider.$translate
       *
       * @description
       * Method to setting current language of application.
       * If "languageLocale" is not defined, method try to set translate config "defaultLanguageClient".
       * Otherwise default language constant is set as current language.
       *
       * @param {String} [languageLocale]
       * @returns {Object}
       * @throws ReferenceError
       * @throws TypeError
       * @private
       */
      function _setCurrentLanguage(languageLocale) {
        languageLocale = languageLocale || null;
        var _localeToSet = (languageLocale) ?  languageLocale : _translateConfig[$.DEFAULT_LANGUAGE_CLIENT] ;
        if (_localeToSet) {
          if (typeof _localeToSet === 'string') {
            if ($.AVAILABLE_LANGUAGES.hasOwnProperty(_localeToSet)) {
              _appLanguage = $.AVAILABLE_LANGUAGES[_localeToSet];
            } else {
              throw new ReferenceError('Trying to set an unknown language: "' + _localeToSet + '".');
            }
          } else {
            throw new TypeError('Language locale type does not match: (' + typeof _localeToSet + ').');
          }
        } else {
          _appLanguage = $.DEFAULT_LANGUAGE;
          var _referenceError = [
            'Local code is not defined. Setting ' + _appLanguage.name,
            '(' + _appLanguage.locale + ') automatically. Please, revise config statement.'
          ];
          console.error(ReferenceError(_referenceError.join(' ')));
        }
        var _appLanguageIsValidObject = (angular.isObject(_appLanguage) && Object.keys(_appLanguage).length);
        var _existFirstDayOfWeek = (_appLanguage.hasOwnProperty($.LANGUAGE_OBJECT_FIRST_DAY_OF_WEEK));
        if (_appLanguageIsValidObject && _existFirstDayOfWeek) {
          $mdDateLocale.firstDayOfWeek = _appLanguage.firstDayOfWeek;
        }
        return _appLanguage;
      }

      /**
       * @name _getTranslationsPromises
       * @memberof source.translate.$translateProvider.$translate
       *
       * @description
       * Search for translation locations for language defined with "locale" variable and returns array of promises.
       * WARNING: This method set "_appLanguage" factory variable, therefore "_getTranslationsPromises" should be
       * called just once at the beginning of the application and each time the application language is changed.
       *
       * @param {String} [locale]
       * @returns {Array}
       * @throws Error
       * @private
       */
      function _getTranslationsPromises(locale) {
        var output = [];
        var _apiTranslationSource = _translateConfig[$.API_TRANSLATION_SOURCE];
        var _localTranslationSource = _translateConfig[$.LOCAL_TRANSLATION_SOURCE];
        var _localTranslationsPath = _translateConfig[$.LOCAL_TRANSLATIONS_PATH];
        var _defaultLanguage = _setCurrentLanguage(locale);
        if (_apiTranslationSource && _apiTranslationSource.length) {
          angular.forEach(_apiTranslationSource, function(element) {
            var _entityObject = $api.createEntityObject({ entityName: _defaultLanguage.locale + '/' + element });
            output.push($api.getEntity(_entityObject));
          });
        }
        if (_localTranslationSource && _localTranslationSource.length) {
          var _localTranslationsPathSource = (_localTranslationsPath) ? _localTranslationsPath + '/' : '' ;
          angular.forEach(_localTranslationSource, function(element) {
            var _entityObject = $api.createEntityObject({
              entityName: _localTranslationsPathSource + _defaultLanguage.locale + '/' + element,
              forceToOne: true
            });
            output.push($api.getLocalEntity(_entityObject));
          });
        }
        if (output.length) {
          return output;
        } else {
          throw new Error('No local or remote translations have been defined. Revise config statement');
        }
      }

      /**
       * @name _initTranslationModule
       * @memberof source.translate.$translateProvider.$translate
       *
       * @description
       * Resolve array of translation promises to set "_appTranslations" variable
       * and returns promise by $q.all method.
       *
       * @param {String} locale
       * @returns {Promise}
       * @private
       */
      function _initTranslationModule(locale) {
        var _promises = _getTranslationsPromises(locale);
        _appTranslations = {};
        return $q.all(_promises).then(function(success) {
          var _arrayMerged = [];
          angular.forEach(success, function(value) {
            _arrayMerged = _.merge(_arrayMerged, value);
          });
          _appTranslations = _arrayMerged;
        });
      }

      /**
       * @name initTranslationModule
       * @memberof source.translate.$translateProvider.$translate
       *
       * @description
       * Search for translation labels in both sources: LOCAL and SERVER.
       *
       * @param {String} [languageLocale]
       * @returns {Promise}
       */
      function initTranslationModule(languageLocale) {
        return _initTranslationModule(languageLocale);
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
        return _appTranslations;
      }

      /**
       * @name getCurrentLanguage
       * @memberof source.translate.$translateProvider.$translate
       *
       * @description
       * Catch current defined language variable: "_appLanguage"
       *
       * @returns {Object}
       */
      function getCurrentLanguage() {
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
        return $.AVAILABLE_LANGUAGES;
      }
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('source.view-logic')
    /**
     * @namespace appViewModelProvider
     * @memberof source.view-logic
     *
     * @requires $toolsProvider
     *
     * @description
     * Provider that gets constants and models for appView services.
     */
    .provider('appViewModel', appViewModel);

  appViewModel.$inject = ['$toolsProvider'];

  function appViewModel($toolsProvider) {
    var _constants = {
      SCHEMA_DOM_HANDLER: 'domHandler',
      SCHEMA_ANIMATION: 'animation',
      SCHEMA_ANIMATION_EVENTS: 'animationEvents',
      SCHEMA_REGISTERED_EXTERNAL_ANIMATIONS: 'registeredExternalAnimations',

      DOM_HANDLER_CLASS_TO_SHOW: 'classToShow',
      DOM_HANDLER_CLASS_TO_HIDE: 'classToHide',
      DOM_HANDLER_CLASS_DEFAULT_ANIMATION_SHOW: 'classDefaultAnimationShow',
      DOM_HANDLER_CLASS_DEFAULT_ANIMATION_HIDE: 'classDefaultAnimationHide',

      SHOW: 1,
      HIDE: 2,
      SHOW_ANIMATION: 3,
      HIDE_ANIMATION: 4,

      ANIMATION: true,
      NO_ANIMATION: false,

      MODE_ANIMATION_IN: true,
      MODE_ANIMATION_OUT: false,

      ANIMATION_START: 'start',
      ANIMATION_ITERATION: 'iteration',
      ANIMATION_END: 'end',

      ACTIVATE_ANIMATION_CLASS: 'animated',

      DATA_CONFIG_NAME: 'name',
      DATA_CONFIG_FILTER: 'filter',
      DATA_CONFIG_FILTER_PARAMS: 'filterParams',
      DATA_CONFIG_DISPLAY_CONCAT: 'displayConcat',
      DATA_CONFIG_DISPLAY_PROPERTIES: 'displayProperties',
      DATA_CONFIG_DISPLAY_PROPERTIES_NAME: 'displayPropertiesName',

      DISPLAY_PROPERTIES_MASK_START: '::(',
      DISPLAY_PROPERTIES_MASK_END: ')',
      IS_MASK: true,
      IS_NOT_MASK: false,
      MASK_WRAPPER: '?!11032017!?',
      MASK_GLUE: '@#%7391551210%#@',
      MASK_LABEL: 'TOOL_PAS_DISPLAY_PROPERTIES_MASK',
      HAS_MASK_LABEL: 'TOOL_PAS_DISPLAY_PROPERTIES_HAS_MASK',
      NOT_HAS_MASK_LABEL: 'TOOL_PAS_DISPLAY_PROPERTIES_DOES_NOT_HAS_MASK'
    };
    var $ = angular.extend({}, _constants, $toolsProvider.$);

    /**
     * @name _providerModel
     * @memberof source.view-logic.appViewProvider
     *
     * @type {Object}
     * @property {Object} schemas
     *
     * @property {Object} schemas.domHandler
     * @property {String} schemas.domHandler.classToShow
     * @property {String} schemas.domHandler.classToHide
     * @property {String} schemas.domHandler.classDefaultAnimationShow
     * @property {String} schemas.domHandler.classDefaultAnimationHide
     *
     * @property {Object} schemas.animationEvents
     * @property {Array} schemas.animationEvents.start
     * @property {Array} schemas.animationEvents.iteration
     * @property {Array} schemas.animationEvents.end
     *
     * @property {Object} animation
     * @property {String} animation.classAnimationShow
     * @property {String} animation.classAnimationHide
     *
     * @property {Object} registeredAnimations
     * @property {Array} registeredAnimations.in
     * @property {Array} registeredAnimations.out
     *
     * @property {Object} dataConfig
     * @property {String} dataConfig.filter
     * @property {Object} dataConfig.filterParams
     * @property {Boolean} dataConfig.displayConcat
     * @property {Array} dataConfig.displayProperties
     * @property {Boolean} dataConfig.displayPropertiesName
     * @private
     */
    var _providerModel = {
      schemas: {
        domHandler: {
          classToShow: null,
          classToHide: null,
          classDefaultAnimationShow: null,
          classDefaultAnimationHide: null
        },
        animationEvents: {
          start: [],
          iteration: [],
          end: []
        },
        animation: {
          classAnimationShow: null,
          classAnimationHide: null
        },
        registeredAnimations: {
          in: [],
          out: []
        },
        dataConfig: {
          name: null,
          filter: null,
          filterParams: null,
          displayConcat: null,
          displayProperties: null,
          displayPropertiesName: null
        }
      }
    };

    return {
      $: $,
      get: _getProvider,
      $get: [$get]
    };

    /**
     * @name _getModelSource
     * @memberof source.view-logic.appViewProvider
     *
     * @description
     * Returns appView model depending on the applicant: Provider or Service.
     *
     * @param {Boolean} source
     * @param {Object} [factoryModel = null]
     * @returns {Object}
     * @private
     */
    function _getModelSource(source, factoryModel) {
      factoryModel = factoryModel || null;
      return (source === $.PROVIDER) ? _providerModel : angular.extend({}, _providerModel, factoryModel) ;
    }

    /**
     * @name _getProvider
     * @memberof source.view-logic.appViewProvider
     *
     * @description
     * Returns appView model for Provider.
     *
     * @returns {Object}
     * @private
     */
    function _getProvider() {
      return _getModelSource($.PROVIDER);
    }

    /**
     * @namespace appView
     * @memberof source.view-logic.appViewProvider
     *
     * @description
     * Factory that gets constants and models for appView services.
     */
    function $get() {
      return {
        $: $,
        get: _getFactory
      };

      /**
       * @name _getFactory
       * @memberof source.view-logic.appViewProvider.appView
       *
       * @description
       * Returns appView model for Factory.
       *
       * @returns {Object}
       * @private
       */
      function _getFactory() {
        return _getModelSource($.SERVICE);
      }
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('source.view-logic')
    /**
     * @namespace $appViewProvider
     * @memberof source.view-logic
     *
     * @requires $toolsProvider
     * @requires appViewModelProvider
     *
     * @description
     * Provider statement for some helper methods about view presentation logic.
     */
    .provider('$appView', $appView);

  $appView.$inject = ['$toolsProvider', 'appViewModelProvider'];

  function $appView($toolsProvider, appViewModelProvider) {
    var $ = appViewModelProvider.$;
    var $c = appViewModelProvider.get();
    var _domHandler = $c.schemas.domHandler;
    var _animationEvents = $c.schemas.animationEvents;
    var _registeredAnimations = $c.schemas.registeredAnimations;

    return {
      $: $,
      setDomHandler: setDomHandlerProvider,
      getDomHandler: getDomHandlerProvider,
      setAnimationEvents: setAnimationEventsProvider,
      getAnimationEvents: getAnimationEventsProvider,
      createDomHandlerObject: createDomHandlerObjectProvider,
      createAnimationObject: createAnimationObjectProvider,
      $get: ['$filter', '$injector', '$tools', $get]
    };

    /**
     * @name _registerExternalAnimation
     * @memberof source.view-logic.$appViewProvider
     *
     * @description
     * Stores all animations different from defaults.
     *
     * @param animationData --> It can be an Object or String.
     * @param {Boolean} animationMode
     * @return {Object}
     * @throws TypeError
     * @private
     */
    function _registerExternalAnimation(animationData, animationMode) {
      var _in = null;
      var _out = null;
      if (typeof animationData === 'string') {
        if (animationMode === $.MODE_ANIMATION_IN) {
          _in = animationData;
        } else {
          _out = animationData;
        }
      } else if (angular.isObject(animationData)) {
        _in = animationData.classAnimationShow || _in;
        _out = animationData.classAnimationHide || _out;
      } else {
        throw new TypeError('Wrong type of animation data: (' + typeof animationData + ')');
      }
      if (_in) {
        _registeredAnimations.in = $toolsProvider.arrayMerge(_registeredAnimations.in, [_in]);
      }
      if (_out) {
        _registeredAnimations.out = $toolsProvider.arrayMerge(_registeredAnimations.out, [_out]);
      }
      return _registeredAnimations;
    }

    /**
     * @name _getClassList
     * @memberof source.view-logic.$appViewProvider
     *
     * @description
     * Returns string list space separated of animation classes to apply to removeClass method.
     *
     * @param {Boolean} animationMode
     * @return {String}
     * @private
     */
    function _getClassList(animationMode) {
      var _animationObject = angular.copy(_registeredAnimations);
      var _animationList = null;
      if (animationMode === $.MODE_ANIMATION_IN) {
        _animationList = _animationObject.in;
        _animationList.push(_domHandler.classToShow);
        _animationList.push(_domHandler.classDefaultAnimationShow);
      } else {
        _animationList = _animationObject.out;
        _animationList.push(_domHandler.classToHide);
        _animationList.push(_domHandler.classDefaultAnimationHide);
      }
      _animationList.push($.ACTIVATE_ANIMATION_CLASS);
      return _animationList.join(' ');
    }

    /**
     * @name _getServiceObject
     * @memberof source.view-logic.$appViewProvider
     *
     * @description
     * Returns requested service object or one of its properties.
     *
     * @param {Object} serviceObject
     * @param {String} [property]
     * @return {*}
     * @private
     */
    function _getServiceObject(serviceObject, property) {
      return $toolsProvider.getCheckedObject(serviceObject, property);
    }

    /**
     * @name _setDomHandler
     * @memberof source.view-logic.$appViewProvider
     *
     * @description
     * Private function to setting DOM handler configuration object (_domHandler).
     *
     * @param {Object} config
     * @returns {Object}
     * @private
     */
    function _setDomHandler(config) {
      _domHandler = $toolsProvider.setObjectUsingSchema($c.schemas.domHandler, config, _domHandler);
      return _domHandler;
    }

    /**
     * @name _setAnimationEvents
     * @memberof source.view-logic.$appViewProvider
     *
     * @description
     * Private function to setting animation events configuration object (_animationEvents).
     *
     * @param {Object} config
     * @returns {Object}
     * @private
     */
    function _setAnimationEvents(config) {
      _animationEvents = $toolsProvider.setObjectUsingSchema($c.schemas.animationEvents, config, _animationEvents);
      return _animationEvents;
    }

    /**
     * @name _createSchemaObject
     * @memberof source.view-logic.$appViewProvider
     *
     * @description
     * Returns an object with the same structure of given schema through given object.
     *
     * @param {Object} object
     * @param {String} schema
     * @return {Object}
     * @throws ReferenceError
     * @private
     */
    function _createSchemaObject(object, schema) {
      if ($c.schemas.hasOwnProperty(schema)) {
        return $toolsProvider.setObjectUsingSchema($c.schemas[schema], object);
      } else {
        throw new ReferenceError('Unknown given schema: (' + schema + ')');
      }
    }

    /**
     * @name _setDomHandlerProvider
     * @memberof source.view-logic.$appViewProvider
     *
     * @description
     * Provider function to setting DOM handler configuration object (_domHandler).
     *
     * @param {Object} config --> Given DOM handler configuration object.
     * @returns {Object}
     */
    function setDomHandlerProvider(config) {
      return _setDomHandler(config);
    }

    /**
     * @name getDomHandlerProvider
     * @memberof source.view-logic.$appViewProvider
     *
     * @description
     * Provider exposed method to get _domHandler object.
     *
     * @param {String} [property]
     * @return {Object|String}
     */
    function getDomHandlerProvider(property) {
      return _getServiceObject(_domHandler, property);
    }

    /**
     * @name setAnimationEventsProvider
     * @memberof source.view-logic.$appViewProvider
     *
     * @description
     * Provider function that sets received object as _animationEvents object.
     *
     * @param {Object} receivedObject
     * @return {Object}
     */
    function setAnimationEventsProvider(receivedObject) {
      return _setAnimationEvents(receivedObject);
    }

    /**
     * @name getAnimationEventsProvider
     * @memberof source.view-logic.$appViewProvider
     *
     * @description
     * Provider exposed method to get _animationEvents object.
     *
     * @param {String} [property]
     * @return {*}
     */
    function getAnimationEventsProvider(property) {
      return _getServiceObject(_animationEvents, property);
    }

    /**
     * @name createDomHandlerObjectProvider
     * @memberof source.view-logic.$appViewProvider
     *
     * @description
     * Provider function exposed that create DOM handler object.
     *
     * @param {Object} domHandlerObject
     * @returns {Object}
     */
    function createDomHandlerObjectProvider(domHandlerObject) {
      return _createSchemaObject(domHandlerObject, $.SCHEMA_DOM_HANDLER);
    }

    /**
     * @name createAnimationObjectProvider
     * @memberof source.view-logic.$appViewProvider
     *
     * @description
     * Provider function exposed that create animation object.
     *
     * @param {Object} animationObject
     * @return {Object}
     */
    function createAnimationObjectProvider(animationObject) {
      return _createSchemaObject(animationObject, $.SCHEMA_ANIMATION);
    }

    /**
     * @namespace $appView
     * @memberof source.view-logic.$appViewProvider
     *
     * @requires $filter
     * @requires $injector
     * @requires $tools
     *
     * @description
     * Factory statement for application view provider.
     */
    function $get($filter, $injector, $tools) {
      return {
        /* Global Constants */
        $: $,
        /* Config methods */
        setDomHandler: setDomHandlerService,
        getDomHandler: getDomHandlerService,
        setAnimationEvents: setAnimationEventsService,
        getAnimationEvents: getAnimationEventsService,
        createDomHandlerObject: createDomHandlerObjectService,
        createAnimationObject: createAnimationObjectService,
        /* View tools */
        applyFilter: applyFilter,
        processData: processData,
        /* DOM tools */
        checkElementByClass: checkElementByClass,
        show: showElement,
        hide: hideElement
      };

      /**
       * @name _displayWayElement
       * @memberof source.view-logic.$appViewProvider.$appView
       *
       * @description
       * Apply display mode to DOM element given.
       *
       * @param {Object} domElement
       * @param {Number} way
       * @param animationData --> It can be an Object or String.
       * @private
       */
      function _displayWayElement(domElement, way, animationData) {
        way = way || $.SHOW;
        var _isEdge = ($tools.getDeviceInfo($.DEVICE_INFO_BROWSER) === $.BROWSER_EDGE);
        var _isIE = ($tools.getDeviceInfo($.DEVICE_INFO_BROWSER) === $.BROWSER_IE);
        var _noAnimationBrowser = (_isEdge || _isIE);
        var _animationEventsEndList = _animationEvents[$.ANIMATION_END].join(' ');
        var _animationIn = _domHandler.classDefaultAnimationShow;
        var _animationOut = _domHandler.classDefaultAnimationHide;
        if (_noAnimationBrowser) {
          if (way === $.SHOW_ANIMATION) {
            way = $.SHOW;
          } else {
            way = $.HIDE;
          }
        }
        if (animationData) {
          if (typeof animationData === 'string') {
            if (way === $.SHOW_ANIMATION) {
              _animationIn = animationData;
            } else if (way === $.HIDE_ANIMATION) {
              _animationOut = animationData;
            }
          } else if (angular.isObject(animationData)) {
            _animationIn = (animationData.classAnimationShow) ? animationData.classAnimationShow : _animationIn ;
            _animationOut = (animationData.classAnimationHide) ? animationData.classAnimationHide : _animationOut ;
          }
        }
        var _removeClassesShow = _getClassList($.MODE_ANIMATION_IN);
        var _removeClassesHide = _getClassList($.MODE_ANIMATION_OUT);
        switch (way) {
          case $.SHOW:
            domElement.removeClass(_removeClassesHide).addClass(_domHandler.classToShow);
            break;
          case $.HIDE:
            domElement.removeClass(_removeClassesShow).addClass(_domHandler.classToHide);
            break;
          case $.SHOW_ANIMATION:
            domElement
              .removeClass(_removeClassesHide)
              .addClass($.ACTIVATE_ANIMATION_CLASS + ' ' + _animationIn)
              .one(_animationEventsEndList, function() {
                domElement.attr('class', _domHandler.classToShow);
              });
            break;
          case $.HIDE_ANIMATION:
            domElement
              .removeClass(_removeClassesShow)
              .addClass($.ACTIVATE_ANIMATION_CLASS + ' ' + _animationOut)
              .one(_animationEventsEndList, function() {
                domElement.attr('class', _domHandler.classToHide);
              });
            break;
        }
      }

      /**
       * @name _setConcatWay
       * @memberof source.view-logic.$appViewProvider.$appView
       *
       * @description
       * Setting "glue" to concat array as string.
       * This is an auxiliary method for processData and _processDataObject.
       *
       * @param {Boolean|String} concatWay
       * @returns {String}
       * @private
       */
      function _setConcatWay(concatWay) {
        var output = '<br>';
        if ((typeof concatWay === 'boolean') && concatWay) {
          output = ', ';
        } else if (angular.isString(concatWay)) {
          output = concatWay;
        }
        return output;
      }

      /**
       * @name _processDataObject
       * @memberof source.view-logic.$appViewProvider.$appView
       *
       * @description
       * Processing data (only objects) to show filtered or formatted.
       * This is an auxiliary method for processData.
       *
       * @param {Object} data
       * @param {Object} config
       * @param {Object} completeRowData
       * @returns {String}
       * @throws TypeError
       * @private
       */
      function _processDataObject(data, config, completeRowData) {
        if (angular.isObject(data)) {
          var _outputAux = [];
          var _outputNamesAux = [];
          var _displayConcat = _setConcatWay(config[$.DATA_CONFIG_DISPLAY_CONCAT]);
          if (config[$.DATA_CONFIG_NAME].indexOf('.') > -1) {
            _outputAux.push($tools.getValueFromDotedKey(completeRowData, config[$.DATA_CONFIG_NAME]));
            var _arrayAux = config[$.DATA_CONFIG_NAME].split('.');
            _outputNamesAux.push(_arrayAux.pop());
          } else if (config[$.DATA_CONFIG_DISPLAY_PROPERTIES]) {
            var _auxDisplayProperties = config[$.DATA_CONFIG_DISPLAY_PROPERTIES];
            if (typeof _auxDisplayProperties === 'string') {
              _auxDisplayProperties = _auxDisplayProperties.split(',').map(function(element) {
                return element.trim();
              });
            }
            var _maskWay = false;
            var _masks = [];
            angular.forEach(_auxDisplayProperties, function(value) {
              if (data.hasOwnProperty(value)) {
                _outputAux.push(data[value]);
                _outputNamesAux.push(value);
                _maskWay = (_maskWay || $.IS_NOT_MASK);
              } else {
                var _conditionStart = (value.indexOf($.DISPLAY_PROPERTIES_MASK_START) === 0);
                var _conditionEnd = (value.substr(-1) === $.DISPLAY_PROPERTIES_MASK_END);
                if (_conditionStart && _conditionEnd) {
                  var _newMask = value.slice(0, -1).slice($.DISPLAY_PROPERTIES_MASK_START.length);
                  _masks.push($.MASK_WRAPPER + _newMask + $.MASK_WRAPPER);
                  _outputAux.push($.MASK_LABEL);
                  _outputNamesAux.push($.MASK_LABEL);
                  _maskWay = (_maskWay || $.IS_MASK);
                }
              }
            });
            if (_maskWay) {
              var _outputAuxString = _outputAux.join($.MASK_GLUE);
              var _outputNamesAuxString = _outputNamesAux.join($.MASK_GLUE);
              var _evalOutputAux = _outputAuxString.split($.MASK_LABEL);
              var _evalOutputNamesAux = _outputNamesAuxString.split($.MASK_LABEL);
              if (!angular.copy(_evalOutputAux).shift()) {
                _evalOutputAux.shift();
                _evalOutputNamesAux.shift();
              }
              if (!angular.copy(_evalOutputAux).pop()) {
                /* Last mask is ignored: */
                _evalOutputAux.pop();
                _evalOutputNamesAux.pop();
                _masks.pop();
              }
              if (_masks.length < _evalOutputAux.length) {
                /* Prevent use of displayConcat property: */
                _masks = [$.MASK_WRAPPER + _displayConcat + $.MASK_WRAPPER].concat(_masks);
              }
              _outputAux = [];
              _outputNamesAux = [];
              angular.forEach(_evalOutputAux, function(value, key) {
                var _evalElement = value.split($.MASK_GLUE);
                var _evalElementNames = _evalOutputNamesAux[key].split($.MASK_GLUE);
                if (!angular.copy(_evalElement).shift()) {
                  _evalElement.shift();
                  _evalElementNames.shift();
                }
                if (!angular.copy(_evalElement).pop()) {
                  _evalElement.pop();
                  _evalElementNames.pop();
                }
                if (_evalElement.length > 1) {
                  var _usingMask = _masks[key].split($.MASK_WRAPPER).join('');
                  angular.forEach(_evalElement, function(item, itemKey) {
                    _outputAux.push(item);
                    _outputNamesAux.push(_evalElementNames[itemKey]);
                    if (itemKey < (_evalElement.length - 1)) {
                      _outputAux.push(_usingMask);
                      _outputNamesAux.push($.MASK_LABEL);
                    }
                  });
                } else {
                  _outputAux.push(_evalElement[0]);
                  _outputNamesAux.push(_evalElementNames[0]);
                }
                if (key < (_evalOutputAux.length - 1)) {
                  _outputAux.push(_masks[key + 1].split($.MASK_WRAPPER).join(''));
                  _outputNamesAux.push($.MASK_LABEL);
                }
              });
            }
            _outputAux.push(_maskWay);
            var _maskWayLabel = (_maskWay) ? $.HAS_MASK_LABEL : $.NOT_HAS_MASK_LABEL ;
            _outputNamesAux.push(_maskWayLabel);
          } else {
            angular.forEach(data, function(value, key) {
              _outputAux.push(value);
              _outputNamesAux.push(key);
            });
          }

          var _outputArrayAux = [];
          angular.forEach(_outputAux, function(value, key) {
            var _condition01 = (_outputNamesAux[key] !== $.MASK_LABEL);
            var _condition02 = (_outputNamesAux[key] !== $.HAS_MASK_LABEL);
            var _condition03 = (_outputNamesAux[key] !== $.NOT_HAS_MASK_LABEL);
            if (_condition01 && _condition02 && _condition03) {
              var _filtered = applyFilter(value, config[$.DATA_CONFIG_FILTER], config[$.DATA_CONFIG_FILTER_PARAMS]);
              var _filteredOk = (_filtered) ? _filtered : '' ;
              var _names = (config[$.DATA_CONFIG_DISPLAY_PROPERTIES_NAME]) ? _outputNamesAux[key] + ': ' : '' ;
              _outputArrayAux.push(_names + _filteredOk);
            } else {
              _outputArrayAux.push(value);
            }
          });

          var _concatWay = (_outputArrayAux.pop()) ? '' : _displayConcat ;
          return _outputArrayAux.join(_concatWay);
        } else {
          throw new TypeError('Data given is not an object: ("' + data + '")');
        }
      }

      /**
       * @name _setDomHandlerService
       * @memberof source.view-logic.$appViewProvider.$appView
       *
       * @description
       * Factory function to setting DOM handler configuration object (_domHandler).
       *
       * @param {Object} config --> Given DOM handler configuration object.
       * @returns {Object}
       */
      function setDomHandlerService(config) {
        return _setDomHandler(config);
      }

      /**
       * @name getDomHandlerService
       * @memberof source.view-logic.$appViewProvider.$appView
       *
       * @description
       * Factory exposed method to get _domHandler object.
       *
       * @param {String} [property]
       * @return {Object|String}
       */
      function getDomHandlerService(property) {
        return _getServiceObject(_domHandler, property);
      }

      /**
       * @name setAnimationEventsProvider
       * @memberof source.view-logic.$appViewProvider.$appView
       *
       * @description
       * Factory function that sets received object as _animationEvents object.
       *
       * @param {Object} receivedObject
       * @return {Object}
       */
      function setAnimationEventsService(receivedObject) {
        return _setAnimationEvents(receivedObject);
      }

      /**
       * @name getAnimationEventsService
       * @memberof source.view-logic.$appViewProvider.$appView
       *
       * @description
       * Factory exposed method to get _animationEvents object.
       *
       * @param {String} [property]
       * @return {*}
       */
      function getAnimationEventsService(property) {
        return _getServiceObject(_animationEvents, property);
      }

      /**
       * @name createDomHandlerObjectService
       * @memberof source.view-logic.$appViewProvider.$appView
       *
       * @description
       * Factory function exposed that create DOM handler object.
       *
       * @param {Object} domHandlerObject
       * @returns {Object}
       */
      function createDomHandlerObjectService(domHandlerObject) {
        return _createSchemaObject(domHandlerObject, $.SCHEMA_DOM_HANDLER);
      }

      /**
       * @name createAnimationObjectService
       * @memberof source.view-logic.$appViewProvider.$appView
       *
       * @description
       * Factory function exposed that create animation object.
       *
       * @param {Object} animationObject
       * @return {Object}
       */
      function createAnimationObjectService(animationObject) {
        return _createSchemaObject(animationObject, $.SCHEMA_ANIMATION);
      }

      /**
       * @name applyFilter
       * @memberof source.view-logic.$appViewProvider.$appView
       *
       * @description
       * Returns data with given filter applied.
       *
       * @param {*} data
       * @param {String} filterName
       * @param {Object} [filterParams]
       * @returns {*}
       * @throws ReferenceError
       */
      function applyFilter(data, filterName, filterParams) {
        var output = data;
        if (data && filterName) {
          if ($injector.has(filterName + 'Filter')) {
            output = $filter(filterName)(data, filterParams);
          } else {
            throw new ReferenceError('Unknown filter: "' + filterName + '".');
          }
        }
        return output;
      }

      /**
       * @name processData
       * @memberof source.view-logic.$appViewProvider.$appView
       *
       * @description
       * Processing data to show filtered or formatted.
       *
       * @param {*} data
       * @param {Object} config
       * @param {Object} [completeDataRow]
       * @throws Error
       * @throws ReferenceError
       * @returns {String}
       */
      function processData(data, config, completeDataRow) {
        if (config[$.DATA_CONFIG_NAME].indexOf('.') > -1) {
          data = $tools.getValueFromDotedKey(completeDataRow, config[$.DATA_CONFIG_NAME]);
        }
        if (angular.isObject(config) && Object.keys(config).length) {
          if (config.hasOwnProperty($.DATA_CONFIG_NAME)) {
            completeDataRow = completeDataRow || null;
            var _config = $tools.setObjectUsingSchema($c.schemas.dataConfig, config, $.NO_MERGE, [$.NO_EXCEPTIONS]);
            var _filter = _config[$.DATA_CONFIG_FILTER];
            var _filterParams = _config[$.DATA_CONFIG_FILTER_PARAMS];

            var output = '';
            if (angular.isArray(data)) {
              var _outputArrayAux = [];
              angular.forEach(data, function(value) {
                if (angular.isObject(value)) {
                  _outputArrayAux.push(_processDataObject(value, _config, completeDataRow));
                } else {
                  _outputArrayAux.push(applyFilter(value, _filter, _filterParams));
                }
              });
              output = _outputArrayAux.join(_setConcatWay(_config[$.DATA_CONFIG_DISPLAY_CONCAT]));
            } else if (angular.isObject(data)) {
              output = _processDataObject(data, _config, completeDataRow);
            } else {
              output = applyFilter(data, _filter, _filterParams);
            }
            return (output) ? output : '' ;
          } else {
            throw new ReferenceError('Name is not defined for data field ("' + data + '") in configuration object.');
          }
        } else {
          throw new Error('Configuration given is not an Object or configuration Object is void.');
        }
      }

      /**
       * @name  _checkElementByClass
       * @memberof source.view-logic.$appViewProvider.$appView
       *
       * @description
       * Checks if the given "domElement" contains any of the classes received in parameter "classes".
       * Parameter "classes" can be string or array of strings.
       *
       * @param {Object} domElement
       * @param {String|Array} classes
       * @returns {String|Boolean}
       */
      function checkElementByClass(domElement, classes) {
        var _output = false;
        var _classes = classes || null;
        var _isString = (typeof _classes === 'string');
        var _isArray = angular.isArray(_classes);
        if (_isString || _isArray) {
          _classes = (_isString) ? [classes] : classes ;
          angular.forEach(_classes, function(item) {
            if (domElement.classList.contains(item)) {
              _output = item;
            }
          });
        } else {
          throw new TypeError('Invalid type of parameter "classes". It must be string or array.');
        }
        return _output;
      }

      /**
       * @name showElement
       * @memberof source.view-logic.$appViewProvider.$appView
       *
       * @description
       * Applies CSS classes to show given DOM element.
       *
       * @param {Object} domElement
       * @param {Boolean} [activateAnimation]
       * @param {String|Object} [animationData]
       */
      function showElement(domElement, activateAnimation, animationData) {
        activateAnimation = activateAnimation || false;
        var _showWay = (activateAnimation) ? $.SHOW_ANIMATION : $.SHOW ;
        if (animationData) {
          _registerExternalAnimation(animationData, $.MODE_ANIMATION_IN);
        }
        return _displayWayElement(domElement, _showWay, animationData);
      }

      /**
       * @name hideElement
       * @memberof source.view-logic.$appViewProvider.$appView
       *
       * @description
       * Applies CSS classes to hide given DOM element.
       *
       * @param {Object} domElement
       * @param {Boolean} [activateAnimation]
       * @param {String|Object} [animationData]
       */
      function hideElement(domElement, activateAnimation, animationData) {
        activateAnimation = activateAnimation || false;
        var _hideWay = (activateAnimation) ? $.HIDE_ANIMATION : $.HIDE ;
        if (animationData) {
          _registerExternalAnimation(animationData, $.MODE_ANIMATION_OUT);
        }
        return _displayWayElement(domElement, _hideWay, animationData);
      }
    }
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

      URL_NOT_ALLOWED_CHARS: ['\\.', '\\,', '\\;', '\\:'],

      PROCESSES: 'processes',
      MODULES: 'modules',
      STATES: 'states',

      PROVIDER: true,
      SERVICE: false,

      MERGE: true,
      NO_MERGE: false,

      NO_EXCEPTIONS: 'noExceptions',

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
      },

      DEVICE_INFO_OS: 'os',
      DEVICE_INFO_BROWSER: 'browser',
      DEVICE_INFO_DEVICE: 'device',
      DEVICE_INFO_OS_VERSION: 'os_version',
      DEVICE_INFO_BROWSER_VERSION: 'browser_version',

      BROWSER_IE: 'ie',
      BROWSER_EDGE: 'ms-edge',
      BROWSER_CHROME: 'chrome',

      UNIQUE_ELEMENTS: true,
      REPEATED_ELEMENTS: false,

      TYPE_STRING: 'string',
      TYPE_LIST: 'list'
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
     * @namespace _sharedRun
     * @memberof source._shared
     *
     * @requires $tools
     * @requires deviceDetector
     *
     * @description
     * Run statement for shared module.
     */
    .run(_sharedRun);

  _sharedRun.$inject = ['$tools', 'deviceDetector'];

  function _sharedRun($tools, deviceDetector) {
    $tools.setDeviceInfo(deviceDetector);
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
     * @requires globalConstantsProvider
     *
     * @description
     * Provider statement for several useful tools.
     */
    .provider('$tools', $tools);

  $tools.$inject = ['globalConstantsProvider'];

  function $tools(globalConstantsProvider) {
    var $ = globalConstantsProvider.get();
    var _deviceInfo = null;

    return {
      /* Global constants */
      $: $,
      /* Config methods */
      setDeviceInfo: setDeviceInfoProvider,
      getDeviceInfo: getDeviceInfoProvider,
      /* String tools */
      readStringList: readStringListProvider,
      readStringListUnique: readStringListUniqueProvider,
      /* Array tools */
      arrayMerge: arrayMergeProvider,
      /* Object tools */
      setObjectUsingSchema: setObjectUsingSchemaProvider,
      getCheckedObject: getCheckedObjectProvider,
      /* $tools factory */
      $get: ['$filter', $get]
    };

    /**
     * @name _setDeviceInfo
     * @memberof source._shared.$toolsProvider
     *
     * @description
     * Method that set device info object.
     *
     * @param {Object} deviceObject
     * @return {Object}
     * @throws TypeError
     * @private
     */
    function _setDeviceInfo(deviceObject) {
      var _isObject = angular.isObject(deviceObject);
      var _hasOs = deviceObject.hasOwnProperty($.DEVICE_INFO_OS);
      var _hasBrowser = deviceObject.hasOwnProperty($.DEVICE_INFO_BROWSER);
      var _hasDevice = deviceObject.hasOwnProperty($.DEVICE_INFO_DEVICE);
      var _hasOsVersion = deviceObject.hasOwnProperty($.DEVICE_INFO_OS_VERSION);
      var _hasBrowserVersion = deviceObject.hasOwnProperty($.DEVICE_INFO_BROWSER_VERSION);
      if (_isObject && _hasOs && _hasBrowser && _hasDevice && _hasOsVersion && _hasBrowserVersion) {
        _deviceInfo = deviceObject;
      } else {
        throw new TypeError('Parameter received to set device info is not valid.');
      }
      return _deviceInfo;
    }

    /**
     * @name _convertString
     * @memberof source._shared.$toolsProvider
     *
     * @description
     * Function that encoding camelCase, or decoding camelCase, a given string.
     * TODO: Remove url not allowed chars using $.URL_NOT_ALLOWED_CHARS array
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
     * @name _readStringListStrict
     * @memberof source._shared.$toolsProvider
     *
     * @description
     * This method catch a list of elements as string separated comma or array of strings
     * and returns clean array only with string type elements.
     * If variable "uniqueElements" is defined as "true", de returned array will contain only
     * unique elements, no repeated elements.
     *
     * @param {String|Array} list
     * @param {Boolean} uniqueElements
     * @returns {Array}
     * @throws ReferenceError
     * @throws TypeError
     * @private
     */
    function _readStringListStrict(list, uniqueElements) {
      if (angular.isArray(list) || typeof list === 'string') {
        if (list.length) {
          list = (typeof list === 'string') ? list.split(',') : list ;
          var output = [];
          angular.forEach(list, function(element) {
            if (typeof element === 'string') {
              var _parsedElement = element.trim();
              var _conditionUnique = (uniqueElements && output.indexOf(_parsedElement) < 0);
              if (_conditionUnique || !uniqueElements) {
                output.push(_parsedElement);
              }
            }
          });
          if (output.length) {
            return output;
          } else {
            throw new ReferenceError('If given list is array type it must contain some string element.');
          }
        } else {
          throw new ReferenceError('Given variable "list" must be defined. Not void content.');
        }
      } else {
        throw new TypeError('Given list must be string type or array type. Received: "' + typeof list + '".');
      }
    }

    /**
     * @name _readStringList
     * @memberof source._shared.$toolsProvider
     *
     * @description
     * This method catch a list of elements as string separated comma, array of strings,
     * object or array of objects and returns clean array only with string type elements.
     * In case of object or array of objects given list, It's mandatory to send
     * the variable: "objectProperties" that is a list of object properties.
     * If variable "uniqueElements" is defined as "true", de returned array will contain only
     * unique elements, no repeated elements.
     *
     * @param {String|Array|Object} list
     * @param {String|Array} objectProperties
     * @param {Boolean} uniqueElements
     * @returns {Array}
     * @throws Error
     * @private
     */
    function _readStringList(list, objectProperties, uniqueElements) {
      objectProperties = (objectProperties) ? _readStringListStrict(objectProperties, uniqueElements) : undefined ;
      var output = list;
      var _error = '';
      if (angular.isObject(list) && !angular.isArray(list)) {
        if (objectProperties) {
          output = [];
          angular.forEach(objectProperties, function(value) {
            if (list.hasOwnProperty(value)) {
              output.push(list[value]);
            }
          });
        } else {
          _error = [
            'If given list is object type or array of objects, is mandatory',
            'to send properties list variable ("objectProperties").'
          ];
          throw new Error(_error.join(' '));
        }
      } else if (angular.isArray(list)) {
        var _arrayOfObjects = list.filter(angular.isObject);
        if (objectProperties) {
          output = [];
          angular.forEach(_arrayOfObjects, function(element) {
            angular.forEach(objectProperties, function(value) {
              if (element.hasOwnProperty(value)) {
                output.push(element[value]);
              }
            });
          });
        } else if (list.length === _arrayOfObjects.length) {
          _error = [
            'If given list is object type or array of objects, is mandatory',
            'to send properties list variable ("objectProperties").'
          ];
          throw new Error(_error.join(' '));
        }
      }
      return _readStringListStrict(output, uniqueElements);
    }

    /**
     * @name _doFriendlyUrl
     * @memberof source._shared.$toolsProvider
     *
     * @description
     * This method transform string separated width "separator" param (white space default)
     * and returns kebab-case string for use as friendly url.
     * TODO: Introduce errors control.
     *
     * @param {String} string
     * @param {String} separator
     * @returns {String}
     * @private
     */
    function _doFriendlyUrl(string, separator) {
      separator = separator || ' ';
      var _toCamelCase = _convertString(string, separator, $.FROM_OTHER_TO_CAMELCASE);
      var _re = new RegExp('(' + $.URL_NOT_ALLOWED_CHARS.join('|') + ')', 'g');
      return _convertString(_toCamelCase, '-', $.FROM_CAMELCASE_TO_OTHER).replace(_re, '');
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
        var _mergedArray = angular.copy(array1);
        array2.reduce(function(array, value) {
          if (array.indexOf(value) < 0) {
            array.push(value);
          }
          return array;
        }, _mergedArray);
        return _mergedArray;
      } else {
        var error = 'The "_arrayMerge" method expects two array arguments and at least one of them is not array.';
        throw new TypeError(error);
      }
    }

    /**
     * @name _twoFromOne
     * @memberof source._shared.$toolsProvider
     *
     * @description
     * Divide an array in two from a given array length.
     *
     * @param {Number} lengthToDivide
     * @param {Array} array
     * @return {Object}
     * @private
     */
    function _twoFromOne(lengthToDivide, array) {
      var output = {
        first: null,
        second: null
      };
      if (typeof lengthToDivide === 'number') {
        if (angular.isArray(array)) {
          output.first = array;
          var totalItems = array.length;
          if (totalItems > lengthToDivide) {
            var itemsFirst = Math.ceil(totalItems / 2);
            var itemsSecond = (totalItems - itemsFirst);
            output.first = array.slice(0, itemsFirst);
            output.second = array.slice(-itemsSecond);
          }
        } else {
          throw new TypeError('Expected array as second param typeof and received: "' + typeof array + '"');
        }
      } else {
        throw new TypeError('Expected number as first param typeof and received: "' + typeof lengthToDivide + '"');
      }
      return output;
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
      if (angular.isArray(object)) {
        return angular.copy(object).shift()[index];
      } else {
        return object[index];
      }
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
     * @param {Array} options --> "noExceptions": to prevent exceptions.
     * @returns {Object}
     * @private
     */
    function _setObjectUsingSchema(objectSchema, objectSettings, mergeOption, options) {
      var output = {};
      angular.forEach(objectSettings, function(item, key) {
        if (objectSchema.hasOwnProperty(key)) {
          output[key] = item;
        } else if (options.indexOf($.NO_EXCEPTIONS) < 0) {
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
     * @name _getCheckedObject
     * @memberof source._shared.$toolsProvider
     *
     * @description
     * General function with error control to get an object or one of its properties.
     *
     * @param {Object} objectToGet
     * @param {String} [propertyToGet]
     * @return {*}
     * @throws ReferenceError
     * @throws TypeError
     * @private
     */
    function _getCheckedObject(objectToGet, propertyToGet) {
      var _output = null;
      if (angular.isObject(objectToGet)) {
        propertyToGet = propertyToGet || null;
        if (propertyToGet) {
          if (typeof propertyToGet === 'string') {
            if (objectToGet.hasOwnProperty(propertyToGet)) {
              _output = objectToGet[propertyToGet];
            } else {
              var _propertyReferenceError = [
                'Requested property (' + propertyToGet + ')',
                'does not exist on object received.'
              ];
              throw new ReferenceError(_propertyReferenceError.join(' '));
            }
          } else {
            var _propertyTypeError = [
              'Invalid type of param property received in _getCheckedObject method.',
              'It must be string and type received is: "' + typeof objectToGet + '".'
            ];
            throw new TypeError(_propertyTypeError.join(' '));
          }
        } else {
          _output = objectToGet;
        }
      } else {
        var _objectTypeError = [
          'Invalid type of param object received in _getCheckedObject method.',
          'It must be object and type received is: "' + typeof objectToGet + '".'
        ];
        throw new TypeError(_objectTypeError.join(' '));
      }
      return _output;
    }

    /**
     * @name _dateToIso
     * @memberof source._shared.$toolsProvider
     *
     * @description
     * Method to transform any format date to ISO date.
     *
     * @param {*} date
     * @return {String}
     * @private
     */
    function _dateToIso(date) {
      return moment(date).toISOString();
    }

    /**
     * @name _cleanUrl
     * @memberof source._shared.$toolsProvider
     *
     * @description
     * This method cuts an URL string in separator string given and returns only first part.
     *
     * @param {String} url
     * @param {String} separator
     * @return {String}
     * @private
     */
    function _cleanUrl(url, separator) {
      var _arrayUrl = url.split(separator);
      if (_arrayUrl.length > 1) {
        _arrayUrl.pop();
      }
      return _arrayUrl.join('');
    }

    /**
     * @name setDeviceInfoProvider
     * @memberof source._shared.$toolsProvider
     *
     * @description
     * Provider exposed methods to set device info object.
     *
     * @param {Object} deviceObject
     * @return {Object}
     */
    function setDeviceInfoProvider(deviceObject) {
      return _setDeviceInfo(deviceObject);
    }

    /**
     * @name getDeviceInfoProvider
     * @memberof source._shared.$toolsProvider
     *
     * @description
     * Provider function that returns device info object.
     *
     * @param {String} [property]
     * @return {*}
     */
    function getDeviceInfoProvider(property) {
      return _getCheckedObject(_deviceInfo, property);
    }

    /**
     * @name readStringListProvider
     * @memberof source._shared.$toolsProvider.$tools
     *
     * @description
     * Public provider method for _readStringList returning repeated elements array.
     *
     * @param {String|Array|Object} list
     * @param {String|Array} [objectProperties]
     * @returns {Array}
     */
    function readStringListProvider(list, objectProperties) {
      objectProperties = objectProperties || null;
      return _readStringList(list, objectProperties, $.REPEATED_ELEMENTS);
    }

    /**
     * @name readStringListUniqueProvider
     * @memberof source._shared.$toolsProvider.$tools
     *
     * @description
     * Public provider method for _readStringList returning unique elements array.
     *
     * @param {String|Array|Object} list
     * @param {String|Array} [objectProperties]
     * @returns {Array}
     */
    function readStringListUniqueProvider(list, objectProperties) {
      objectProperties = objectProperties || null;
      return _readStringList(list, objectProperties, $.UNIQUE_ELEMENTS);
    }

    /**
     * @name arrayMergeProvider
     * @memberof source._shared.$toolsProvider
     *
     * @description
     * Exposed provider method for using _arrayMerge. Merges two arrays avoiding duplicate items.
     *
     * @param {Array} array1
     * @param {Array} array2
     * @returns {Array}
     */
    function arrayMergeProvider(array1, array2) {
      return _arrayMerge(array1, array2);
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
     * @param {Array} [options = []] --> "noExceptions": to prevent exceptions.
     * @returns {Object}
     */
    function setObjectUsingSchemaProvider(objectSchema, objectSettings, mergeOption, options) {
      mergeOption = mergeOption || $.NO_MERGE;
      options = options || [];
      return _setObjectUsingSchema(objectSchema, objectSettings, mergeOption, options);
    }

    /**
     * @name getCheckedObjectProvider
     * @memberof source._shared.$toolsProvider
     *
     * @description
     * Provider exposed function for _getCheckedObject.
     *
     * @param {Object} objectToGet
     * @param {String} [propertyToGet]
     * @return {*}
     */
    function getCheckedObjectProvider(objectToGet, propertyToGet) {
      return _getCheckedObject(objectToGet, propertyToGet);
    }

    /**
     * @namespace $tools
     * @memberof source._shared.$toolsProvider
     *
     * @requires $filter
     *
     * @description
     * Factory statement for several useful tools.
     */
    function $get($filter) {
      return {
        /* Global Constants */
        $: $,
        /* Config methods */
        setDeviceInfo: setDeviceInfo,
        getDeviceInfo: getDeviceInfo,
        /* String tools */
        camelCaseTo: camelCaseTo,
        toCamelCase: toCamelCase,
        ucWords: ucWords,
        getRandomString: getRandomString,
        readStringList: readStringList,
        readStringListUnique: readStringListUnique,
        doFriendlyUrl: doFriendlyUrl,
        /* Array tools */
        removeArrayItem: removeArrayItem,
        removeArrayKey: removeArrayKey,
        arrayMerge: arrayMerge,
        twoFromOne: twoFromOne,
        objectsArrayIndexOf: objectsArrayIndexOf,
        /* Object tools */
        getValueFromDotedKey: getValueFromDotedKey,
        parseObjectValues: parseObjectValues,
        setObjectUsingSchema: setObjectUsingSchema,
        getCheckedObject: getCheckedObject,
        /* Date tools */
        dateToIso: dateToIso,
        /* URL tools */
        cleanApiUrlForLocalUse: cleanApiUrlForLocalUse
      };

      /**
       * @name _objectsArrayIndexOf
       * @memberof source._shared.$toolsProvider.$tools
       *
       * @description
       * Returns array index for an array of objects.
       *
       * @param {Array} array
       * @param {Object} matchProperties
       * @return {Number}
       * @private
       */
      function _objectsArrayIndexOf(array, matchProperties) {
        var _output = null;
        if (angular.isArray(array) && angular.isObject(matchProperties)) {
          var _matchedObjectList = $filter('filter')(array, matchProperties);
          if (angular.isArray(_matchedObjectList) && _matchedObjectList.length === 1) {
            _output = array.indexOf(_matchedObjectList[0]);
          } else {
            throw new Error('Multiple array matching.');
          }
        } else {
          throw new TypeError('Expected array of objects like first method param and object like second param.');
        }
        return _output;
      }

      /**
       * @name setDeviceInfoProvider
       * @memberof source._shared.$toolsProvider.$tools
       *
       * @description
       * Factory exposed methods to set device info object.
       *
       * @param {Object} deviceObject
       * @return {Object}
       */
      function setDeviceInfo(deviceObject) {
        return _setDeviceInfo(deviceObject);
      }

      /**
       * @name getDeviceInfo
       * @memberof source._shared.$toolsProvider.$tools
       *
       * @description
       * Factory function that returns device info object.
       *
       * @param {String} [property]
       * @return {*}
       */
      function getDeviceInfo(property) {
        return _getCheckedObject(_deviceInfo, property);
      }

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
       * @name readStringList
       * @memberof source._shared.$toolsProvider.$tools
       *
       * @description
       * Public factory method for _readStringList returning repeated elements array.
       *
       * @param {String|Array|Object} list
       * @param {String|Array} [objectProperties]
       * @returns {Array}
       */
      function readStringList(list, objectProperties) {
        objectProperties = objectProperties || null;
        return _readStringList(list, objectProperties, $.REPEATED_ELEMENTS);
      }

      /**
       * @name readStringListUnique
       * @memberof source._shared.$toolsProvider.$tools
       *
       * @description
       * Public factory method for _readStringList returning unique elements array.
       *
       * @param {String|Array|Object} list
       * @param {String|Array} [objectProperties]
       * @returns {Array}
       */
      function readStringListUnique(list, objectProperties) {
        objectProperties = objectProperties || null;
        return _readStringList(list, objectProperties, $.UNIQUE_ELEMENTS);
      }

      /**
       * @name doFriendlyUrl
       * @memberof source._shared.$toolsProvider.$tools
       *
       * @description
       * Public factory method for _doFriendlyUrl.
       *
       * @param {String} string
       * @param {String} separator
       * @returns {String}
       */
      function doFriendlyUrl(string, separator) {
        return _doFriendlyUrl(string, separator);
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
       * @name twoFromOne
       * @memberof source._shared.$toolsProvider.$tools
       *
       * @description
       * Public factory method for using _twoFromOne. Divide an array in two from a given array length.
       *
       * @param {Number} lengthToDivide
       * @param {Array} array
       * @return {Object}
       */
      function twoFromOne(lengthToDivide, array) {
        return _twoFromOne(lengthToDivide, array);
      }

      /**
       * @name objectsArrayIndexOf
       * @memberof source._shared.$toolsProvider.$tools
       *
       * @description
       * Public factory method for using _objectsArrayIndexOf.
       *
       * @param {Array} array
       * @param {Object} matchProperties
       * @return {Number}
       */
      function objectsArrayIndexOf(array, matchProperties) {
        return _objectsArrayIndexOf(array, matchProperties);
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
       * @param {Array} [options = []] --> "noExceptions": to prevent exceptions.
       * @returns {Object}
       */
      function setObjectUsingSchema(objectSchema, objectSettings, mergeOption, options) {
        mergeOption = mergeOption || $.NO_MERGE;
        options = options || [];
        return _setObjectUsingSchema(objectSchema, objectSettings, mergeOption, options);
      }

      /**
       * @name getCheckedObject
       * @memberof source._shared.$toolsProvider.$tools
       *
       * @description
       * Factory exposed function for _getCheckedObject.
       *
       * @param {Object} objectToGet
       * @param {String} [propertyToGet]
       * @return {*}
       */
      function getCheckedObject(objectToGet, propertyToGet) {
        return _getCheckedObject(objectToGet, propertyToGet);
      }

      /**
       * @name dateToIso
       * @memberof source._shared.$toolsProvider.$tools
       *
       * @description
       * Factory exposed function to _dateToIso
       *
       * @param {*} date
       * @return {String}
       */
      function dateToIso(date) {
        return _dateToIso(date);
      }

      /**
       * @name cleanApiUrlForLocalUse
       * @memberof source._shared.$toolsProvider.$tools
       *
       * @description
       * Removes all API URL string part starting with "?" chart.
       *
       * @param {String} url
       * @return {String}
       */
      function cleanApiUrlForLocalUse(url) {
        return _cleanUrl(url, '?');
      }
    }
  }
})();
