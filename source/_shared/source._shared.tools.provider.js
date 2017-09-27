(function() {
  'use strict';

  angular
    .module('source._shared')
    /**
     * @namespace $toolsProvider
     * @memberof source._shared
     *
     * @description
     * Provider statement for several useful tools.
     */
    .provider('$tools', $tools);

  $tools.$inject = ['globalConstantsProvider'];

  function $tools(globalConstantsProvider) {
    var $ = globalConstantsProvider.get();

    return {
      /* Global constants */
      $: $,
      /* Object tools */
      setObjectUsingSchema: setObjectUsingSchemaProvider,
      $get: [$get]
    };

    /**
     * @name _convertString
     * @memberof source._shared.$toolsProvider
     *
     * @description
     * Function that encoding camelCase, or decoding camelCase, a given string.
     *
     * @param {String} string
     * @param {String} char
     * @param {Boolean} conversionType
     * @returns {String}
     * @private
     */
    function _convertString(string, char, conversionType) {
      if (string !== undefined && conversionType !== undefined) {
        var defaultChar = (char) ? char : '-' ;
        if (conversionType === $.FROM_CAMELCASE_TO_OTHER) {
          return string.replace(/([A-Z])/g, function($1) {
            return defaultChar + $1.toLowerCase();
          });
        } else {
          var output = string.split(defaultChar).map(function(item) {
            return item.charAt(0).toUpperCase() + item.slice(1);
          }).join('');
          return output.charAt(0).toLowerCase() + output.slice(1);
        }
      } else {
        throw new ReferenceError('Function parameters missing.');
      }
    }

    /**
     * @name _ucWords
     * @memberof source._shared.$toolsProvider
     *
     * @description
     * Returns given string with first letter in uppercase.
     *
     * @param {String} string
     * @returns {string}
     * @private
     */
    function _ucWords(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    /**
     * @name _getRandomString
     * @memberof source._shared.$toolsProvider
     *
     * @description
     * Returns random string with given number of chars.
     *
     * @param {Number} stringLength --> Number of chars for random string
     * @returns {string}
     * @private
     */
    function _getRandomString(stringLength) {
      var output = '';
      var possibilities = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      for (var i = 0; i < stringLength; i++) {
        output += possibilities.charAt(Math.floor(Math.random() * possibilities.length));
      }
      return output;
    }

    /**
     * @name _removeFromArray
     * @memberof source._shared.$toolsProvider
     *
     * @description
     * Removes an element from an array from a given value or from a given key. Returns given array without the
     * element we want to remove.
     *
     * @param {Array} arrayVar
     * @param {Number|String|Object} givenVar
     * @param {Boolean} mode
     * @returns {Array}
     * @private
     */
    function _removeFromArray(arrayVar, givenVar, mode) {
      var key = givenVar;
      if (mode === $.MODE_VALUE) {
        key = arrayVar.indexOf(givenVar);
      }
      if ((key) && (key > -1)) {
        arrayVar.splice(key, 1);
      }
      return arrayVar;
    }

    /**
     * @name _arrayMerge
     * @memberof source._shared.$toolsProvider
     *
     * @description
     * Merges two arrays avoiding duplicate items.
     *
     * @param {Array} array1
     * @param {Array} array2
     * @returns {Array}
     * @private
     */
    function _arrayMerge(array1, array2) {
      if (angular.isArray(array1) && angular.isArray(array2)) {
        return array2.reduce(function(array, key) {
          if (array.indexOf(key) < 0) {
            array.push(key);
          }
          return array;
        }, array1);
      } else {
        var error = 'The "_arrayMerge" method expects two array arguments and at least one of them is not array.';
        throw new TypeError(error);
      }
    }

    /**
     * @name _index
     * @memberof source._shared.$toolsProvider
     *
     * @description
     * Auxiliary function used for reduction in getValueFromDotedKey.
     *
     * @param {Object} object
     * @param {String} index
     * @returns {*}
     * @private
     */
    function _index(object, index) {
      return object[index];
    }

    /**
     * @name _getValueFromDotedKey
     * @memberof source._shared.$toolsProvider
     *
     * @description
     * Allows dot notation traversing (Example: object["a.b.c"] in object["a"]["b"]["c"]).
     * Returns undefined value instead of exception if no key in object.
     *
     * @param {Object} object
     * @param {String} dotedKey
     * @returns {*|Undefined}
     * @private
     */
    function _getValueFromDotedKey(object, dotedKey) {
      if (object[dotedKey] !== undefined) {
        return object[dotedKey];
      }
      try {
        return dotedKey.split('.').reduce(_index, object);
      } catch (e) {
        if (e instanceof TypeError) {
          return undefined;
        } else {
          throw e;
        }
      }
    }

    /**
     * @name _parseObjectValues
     * @memberof source._shared.$toolsProvider
     *
     * @description
     * Parses keysObject to assign correct values from collection valuesObject.
     *
     * @param {Object} keysObject
     * @param {Object} valuesObject
     * @returns {Object}
     */
    function _parseObjectValues(keysObject, valuesObject) {
      var output = {};
      if (typeof keysObject === 'object') {
        output = angular.copy(keysObject);
        for (var index in keysObject) {
          if (keysObject.hasOwnProperty(index) && valuesObject.hasOwnProperty(keysObject[index])) {
            output[index] = valuesObject[keysObject[index]];
          }
        }
      }
      return output;
    }

    /**
     * @name _setObjectUsingSchema
     * @memberof source._shared.$toolsProvider
     *
     * @description
     * Returns an object with values given in "objectSettings" following the pattern given by "objectSchema".
     * Throws an exception error if "objectSettings" does not fit "objectSchema".
     * Settings Object will be merged depending on variable "mergeOption".
     *
     * @param {Object} objectSchema
     * @param {Object} objectSettings
     * @param {Boolean|Object} mergeOption --> If Boolean: true to merge with schema, false no merge with schema.
     *                                     --> If Object, merge with given object.
     * @returns {Object}
     * @private
     */
    function _setObjectUsingSchema(objectSchema, objectSettings, mergeOption) {
      var output = {};
      angular.forEach(objectSettings, function(item, key) {
        if (objectSchema.hasOwnProperty(key)) {
          output[key] = item;
        } else {
          throw new Error('Trying to set an unknown property ("' + key + '") in target object.');
        }
      });
      if (mergeOption) {
        var mergeCondition = (typeof mergeOption === 'object');
        return (mergeCondition) ? angular.extend({}, mergeOption, output) : angular.extend({}, objectSchema, output) ;
      } else {
        return output;
      }
    }

    /**
     * @name setObjectUsingSchemaProvider
     * @memberof source._shared.$toolsProvider
     *
     * @description
     * Returns an object with values given in "objectSettings" following the pattern given by "objectSchema".
     * Settings Object will be merged depending on optional variable "mergeOption".
     * Provider function.
     *
     * @param {Object} objectSchema
     * @param {Object} objectSettings
     * @param {Boolean|Object} [mergeOption = false] --> If Boolean: true to merge schema, false no merge with schema.
     *                                               --> If Object, merge with given object.
     * @returns {Object}
     */
    function setObjectUsingSchemaProvider(objectSchema, objectSettings, mergeOption) {
      mergeOption = mergeOption || $.NO_MERGE;
      return _setObjectUsingSchema(objectSchema, objectSettings, mergeOption);
    }

    /**
     * @namespace $tools
     * @memberof source._shared.$toolsProvider
     *
     * @description
     * Factory statement for several useful tools.
     */
    function $get() {
      return {
        /* Global Constants */
        $: $,
        /* String tools */
        camelCaseTo: camelCaseTo,
        toCamelCase: toCamelCase,
        ucWords: ucWords,
        getRandomString: getRandomString,
        /* Array tools */
        removeArrayItem: removeArrayItem,
        removeArrayKey: removeArrayKey,
        arrayMerge: arrayMerge,
        /* Object tools */
        getValueFromDotedKey: getValueFromDotedKey,
        parseObjectValues: parseObjectValues,
        setObjectUsingSchema: setObjectUsingSchema
      };

      /**
       * @name camelCaseTo
       * @memberof source._shared.$toolsProvider.$tools
       *
       * @description
       * Returns a string decoded from camelCase to a char separator way.
       *
       * @param {String} string
       * @param {String} char
       * @returns {String}
       */
      function camelCaseTo(string, char) {
        return _convertString(string, char, $.FROM_CAMELCASE_TO_OTHER);
      }

      /**
       * @name toCamelCase
       * @memberof source._shared.$toolsProvider.$tools
       *
       * @description
       * Returns a string encoded in camelCase way from any string with char separator.
       *
       * @param {String} string
       * @param {String} char
       * @returns {String}
       */
      function toCamelCase(string, char) {
        return _convertString(string, char, $.FROM_OTHER_TO_CAMELCASE);
      }

      /**
       * @name ucWords
       * @memberof source._shared.$toolsProvider.$tools
       *
       * @description
       * Public factory method for using _ucWords. Returns given string with first letter in uppercase.
       *
       * @param {String} string
       * @returns {string}
       */
      function ucWords(string) {
        return _ucWords(string);
      }

      /**
       * @name getRandomString
       * @memberof source._shared.$toolsProvider.$tools
       *
       * @description
       * Returns random string with given number of chars.
       *
       * @param {Number} stringLength --> Number of chars for random string
       * @returns {string}
       */
      function getRandomString(stringLength) {
        return _getRandomString(stringLength);
      }

      /**
       * @name removeArrayItem
       * @memberof source._shared.$toolsProvider.$tools
       *
       * @description
       * Removes a value given from an array. Returns modified array.
       *
       * @param {Array} arrayVar
       * @param {String|Object} item
       * @returns {Array}
       */
      function removeArrayItem(arrayVar, item) {
        return _removeFromArray(arrayVar, item, $.MODE_VALUE);
      }

      /**
       * @name removeArrayKey
       * @memberof source._shared.$toolsProvider.$tools
       *
       * @description
       * Removes a key given from an array. Returns modified array.
       *
       * @param {Array} arrayVar
       * @param {Number} key
       * @returns {Array}
       */
      function removeArrayKey(arrayVar, key) {
        return _removeFromArray(arrayVar, key, $.MODE_KEY);
      }

      /**
       * @name arrayMerge
       * @memberof source._shared.$toolsProvider.$tools
       *
       * @description
       * Public factory method for using _arrayMerge. Merges two arrays avoiding duplicate items.
       *
       * @param {Array} array1
       * @param {Array} array2
       * @returns {Array}
       */
      function arrayMerge(array1, array2) {
        return _arrayMerge(array1, array2);
      }

      /**
       * @name getValueFromDotedKey
       * @memberof source._shared.$toolsProvider.$tools
       *
       * @description
       * Allows dot notation traversing (Example: object["a.b.c"] in object["a"]["b"]["c"]).
       * Returns undefined value instead of exception if no key in object.
       *
       * @param {Object} object
       * @param {String} dotedKey
       * @returns {*|Undefined}
       */
      function getValueFromDotedKey(object, dotedKey) {
        return _getValueFromDotedKey(object, dotedKey);
      }

      /**
       * @name parseObjectValues
       * @memberof source._shared.$toolsProvider.$tools
       *
       * @description
       * Parses keysObject to assign correct values from collection valuesObject.
       *
       * @param {Object} keysObject
       * @param {Object} valuesObject
       * @returns {Object}
       */
      function parseObjectValues(keysObject, valuesObject) {
        return _parseObjectValues(keysObject, valuesObject);
      }

      /**
       * @name setObjectUsingSchema
       * @memberof source._shared.$toolsProvider.$tools
       *
       * @description
       * Returns an object with values given in "objectSettings" following the pattern given by "objectSchema".
       * Settings Object will be merged depending on optional variable "mergeOption".
       *
       * @param {Object} objectSchema
       * @param {Object} objectSettings
       * @param {Boolean|Object} [mergeOption = true] --> If Boolean: true to merge schema, false no merge with schema.
       *                                              --> If Object, merge with given object.
       * @returns {Object}
       */
      function setObjectUsingSchema(objectSchema, objectSettings, mergeOption) {
        mergeOption = mergeOption || $.NO_MERGE;
        return _setObjectUsingSchema(objectSchema, objectSettings, mergeOption);
      }
    }
  }
})();
