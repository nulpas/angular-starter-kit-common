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
      SHOW: 1,
      HIDE: 2
    };
    var $ = angular.extend({}, _constants, $toolsProvider.$);

    var _providerModel = {
      schemas: {
        domHandler: {
          classToShow: null,
          classToHide: null
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
       * Returns appView model for Provider.
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
