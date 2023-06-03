MinIONApp.directive("nucleotideCard", [
  function () {
    return {
      restrict: "AE",
      replace: true,
      scope: { color: "@", name: "@", probability: "@", click: "&" },
      templateUrl: "components/nucleotideCard.html",
    };
  },
]);
