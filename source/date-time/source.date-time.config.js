(function() {
  'use strict';

  angular
    .module('source.date-time')
    /**
     * @namespace dateTimeConfig
     * @memberof source.date-time
     *
     * @description
     * Config statement for datetime module.
     */
    .config(dateTimeConfig);

  function dateTimeConfig() {
    moment.tz.setDefault(moment.tz.guess());
  }
})();
