var sequenceMatcherService = angular.module("sequenceMatcherService", []);

sequenceMatcherService.factory("SequenceMatcher", [
  function () {
    return {
      count: function (needle, haystack) {
        var count = 0;
        var pos = haystack.indexOf(needle);

        while (pos !== -1) {
          count++;
          pos = haystack.indexOf(needle, pos + 1);
        }

        return count;
      },
    };
  },
]);
