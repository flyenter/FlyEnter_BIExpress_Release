
function CommAddRowWithDef(grid, newRow,firstEditColumn) {
    grid.addRow(newRow, 0);
    grid.beginEditCell(newRow, firstEditColumn);
}

function CommRemoveData(grid,urlForDelete) {
    var rows = grid.getSelecteds();
    if (rows.length > 0) {
        $.Zebra_Dialog('Are you sure to delete '+rows.length+ ' record(s)?', {
            type: 'question',
            title: 'Confirm your Operation',
            buttons: ['Yes', 'No'],
            onClose: function (caption) {
                if (caption == 'Yes') {
                    grid.removeRows(rows, true);
                    var data = grid.getChanges();
                    var json = mini.encode(data);
                    $.ajax({
                        url: urlForDelete,
                        data: { data: json },
                        success: function (text) { grid.reload(); },
                        error: function (jqXHR, textStatus, errorThrown) {
                            $.Zebra_Dialog(jqXHR.responseText, {
                                type: 'error',
                                title: 'Error'
                            });
                        }
                    });
                }
            }
        });
    }
}

function commDataGrid_RemoveSelectedOnly(grid) {
    if (grid != null) {
        var rows = grid.getSelecteds();
        if (rows.length > 0) {
            $.Zebra_Dialog('Are you sure to delete ' + rows.length + ' record(s)?', {
                type: 'question',
                title: 'Confirm your Operation',
                buttons: ['Yes', 'No'],
                onClose: function (caption) {
                    if (caption == 'Yes')
                        grid.removeRows(rows, true);
                }
            });
        }
    }
}

function commDataGrid_RemoveAllItems(grid) {
    if (grid != null) {
        grid.selectAll(false);
        var rows = grid.getSelecteds();
        grid.removeRows(rows);
    }
}

function CommSaveData(grid, urlForSave) {
    var data = grid.getChanges();
    var json = mini.encode(data);
    grid.loading("Update ...");
    $.ajax({
        url: urlForSave,
        type:"post",
        data: { data: json },
        success: function (text) { grid.reload(); },
        error: function (jqXHR, textStatus, errorThrown) {
            $.Zebra_Dialog(jqXHR.responseText, {
                type: 'error',
                title: 'Error'
            });
        }
    });
}

function Comm_Grid_Remove(grid, multiRemove, needToUpdateDB, urlForUpdate) {
    if (grid == null)
        return;
    var rows;
    if (multiRemove)
        rows = grid.getSelecteds();
    else
        rows = grid.getSelected();
    if (rows != null && rows != "") {
        $.Zebra_Dialog('Are you sure to delete ' + rows.length + ' record(s)?', {
            type: 'question',
            title: 'Confirm your Operation',
            buttons: ['Yes', 'No'],
            onClose: function (caption) {
                if (caption == 'Yes') {
                    if (multiRemove)
                        grid.removeRows(rows, true);
                    else
                        grid.removeRow(rows, true);
                    if (needToUpdateDB) {
                        var data = grid.getChanges();
                        var json = mini.encode(data);
                        $.ajax({
                            url: urlForUpdate,
                            data: { data: json, multiRemove: multiRemove },
                            type: "post",
                            success: function (text) { grid.reload(); },
                            error: function (jqXHR, textStatus, errorThrown) {
                                $.Zebra_Dialog(jqXHR.responseText, {
                                    type: 'error',
                                    title: 'Error'
                                });
                            }
                        });
                    }
                }
            }
        });
    }
}

function Comm_Finder_Report(callBackfunction) {
    mini.open({
        url: "shareReportFinder.html",
        title: "Report Finder",
        width: 850,
        height: 515,
        allowResize:false,
        ondestory: function (action) {
            if (action == "ok") {
                var iframe = this.getIFrameEl();
                var data = iframe.contentWindow.GetData();
                data = mini.clone(data);
                callBackfunction(data);
            }
        }
    });
}
function Comm_Finder_People(multiResult, callBackFun) {
    mini.open({
        url: "./ShareForm/sharePeopleFinder.html",
        title: "People Finder",
        width: 850,
        height: 510,
        allowResize: false,
        onload: function () {
            var iframe = this.getIFrameEl();
            var data = { multiResult: multiResult };
            iframe.contentWindow.SetData(data);
        },
        ondestroy: function (action) {
            if (action == "ok") {
                var iframe = this.getIFrameEl();
                var data = iframe.contentWindow.GetData(multiResult);
                data = mini.clone(data);
                callBackFun(data);
            }
        }
    });
}

