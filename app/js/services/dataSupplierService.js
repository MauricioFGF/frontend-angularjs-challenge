var dataSupplierService = angular.module("dataSupplierService", []);

dataSupplierService.factory("DataChunk", [
  function ($interval) {
    return {
      weights: [],
      getBuffer: function (bufferSize, weights) {
        this.weights = weights;
        var i;
        var buffer = " ";
        for (i = 0; i < bufferSize; i++) buffer += this.getChunk();
        return buffer;
      },
      getChunk: function () {
        return this.getBit() * 16 + this.getBit() * 4 + this.getBit() * 1 + " ";
      },
      getBit: function () {
        return this.weight(Math.random());
      },
      weight: function (randomNumber) {
        var range = this.weights[0];
        var i = 1;

        do {
          if (randomNumber < range) return i - 1;

          range += this.weights[i];
          i++;
        } while (i <= this.weights.length);

        return i - 1;
      },
    };
  },
]);
