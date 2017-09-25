(function() {
  'use strict';

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
    var _literalPromises = null;
    var _literals = null;

    return {
      /* Global Constants */
      $: $,
      /* Provider LITERALS tools */
      setSource: setProviderSource,
      /* API Factory */
      $get: ['$api', $get]
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
     * @memeberof source.literals.$literalsProvider
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
    function $get($api) {
      return {
        $: $,
        get: getLiterals
      };

      function _setLiteralsPromises() {
        _literalPromises = [];
        angular.forEach(_source, function(item) {
          var entityObject = $api.createEntityObject({
            entityName: item,
            forceToOne: true
          });
          _literalPromises.push($api.getLocalEntity(entityObject));
        });
        return _literalPromises;
      }

      function _getLiterals() {

      }

      function getLiterals() {
        return (_literals) ? _literals : _getLiterals() ;
      }
    }
  }
})();
