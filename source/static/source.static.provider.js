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
