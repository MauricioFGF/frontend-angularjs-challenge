MinIONApp.directive("minionRectangle", [
  function () {
    return {
      restrict: "AE",
      replace: true,
      scope: { color: "@" },
      templateUrl: "components/minionRectangle.html",
    };
  },
]);
