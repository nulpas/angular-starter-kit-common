(function() {
  'use strict';

  angular
    .module('source.strings')
    /**
     * @namespace $strings
     * @memberof source.strings
     *
     * @requires $tools
     * @requires stringsModel
     *
     * @description
     * Helper service to strings module.
     */
    .factory('$strings', $strings);

  $strings.$inject = ['$tools', 'stringsModel'];

  function $strings($tools, stringsModel) {
    var $ = angular.extend({}, stringsModel.constants, $tools.$);

    return {
      $: $,
      setParams: _setParams
    };

    /**
     * @name _setParams
     * @memberof source.strings.$strings
     *
     * @description
     * Set the filter params to define several string filter configurations.
     *
     * @param {Object} filterParams
     * @param {String} [paramsMode]
     * @return {Object}
     * @private
     */
    function _setParams(filterParams, paramsMode) {
      filterParams = filterParams || {};
      paramsMode = paramsMode || $.TRUNCATE;
      var _output = {};
      if (stringsModel.schemas.hasOwnProperty(paramsMode)) {
        if (filterParams && angular.isObject(filterParams)) {
          var _params = $tools.setObjectUsingSchema(stringsModel.schemas[paramsMode], filterParams, {});
          angular.forEach(_params, function(value, property) {
            var _condition = (filterParams.hasOwnProperty(property) && value);
            _output[property] = (_condition) ? value : undefined ;
          });
        }
        return _output;
      } else {
        throw new ReferenceError('Unknown numeric params mode: ' + paramsMode);
      }
    }
  }
})();
