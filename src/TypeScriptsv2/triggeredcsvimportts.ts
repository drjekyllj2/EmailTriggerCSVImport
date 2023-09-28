/**   
* triggeredcsvimportts.ts
* @NScriptName Trigger CSV Import - Scheduled
* @NScriptType ScheduledScript
* @NApiVersion 2.1
*/

import log = require('N/log');
import runtime = require("N/runtime");
import file = require("N/file");
import task = require("N/task");

export function execute (){
   const mappingId = runtime.getCurrentScript().getParameter({name : "custscript_trigger_csv_import_id"}) as string;
   const fileId = runtime.getCurrentScript().getParameter({name : "custscript_trigger_csv_import_file"}) as string;
   const importFile  = file.load({id: fileId});

  task.create({taskType : task.TaskType.CSV_IMPORT,  importFile  ,mappingId  }).submit();

   log.debug("execute","Processing File " + fileId + " with mapping id " + mappingId);
   log.audit("execute","Execution Complete" );          
}