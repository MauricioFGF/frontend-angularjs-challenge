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

        if (editSeq.structure === "" || editSeq.name === "")
          return { status: false, message: "Fill in all fields" };

        const existName = sequences.some(function (sequence) {
          if (sequence.name === editSeq.name) return true;
        });

        if (existName && editId === -1) {
          return { status: false, message: "This name already exists" };
        }

        if (REGEX.test(editSeq.structure))
          return {
            status: false,
            message:
              "Please use only three letter sequences using capital letters A,G,C or T.",
          };

        if (editId === -1) {
          if (this.counter === -1) this.counter = sequences.length;

          editSeq.color = Color.get(++this.counter);
          sequences.push(angular.copy(editSeq));
        } else sequences[editId] = angular.copy(editSeq);

        return { status: true, message: "ok" };
      },
    };
  },
]);
