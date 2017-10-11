(function() {
  'use strict';

  angular
    .module('source.view-logic')
    /**
     * @namespace $appViewProvider
     * @memberof source.view-logic
     *
     * @requires $toolsProvider
     * @requires appViewModelProvider
     *
     * @description
     * Provider statement for some helper methods about view presentation logic.
     */
    .provider('$appView', $appView);

  $appView.$inject = ['$toolsProvider', 'appViewModelProvider'];

  function $appView($toolsProvider, appViewModelProvider) {
    var $ = appViewModelProvider.$;
    var $c = appViewModelProvider.get();
    var _domHandler = $c.schemas.domHandler;

    return {
      $: $,
      setDomHandler: setDomHandlerProvider,
      createDomHandlerObject: createDomHandlerObjectProvider,
      $get: ['$filter', $get]
    };

    /**
     * @name _setDomHandler
     * @memberof source.view-logic.$appViewProvider
     *
     * @description
     * Private function to setting DOM handler configuration object (_domHandler).
     *
     * @param {Object} config
     * @returns {Object}
     * @private
     */
    function _setDomHandler(config) {
      _domHandler = $toolsProvider.setObjectUsingSchema($c.schemas.domHandler, config, _domHandler);
      return _domHandler;
    }

    /**
     * @name _createDomHandlerObject
     * @memberof source.view-logic.$appViewProvider
     *
     * @description
     * Returns an object with the same structure of DOM handler schema through given DOM handler object.
     *
     * @param {Object} domHandlerObject
     * @returns {Object}
     * @private
     */
    function _createDomHandlerObject(domHandlerObject) {
      return $toolsProvider.setObjectUsingSchema($c.schemas.domHandler, domHandlerObject);
    }

    /**
     * @name _setDomHandlerProvider
     * @memberof source.view-logic.$appViewProvider
     *
     * @description
     * Provider function to setting DOM handler configuration object (_domHandler).
     *
     * @param {Object} config --> Given DOM handler configuration object.
     * @returns {Object}
     */
    function setDomHandlerProvider(config) {
      return _setDomHandler(config);
    }

    /**
     * @name createDomHandlerObjectProvider
     * @memberof source.view-logic.$appViewProvider
     *
     * @description
     * Provider function exposed for _createDomHandlerObject.
     *
     * @param {Object} domHandlerObject
     * @returns {Object}
     */
    function createDomHandlerObjectProvider(domHandlerObject) {
      return _createDomHandlerObject(domHandlerObject);
    }

    /**
     * @namespace $appView
     * @memberof source.view-logic.$appViewProvider
     *
     * @requires $filter
     *
     * @description
     * Factory statement for application view provider.
     */
    function $get($filter) {
      return {
        /* Global Constants */
        $: $,
        /* Config methods */
        setDomHandler: setDomHandlerService,
        createDomHandlerObject: createDomHandlerObjectService,
        /* View tools */
        applyFilter: applyFilter,
        /* DOM tools */
        checkElementByClass: checkElementByClass,
        show: showElement,
        hide: hideElement
      };

      /**
       * @name _displayWayElement
       * @memberof source.view-logic.$appViewProvider.$appView
       *
       * @description
       * Apply display mode to DOM element given.
       *
       * @param {Object} domElement
       * @param {Number} way
       * @private
       */
      function _displayWayElement(domElement, way) {
        way = way || $.SHOW;
        switch (way) {
          case $.SHOW:
            domElement.removeClass(_domHandler.classToHide).addClass(_domHandler.classToShow);
            break;
          case $.HIDE:
            domElement.removeClass(_domHandler.classToShow).addClass(_domHandler.classToHide);
            break;
        }
      }

      /**
       * @name _setDomHandlerService
       * @memberof source.view-logic.$appViewProvider.$appView
       *
       * @description
       * Factory function to setting DOM handler configuration object (_domHandler).
       *
       * @param {Object} config --> Given DOM handler configuration object.
       * @returns {Object}
       */
      function setDomHandlerService(config) {
        return _setDomHandler(config);
      }

      /**
       * @name createDomHandlerObjectService
       * @memberof source.view-logic.$appViewProvider.$appView
       *
       * @description
       * Factory function exposed for _createDomHandlerObject.
       *
       * @param {Object} domHandlerObject
       * @returns {Object}
       */
      function createDomHandlerObjectService(domHandlerObject) {
        return _createDomHandlerObject(domHandlerObject);
      }

      /**
       * @name _applyFilter
       * @memberof source.view-logic.$appViewProvider.$appView
       *
       * @description
       * Returns data with given filter applied.
       *
       * @param {*} data
       * @param {String} filterName
       * @returns {*}
       */
      function applyFilter(data, filterName) {
        return $filter(filterName)(data);
      }

      /**
       * @name  _checkElementByClass
       * @memberof source.view-logic.$appViewProvider.$appView
       *
       * @description
       * Checks if the given "domElement" contains any of the classes received in parameter "classes".
       * Parameter "classes" can be string or array of strings.
       *
       * @param {Object} domElement
       * @param {String|Array} classes
       * @returns {String|Boolean}
       */
      function checkElementByClass(domElement, classes) {
        var _output = false;
        var _classes = classes || null;
        var _isString = (typeof _classes === 'string');
        var _isArray = angular.isArray(_classes);
        if (_isString || _isArray) {
          _classes = (_isString) ? [classes] : classes ;
          angular.forEach(_classes, function(item) {
            if (domElement.classList.contains(item)) {
              _output = item;
            }
          });
        } else {
          throw new TypeError('Invalid type of parameter "classes". It must be string or array.');
        }
        return _output;
      }

      /**
       * @name showElement
       * @memberof source.view-logic.$appViewProvider.$appView
       *
       * @description
       * Applies CSS classes to show given DOM element.
       *
       * @param {Object} domElement
       */
      function showElement(domElement) {
        return _displayWayElement(domElement, $.SHOW);
      }

      /**
       * @name hideElement
       * @memberof source.view-logic.$appViewProvider.$appView
       *
       * @description
       * Applies CSS classes to hide given DOM element.
       *
       * @param {Object} domElement
       */
      function hideElement(domElement) {
        return _displayWayElement(domElement, $.HIDE);
      }
    }
  }
})();
