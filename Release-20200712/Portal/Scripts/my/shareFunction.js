function Shared_Record_Remove($, rowsIDs, removeURL, refreshFunCall) {
    if (rowsIDs.length > 0) {
        layer.confirm($.i18n.prop('msg-delete-warning') + rowsIDs.length,
            {
                icon: 3, title: $.i18n.prop('msg-delete-warning-title')
            },
            function (t) {
                var jsonS = JSON.stringify(rowsIDs);
                $.ajax({
                    url: removeURL,
                    type: 'POST',
                    async: false,
                    data: { IDs: jsonS },
                    success: function (data) {
                        var _data = JSON.parse(data);
                        if (_data != null && _data.msg != '')
                            layer.alert(_data.msg);
                        else
                            refreshFunCall();
                        layer.close(t);
                    },
                    error: function (data) {
                        layer.alert(data);
                    }
                });
            });
    } else {
        layer.msg('No data selected!', { icon:3, time: 1000 });
    }
};

function My_SetSelectedRowStyle(obj) {
    obj.tr.css({ 'background': '#4ba063', 'color': 'white' }).siblings().removeAttr('style')
    //obj.tr.css({ 'background': 'rgb(0, 130, 70)', 'color': 'white' }).siblings().removeAttr('style')
}

function My_GetTimeNumberList() {
    return new Date().toISOString().replace('-', '').replace('-', '').replace(':', '').replace(':', '').replace('.', '');
}

//格式化时间 yyyy-mm-dd HH:MM:ss
function FormatDateTime(v, f) {
    //debugger;
    if (!v) {
        return "";
    }
    if (typeof v === 'string' ) {
        v = v.replace('T', ' ').replace(/\-/g, '/'); //注意：指定一个具体的时间转换时间戳，需要yyyy/mm/dd hh:ii:ss格式，yyyy-mm-dd在IE和Safari下是有问题的。
    };
    var date = new Date(v);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDate();
    d = d < 10 ? ("0" + d) : d;
    var h = date.getHours();
    h = h < 10 ? ("0" + h) : h;
    var M = date.getMinutes();
    M = M < 10 ? ("0" + M) : M;
    var str = '';
    if(f=='YMD')
        str = y + "/" + m + "/" + d;
    else if (f=='YMDHM')
        str = y + "/" + m + "/" + d + " " + h + ":" + M;
    else if (f=='YYYYMMDDHHMM')
        str ='_'+ y + m +  d + h +  M;
    return str;
}

//合并数据表格行
function My_Raw_Merge($, fieldNameTmp, index, flag) {
    let fieldName = [];
    if (typeof fieldNameTmp == "string") {
        fieldName.push(fieldNameTmp);
    } else {
        fieldName = fieldName.concat(fieldNameTmp);
    }
    for (let i = 0; i < fieldName.length; i++) {
        execRowspan($,fieldName[i], index, flag);
    }
}
function execRowspan($, fieldName, index, flag) {
    // 1为不冻结的情况，左侧列为冻结的情况
    let fixedNode = index == "1" ? $(".layui-table-body")[index - 1] : (index == "3" ? $(".layui-table-fixed-r") : $(".layui-table-fixed-l"));
    // 左侧导航栏不冻结的情况
    let child = $(fixedNode).find("td");
    let childFilterArr = [];
    // 获取data-field属性为fieldName的td
    for (let i = 0; i < child.length; i++) {
        if (child[i].getAttribute("data-field") == fieldName) {
            childFilterArr.push(child[i]);
        }
    }
    // 获取td的个数和种类
    let childFilterTextObj = {};
    for (let i = 0; i < childFilterArr.length; i++) {
        let childText = flag ? childFilterArr[i].innerHTML : childFilterArr[i].textContent;
        if (childFilterTextObj[childText] == undefined) {
            childFilterTextObj[childText] = 1;
        } else {
            let num = childFilterTextObj[childText];
            childFilterTextObj[childText] = num * 1 + 1;
        }
    }
    let canRowspan = true;
    let maxNum;//以前列单元格为基础获取的最大合并数
    let finalNextIndex;//获取其下第一个不合并单元格的index
    let finalNextKey;//获取其下第一个不合并单元格的值
    for (let i = 0; i < childFilterArr.length; i++) {
        (maxNum > 9000 || !maxNum) && (maxNum = $(childFilterArr[i]).prev().attr("rowspan") && fieldName != "8" ? $(childFilterArr[i]).prev().attr("rowspan") : 9999);
        let key = flag ? childFilterArr[i].innerHTML : childFilterArr[i].textContent;//获取下一个单元格的值
        let nextIndex = i + 1;
        let tdNum = childFilterTextObj[key];
        let curNum = maxNum < tdNum ? maxNum : tdNum;
        if (canRowspan) {
            for (let j = 1; j <= curNum && (i + j < childFilterArr.length) ;) {//循环获取最终合并数及finalNext的index和key
                finalNextKey = flag ? childFilterArr[i + j].innerHTML : childFilterArr[i + j].textContent;
                finalNextIndex = i + j;
                if ((key != finalNextKey && curNum > 1) || maxNum == j) {
                    canRowspan = true;
                    curNum = j;
                    break;
                }
                j++;
                if ((i + j) == childFilterArr.length) {
                    finalNextKey = undefined;
                    finalNextIndex = i + j;
                    break;
                }
            }
            childFilterArr[i].setAttribute("rowspan", curNum);
            if ($(childFilterArr[i]).find("div.rowspan").length > 0) {//设置td内的div.rowspan高度适应合并后的高度
                $(childFilterArr[i]).find("div.rowspan").parent("div.layui-table-cell").addClass("rowspanParent");
                $(childFilterArr[i]).find("div.layui-table-cell")[0].style.height = curNum * 38 - 10 + "px";
            }
            canRowspan = false;
        } else {
            childFilterArr[i].style.display = "none";
        }
        if (--childFilterTextObj[key] == 0 | --maxNum == 0 | --curNum == 0 | (finalNextKey != undefined && nextIndex == finalNextIndex)) {//||(finalNextKey!=undefined&&key!=finalNextKey)
            canRowspan = true;
        }
    }
}

function My_CheckBox_SetVal($, chkBoxID, iVal) {
    if (iVal == 1 || iVal == true) {
        $('#' + chkBoxID).addClass('layui-form-checked');
        $('#' + chkBoxID).prop('checked', true);
    }
    else {
        $('#' + chkBoxID).removeClass('layui-form-checked');
        $('#' + chkBoxID).prop('checked', false);
    }
}

function My_Disable_Object($, objID) {
    $('#' + objID).attr("disabled", "disabled");
    $('#' + objID).addClass("layui-disabled");
}