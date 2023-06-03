var dataCollectionService = angular.module("dataCollectionService", [
  "sequenceMatcherService",
  "MinIONAppFilters",
  "dataSupplierService",
]);

dataCollectionService.factory("DataCollection", [
  "$interval",
  "transcriberFilter",
  "SequenceMatcher",
  "DataChunk",
  function ($interval, transcriberFilter, SequenceMatcher, DataChunk) {
    return {
      interval: "",
      stop: function () {
        $interval.cancel(this.interval);
      },
      start: function (rate, bufferSize, global, buffer, sequences, weights) {
        this.interval = $interval(function () {
          global.counter += bufferSize;
          buffer = DataChunk.getBuffer(bufferSize, weights);
          angular.forEach(
            sequences,
            function (value, key) {
              var d = this[key];
              d.rate += SequenceMatcher.count(
                transcriberFilter(d.structure),
                buffer
              );
              d.prob = (d.rate * 100) / global.counter;
            },
            sequences
          );
        }, rate);
      },
    };
  },
]);
