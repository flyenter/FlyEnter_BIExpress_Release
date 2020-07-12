var arrReportStatus = [
    { id: "Active", text: "Active" },
    { id: "Archive", text: "Archive" },
    { id: "Inactive", text: "Inactive" },
    { id: "Onhold", text: "Onhold" }
];
var arrReportType = [
    { id: "RawData", text: "RawData" },
    { id: "Report", text: "Report" },
    { id: "Dashboard", text: "Dashboard" },
    { id: "Task", text: "Task" },
    { id: "Tool", text: "Tool" }
];
var arrReportLevel = [
    { id: "L1 Glance", text: "L1 Glance" },
    { id: "L2 Management", text: "L2 Management" },
    { id: "L3 Operation", text: "L3 Operation" }
];
var arrBizScope = [
    { id: "EG", text: "EG" },
    { id: "PPS", text: "PPS" },
    { id: "Mix", text: "Mix" }
];
var arrBizScopeMini = [
    { id: "EG", text: "EG" },
    { id: "PPS", text: "PPS" }
];
var arrDataSouceType = [
    { id: "MSSqlServer", text: "MS Sql Server" },
    { id: "Vertica", text: "Vertica" },
    { id: "Oracle", text: "Oracle" },
    {id:"MySQL",text:"MySQL"},
    { id: "SAP", text: "SAP" },
    { id: "BW", text: "BW" },
    { id: "Excel", text: "Excel" },
    { id: "FlatFile", text: "FlatFile" },
    { id: "SharePoint07", text: "SharePoint2007" },
    { id: "SharePoint10", text: "SharePoint2010" },
    { id: "SharePoint13", text: "SharePoint2013" },
    { id: "ShareFolder", text: "ShareFolder" },
    { id: "Website", text: "Website" },
    { id: "FTP", text: "FTP Server" },
    { id: "RabbitMQ", text: "RabbitMQ server" },
    { id: "MSAnalysisService", text: "MS Analysis Service" }
];
var arrLocationType = [
    { id: "Local", text: "Local" },
    { id: "Remote", text: "Remote" }
];
var arrGender = [
    { id: "male", text: "Male" },
    { id: "female", text: "Female" }
];
var arrSortBy = [
    { id: "ASC", text: "ASC" },
    { id: "DESC", text: "DESC" }
];
var arrPublishMode = [
    { id: "onlinereport", text: "Online Report" },
    { id: "downloadpage", text: "Download Page" },
    { id: "website", text: "3rd Website" },
    { id: "others", text: "Others" }
];
var arrCommDataCategory = [
    { id: "Tower", text: "Tower" },
    { id: "Region", text: "Region" },
    { id: "Frequency", text: "Frequency" },
    { id: "AutoMode", text: "Auto Mode" },
    { id: "SharePointFolder", text: "SharePoint Report Folder" }
];
var arrChangeRequestCategory = [
    { id: "NewReport", text: "New Report Development" },
    { id: "ExistingReport", text: "Existing Report Change" },
    { id: "Ad-hocRequest", text: "Ad-hoc Request" }
];
var arrChangeRequestPriority = [
    { id: "Top urgent", text: "Top urgent - within 1 week" },
    { id: "Urgent", text: "Urgent - within 2 weeks" },
    { id: "Normal", text: "Normal - within 4 weeks" },
    { id: "Low", text: "Low - within 6 weeks" }
];
var arrRegion = [
    { id: "APJ", text: "APJ" },
    { id: "AME", text: "AME" },
    { id: "EMEA", text: "EMEA" }
];
var arrChangeRequestStatus = [
    { id: "0 NewRequest", text: "0 NewRequest" },
    { id: "0 Clarify", text: "0 Clarify" },
    { id: "1 Approved", text: "1 Approved" },
    { id: "2 Developing", text: "2 Developing" },
    { id: "2 Develop by BI", text: "2 Develop By BI" },
    { id: "2 SIT", text: "2 SIT" },
    { id: "3 UAT", text: "3 UAT" },
    { id: "4 MTP", text: "4 MTP" },
    { id: "5 Closed", text: "5 Closed" },
    { id: "6 Rejected", text: "6 Rejected" },
    { id: "7 Cancelled", text: "7 Cancelled" },
    { id: "8 Pending", text: "8 Pending" }
];
var arrChangeRequestTaskStatus = [
    { id: "0 NotStart", text: "Not Start" },
    { id: "1 Started", text: "Started" },
    { id: "2 Pending", text: "Pending" },
    { id: "3 Completed", text: "Completed" },
    { id: "4 Cancelled", text: "Cancelled" }
];

