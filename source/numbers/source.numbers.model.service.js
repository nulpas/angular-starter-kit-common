(function() {
  'use strict';

  angular
    .module('source.numbers')
    /**
     * @namespace numbersModel
     * @memberof source.numbers
     *
     * @description
     * Service that defines constants and schemas for numbers module.
     */
    .service('numbersModel', numbersModel);

  function numbersModel() {
    /* jshint validthis: true */
    /**
     * @name constants
     * @memberof source.numbers.numbersModel
     *
     * @type {Object}
     * @property {String} CURRENCY
     * @property {String} NUMBER
     * @property {String} SYMBOL
     * @property {String} FRACTION
     * @property {String} COMPOUND
     */
    this.constants = {
      CURRENCY: 'currency',
      NUMBER: 'number',

      SYMBOL: 'symbol',
      FRACTION: 'fractionSize',
      COMPOUND: 'compound'
    };

    /**
     * @name schemas
     * @memberof source.numbers.numbersModel
     *
     * @type {Object}
     * @property {Object} currency
     * @property {String} currency.symbol
     * @property {Number} currency.fractionSize
     * @property {Number|String} currency.compound
     * @property {Object} number
     * @property {String} number.symbol
     * @property {Number} number.fractionSize
     * @property {Number|String} number.compound
     */
    this.schemas = {
      currency: {
        symbol: null,
        fractionSize: null,
        compound: null
      },
      number: {
        symbol: null,
        fractionSize: null,
        compound: null
      }
    };
  }
})();
