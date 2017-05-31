(function() {
  'use strict';

  angular
    .module('source.translate', [])
    /**
     * @namespace translate
     * @memberof source.translate
     *
     * @requires $translate
     *
     * @description
     * Filter for translating labels.
     */
    .filter('translate', translate);

  translate.$inject = ['$translate'];

  function translate($translate) {
    return function(input) {
      return $translate.getTranslations()[input] !== undefined ? $translate.getTranslations()[input] : input;
    };
  }
})();
