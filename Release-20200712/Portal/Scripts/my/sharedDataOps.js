var url_Get_DataSourceCategoryList = '../../Data/svcCommProvider.aspx?method=Get_DataSourceCategoryList';
var url_Get_CommMasterDataList = '../../Data/svcCommProvider.aspx?method=Get_CommMasterDataList';
var url_Get_AccountCategoryList = '../../Data/svcCommProvider.aspx?method=Get_AccountCategoryList';
var url_Get_DataAccessLevelList = '../../Data/svcCommProvider.aspx?method=Get_DataAccessLevelList';
var url_Get_KeyValuesCategoryList = '../../Data/svcCommProvider.aspx?method=Get_KeyValuesCategoryList';
var url_Get_Package_TaskGroupList = '../../Data/svcPackageProvider.aspx?method=Get_Shared_Package_TaskGroup';
var url_Get_Package_CategoryList = '../../Data/svcCommProvider.aspx?method=Get_KeyValues_PackageCategory';
var url_Get_TaskStatus_CategoryList = '../../Data/svcCommProvider.aspx?method=Get_TaskStatusCategoryList';
var url_Get_Data_ScriptCategoryList = '../../Data/svcCommProvider.aspx?method=Get_DBScriptCategoryList';
var url_Get_Package_ParamCateogryAndObjCategory = '../../Data/svcCommProvider.aspx?method=Get_ParamCategoryAndServeObjList';
var url_Get_FrequencyList = '../../Data/svcCommProvider.aspx?method=Get_FrequencyList';
var url_Get_ServiceCategoryList = '../../Data/svcCommProvider.aspx?method=Get_ServiceCategoryList';
var url_Get_TaskCategoryList = '../../Data/svcCommProvider.aspx?method=Get_TaskCategoryList';
var url_Get_ServiceMethodCategoryList = '../../Data/svcCommProvider.aspx?method=Get_ServiceMethodCategoryList';
var url_Get_WeiXinEnvironmentList = '../../Data/svcWeiXinProvider.aspx?method=Get_Environment_Share_List';
var url_Get_WeiXinMessageTypeList = '../../Data/svcWeiXinProvider.aspx?method=Get_MessageType_List';
var url_Get_WeiXinMessageTargetTypeList = '../../Data/svcWeiXinProvider.aspx?method=Get_MessageTargetType_List';
var url_Get_FailureDirectionTypeList = '../../Data/svcCommProvider.aspx?method=Get_PreConditionFailureDirectionList';
var url_Get_LogicTypeList = '../../Data/svcCommProvider.aspx?method=Get_LogicTypeList';
var url_Get_Package_ParameterList = '../../Data/svcPackageProvider.aspx?method=Get_Package_ParameterListForSelect&PackageID=';

