(function() {
  'use strict';

  angular
    .module('source.date-time')
    /**
     * @namespace onlyHour
     * @memberof source.date-time
     *
     * @description
     * Filter that shows hour in "0-24" format for a complete date given.
     */
    .filter('onlyHour', onlyHour)

    /**
     * @namespace untilNow
     * @memberof source.date-time
     *
     * @requires dateTimeModel
     *
     * @description
     * Filter that shows human string for elapsed time.
     */
    .filter('untilNow', untilNow)

    /**
     * @namespace dateReducedHour
     * @memberof source.date-time
     *
     * @description
     * Filter that shows hour in "0-24" format and date with string month but without year.
     */
    .filter('dateReducedHour', dateReducedHour)

    /**
     * @namespace dateMonthReduced
     * @memberof source.date-time
     *
     * @description
     * Filter that shows date with string abbreviated month.
     */
    .filter('dateMonthReduced', dateMonthReduced);

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
     * @returns {String|*}
     * @private
     */
    function _onlyHour(date) {
      return (Date.parse(date)) ? moment(date).format('HH:mm') : date ;
    }
  }

  untilNow.$inject = ['dateTimeModel'];

  function untilNow(dateTimeModel) {
    return _untilNow;

    /**
     * @name _untilNow
     * @memberof source.date-time.untilNow
     *
     * @description
     * Private function for "untilNow" filter.
     * Returns locale string expressing elapsed time if variable "date" is a valid date or the same input data.
     *
     * @param {*} date
     * @returns {String|*}
     * @private
     */
    function _untilNow(date) {
      return (Date.parse(date)) ? moment(date).calendar(null, dateTimeModel.momentCalendarFormat) : date ;
    }
  }

  function dateReducedHour() {
    return _dateReducedHour;

    /**
     * @name _dateReduceHour
     * @memberof source.date-time.dateReduceHour
     *
     * @description
     * Private function for "dateReduceHour" filter.
     * Returns date formatted if variable "date" is a valid date or the same input data.
     *
     * @param {*} date
     * @returns {String|*}
     * @private
     */
    function _dateReducedHour(date) {
      return (Date.parse(date)) ? moment(date).format('D MMMM - HH:mm') : date ;
    }
  }

  function dateMonthReduced() {
    return _dateMonthReduced;

    /**
     * @name _dateReduceHour
     * @memberof source.date-time.dateReduceHour
     *
     * @description
     * Private function for "dateMonthReduced" filter.
     * Returns date formatted if variable "date" is a valid date or the same input data.
     *
     * @param {*} date
     * @returns {String|*}
     * @private
     */
    function _dateMonthReduced(date) {
      return (Date.parse(date)) ? moment(date).format('D MMM YYYY') : date ;
    }
  }
})();
