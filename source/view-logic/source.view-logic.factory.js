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
      /* Global Constants */
      $: $,
      /* View tools */
      applyFilter: _applyFilter,
      /* DOM tools */
      checkElementByClass: _checkElementByClass
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
     * @name  _checkElementByClass
     * @memberof source.view-logic.$appView
     *
     * @description
     * Checks if the given "domElement" contains any of the classes received in parameter "classes".
     * Parameter "classes" can be string or array of strings.
     *
     * @param {Object} domElement
     * @param {String|Array} classes
     * @returns {String|Boolean}
     * @private
     */
    function _checkElementByClass(domElement, classes) {
      var _output = false;
      var _classes = classes || null;
      var _isString = (typeof _classes === 'string');
      var _isArray = angular.isArray(_classes);
      if (_isString || _isArray) {
        _classes = (_isString) ? [classes] : classes ;
        angular.forEach(_classes, function(item) {
          if (domElement.classList.contains(item)) {
            _output = item;
          }
        });
      } else {
        throw new TypeError('Invalid type of parameter "classes". It must be string or array.');
      }
      return _output;
    }
  }
})();
