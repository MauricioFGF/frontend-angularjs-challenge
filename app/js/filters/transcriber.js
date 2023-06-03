"use strict";

MinIONAppFilters.filter("transcriber", function () {
  return function (input) {
    var groups = input.split(" ");
    var output = " ";
    var acids = {
      A: 0,
      G: 1,
      T: 2,
      C: 3,
    };

    groups.forEach(function (d) {
      output +=
        acids[d.charAt(0)] * 16 +
        acids[d.charAt(1)] * 4 +
        acids[d.charAt(2)] +
        " ";
    });
    return output;
  };
});