var arrHelpDeskTask = [
    {id:"Technical Related",text:"Technical Related"},
    {id:"Business Related", text:"Business Related"},
    {id:"Others",text:"Others"}
];
var arrDataSourceAccountPurpose = [
    { id: "For DataQuery", text: "For DataQuery" },
    { id: "For DirectSearch", text: "For DirectSearch" }
];
var arrScheduleFrequency = [
    { text: "One Time", id: "onetime" },
    { text: "Hourly", id: "hourly" },
    { text: "Daily", id: "daily" },
    { text: "Weekly", id: "weekly" },
    { text: "Monthly", id: "monthly" },
    { text: "Yearly", id: "yearly" }
];
var arrWeekDay = [
    { id: "SUN", text: "Sunday" },
    { id: "MON", text: "Monday" },
    { id: "TUE", text: "Tuesday" },
    { id: "WED", text: "Wednesday" },
    { id: "THU", text: "Thursday" },
    { id: "FRI", text: "Friday" },
    { id: "SAT", text: "Saturday" }
];
var arrMonthDay = [
    { id: "1", text: "1" },
    { id: "2", text: "2" },
    { id: "3", text: "3" },
    { id: "4", text: "4" },
    { id: "5", text: "5" },
    { id: "6", text: "6" },
    { id: "7", text: "7" },
    { id: "8", text: "8" },
    { id: "9", text: "9" },
    { id: "10", text: "10" },
    { id: "11", text: "11" },
    { id: "12", text: "12" },
    { id: "13", text: "13" },
    { id: "14", text: "14" },
    { id: "15", text: "15" },
    { id: "16", text: "16" },
    { id: "17", text: "17" },
    { id: "18", text: "18" },
    { id: "19", text: "19" },
    { id: "20", text: "20" },
    { id: "21", text: "21" },
    { id: "22", text: "22" },
    { id: "23", text: "23" },
    { id: "24", text: "24" },
    { id: "25", text: "25" },
    { id: "26", text: "26" },
    { id: "27", text: "27" },
    { id: "28", text: "28" },
    { id: "29", text: "29" },
    { id: "30", text: "30" },
    { id: "31", text: "31" }
];
var arrMonthSet = [
    { id: "1", text: "Jan" },
    { id: "2", text: "Feb" },
    { id: "3", text: "Mar" },
    { id: "4", text: "Apr" },
    { id: "5", text: "May" },
    { id: "6", text: "Jun" },
    { id: "7", text: "Jul" },
    { id: "8", text: "Aug" },
    { id: "9", text: "Sep" },
    { id: "10", text: "Aug" },
    { id: "11", text: "Nov" },
    { id: "12", text: "Dec" }
];
var arrFirst = [
    { id: "1", text: "First" },
    { id: "2", text: "Second" },
    { id: "3", text: "Third" },
    { id: "4", text: "Fourth" }
];
var arrTaskExecutionStatus = [
    { id: "notStart", text: "NotStart" },
    { id: "processing", text: "Processing" },
    { id: "pending", text: "Pending" },
    { id: "completed", text: "Completed" },
    { id: "failed", text: "Failed" },
    { id: "validationFailed", text: "validationFailed" },
    { id: "waitForAduit", text: "WaitForAduit" },
    { id: "cancelled", text: "Cancelled" },
];
var arrSharePointOperationList = [
    { id: "like", text: "Like" },
    { id: "==", text: "==" },
    { id: "!=", text: "!=" },
    { id: ">=", text: ">=" },
    { id: ">", text: ">" },
    { id: "<=", text: "<=" },
    { id: "<", text: "<" },
    { id: "isnull", text: "Is NULL" },
    { id: "isnotnull", text: "Is Not NULL" }
];
var arrGeneratorSnapshotImgCategory = [
        { id: "Chart", text: "Chart" },
        { id: "PivotTable", text: "PivotTable" }
];

var arrAccountCategory = [
    { id: "databaseAccount", text: "Database Account" },
    { id: "ntServiceAccount", text: "NT Service Account" },
    { id: "localServiceAccount", text: "Local Service Account" }
];

var arrScriptCategory = [
    { id: "table", text: "Table" },
    { id: "view", text: "View" },
    { id: "proc", text: "StoreProcedure" },
    { id: "function", text: "Function" },
    { id: "trigger", text: "Trigger" }
];

var hubLOFReportTypes = [
    { id: "daily", text: "Daily" },
    { id: "weekly", text: "Weekly" }
];