function Comm_Finder_Report(multiResult, callBackFun) {
    mini.open({
        url: "./ShareForm/shareReportFinder.html",
        title: "Report Finder",
        width: 850,
        height: 515,
        allowResize: false,
        onload: function () {
            var iframe = this.getIFrameEl();
            var data = { multiResult: multiResult};
            iframe.contentWindow.SetData(data);
        },
        ondestroy: function (action) {
            if (action == "ok") {
                var iframe = this.getIFrameEl();
                var data = iframe.contentWindow.GetData(multiResult);
                data = mini.clone(data);
                callBackFun(data);
            }
        }
    });
}
function Comm_Finder_PackageTable(multiResult,packageID, callBackFun) {
    mini.open({
        url: "./ShareForm/sharePackageTableFinder.html",
        title: "Package tabler Finder",
        width: 850,
        height: 510,
        allowResize: false,
        onload: function () {
            var iframe = this.getIFrameEl();
            var data = { multiResult: multiResult, PackageID: packageID };
            iframe.contentWindow.SetData(data);
        },
        ondestroy: function (action) {
            if (action == "ok") {
                var iframe = this.getIFrameEl();
                var data = iframe.contentWindow.GetData(multiResult);
                data = mini.clone(data);
                callBackFun(data);
            }
        }
    });
}

function Comm_Finder_DataSource(multiResult, isWorker, callBackFun) {
    mini.open({
        url: "./ShareForm/shareDataSourceFinder.html",
        title: "Data Source Finder",
        width: 850,
        height: 510,
        allowResize: false,
        onload: function () {
            var iframe = this.getIFrameEl();
            var data = { multiResult: multiResult, IsWorker: isWorker };
            iframe.contentWindow.SetData(data);
        },
        ondestroy: function (action) {
            if (action == "ok") {
                var iframe = this.getIFrameEl();
                var data = iframe.contentWindow.GetData(multiResult);
                data = mini.clone(data);
                callBackFun(data);
            }
        }
    });
}

function Comm_Finder_Database(multiResult,isWorkingDB, callBackFun) {
    mini.open({
        url: "./ShareForm/shareDatabaseFinder.html",
        title: "Database Finder",
        width: 850,
        height: 510,
        allowResize: false,
        onload: function () {
            var iframe = this.getIFrameEl();
            var data = { multiResult: multiResult,IsWorkingDB:isWorkingDB };
            iframe.contentWindow.SetData(data);
        },
        ondestroy: function (action) {
            if (action == "ok") {
                var iframe = this.getIFrameEl();
                var data = iframe.contentWindow.GetData(multiResult);
                data = mini.clone(data);
                callBackFun(data);
            }
        }
    });
}


function Comm_Finder_DataTable(multiResult, isWorkingDB, callBackFun) {
    mini.open({
        url: "./ShareForm/shareDataTableFinder.html",
        title: "DataTable Finder",
        width: 850,
        height: 510,
        allowResize: false,
        onload: function () {
            var iframe = this.getIFrameEl();
            var data = { multiResult: multiResult, IsWorkingDB: isWorkingDB };
            iframe.contentWindow.SetData(data);
        },
        ondestroy: function (action) {
            if (action == "ok") {
                var iframe = this.getIFrameEl();
                var data = iframe.contentWindow.GetData(multiResult);
                data = mini.clone(data);
                callBackFun(data);
            }
        }
    });
}

function Comm_Finder_CstDateParameter(callBackFun) {
    mini.open({
        url: "./ShareForm/shareCstDateParameterFinder.html",
        title: "Cst Date Parameter Finder",
        width: 850,
        height: 510,
        allowResize:false,
        onload: function () {
            //var iframe = this.getIFrameEl();
            //var data = { multiResult: multiResult, IsWorkingDB: isWorkingDB };
            //iframe.contentWindow.SetData(data);
        },
        ondestroy: function (action) {
            if (action == "ok") {
                var iframe = this.getIFrameEl();
                var data = iframe.contentWindow.GetData(false);
                data = mini.clone(data);
                callBackFun(data);
            }
        }
    });
}

function Comm_Finder_ServiceCallLog(execCaseID, execTaskID) {
    mini.open({
        url: "./ShareForm/shareservicelogfinder.html",
        title: "Service Call Log",
        width: 850,
        height: 610,
        allowResize: false,
        onload: function () {
            var iframe = this.getIFrameEl();
            var data = { ExecCaseID: execCaseID, ExecTaskID: execTaskID };
            iframe.contentWindow.SetData(data);
            iframe.contentWindow.Search();
        }
    });
}


    // 对Date的扩展，将 Date 转化为指定格式的String 
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
    // 例子： 
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
    Date.prototype.Format = function (fmt) { //author: meizz 
        var o = {
            "M+": this.getMonth() + 1,                 //月份 
            "d+": this.getDate(),                    //日 
            "h+": this.getHours(),                   //小时 
            "m+": this.getMinutes(),                 //分 
            "s+": this.getSeconds(),                 //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds()             //毫秒 
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }


    function GetCurDateTime() {
        return (new Date()).Format("yyyy-MM-dd HH:mm:ss").toString();
    }

    function GetSplitChar(dsCategory) {
        //DataSourceCategory
        if (dsCategory == 'SharePoint13')
            return '/';
        else
            return '.';
    }