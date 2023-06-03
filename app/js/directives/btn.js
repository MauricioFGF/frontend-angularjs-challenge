MinIONApp.directive("btn", [
  function () {
    return {
      restrict: "AE",
      replace: true,
      scope: { name: "@", value: "@", click: "&", id: "@", disabled: "=" },
      templateUrl: "components/btn.html",
    };
  },
]);
