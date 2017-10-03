(function() {
  'use strict';

  angular
    .module('source.date-time')
    /**
     * @namespace onlyHour
     * @memberof source.date-time
     *
     * @description
     * Filter that shows hour in format 0-24 for a complete date given.
     */
    .filter('onlyHour', onlyHour);

  function onlyHour() {
    return _onlyHour;

    /**
     * @name _onlyHour
     * @memberof source.date-time.onlyHour
     *
     * @description
     * Private function for "onlyHour" filter.
     * Returns date formatted if variable "date" is a valid date or the same input data.
     *
     * @param {*} date
     * @returns {string|*}
     * @private
     */
    function _onlyHour(date) {
      return (Date.parse(date)) ? moment.utc(date).format('HH:mm') : date ;
    }
  }
})();
