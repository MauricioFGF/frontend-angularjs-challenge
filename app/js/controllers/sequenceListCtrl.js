"use strict";
MinIONApp.controller("sequenceListCtrl", [
  "$scope",
  "Dialog",
  "$http",
  "DataChunk",
  "$interval",
  "transcriberFilter",
  "SequenceMatcher",
  "$window",
  "$filter",
  "Color",
  "SequenceEditor",
  "BackendConnection",
  "DataCollection",
  function (
    $scope,
    Dialog,
    $http,
    DataChunk,
    $interval,
    transcriberFilter,
    SequenceMatcher,
    $window,
    $filter,
    Color,
    SequenceEditor,
    BackendConnection,
    DataCollection
  ) {
    $scope.buffer = 0;
    $scope.prevBuffer = 0;
    $scope.global = {
      counter: 0,
      seqError: false,
      seqErrorMessage: "",
      showWeights: false,
      dialogOpen: false,
      id: 0,
      deleteDisable: false,
      collection: false,
    };
    $scope.rate = 50;
    $scope.bufferSize = 10000;

    $scope.weights = [0.25, 0.25, 0.25];
    $scope.changeWeights = angular.copy($scope.weights);

    $scope.sequences = BackendConnection.get();

    $scope.startDataCollection = function () {
      $scope.global.collection = true;

      DataCollection.start(
        $scope.rate,
        $scope.bufferSize,
        $scope.global,
        $scope.buffer,
        $scope.sequences,
        $scope.weights
      );
    };

    $scope.stopDataCollection = function () {
      $scope.global.collection = false;

      DataCollection.stop();
    };

    $scope.clear = function () {
      $scope.buffer = 0;
      $scope.global.counter = 0;
      angular.forEach(
        $scope.sequences,
        function (value, key) {
          this[key].rate = 0;
          this[key].prob = 0;
        },
        $scope.sequences
      );
    };

    $scope.save = function () {
      BackendConnection.save($scope.sequences, $scope.global.counter);
    };

    $scope.dialog = function (seqId) {
      Dialog.open(seqId, $scope.global, $scope.sequences, $scope);
    };

    $scope.dialogClose = function () {
      $scope.changeWeights = [0.25, 0.25, 0.25];
      return Dialog.close($scope.global);
    };

    $scope.editSequence = function (seqId, seqEdit) {
      const seqEdited = SequenceEditor.editSequence(
        seqId,
        seqEdit,
        $scope.sequences
      );

      if (!seqEdited.status) {
        $scope.global.seqError = !seqEdited.status;
        $scope.global.seqErrorMessage = seqEdited.message;
      } else {
        $scope.weights = angular.copy($scope.changeWeights);
        $scope.dialogClose();
      }
    };

    $scope.changeWeight = function (event, index) {
      $scope.changeWeights[index] = +event.target.value;
    };
    $scope.remove = function (removeId) {
      $scope.sequences.splice(removeId, 1);
      $scope.dialogClose();
    };

    $scope.enterKey = function (keyEvent, editId) {
      if (keyEvent.which === 13) return $scope.editSequence(editId);

      return false;
    };
  },
]);