//初始化数据源类型的的下拉列表
function My_Init_DataSourceCategory($,form, objListID, includeEmpty) {
    $.ajax({
        url: url_Get_DataSourceCategoryList,
        type: 'GET',
        async: false,
        cache: false,
        success: function (data) {
            var _ds = eval(data);
            if (includeEmpty != null && includeEmpty == 'true')
                $('#' + objListID).append("<option value=''>Choose the Source Category</option>");
            $(_ds).each(function (index, el) {
                $('#' + objListID).append("<option value='" + el.id + "'>" + el.text + "</option>");
            });
            form.render('select');
        },
        error: function (data) {
            layer.alert(data);
        }
    });
};
//初始化数据源位置列表
function My_Init_DataSourceLocationCategory($,form,objListID,includeEmpty) {
    $.ajax({
        url: url_Get_CommMasterDataList,
        type: 'GET',
        async: false,
        cache: false,
        success: function (data) {
            if (data != null && data != '') {
                var _data = JSON.parse(data);
                var _loc = eval(_data.locationCategory);
                if (includeEmpty != null && includeEmpty == 'true')
                    $('#LocationCategory').append("<option value=''>Choose Location</option>");
                $(_loc).each(function (index, el) {
                    $('#LocationCategory').append("<option value='" + el.id + "'>" + el.text + "</option>");
                });
                form.render('select');
            }
        },
        error: function (data) {
            layer.alert(data);
        }
    });
};
//初始化数据源账号类型列表
function My_Init_AccountCategory($, form, objListID, includeEmpty) {
    $.ajax({
        url:url_Get_AccountCategoryList,
        type: 'GET',
        async: false,
        cache: false,
        success: function (data) {
            var _ds = eval(data);
            if (includeEmpty)
                $('#' + objListID).append("<option value=''>Account Category</option>");
            $(_ds).each(function (index, el) {
                $('#' + objListID).append("<option value='" + el.id + "'>" + el.text + "</option>");
            });
            form.render('select');
        },
        error: function (data) {
            layer.alert(data);
        }
    });
}
function My_Init_DataAccessLevelCategory($, form, objListID, includeEmpty) {
    $.ajax({
        url: url_Get_DataAccessLevelList,
        type: 'GET',
        async: false,
        cache: false,
        success: function (data) {
            var _ds = eval(data);
            if (includeEmpty)
                $('#' + objListID).append("<option value=''>Access Category</option>");
            $(_ds).each(function (index, el) {
                $('#' + objListID).append("<option value='" + el.id + "'>" + el.text + "</option>");
            });
            form.render('select');
        },
        error: function (data) {
            layer.alert(data);
        }
    });
}
//初始化类别数据下拉列表
function My_Init_KeyValuesCategory($,form,objListID) {
    $.ajax({
        url:url_Get_KeyValuesCategoryList,
        type: 'GET',
        async: false,
        cache: false,
        success: function (data) {
            var _ds = eval(data);
            var _i = 0;
            $(_ds).each(function (index, el) {
                $('#'+objListID).append("<option value='" + el.id + "'>" + el.text + "</option>");
            });
            form.render('select');
        },
        error: function (data) {
            layer.alert(data);
        }
    })
};
//初始化TaskGroup下拉列表，并返回列表对象
function My_Init_Package_TaskGroup($, selectM, _packageID, objSelectMID, _defTaskGroupIDs) {
    var _selectM = {};
    if (_packageID != null && _packageID != '') {
        $.ajax({
            url: url_Get_Package_TaskGroupList,
            type: 'POST',
            data: { PackageID: _packageID },
            async: false,
            cache: false,
            success: function (data) {
                var _data = JSON.parse(data);
                _selectM = selectM({
                    elem: '#' + objSelectMID,
                    data: _data,
                    max: 10,
                    field: { idName: 'TaskGroupID', titleName: 'TaskGroupName' }
                });
                if (_defTaskGroupIDs != null && _defTaskGroupIDs != '') {
                    var _defV = [];
                    _defV = _defTaskGroupIDs.split(',');
                    _selectM.set(_defV);
                }
            }
        })
    } else {
        $('#' + objSelectMID).addClass('layui-btn-disabled');
    }
    return _selectM;
};
function My_Init_Package_TaskGroup_DropList($, form, _packageID, objDropListID) {
    My_Init_Package_TaskGroup_DropList($, form, _packageID, objDropListID, true);
}
function My_Init_Package_TaskGroup_DropList($, form, _packageID, objDropListID,includeEmpty) {
    $.ajax({
        url: url_Get_Package_TaskGroupList,
        type: 'POST',
        data: { PackageID: _packageID },
        async: false,
        cache: false,
        success: function (data) {
            var _ds = eval(data);
            if (includeEmpty)
                $('#' + objDropListID).append("<option value=''>" + $.i18n.prop('msg-select-choose-group')+"</option>");
            $(_ds).each(function (index, el) {
                $('#' + objDropListID).append("<option value='" + el.TaskGroupID + "'>" + el.TaskGroupName + "</option>");
            });
            form.render('select');
        },
        error: function (data) {
            layer.alert(data);
        }
    });
}
//初始化脚本类型下拉列表
function My_Init_DataScriptCategory($, form, objListID) {
    $.ajax({
        url: url_Get_Data_ScriptCategoryList,
        type: 'GET',
        async: false,
        cache: false,
        success: function (data) {
            var _ds = eval(data);
            $(_ds).each(function (index, el) {
                $('#' + objListID).append("<option value='" + el.id + "'>" + $.i18n.prop(el.text) + "</option>");
            });
            form.render('select');
        },
        error: function (data) {
            layer.alert(data);
        }
    })
}
function My_Init_Package_ParamCategory($,form,objCateogryID,objParamCategoryID) {
    $.ajax({
        url: url_Get_Package_ParamCateogryAndObjCategory,
        type: 'GET',
        async: false,
        cache: false,
        success: function (data) {
            var _paramInfo = JSON.parse(data);
            var _serveobj = eval(_paramInfo.serveobjcategory);
            var _paramC = eval(_paramInfo.paramcategory);
            $('#ServeObjCategory').append("<option value=''>" + $.i18n.prop('msg-select-support-object')+"</option>");
            $(_serveobj).each(function (index, el) {
                $('#' + objCateogryID).append("<option value='" + el.id + "'>" + el.text + "</option>");
            });
            $(_paramC).each(function (index, el) {
                $('#' + objParamCategoryID).append("<option value='" + el.id + "'>" + el.text + "</option>");
            });

            form.render('select');
        },
        error: function (data) {
            layer.alert(data);
        }
    });
};

