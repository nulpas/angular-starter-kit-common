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
    .filter('dateMonthReduced', dateMonthReduced)

    /**
     * @namespace age
     * @memberof source.date-time
     *
     * @description
     * Filter that shows number of years between given date and current dateTime.
     */
    .filter('age', age)

    /**
     * @namespace completeDateHour
     * @memberof source.date-time
     *
     * @description
     * Filter that shows complete date and complete hour.
     */
    .filter('completeDateHour', completeDateHour);

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
     * @name _dateReducedHour
     * @memberof source.date-time.dateReducedHour
     *
     * @description
     * Private function for "dateReducedHour" filter.
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
     * @name _dateMonthReduced
     * @memberof source.date-time.dateMonthReduced
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

  function age() {
    return _age;

    /**
     * @name _age
     * @memberof source.date-time.age
     *
     * @description
     * Private function for "age" filter.
     * Returns date formatted if variable "date" is a valid date or the same input data.
     *
     * @param {*} date
     * @returns {String|*}
     * @private
     */
    function _age(date) {
      return (Date.parse(date)) ? Math.abs(moment(date).diff(moment(), 'years')) : date ;
    }
  }

  function completeDateHour() {
    return _completeDateHour;

    /**
     * @name _completeDateHour
     * @memberof source.date-time.completeDateHour
     *
     * @description
     * Returns complete date with numbers and complete hour.
     *
     * @param {*} date
     * @returns {String|*}
     * @private
     */
    function _completeDateHour(date) {
      return (Date.parse(date)) ? moment(date).format('D/MM/YYYY HH:mm:ss') : date ;
    }
  }
})();
