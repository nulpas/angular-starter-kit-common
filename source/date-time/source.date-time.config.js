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

  dateTimeConfig.$inject = ['$mdDateLocaleProvider'];

  function dateTimeConfig($mdDateLocaleProvider) {
    moment.tz.setDefault(moment.tz.guess());

    $mdDateLocaleProvider.formatDate = function(date) {
      return (date) ? moment(date).format('DD/MM/YYYY') : '' ;
    };
  }
})();