//初始化任务包类型下拉列表
function My_Init_PackageCategory($,form,objListID) {
    $.ajax({
        url: url_Get_Package_CategoryList,
        type: 'GET',
        async: false,
        cache: false,
        success: function (data) {
            if (data != null && data != '') {
                var _data = eval(data);
                $('#' + objListID).append("<option value=''>" + $.i18n.prop('msg-select-choose-category')+"</option>");
                $(_data).each(function (index, el) {
                    $('#' + objListID).append("<option value='" + el.id + "'>" + el.text + "</option>");
                });
                form.render('select');
            }
        },
        error: function (data) {
            layer.alert(data);
        }
    });

}

//初始化任务状态类型下拉列表
function My_Init_TaskStatusCategory($, form, objListID,includEmpty) {
    $.ajax({
        url: url_Get_TaskStatus_CategoryList,
        type: 'GET',
        async: false,
        cache: false,
        success: function (data) {
            if (data != null && data != '') {
                var _data = eval(data);
                if (includEmpty)
                    $('#' + objListID).append("<option value=''>" + $.i18n.prop('msg-select-choose-status')+"</option>");
                $(_data).each(function (index, el) {
                    $('#' + objListID).append("<option value='" + el.id + "'>" + el.text + "</option>");
                });
                form.render('select');
            }
        },
        error: function (data) {
            layer.alert(data);
        }
    });

}

function My_Init_ServiceCategory($, form, objListID,includEmpty) {
    $.ajax({
        url: url_Get_ServiceCategoryList,
        type: 'GET',
        async: false,
        cache: false,
        success: function (data) {
            if (data != null && data != '') {
                var _data = eval(data);
                if (includEmpty)
                    $('#' + objListID).append("<option value=''>Service Category</option>");
                $(_data).each(function (index, el) {
                    $('#' + objListID).append("<option value='" + el.id + "'>" + el.text + "</option>");
                });
                form.render('select');
            }
        },
        error: function (data) {
            layer.alert(data);
        }
    });
}
function My_Init_TaskCategory($, form, objListID, serviceCategory, includEmpty) {
    My_Init_TaskCategory($, form, objListID, '', includEmpty);
}
function My_Init_TaskCategory($, form, objListID,serviceCategory, includEmpty) {
    $.ajax({
        url: url_Get_TaskCategoryList,
        type: 'POST',
        data: {
            ServiceCategory: serviceCategory
        },
        async: false,
        cache: false,
        success: function (data) {
            if (data != null && data != '') {
                var _data = eval(data);
                $('#' + objListID).empty();
                if (includEmpty)
                    $('#' + objListID).append("<option value=''>Task Category</option>");
                $(_data).each(function (index, el) {
                    $('#' + objListID).append("<option value='" + el.id + "'>" + el.text + "</option>");
                });
                form.render('select');
            }
        },
        error: function (data) {
            layer.alert(data);
        }
    });
}
function My_Init_ServiceMethodCategory($, form, objListID, includEmpty) {
    $.ajax({
        url: url_Get_ServiceMethodCategoryList,
        type: 'GET',
        async: false,
        cache: false,
        success: function (data) {
            if (data != null && data != '') {
                var _data = eval(data);
                if (includEmpty)
                    $('#' + objListID).append("<option value=''>Service Method</option>");
                $(_data).each(function (index, el) {
                    $('#' + objListID).append("<option value='" + el.id + "'>" + el.text + "</option>");
                });
                form.render('select');
            }
        },
        error: function (data) {
            layer.alert(data);
        }
    });
}
function My_Init_EmailPriority($, form, objListID) {
    $('#' + objListID).append("<option value='Normal'>Normal</option>");
    $('#' + objListID).append("<option value='Low'>Low</option>");
    $('#' + objListID).append("<option value='High'>High</option>");
    form.render('select');
}

