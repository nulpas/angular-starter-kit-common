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

  translate.$inject = ['$tools', '$translate', 'translateModel'];

  function translate($tools, $translate, translateModel) {
    var $ = translateModel.$;
    var $c = translateModel.get();
    return _translate;

    /**
     * @name _translate
     * @memberof source.translate.translate
     *
     * @description
     * Filter that search for translation of given content.
     *
     * @param {String|Object} input
     * @returns {String}
     * @throws TypeError
     * @throws ReferenceError
     * @private
     */
    function _translate(input) {
      var _output = $.NO_TRANSLATION;
      if (typeof input === 'string') {
        _output = input;
      } else if (angular.isObject(input)) {
        var _config = $tools.setObjectUsingSchema($c.schemas.dataConfig, input, $.NO_MERGE, [$.NO_EXCEPTIONS]);
        if (_config.hasOwnProperty($.DATA_CONFIG_LITERAL)) {
          _output = _config[$.DATA_CONFIG_LITERAL];
        } else if (_config.hasOwnProperty($.DATA_CONFIG_NAME)) {
          _output = _config[$.DATA_CONFIG_NAME];
        } else {
          console.warn('Config given does not have properties "name" or "literal": ' + input);
        }
      } else {
        throw new TypeError('Type not allowed for input: (' + typeof input + ').');
      }
      var _inputDotCase = _output.split('.');
      var _lookingFor = angular.copy(_inputDotCase).pop();
      var _t = $translate.getTranslations();
      if (angular.isObject(_t) && Object.keys(_t).length) {
        if (_t.hasOwnProperty(_output)) {
          _output = _t[_output];
        } else if ((_inputDotCase.length > 1) && _t.hasOwnProperty(_lookingFor)) {
          _output = _t[_lookingFor];
        } else {
          console.warn('No translation for "' + _output + '".');
        }
      } else {
        throw new ReferenceError('There are no translations available. Revise $translate service initialization.');
      }
      if (angular.isArray(_output)) {
        _output = _output.join('<br>');
      }
      return _output;
    }
  }
})();