var arrSysMaintainServiceCategory = [
    { id: "sysRemoveAllCompletedExecCase", text: "Delete completed ExecCase's database instance and info." },
    { id: "sysHardwareInfoRefresh", text: "Refresh hardware info." },
    { id: "sysServiceAccountValidation", text: "Validate service account." },
    {id:"sysHoldingTaskMonitor",text:"Holding ExecCase monitor."}
];

var arrDeployedServiceHostGroup = [
    { id: "ServerMonitorService", text: "ServerMonitorService" },
    { id: "FetcherBWService", text: "FetcherBWService" },
    { id: "FetcherSAPService", text: "FetcherSAPService" },
    { id: "FetcherService", text: "FetcherService" },
    { id: "FetcherDuplexService", text: "FetcherDuplexService" },
    { id: "EmailServerService", text: "EmailService" },
    { id: "LauncherService", text: "LauncherService" },
    { id: "DBOperatorService", text: "DBOperatorService" },
    { id: "GeneratorService", text: "GeneratorService" },
    { id: "GeneratorCommonService", text: "GeneratorCommonService" },
    { id: "SchedulerService", text: "SchedulerService" },
    { id: "SysMaintainService", text: "SysMaintainService" }
];

var arrDeployedService = [
    { id: "cancelSSISPackage", text: "cancelSSISPackage" },
    { id: "createDBInstance", text: "createDBInstance" },
    { id: "createDBLinkedServer", text: "createDBLinkedServer" },
    { id: "createPreSQLScript", text: "createPreSQLScript" },
    { id: "createSQLScript", text: "createSQLScript" },
    { id: "createTableStructure", text: "createTableStructure" },
    { id: "deploySSISPackage", text: "deploySSISPackage" },
    { id: "dispatchToMsSql", text: "dispatchToMsSql" },
    { id: "dispatchToOracle", text: "dispatchToOracle" },
    { id: "dispatchToVertica", text: "dispatchToVertica" },
    { id: "dispatchToMsSqlDuplex", text: "dispatchToMsSqlDuplex" },
    { id: "executeMsSql", text: "executeMsSql" },
    { id: "executeSSISPackage", text: "executeSSISPackage" },
    { id: "fetcherBW", text: "fetcherBW" },
    { id: "fetcherExcel", text: "fetcherExcel" },
    { id: "fetcherMsSql", text: "fetcherMsSql" },
    { id: "fetcherOracle", text: "fetcherOracle" },
    { id: "fetcherSAP", text: "fetcherSAP" },
    { id: "fetcherSharePoint", text: "fetcherSharePoint" },
    { id: "fetcherVertica", text: "fetcherVertica" },
    { id: "grantDBAccess", text: "grantDBAccess" },
    { id: "serviceEmail", text: "serviceEmail" },
    { id: "serviceGenerator", text: "serviceGenerator" },
    {id: "serviceGeneratorCommon",text: "serviceGeneratorCommon"},
    { id: "serviceLauncher", text: "serviceLauncher" },
    { id: "servicePublish", text: "servicePublish" },
    { id: "synchTaskValidationData", text: "synchTaskValidationData" },
    { id: "sysHardwareInfoRefresh", text: "sysHardwareInfoRefresh" },
    { id: "sysHoldingTaskMonitor", text: "sysHoldingTaskMonitor" },
    { id: "sysRemoveAllCompletedExecCase", text: "sysRemoveAllCompletedExecCase" },
    { id: "sysRemoveSpecificExecCase", text: "sysRemoveSpecificExecCase" },
    { id: "sysServiceAccountValidation", text: "sysServiceAccountValidation" },
    { id: "sysSynchSSISOperationLogByExecTaskID", text: "sysSynchSSISOperationLogByExecTaskID" },
    { id: "sysSynchSSISOperationLogByOperationID", text: "sysSynchSSISOperationLogByOperationID" },
    { id: "taskResultValidation", text: "taskResultValidation" }
];

var arrDataFromCategory = [
    { id: "workingdb", text: "Working DB" },
    { id: "externaldb", text: "External DB" }
];

