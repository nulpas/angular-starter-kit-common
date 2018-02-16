(function() {
  'use strict';

  angular
    .module('source.numbers')
    /**
     * @namespace money
     * @memberof source.numbers
     *
     * @requires $filter
     * @requires $numbers
     *
     * @description
     * Filter that shows numbers as currency format with currency symbol.
     */
    .filter('money', money)

    /**
     * @namespace numeric
     * @memberof source.numbers
     *
     * @requires $filter
     * @requires $tools
     *
     * @description
     * Filter that shows numbers as numeric format.
     */
    .filter('numeric', numeric);

  money.$inject = ['$filter', '$numbers'];

  function money($filter, $numbers) {
    return _money;

    /**
     * @name _money
     * @memberof source.numbers.money
     *
     * @description
     * Private function for "money" filter.
     * Returns data formatted if variable "data" is a valid number or returns the same input data.
     *
     * @param {*} data
     * @param {Object} [filterParams]
     * @returns {String|*}
     * @private
     */
    function _money(data, filterParams) {
      var _output = data;
      if (angular.isNumber(data)) {
        var _params = $numbers.setParams(filterParams, $numbers.$.CURRENCY);
        _output = $filter('currency')(data, _params[$numbers.$.SYMBOL], _params[$numbers.$.FRACTION]);
        _output += (_params[$numbers.$.COMPOUND]) ? ' ' + _params[$numbers.$.COMPOUND] : '' ;
      }
      return _output;
    }
  }

  numeric.$inject = ['$filter', '$numbers'];

  function numeric($filter, $numbers) {
    return _numeric;

    /**
     * @name _numeric
     * @memberof source.numbers.numeric
     *
     * @description
     * Private function for "numeric" filter.
     * Returns data formatted if variable "data" is a valid number or returns the same input data.
     *
     * @param {*} data
     * @param {Object} [filterParams]
     * @returns {String|*}
     * @private
     */
    function _numeric(data, filterParams) {
      var _output = data;
      if (angular.isNumber(data)) {
        var _params = $numbers.setParams(filterParams, $numbers.$.CURRENCY);
        _output = $filter('number')(data, _params[$numbers.$.FRACTION]);
        _output += (_params[$numbers.$.SYMBOL]) ? _params[$numbers.$.SYMBOL] : '' ;
        _output += (_params[$numbers.$.COMPOUND]) ? ' ' + _params[$numbers.$.COMPOUND] : '' ;
      }
      return _output;
    }
  }
})();
