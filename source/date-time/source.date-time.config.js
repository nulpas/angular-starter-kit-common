(function() {
  'use strict';

  angular
    .module('source.date-time')
    .config(dateTimeConfig);

  function dateTimeConfig() {
    moment.tz.setDefault(moment.tz.guess());
  }
})();
