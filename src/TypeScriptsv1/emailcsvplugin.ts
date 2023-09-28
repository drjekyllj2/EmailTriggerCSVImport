/// <reference path = "../../node_modules/@hitc/netsuite-types/SuiteScriptV1.d.ts" />
/// <reference path = "../../node_modules/@hitc/netsuite-types/EmailCapturePlugin.d.ts" />

//Email: emails.5822203_SB1.2218.768a3fc372@5822203-sb1.email.netsuite.com

function process (email) 
{
    nlapiLogExecution('debug','process','email received with subject:' +  email.subject     );
    const attachments =email.getAttachments();
    for (const i in attachments)
    {
        const file = attachments[i];
        nlapiLogExecution('debug','process','Processing attachment :' + file.getName());
        file.setFolder(-10);
        const fileId = nlapiSubmitFile(file);
        nlapiLogExecution('debug','process','Saved file: ' + fileId );
        const custscript_trigger_csv_import_id = 'custimport_158_5822203_668';
        const parameters = {custscript_trigger_csv_import_file:fileId,custscript_trigger_csv_import_id}
        nlapiScheduleScript('customscript_trigger_csv_import_sc','customdeploy1',parameters);
    }
}