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
     *
     * @returns {Object}
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