//验证CheckBox默认值,如果未选中,则设置0
function My_VerifyCheckBox($,chkList, field) {
    $.each(chkList, function (index, elem) {
        if (!field.hasOwnProperty(elem.id)) {
            field[elem.id] = 0;
            //field[elem.id] = $('#' + elem.id).val();
        }
    })
}

function My_Init_Frequency($, form, objListID,includeEmpty) {
    $.ajax({
        url: url_Get_FrequencyList,
        type: 'GET',
        async: false,
        cache: false,
        success: function (data) {
            var _ds = eval(data);
            if (includeEmpty)
            $('#' + objListID).append("<option value=''>Choose Frequency</option>");
            $(_ds).each(function (index, el) {
                $('#' + objListID).append("<option value='" + el.id + "'>" + el.text + "</option>");
            });
            form.render('select');
        },
        error: function (data) {
            layer.alert(data);
        }
    })
}

function My_Init_WX_EnvironmentList($, form, objListID, includeEmpty) {
    $.ajax({
        url: url_Get_WeiXinEnvironmentList,
        type: 'GET',
        async: false,
        cache: false,
        success: function (data) {
            var _ds = JSON.parse(data);
            if (includeEmpty)
                $('#' + objListID).append("<option value=''>Choose Env</option>");
            $(_ds.data).each(function (index, el) {
                $('#' + objListID).append("<option value='" + el.EnvID + "'>" + el.EnvTitle + "</option>");
            });
            form.render('select');
        },
        error: function (data) {
            layer.alert(data);
        }
    });
}

function My_Init_WX_MessageTypeList($, form, objListID, includeEmpty) {
    $.ajax({
        url: url_Get_WeiXinMessageTypeList,
        type: 'GET',
        async: false,
        cache: false,
        success: function (data) {
            var _ds = eval(data);
            if (includeEmpty)
                $('#' + objListID).append("<option value=''>Choose MsgType</option>");
            $(_ds).each(function (index, el) {
                $('#' + objListID).append("<option value='" + el.id + "'>" + el.text + "</option>");
            });
            form.render('select');
        },
        error: function (data) {
            layer.alert(data);
        }
    });
}
function My_Init_WX_MessageTargetTypeList($, form, objListID, includeEmpty) {
    $.ajax({
        url: url_Get_WeiXinMessageTargetTypeList,
        type: 'GET',
        async: false,
        cache: false,
        success: function (data) {
            var _ds = eval(data);
            if (includeEmpty)
                $('#' + objListID).append("<option value=''>Choose Target</option>");
            $(_ds).each(function (index, el) {
                $('#' + objListID).append("<option value='" + el.id + "'>" + el.text + "</option>");
            });
            form.render('select');
        },
        error: function (data) {
            layer.alert(data);
        }
    });
}

function My_Init_LogicType($, form, objListID, includeEmpty) {
    $.ajax({
        url: url_Get_LogicTypeList,
        type: 'GET',
        async: false,
        cache: false,
        success: function (data) {
            var _ds = eval(data);
            if (includeEmpty)
                $('#' + objListID).append("<option value=''>Logic Type</option>");
            $(_ds).each(function (index, el) {
                $('#' + objListID).append("<option value='" + el.id + "'>" + el.text + "</option>");
            });
            form.render('select');
        },
        error: function (data) {
            layer.alert(data);
        }
    });
}
function My_Init_FailureDirectionType($, form, objListID, includeEmpty) {
    $.ajax({
        url: url_Get_FailureDirectionTypeList,
        type: 'GET',
        async: false,
        cache: false,
        success: function (data) {
            var _ds = eval(data);
            if (includeEmpty)
                $('#' + objListID).append("<option value=''>Failure Direction</option>");
            $(_ds).each(function (index, el) {
                $('#' + objListID).append("<option value='" + el.id + "'>" + el.text + "</option>");
            });
            form.render('select');
        },
        error: function (data) {
            layer.alert(data);
        }
    });
}
function My_Init_ValueCompareTypeList($, form, objListID, includeEmpty) {
    if (includeEmpty)
        $('#' + objListID).append("<option value=''>Compare Type</option>");
    $.each(arrValCompare, function (ind, val) {
        $('#' + objListID).append("<option value='" + val.id + "'>" + val.text + "</option>");
    });
    form.render('select');
}

