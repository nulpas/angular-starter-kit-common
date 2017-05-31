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
