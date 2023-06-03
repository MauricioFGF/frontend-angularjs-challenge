var backendService = angular.module("backendService", ["ngResource"]);

backendService.factory("BackendConnection", [
  "$resource",
  "$filter",
  "$window",
  "Color",
  "$http",
  function ($resource, $filter, $window, Color, $http) {
    return {
      Data: $resource("strands/strands.json"),
      save: function (sequences, counter) {
        var report = sequences.slice(0);

        report.push({
          samples: counter,
          date: $filter("date")(Date.now(), "medium"),
        });
        $http.post("report.txt", report).success(function () {
          $window.location.href = "/report.txt";
        });
      },
      get: function () {
        var data = this.Data.query(function (data) {
          angular.forEach(
            data,
            function (value, key) {
              this[key].color = Color.get(key);
            },
            data
          );
        });

        return data;
      },
    };
  },
]);
