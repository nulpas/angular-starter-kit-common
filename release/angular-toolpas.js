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
      'chart.js',
      'LocalStorageModule',
      'dndLists',
      /* Source Core Modules */
      'source._shared',
      'source.api',
      'source.date-time',
      'source.router',
      'source.static',
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
     * Definition of module "date time" for several tools and filters with datetime data.
     */
    .module('source.date-time', []);
})();

(function() {
  'use strict';

  /**
   * @namespace $urlRouterProvider
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
        throw new Error(errorMessage.alert + ' ' + errorMessage.console + ' ' + errorMessage.helper);
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
      return moment(date).format('DD/MM/YYYY');
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
    .filter('age', age);

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
     * @memberof source.date-time.dateMonthReduced
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
        var _isArraySource = (angular.isArray(_source));
        var _literalPromises = [];
        angular.forEach(_source, function(itemDir, keyDir) {
          if (_isArraySource) {
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

      ACTIVATE_ANIMATION_CLASS: 'animated'
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
      $get: ['$filter', '$tools', $get]
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
     *
     * @description
     * Factory statement for application view provider.
     */
    function $get($filter, $tools) {
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
       * @name _applyFilter
       * @memberof source.view-logic.$appViewProvider.$appView
       *
       * @description
       * Returns data with given filter applied.
       *
       * @param {*} data
       * @param {String} filterName
       * @returns {*}
       */
      function applyFilter(data, filterName) {
        return $filter(filterName)(data);
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
      },

      DEVICE_INFO_OS: 'os',
      DEVICE_INFO_BROWSER: 'browser',
      DEVICE_INFO_DEVICE: 'device',
      DEVICE_INFO_OS_VERSION: 'os_version',
      DEVICE_INFO_BROWSER_VERSION: 'browser_version',

      BROWSER_IE: 'ie',
      BROWSER_EDGE: 'ms-edge',
      BROWSER_CHROME: 'chrome'
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
      /* Array tools */
      arrayMerge: arrayMergeProvider,
      /* Object tools */
      setObjectUsingSchema: setObjectUsingSchemaProvider,
      getCheckedObject: getCheckedObjectProvider,
      /* $tools factory */
      $get: [$get]
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
     * @returns {Object}
     */
    function setObjectUsingSchemaProvider(objectSchema, objectSettings, mergeOption) {
      mergeOption = mergeOption || $.NO_MERGE;
      return _setObjectUsingSchema(objectSchema, objectSettings, mergeOption);
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
     * @description
     * Factory statement for several useful tools.
     */
    function $get() {
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
        /* Array tools */
        removeArrayItem: removeArrayItem,
        removeArrayKey: removeArrayKey,
        arrayMerge: arrayMerge,
        twoFromOne: twoFromOne,
        /* Object tools */
        getValueFromDotedKey: getValueFromDotedKey,
        parseObjectValues: parseObjectValues,
        setObjectUsingSchema: setObjectUsingSchema,
        getCheckedObject: getCheckedObject,
        /* Date tools */
        dateToIso: dateToIso
      };

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
    }
  }
})();
