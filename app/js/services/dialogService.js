var dialogService = angular.module("dialogService", ["ngDialog"]);

dialogService.factory("Dialog", [
  "ngDialog",
  function (ngDialog) {
    return {
      openedDialog: "",
      open: function (seqId, global, sequences, scope) {
        global.seqError = false;
        global.dialogOpen = true;

        if (seqId) {
          global.id = seqId;
          global.editSeq = angular.copy(sequences[seqId]);
          global.deleteDisable = false;
        } else {
          return alert("Implementar Adição");
        }

        this.openedDialog = ngDialog.open({
          template: "view/popup.html",
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
