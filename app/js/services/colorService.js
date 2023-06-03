var colorService = angular.module("colorService", []);

colorService.factory("Color", [
  function () {
    return {
      get: d3.scale.category20(),
    };
  },
]);
