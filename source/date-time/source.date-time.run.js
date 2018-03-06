(function() {
  'use strict';

  angular
    .module('source.date-time')
    .run(dateTimeRun);

  dateTimeRun.$inject = ['$mdDateLocale', '$translate'];

  function dateTimeRun($mdDateLocale, $translate) {
    console.log('#################################################');
    console.log($mdDateLocale);
    console.log($translate.getCurrentLanguage());
  }
})();
