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
