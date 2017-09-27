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
    var _literals = null;

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
