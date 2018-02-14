(function() {
  'use strict';

  angular
    .module('source.numbers')
    /**
     * @namespace $numbers
     * @memberof source.numbers
     *
     * @requires $tools
     * @requires numbersModel
     *
     * @description
     * Helper service to numbers module.
     */
    .factory('$numbers', $numbers);

  $numbers.$inject = ['$tools', 'numbersModel'];

  function $numbers($tools, numbersModel) {
    var $ = angular.extend({}, numbersModel.constants, $tools.$);

    return {
      $: $,
      setParams: _setParams
    };

    /**
     * @name _setParams
     * @memberof source.numbers.$numbers
     *
     * @description
     * Set the filter params to define several numeric filter configurations.
     *
     * @param {Object} filterParams
     * @param {String} [paramsMode]
     * @return {Object}
     * @private
     */
    function _setParams(filterParams, paramsMode) {
      filterParams = filterParams || {};
      paramsMode = paramsMode || $.NUMBER;
      var _output = {};
      if (numbersModel.schemas.hasOwnProperty(paramsMode)) {
        if (filterParams && angular.isObject(filterParams)) {
          var _params = $tools.setObjectUsingSchema(numbersModel.schemas[paramsMode], filterParams, {});
          angular.forEach(_params, function(value, property) {
            var _condition = (filterParams.hasOwnProperty(property) && value);
            _output[property] = (_condition) ? value : undefined ;
          });
          _output[$.SYMBOL] = (_output[$.SYMBOL]) ? ' ' + _output[$.SYMBOL] : undefined ;
          _output[$.COMPOUND] = (_output[$.COMPOUND]) ? _output[$.COMPOUND] : '' ;
        }
        return _output;
      } else {
        throw new ReferenceError('Unknown numeric params mode: ' + paramsMode);
      }
    }
  }
})();
