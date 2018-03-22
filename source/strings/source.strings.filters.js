(function() {
  'use strict';

  angular
    .module('source.strings')
    /**
     * @namespace truncate
     * @memberof source.strings
     *
     * @requires $filter
     * @requires $numbers
     *
     * @description
     * Filter that truncates string in a given number of words.
     */
    .filter('truncate', truncate);

  truncate.$inject = ['$filter', '$strings'];

  function truncate($filter, $strings) {
    return _truncate;

    /**
     * @name _truncate
     * @memberof source.strings.truncate
     *
     * @description
     * Private function for "truncate" filter.
     * Returns data truncated if variable "data" is a valid string or returns the same input data.
     * TODO: Select string to separate words.
     * TODO: Select string to scape truncate string ('...').
     * TODO: Select truncate by words or by characters number.
     * TODO: Compare last char in last item with array of possibilities (['.', ',', ';', ':']).
     * TODO: Develop best errors control.
     *
     * @param {*} data
     * @param {Object} [filterParams]
     * @returns {String|*}
     * @private
     */
    function _truncate(data, filterParams) {
      var _output = data;
      if (typeof data === 'string') {
        var _params = $strings.setParams(filterParams, $strings.$.TRUNCATE);
        if (angular.isNumber(_params[$strings.$.WORDS])) {
          var _auxArray = data.split(' ');
          var _newArray = _auxArray.slice(0, _params[$strings.$.WORDS]);
          if (_auxArray.length > _newArray.length) {
            var _lastItem = _newArray.pop();
            var _lastChar = _lastItem.substr(-1);
            if (_lastChar === '.' || _lastChar === ',' || _lastChar === ';' || _lastChar === ':') {
              _lastItem = _lastItem.slice(0, (_lastItem.length - 1));
            }
            _newArray.push(_lastItem + '...');
          }
          _output = _newArray.join(' ');
        } else {
          throw new TypeError('Param "words" must be a number.');
        }
      }
      return _output;
    }
  }
})();
