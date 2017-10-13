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
      SCHEMA_REGISTERED_EXTERNAL_ANIMATIONS: 'registeredExternalAnimations',

      SHOW: 1,
      HIDE: 2,
      SHOW_ANIMATION: 3,
      HIDE_ANIMATION: 4,

      ANIMATION: true,
      NO_ANIMATION: false,

      MODE_ANIMATION_IN: true,
      MODE_ANIMATION_OUT: false,

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
