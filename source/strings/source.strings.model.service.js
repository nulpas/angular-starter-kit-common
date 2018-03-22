(function() {
  'use strict';

  angular
    .module('source.strings')
    /**
     * @namespace stringsModel
     * @memberof source.strings
     *
     * @description
     * Service that defines constants and schemas for strings module.
     */
    .service('stringsModel', stringsModel);

  function stringsModel() {
    /* jshint validthis: true */
    /**
     * @name constants
     * @memberof source.strings.stringsModel
     *
     * @type {Object}
     * @property {String} TRUNCATE
     * @property {String} WORDS
     */
    this.constants = {
      TRUNCATE: 'truncate',

      WORDS: 'words'
    };

    /**
     * @name schemas
     * @memberof source.strings.stringsModel
     *
     * @type {Object}
     * @property {Object} truncate
     * @property {Number} truncate.words
     */
    this.schemas = {
      truncate: {
        words: null
      }
    };
  }
})();
