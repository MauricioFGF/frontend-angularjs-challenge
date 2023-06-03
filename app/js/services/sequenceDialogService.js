var sequenceDialogService = angular.module("sequenceDialogService", [
  "colorService",
]);

sequenceDialogService.factory("SequenceEditor", [
  "Color",
  function (Color) {
    return {
      counter: -1,

      editSequence: function (editId, editSeq, sequences) {
        var REGEX = /\S{4,}|[^AGCT\s]|((^|\s)\S{1,2}($|\s))/;

        if (editSeq.structure === "" || editSeq.name === "") return false;

        if (REGEX.test(editSeq.structure)) return false;

        if (editId === -1) {
          if (this.counter === -1) this.counter = sequences.length;

          editSeq.color = Color.get(++this.counter);
        } else sequences[editId] = angular.copy(editSeq);

        return true;
      },
    };
  },
]);
