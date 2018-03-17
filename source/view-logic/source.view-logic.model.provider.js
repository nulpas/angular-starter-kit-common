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
