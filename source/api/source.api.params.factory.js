(function() {
  'use strict';

  angular.module('source.api')
    .factory('$params', [
      '$tools',
      'apiData',
      function($tools, apiData) {
        var $c = apiData.constants;
        var requestParams = angular.extend({}, $c.paramObject, $c.bpmnParamObject);

        var _partialClear = function() {
          requestParams = angular.extend({}, requestParams, $c.paramObject);
          return requestParams;
        };

        var _totalClear = function() {
          requestParams = angular.extend({}, $c.paramObject, $c.bpmnParamObject);
          return requestParams;
        };

        return {
          //# Reset Methods
          clearAll: function() {
            return _totalClear();
          },
          clear: function() {
            return _partialClear();
          },

          //# Filter Methods
          getFilters: function() {
            return requestParams.queryFilter;
          },
          addFilter: function(item) {
            requestParams.queryFilter.push(item);
            return requestParams;
          },
          removeFilter: function(item) {
            requestParams.queryFilter = $tools.removeArrayItem(requestParams.queryFilter, item);
            return requestParams;
          },

          //# Order Methods
          getOrders: function() {
            return requestParams.order;
          },
          addOrder: function(item) {
            requestParams.order.push(item);
            return requestParams;
          },
          removeOrder: function(item) {
            requestParams.order = $tools.removeArrayItem(requestParams.order, item);
            return requestParams;
          },

          //# Last Page Methods
          setNextPage: function() {
            requestParams.lastPage ++;
            return requestParams;
          },
          clearLastPage: function() {
            requestParams.lastPage = 0;
          },

          //# Format params in order to request API:
          setParams: function() {
            var parameters = {};
            if (requestParams.bpmnFilter || requestParams.queryFilter.length) {
              parameters.$filter = '';
              if (requestParams.bpmnFilter) {
                parameters.$filter += requestParams.bpmnFilter;
              }
              if (requestParams.queryFilter.length) {

              }
            }
            if (requestParams.top) {
              parameters.$top = requestParams.top;
            }
            var skip = requestParams.skip * requestParams.lastPage;
            if (skip) {
              parameters.$skip = skip;
            }

            // var parameters = {
            //   $orderby: '',
            //   $top: requestParams.top,
            //   $skip: requestParams.skip * requestParams.lastPage
            // };
            // if (queryParams.filter.length > 0) {
            //   parameters.$filter = '';
            //   for (var j = 0; j < queryParams.filter.length; j++) {
            //     if (j !== 0) {
            //       parameters.$filter += ' AND ';
            //     }
            //     parameters.$filter += queryParams.filter[j].field.name + ' ' + queryParams.filter[j].condition;
            //   }
            // }
            //
            // for (var i = 0; i < queryParams.order.length; i++) {
            //   parameters.$orderby +=
            //     queryParams.order[i].name + ' ' + (queryParams.order[i].orderDescending ? 'desc' : 'asc') + ',';
            // }
            // while (parameters.$orderby.includes('.')) {
            //   parameters.$orderby = parameters.$orderby.replace('.', '/');
            // }
            // return parameters;
          }
        };
      }
    ]);
})();