function My_Init_Package_ParameterList($, form, objListID, packageID, includeEmpty) {
    $.ajax({
        url: url_Get_Package_ParameterList + packageID,
        type: 'GET',
        async: false,
        cache: false,
        success: function (data) {
            var _ds = eval(data);
            if (includeEmpty)
                $('#' + objListID).append("<option value=''>Parameter List</option>");
            $(_ds).each(function (index, el) {
                $('#' + objListID).append("<option value='" + el.id + "'>" + el.text + "</option>");
            });
            form.render('select');
        },
        error: function (data) {
            layer.alert(data);
        }
    });
}

function My_Init_DepartmentType($, objSelectID, includeEmpty) {
    if (includeEmpty)
        $('#' + objSelectID).append("<option value=''>" + $.i18n.prop('val-department') + "</option>");

    $('#' + objSelectID).append("<option value='Company'>" + $.i18n.prop('val-item-company') + "</option>");
    $('#' + objSelectID).append("<option value='Dept'>" + $.i18n.prop('val-item-dept') + "</option>");
    $('#' + objSelectID).append("<option value='SubDept'>" + $.i18n.prop('val-item-subdept') + "</option>");
}

function My_Init_Gender($, objSelectID, includeEmpty) {
    if (includeEmpty)
        $('#' + objSelectID).append("<option value=''>" + $.i18n.prop('val-gener') + "</option>");

    $('#' + objSelectID).append("<option value='Male'>" + $.i18n.prop('val-item-male') + "</option>");
    $('#' + objSelectID).append("<option value='Female'>" + $.i18n.prop('val-item-female') + "</option>");
}

function My_Init_JobStatus($, objSelectID, includeEmpty) {
    if (includeEmpty)
        $('#' + objSelectID).append("<option value=''>" + $.i18n.prop('val-staff-status') + "</option>");

    $('#' + objSelectID).append("<option value='Active'>" + $.i18n.prop('val-item-onjob') + "</option>");
    $('#' + objSelectID).append("<option value='Leave'>" + $.i18n.prop('val-item-leave') + "</option>");
    $('#' + objSelectID).append("<option value='Sick Leave'>" + $.i18n.prop('val-item-sick-leave') + "</option>");
    $('#' + objSelectID).append("<option value='Maternity Leave'>" + $.i18n.prop('val-item-maternity-leave') + "</option>");
    $('#' + objSelectID).append("<option value='Vacation'>" + $.i18n.prop('val-item-vacation') + "</option>");
    $('#' + objSelectID).append("<option value='Suspension'>" + $.i18n.prop('val-item-suspension') + "</option>");
    $('#' + objSelectID).append("<option value='Retirement'>" + $.i18n.prop('val-item-retirement') + "</option>");
}

function My_Init_EmployeeCategory($, objSelectID, includEmpty) {
    $.ajax({
        url: '../../Data/svcCommProvider.aspx?method=Get_Shared_EmployeeCategory',
        type: 'GET',
        async: false,
        cache: false,
        success: function (data) {
            var _ds = eval(data);
            if (includEmpty)
                $('#' + objSelectID).append("<option value=''>Employee Category</option>");
            $(_ds).each(function (index, el) {
                $('#' + objSelectID).append("<option value='" + el.ItemKey + "'>" + el.ItemValue + "</option>");
            });
        }
    });
}

function My_Init_EmployeeSpeicalRole($, selectM, objListID) {
    var _selectM = {};
    $.ajax({
        url: '../../Data/svcCommProvider.aspx?method=Get_Shared_DeptSpecialRoleList',
        type: 'GET',
        async: false,
        cache: false,
        success: function (data) {
            var _data = JSON.parse(data);
            _selectM = selectM({
                elem: '#' + objListID,
                data: _data,
                max: 10,
                field: { idName: 'ID', titleName: 'ItemValue' }
            });
        }
    })
    return _selectM;
}