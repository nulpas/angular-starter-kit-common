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
    var _animationEvents = $c.schemas.animationEvents;
    var _registeredAnimations = $c.schemas.registeredAnimations;

    return {
      $: $,
      setDomHandler: setDomHandlerProvider,
      getDomHandler: getDomHandlerProvider,
      setAnimationEvents: setAnimationEventsProvider,
      getAnimationEvents: getAnimationEventsProvider,
      createDomHandlerObject: createDomHandlerObjectProvider,
      createAnimationObject: createAnimationObjectProvider,
      $get: ['$filter', '$injector', '$tools', $get]
    };

    /**
     * @name _registerExternalAnimation
     * @memberof source.view-logic.$appViewProvider
     *
     * @description
     * Stores all animations different from defaults.
     *
     * @param {String|Object} animationData - It can be an Object or String.
     * @param {Boolean} animationMode
     * @return {Object}
     * @throws TypeError
     * @private
     */
    function _registerExternalAnimation(animationData, animationMode) {
      var _in = null;
      var _out = null;
      if (typeof animationData === 'string') {
        if (animationMode === $.MODE_ANIMATION_IN) {
          _in = animationData;
        } else {
          _out = animationData;
        }
      } else if (angular.isObject(animationData)) {
        _in = animationData.classAnimationShow || _in;
        _out = animationData.classAnimationHide || _out;
      } else {
        throw new TypeError('Wrong type of animation data: (' + typeof animationData + ')');
      }
      if (_in) {
        _registeredAnimations.in = $toolsProvider.arrayMerge(_registeredAnimations.in, [_in]);
      }
      if (_out) {
        _registeredAnimations.out = $toolsProvider.arrayMerge(_registeredAnimations.out, [_out]);
      }
      return _registeredAnimations;
    }

    /**
     * @name _getClassList
     * @memberof source.view-logic.$appViewProvider
     *
     * @description
     * Returns string list space separated of animation classes to apply to removeClass method.
     *
     * @param {Boolean} animationMode
     * @return {String}
     * @private
     */
    function _getClassList(animationMode) {
      var _animationObject = angular.copy(_registeredAnimations);
      var _animationList = null;
      if (animationMode === $.MODE_ANIMATION_IN) {
        _animationList = _animationObject.in;
        _animationList.push(_domHandler.classToShow);
        _animationList.push(_domHandler.classDefaultAnimationShow);
      } else {
        _animationList = _animationObject.out;
        _animationList.push(_domHandler.classToHide);
        _animationList.push(_domHandler.classDefaultAnimationHide);
      }
      _animationList.push($.ACTIVATE_ANIMATION_CLASS);
      return _animationList.join(' ');
    }

    /**
     * @name _getServiceObject
     * @memberof source.view-logic.$appViewProvider
     *
     * @description
     * Returns requested service object or one of its properties.
     *
     * @param {Object} serviceObject
     * @param {String} [property]
     * @return {*}
     * @private
     */
    function _getServiceObject(serviceObject, property) {
      return $toolsProvider.getCheckedObject(serviceObject, property);
    }

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
     * @name _setAnimationEvents
     * @memberof source.view-logic.$appViewProvider
     *
     * @description
     * Private function to setting animation events configuration object (_animationEvents).
     *
     * @param {Object} config
     * @returns {Object}
     * @private
     */
    function _setAnimationEvents(config) {
      _animationEvents = $toolsProvider.setObjectUsingSchema($c.schemas.animationEvents, config, _animationEvents);
      return _animationEvents;
    }

    /**
     * @name _createSchemaObject
     * @memberof source.view-logic.$appViewProvider
     *
     * @description
     * Returns an object with the same structure of given schema through given object.
     *
     * @param {Object} object
     * @param {String} schema
     * @return {Object}
     * @throws ReferenceError
     * @private
     */
    function _createSchemaObject(object, schema) {
      if ($c.schemas.hasOwnProperty(schema)) {
        return $toolsProvider.setObjectUsingSchema($c.schemas[schema], object);
      } else {
        throw new ReferenceError('Unknown given schema: (' + schema + ')');
      }
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
     * @name getDomHandlerProvider
     * @memberof source.view-logic.$appViewProvider
     *
     * @description
     * Provider exposed method to get _domHandler object.
     *
     * @param {String} [property]
     * @return {Object|String}
     */
    function getDomHandlerProvider(property) {
      return _getServiceObject(_domHandler, property);
    }

    /**
     * @name setAnimationEventsProvider
     * @memberof source.view-logic.$appViewProvider
     *
     * @description
     * Provider function that sets received object as _animationEvents object.
     *
     * @param {Object} receivedObject
     * @return {Object}
     */
    function setAnimationEventsProvider(receivedObject) {
      return _setAnimationEvents(receivedObject);
    }

    /**
     * @name getAnimationEventsProvider
     * @memberof source.view-logic.$appViewProvider
     *
     * @description
     * Provider exposed method to get _animationEvents object.
     *
     * @param {String} [property]
     * @return {*}
     */
    function getAnimationEventsProvider(property) {
      return _getServiceObject(_animationEvents, property);
    }

    /**
     * @name createDomHandlerObjectProvider
     * @memberof source.view-logic.$appViewProvider
     *
     * @description
     * Provider function exposed that create DOM handler object.
     *
     * @param {Object} domHandlerObject
     * @returns {Object}
     */
    function createDomHandlerObjectProvider(domHandlerObject) {
      return _createSchemaObject(domHandlerObject, $.SCHEMA_DOM_HANDLER);
    }

    /**
     * @name createAnimationObjectProvider
     * @memberof source.view-logic.$appViewProvider
     *
     * @description
     * Provider function exposed that create animation object.
     *
     * @param {Object} animationObject
     * @return {Object}
     */
    function createAnimationObjectProvider(animationObject) {
      return _createSchemaObject(animationObject, $.SCHEMA_ANIMATION);
    }

    /**
     * @namespace $appView
     * @memberof source.view-logic.$appViewProvider
     *
     * @requires $filter
     * @requires $injector
     * @requires $tools
     *
     * @description
     * Factory statement for application view provider.
     *
     * @param {Object} $filter
     * @param {Object} $injector
     * @param {Object} $tools
     * @returns {Object}
     */
    function $get($filter, $injector, $tools) {
      return {
        /* Global Constants */
        $: $,
        /* Config methods */
        setDomHandler: setDomHandlerService,
        getDomHandler: getDomHandlerService,
        setAnimationEvents: setAnimationEventsService,
        getAnimationEvents: getAnimationEventsService,
        createDomHandlerObject: createDomHandlerObjectService,
        createAnimationObject: createAnimationObjectService,
        /* View tools */
        applyFilter: applyFilter,
        processData: processData,
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
       * @param {String|Object} animationData - It can be an Object or String.
       * @private
       */
      function _displayWayElement(domElement, way, animationData) {
        way = way || $.SHOW;
        var _isEdge = ($tools.getDeviceInfo($.DEVICE_INFO_BROWSER) === $.BROWSER_EDGE);
        var _isIE = ($tools.getDeviceInfo($.DEVICE_INFO_BROWSER) === $.BROWSER_IE);
        var _noAnimationBrowser = (_isEdge || _isIE);
        var _animationEventsEndList = _animationEvents[$.ANIMATION_END].join(' ');
        var _animationIn = _domHandler.classDefaultAnimationShow;
        var _animationOut = _domHandler.classDefaultAnimationHide;
        if (_noAnimationBrowser) {
          if (way === $.SHOW_ANIMATION) {
            way = $.SHOW;
          } else {
            way = $.HIDE;
          }
        }
        if (animationData) {
          if (typeof animationData === 'string') {
            if (way === $.SHOW_ANIMATION) {
              _animationIn = animationData;
            } else if (way === $.HIDE_ANIMATION) {
              _animationOut = animationData;
            }
          } else if (angular.isObject(animationData)) {
            _animationIn = (animationData.classAnimationShow) ? animationData.classAnimationShow : _animationIn ;
            _animationOut = (animationData.classAnimationHide) ? animationData.classAnimationHide : _animationOut ;
          }
        }
        var _removeClassesShow = _getClassList($.MODE_ANIMATION_IN);
        var _removeClassesHide = _getClassList($.MODE_ANIMATION_OUT);
        switch (way) {
          case $.SHOW:
            domElement.removeClass(_removeClassesHide).addClass(_domHandler.classToShow);
            break;
          case $.HIDE:
            domElement.removeClass(_removeClassesShow).addClass(_domHandler.classToHide);
            break;
          case $.SHOW_ANIMATION:
            domElement
              .removeClass(_removeClassesHide)
              .addClass($.ACTIVATE_ANIMATION_CLASS + ' ' + _animationIn)
              .one(_animationEventsEndList, function() {
                domElement.attr('class', _domHandler.classToShow);
              });
            break;
          case $.HIDE_ANIMATION:
            domElement
              .removeClass(_removeClassesShow)
              .addClass($.ACTIVATE_ANIMATION_CLASS + ' ' + _animationOut)
              .one(_animationEventsEndList, function() {
                domElement.attr('class', _domHandler.classToHide);
              });
            break;
        }
      }

      /**
       * @name _setConcatWay
       * @memberof source.view-logic.$appViewProvider.$appView
       *
       * @description
       * Setting "glue" to concat array as string.
       * This is an auxiliary method for processData and _processDataObject.
       *
       * @param {Boolean|String} concatWay
       * @returns {String}
       * @private
       */
      function _setConcatWay(concatWay) {
        var output = '<br>';
        if ((typeof concatWay === 'boolean') && concatWay) {
          output = ', ';
        } else if (angular.isString(concatWay)) {
          output = concatWay;
        }
        return output;
      }

      /**
       * @name _processDataObject
       * @memberof source.view-logic.$appViewProvider.$appView
       *
       * @description
       * Processing data (only objects) to show filtered or formatted.
       * This is an auxiliary method for processData.
       *
       * @param {Object} data
       * @param {Object} config
       * @param {Object} completeRowData
       * @returns {String}
       * @throws TypeError
       * @private
       */
      function _processDataObject(data, config, completeRowData) {
        if (angular.isObject(data)) {
          var _outputAux = [];
          var _outputNamesAux = [];
          var _displayConcat = _setConcatWay(config[$.DATA_CONFIG_DISPLAY_CONCAT]);
          if (config[$.DATA_CONFIG_NAME].indexOf('.') > -1) {
            _outputAux.push($tools.getValueFromDotedKey(completeRowData, config[$.DATA_CONFIG_NAME]));
            var _arrayAux = config[$.DATA_CONFIG_NAME].split('.');
            _outputNamesAux.push(_arrayAux.pop());
          } else if (config[$.DATA_CONFIG_DISPLAY_PROPERTIES]) {
            var _auxDisplayProperties = config[$.DATA_CONFIG_DISPLAY_PROPERTIES];
            if (typeof _auxDisplayProperties === 'string') {
              _auxDisplayProperties = _auxDisplayProperties.split(',').map(function(element) {
                return element.trim();
              });
            }
            var _maskWay = false;
            var _masks = [];
            angular.forEach(_auxDisplayProperties, function(value) {
              if (data.hasOwnProperty(value)) {
                _outputAux.push(data[value]);
                _outputNamesAux.push(value);
                _maskWay = (_maskWay || $.IS_NOT_MASK);
              } else {
                var _conditionStart = (value.indexOf($.DISPLAY_PROPERTIES_MASK_START) === 0);
                var _conditionEnd = (value.substr(-1) === $.DISPLAY_PROPERTIES_MASK_END);
                if (_conditionStart && _conditionEnd) {
                  var _newMask = value.slice(0, -1).slice($.DISPLAY_PROPERTIES_MASK_START.length);
                  _masks.push($.MASK_WRAPPER + _newMask + $.MASK_WRAPPER);
                  _outputAux.push($.MASK_LABEL);
                  _outputNamesAux.push($.MASK_LABEL);
                  _maskWay = (_maskWay || $.IS_MASK);
                }
              }
            });
            if (_maskWay) {
              var _outputAuxString = _outputAux.join($.MASK_GLUE);
              var _outputNamesAuxString = _outputNamesAux.join($.MASK_GLUE);
              var _evalOutputAux = _outputAuxString.split($.MASK_LABEL);
              var _evalOutputNamesAux = _outputNamesAuxString.split($.MASK_LABEL);
              if (!angular.copy(_evalOutputAux).shift()) {
                _evalOutputAux.shift();
                _evalOutputNamesAux.shift();
              }
              if (!angular.copy(_evalOutputAux).pop()) {
                /* Last mask is ignored: */
                _evalOutputAux.pop();
                _evalOutputNamesAux.pop();
                _masks.pop();
              }
              if (_masks.length < _evalOutputAux.length) {
                /* Prevent use of displayConcat property: */
                _masks = [$.MASK_WRAPPER + _displayConcat + $.MASK_WRAPPER].concat(_masks);
              }
              _outputAux = [];
              _outputNamesAux = [];
              angular.forEach(_evalOutputAux, function(value, key) {
                var _evalElement = value.split($.MASK_GLUE);
                var _evalElementNames = _evalOutputNamesAux[key].split($.MASK_GLUE);
                if (!angular.copy(_evalElement).shift()) {
                  _evalElement.shift();
                  _evalElementNames.shift();
                }
                if (!angular.copy(_evalElement).pop()) {
                  _evalElement.pop();
                  _evalElementNames.pop();
                }
                if (_evalElement.length > 1) {
                  var _usingMask = _masks[key].split($.MASK_WRAPPER).join('');
                  angular.forEach(_evalElement, function(item, itemKey) {
                    _outputAux.push(item);
                    _outputNamesAux.push(_evalElementNames[itemKey]);
                    if (itemKey < (_evalElement.length - 1)) {
                      _outputAux.push(_usingMask);
                      _outputNamesAux.push($.MASK_LABEL);
                    }
                  });
                } else {
                  _outputAux.push(_evalElement[0]);
                  _outputNamesAux.push(_evalElementNames[0]);
                }
                if (key < (_evalOutputAux.length - 1)) {
                  _outputAux.push(_masks[key + 1].split($.MASK_WRAPPER).join(''));
                  _outputNamesAux.push($.MASK_LABEL);
                }
              });
            }
            _outputAux.push(_maskWay);
            var _maskWayLabel = (_maskWay) ? $.HAS_MASK_LABEL : $.NOT_HAS_MASK_LABEL ;
            _outputNamesAux.push(_maskWayLabel);
          } else {
            angular.forEach(data, function(value, key) {
              _outputAux.push(value);
              _outputNamesAux.push(key);
            });
          }

          var _outputArrayAux = [];
          angular.forEach(_outputAux, function(value, key) {
            var _condition01 = (_outputNamesAux[key] !== $.MASK_LABEL);
            var _condition02 = (_outputNamesAux[key] !== $.HAS_MASK_LABEL);
            var _condition03 = (_outputNamesAux[key] !== $.NOT_HAS_MASK_LABEL);
            if (_condition01 && _condition02 && _condition03) {
              var _filtered = applyFilter(value, config[$.DATA_CONFIG_FILTER], config[$.DATA_CONFIG_FILTER_PARAMS]);
              var _filteredOk = (_filtered) ? _filtered : '' ;
              var _names = (config[$.DATA_CONFIG_DISPLAY_PROPERTIES_NAME]) ? _outputNamesAux[key] + ': ' : '' ;
              _outputArrayAux.push(_names + _filteredOk);
            } else {
              _outputArrayAux.push(value);
            }
          });

          var _concatWay = (_outputArrayAux.pop()) ? '' : _displayConcat ;
          return _outputArrayAux.join(_concatWay);
        } else {
          throw new TypeError('Data given is not an object: ("' + data + '")');
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
       * @name getDomHandlerService
       * @memberof source.view-logic.$appViewProvider.$appView
       *
       * @description
       * Factory exposed method to get _domHandler object.
       *
       * @param {String} [property]
       * @return {Object|String}
       */
      function getDomHandlerService(property) {
        return _getServiceObject(_domHandler, property);
      }

      /**
       * @name setAnimationEventsProvider
       * @memberof source.view-logic.$appViewProvider.$appView
       *
       * @description
       * Factory function that sets received object as _animationEvents object.
       *
       * @param {Object} receivedObject
       * @return {Object}
       */
      function setAnimationEventsService(receivedObject) {
        return _setAnimationEvents(receivedObject);
      }

      /**
       * @name getAnimationEventsService
       * @memberof source.view-logic.$appViewProvider.$appView
       *
       * @description
       * Factory exposed method to get _animationEvents object.
       *
       * @param {String} [property]
       * @return {*}
       */
      function getAnimationEventsService(property) {
        return _getServiceObject(_animationEvents, property);
      }

      /**
       * @name createDomHandlerObjectService
       * @memberof source.view-logic.$appViewProvider.$appView
       *
       * @description
       * Factory function exposed that create DOM handler object.
       *
       * @param {Object} domHandlerObject
       * @returns {Object}
       */
      function createDomHandlerObjectService(domHandlerObject) {
        return _createSchemaObject(domHandlerObject, $.SCHEMA_DOM_HANDLER);
      }

      /**
       * @name createAnimationObjectService
       * @memberof source.view-logic.$appViewProvider.$appView
       *
       * @description
       * Factory function exposed that create animation object.
       *
       * @param {Object} animationObject
       * @return {Object}
       */
      function createAnimationObjectService(animationObject) {
        return _createSchemaObject(animationObject, $.SCHEMA_ANIMATION);
      }

      /**
       * @name applyFilter
       * @memberof source.view-logic.$appViewProvider.$appView
       *
       * @description
       * Returns data with given filter applied.
       *
       * @param {*} data
       * @param {String} filterName
       * @param {Object} [filterParams]
       * @returns {*}
       * @throws ReferenceError
       */
      function applyFilter(data, filterName, filterParams) {
        var output = data;
        if (data && filterName) {
          if ($injector.has(filterName + 'Filter')) {
            output = $filter(filterName)(data, filterParams);
          } else {
            throw new ReferenceError('Unknown filter: "' + filterName + '".');
          }
        }
        return output;
      }

      /**
       * @name processData
       * @memberof source.view-logic.$appViewProvider.$appView
       *
       * @description
       * Processing data to show filtered or formatted.
       *
       * @param {*} data
       * @param {Object} config
       * @param {Object} [completeDataRow]
       * @throws Error
       * @throws ReferenceError
       * @returns {String}
       */
      function processData(data, config, completeDataRow) {
        if (config[$.DATA_CONFIG_NAME].indexOf('.') > -1) {
          data = $tools.getValueFromDotedKey(completeDataRow, config[$.DATA_CONFIG_NAME]);
        }
        if (angular.isObject(config) && Object.keys(config).length) {
          if (config.hasOwnProperty($.DATA_CONFIG_NAME)) {
            completeDataRow = completeDataRow || null;
            var _config = $tools.setObjectUsingSchema($c.schemas.dataConfig, config, $.NO_MERGE, [$.NO_EXCEPTIONS]);
            var _filter = _config[$.DATA_CONFIG_FILTER];
            var _filterParams = _config[$.DATA_CONFIG_FILTER_PARAMS];

            var output = '';
            if (angular.isArray(data)) {
              var _outputArrayAux = [];
              angular.forEach(data, function(value) {
                if (angular.isObject(value)) {
                  _outputArrayAux.push(_processDataObject(value, _config, completeDataRow));
                } else {
                  _outputArrayAux.push(applyFilter(value, _filter, _filterParams));
                }
              });
              output = _outputArrayAux.join(_setConcatWay(_config[$.DATA_CONFIG_DISPLAY_CONCAT]));
            } else if (angular.isObject(data)) {
              output = _processDataObject(data, _config, completeDataRow);
            } else {
              output = applyFilter(data, _filter, _filterParams);
            }
            return (output) ? output : '' ;
          } else {
            throw new ReferenceError('Name is not defined for data field ("' + data + '") in configuration object.');
          }
        } else {
          throw new Error('Configuration given is not an Object or configuration Object is void.');
        }
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
       * @throws TypeError
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
       * @param {Boolean} [activateAnimation]
       * @param {String|Object} [animationData]
       */
      function showElement(domElement, activateAnimation, animationData) {
        activateAnimation = activateAnimation || false;
        var _showWay = (activateAnimation) ? $.SHOW_ANIMATION : $.SHOW ;
        if (animationData) {
          _registerExternalAnimation(animationData, $.MODE_ANIMATION_IN);
        }
        _displayWayElement(domElement, _showWay, animationData);
      }

      /**
       * @name hideElement
       * @memberof source.view-logic.$appViewProvider.$appView
       *
       * @description
       * Applies CSS classes to hide given DOM element.
       *
       * @param {Object} domElement
       * @param {Boolean} [activateAnimation]
       * @param {String|Object} [animationData]
       */
      function hideElement(domElement, activateAnimation, animationData) {
        activateAnimation = activateAnimation || false;
        var _hideWay = (activateAnimation) ? $.HIDE_ANIMATION : $.HIDE ;
        if (animationData) {
          _registerExternalAnimation(animationData, $.MODE_ANIMATION_OUT);
        }
        _displayWayElement(domElement, _hideWay, animationData);
      }
    }
  }
})();