var arrChartStyle = [
    { id: "None", text: "None" }
, { id: "Style1", text: "Style1" }
, { id: "Style2", text: "Style2" }
, { id: "Style3", text: "Style3" }
, { id: "Style4", text: "Style4" }
, { id: "Style5", text: "Style5" }
, { id: "Style6", text: "Style6" }
, { id: "Style7", text: "Style7" }
, { id: "Style8", text: "Style8" }
, { id: "Style9", text: "Style9" }
, { id: "Style10", text: "Style10" }
, { id: "Style11", text: "Style11" }
, { id: "Style12", text: "Style12" }
, { id: "Style13", text: "Style13" }
, { id: "Style14", text: "Style14" }
, { id: "Style15", text: "Style15" }
, { id: "Style16", text: "Style16" }
, { id: "Style17", text: "Style17" }
, { id: "Style18", text: "Style18" }
, { id: "Style19", text: "Style19" }
, { id: "Style20", text: "Style20" }
, { id: "Style21", text: "Style21" }
, { id: "Style22", text: "Style22" }
, { id: "Style23", text: "Style23" }
, { id: "Style24", text: "Style24" }
, { id: "Style25", text: "Style25" }
, { id: "Style26", text: "Style26" }
, { id: "Style27", text: "Style27" }
, { id: "Style28", text: "Style28" }
, { id: "Style29", text: "Style29" }
, { id: "Style30", text: "Style30" }
, { id: "Style31", text: "Style31" }
, { id: "Style32", text: "Style32" }
, { id: "Style33", text: "Style33" }
, { id: "Style34", text: "Style34" }
, { id: "Style35", text: "Style35" }
, { id: "Style36", text: "Style36" }
, { id: "Style37", text: "Style37" }
, { id: "Style38", text: "Style38" }
, { id: "Style39", text: "Style39" }
, { id: "Style40", text: "Style40" }
, { id: "Style41", text: "Style41" }
, { id: "Style42", text: "Style42" }
, { id: "Style43", text: "Style43" }
, { id: "Style44", text: "Style44" }
, { id: "Style45", text: "Style45" }
, { id: "Style46", text: "Style46" }
, { id: "Style47", text: "Style47" }
, { id: "Style48", text: "Style48" }
];

var arrSheetStyle = [
  { id: "None", text: "None" }
, { id: "Custom", text: "Custom" }
, { id: "Light1", text: "Light1" }
, { id: "Light2", text: "Light2" }
, { id: "Light3", text: "Light3" }
, { id: "Light4", text: "Light4" }
, { id: "Light5", text: "Light5" }
, { id: "Light6", text: "Light6" }
, { id: "Light7", text: "Light7" }
, { id: "Light8", text: "Light8" }
, { id: "Light9", text: "Light9" }
, { id: "Light10", text: "Light10" }
, { id: "Light11", text: "Light11" }
, { id: "Light12", text: "Light12" }
, { id: "Light13", text: "Light13" }
, { id: "Light14", text: "Light14" }
, { id: "Light15", text: "Light15" }
, { id: "Light16", text: "Light16" }
, { id: "Light17", text: "Light17" }
, { id: "Light18", text: "Light18" }
, { id: "Light19", text: "Light19" }
, { id: "Light20", text: "Light20" }
, { id: "Light21", text: "Light21" }
, { id: "Medium1", text: "Medium1" }
, { id: "Medium2", text: "Medium2" }
, { id: "Medium3", text: "Medium3" }
, { id: "Medium4", text: "Medium4" }
, { id: "Medium5", text: "Medium5" }
, { id: "Medium6", text: "Medium6" }
, { id: "Medium7", text: "Medium7" }
, { id: "Medium8", text: "Medium8" }
, { id: "Medium9", text: "Medium9" }
, { id: "Medium10", text: "Medium10" }
, { id: "Medium11", text: "Medium11" }
, { id: "Medium12", text: "Medium12" }
, { id: "Medium13", text: "Medium13" }
, { id: "Medium14", text: "Medium14" }
, { id: "Medium15", text: "Medium15" }
, { id: "Medium16", text: "Medium16" }
, { id: "Medium17", text: "Medium17" }
, { id: "Medium18", text: "Medium18" }
, { id: "Medium19", text: "Medium19" }
, { id: "Medium20", text: "Medium20" }
, { id: "Medium21", text: "Medium21" }
, { id: "Dark1", text: "Dark1" }
, { id: "Dark2", text: "Dark2" }
, { id: "Dark3", text: "Dark3" }
, { id: "Dark4", text: "Dark4" }
, { id: "Dark5", text: "Dark5" }
, { id: "Dark6", text: "Dark6" }
, { id: "Dark7", text: "Dark7" }
, { id: "Dark8", text: "Dark8" }
, { id: "Dark9", text: "Dark9" }
, { id: "Dark10", text: "Dark10" }
, { id: "Dark11", text: "Dark11" }
];

var arrChartType = [
  { id: "BarClustered", text: "BarClustered" }
, { id: "Line", text: "Line" }
, { id: "Pie", text: "Pie" }
];