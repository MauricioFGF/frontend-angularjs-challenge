var dialogService = angular.module("dialogService", ["ngDialog"]);

dialogService.factory("Dialog", [
  "ngDialog",
  function (ngDialog) {
    return {
      openedDialog: "",
      open: function (seqId, global, sequences, scope) {
        global.seqError = false;
        global.seqErrorMessage = "";
        global.dialogOpen = true;

        if (seqId || seqId === 0) {
          global.id = seqId;
          global.editSeq = angular.copy(sequences[seqId]);
          global.deleteDisable = false;
        } else {
          global.id = -1;
          global.deleteDisable = true;
          global.editSeq = {
            name: "",
            structure: "",
            rate: 0,
            prob: 0,
          };
        }

        this.openedDialog = ngDialog.open({
          template: "components/popup.html",
          className: "ngdialog-theme-default",
          scope: scope,
        });
      },
      close: function (global) {
        this.openedDialog.close();
        global.dialogOpen = false;

        return true;
      },
    };
  },
]);
