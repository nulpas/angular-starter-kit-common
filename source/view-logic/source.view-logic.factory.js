(function() {
  'use strict';

  angular
    .module('source.view-logic')
    /**
     * @namespace $appView
     * @memberof source.view-logic
     *
     * @requires $filter
     * @requires globalConstants
     *
     * @description
     * Factory statement for some helper methods about view presentation logic.
     */
    .factory('$appView', $appView);

  $appView.$inject = ['$filter', 'globalConstants'];

  function $appView($filter, globalConstants) {
    var $ = globalConstants.get();

    return {
      $: $,
      applyFilter: applyFilter
    };

    /**
     * @name _applyFilter
     * @memberof source.view-logic.$appView
     *
     * @description
     * Returns data with given filter applied.
     *
     * @param {*} data
     * @param {String} filterName
     * @returns {*}
     * @private
     */
    function _applyFilter(data, filterName) {
      return $filter(filterName)(data);
    }

    /**
     * @name applyFilter
     * @memberof source.view-logic.$appView
     *
     * @description
     * Public method for _applyFilter.
     *
     * @param {*} data
     * @param {String} filterName
     * @returns {*}
     */
    function applyFilter(data, filterName) {
      return _applyFilter(data, filterName);
    }
  }
})();
