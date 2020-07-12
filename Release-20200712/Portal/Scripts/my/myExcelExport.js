function My_ExportDataToExcel(arrCriteriaSet, arrHeaderColumn, searchMode, reportCategory, urlDataQuery, exportExcelFileName) {
    var _criteriaStr = JSON.stringify(arrCriteriaSet);
    var _headerColumnStr = JSON.stringify(arrHeaderColumn);
    var _searchMode = JSON.stringify(searchMode);
    var _rawDataHeader = {};
    var _rawDataColumnSortBy = [];
    for (var iH = 0; iH < arrHeaderColumn[1].length; iH++) {
        var _item = arrHeaderColumn[1][iH];
        if (_item.field != '') {
            _rawDataHeader[_item.field] = _item.title;
            _rawDataColumnSortBy.push(_item.field);
        }
    }

    layui.use(['excel'], function () {
        var excel = layui.excel;
        $.ajax({
            url: urlDataQuery,
            type: 'POST',
            async: false,
            data: {
                CriteriaSet: _criteriaStr,
                ColumnSet: _headerColumnStr,
                SearchMode: _searchMode,
                ReportCategory: reportCategory,
                ExportData: 'YES'
            },
            success: function (data) {
                if (data != null) {
                    var exportData = JSON.parse(data);
                    if (exportData.msg != '')
                        alert(exportData.msg)
                    else {
                        exportData.data.unshift(_rawDataHeader);
                        var sortedData = excel.filterExportData(exportData.data, _rawDataColumnSortBy);

                        if (exportExcelFileName == 'Announcement') {
                            excel.exportExcel({
                                RawData: sortedData
                            }, 'AnnouncementList.xlsx', 'xlsx', {
                            });
                        }
                        else {
                            excel.exportExcel({
                                RawData: sortedData
                            }, 'DataList.xlsx', 'xlsx', {
                            });
                        }
                    }
                }
            },
            error: function (error) {
                alert(error);
            }
        });
    });
}
