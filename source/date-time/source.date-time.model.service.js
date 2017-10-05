(function() {
  'use strict';

  angular
    .module('source.date-time')
    /**
     * @namespace dateTimeModel
     * @memberof source.date-time
     *
     * @description
     * Service that defines constants for date time module.
     */
    .service('dateTimeModel', dateTimeModel);

  function dateTimeModel() {
    /* jshint validthis: true */
    /**
     * @name momentCalendarFormat
     * @memberof source.date-time.dateTimeModel
     *
     * @type {Object}
     * @property {String} sameDay
     * @property {String} nextDay
     * @property {String} nextWeek
     * @property {String} lastDay
     * @property {String} lastWeek
     * @property {String} sameElse
     */
    this.momentCalendarFormat = {
      sameDay: '[hoy]',
      nextDay: '[mañana]',
      nextWeek: '[próximo] dddd',
      lastDay: '[ayer]',
      lastWeek: 'dddd [pasado]',
      sameElse: 'DD/MM/YYYY'
    };
  }
})();
