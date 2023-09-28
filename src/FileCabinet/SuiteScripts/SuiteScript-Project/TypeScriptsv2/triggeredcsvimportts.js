/**
* triggeredcsvimportts.ts
* @NScriptName Trigger CSV Import - Scheduled
* @NScriptType ScheduledScript
* @NApiVersion 2.1
*/
define(["require", "exports", "N/log", "N/runtime", "N/file", "N/task"], function (require, exports, log, runtime, file, task) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.execute = void 0;
    function execute() {
        var mappingId = runtime.getCurrentScript().getParameter({ name: "custscript_trigger_csv_import_id" });
        var fileId = runtime.getCurrentScript().getParameter({ name: "custscript_trigger_csv_import_file" });
        var importFile = file.load({ id: fileId });
        task.create({ taskType: task.TaskType.CSV_IMPORT, importFile: importFile, mappingId: mappingId }).submit();
        log.debug("execute", "Processing File " + fileId + " with mapping id " + mappingId);
        log.audit("execute", "Execution Complete");
    }
    exports.execute = execute;
});
