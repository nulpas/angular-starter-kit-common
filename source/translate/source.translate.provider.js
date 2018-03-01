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
      $get: ['$q', '$api', 'translateModel', $get]
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
    function $get($q, $api, translateModel) {
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
