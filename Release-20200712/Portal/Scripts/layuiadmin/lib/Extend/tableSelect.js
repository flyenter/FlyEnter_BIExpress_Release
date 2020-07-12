layui.define(['table', 'jquery', 'form'], function (exports) {
    "use strict";

    var MOD_NAME = 'tableSelect',
        $ = layui.jquery,
        table = layui.table,
        form = layui.form;
    var tableSelect = function () {
        this.v = '1.1.0';
    };
    var isChanged = false;  //当选中项目有变动时，在close当前窗体时，强制刷新

    /**
    * 初始化表格选择器
    */
    tableSelect.prototype.render = function (opt) {
        var elem = $(opt.elem);
        var tableDone = opt.table.done || function(){};
		
        //默认设置
        opt.searchKey = opt.searchKey || 'keyword';
        opt.searchPlaceholder = opt.searchPlaceholder || 'Key words';
        opt.checkedKey = opt.checkedKey;
        opt.dataCategory = opt.dataCategory || 'IDH';
        opt.table.page = opt.table.page || true;
        opt.table.limit = opt.table.limit || 100;
        opt.table.page = {
            layout: ['prev', 'next', 'count']
        }
        opt.table.height = opt.table.height || 318;
        
        elem.off('click').on('click', function (e) {
            e.stopPropagation();

            if($('div.tableSelect').length >= 1){
                return false;
            }

            var t = elem.offset().top + elem.outerHeight()+"px";
            var l = elem.offset().left +"px";
            var tableName = "tableSelect_table_" + new Date().getTime();
            var tableValList = 'tableSelect_table_ValList_' + new Date().getTime();
            var tableBox = '<div class="tableSelect layui-anim layui-anim-upbit" style="left:' + l + ';top:' + t + ';border: 1px solid #d2d2d2;background-color: #fff;box-shadow: 0 2px 4px rgba(0,0,0,.12);padding:5px 5px 5px 5px;position: absolute;z-index:0;margin: 5px 0;border-radius: 2px;width:650px;">';
            tableBox += '<div class="tableSelectBar" style="background-color: #9E9E9E;padding: 5px;">';
            tableBox += '<form class="layui-form" action="" style="display:inline-block;">';
            tableBox += '<input id="searchKey" style="display:inline-block;width:335px;height:30px;vertical-align:middle;margin-right:-1px;border: 1px solid #C9C9C9;" type="text" name="' + opt.searchKey + '" placeholder="' + opt.searchPlaceholder + '" autocomplete="off" class="layui-input"><button class="layui-btn layui-btn-sm layui-btn-primary tableSelect_btn_search" lay-submit lay-filter="tableSelect_btn_search"><i class="layui-icon layui-icon-search"></i></button><input id="searchMode" name="searchMode" style="width:1px; visibility:hidden" />';
            tableBox += '</form>';
            tableBox += '<button style="float:right;margin-right: 12px;width:60px;border-radius: 4px;" class="layui-btn layui-btn-sm tableSelect_btn_Clean">Clean<span></span></button>';
            tableBox += '<button style="float:right;width:60px;margin-right:5px;border-radius: 4px;" class="layui-btn layui-btn-sm tableSelect_btn_close">Cancel<span></span></button>';
            tableBox += '<button style="float:right;width:100px;border-radius: 4px;" class="layui-btn layui-btn-sm tableSelect_btn_select">Choose<span></span></button>';
            tableBox += '</div>';
            tableBox += '<div class="layui-container" style="width:650px;margin:0px;padding:0px;">';
            tableBox += '  <div class="layui-row">';
            tableBox += '    <div class="layui-col-md7">';
            tableBox += '       <table id="' + tableName + '" lay-filter="' + tableName + '"></table>';
            tableBox += '    </div>';
            tableBox += '    <div class="layui-col-md5">';
            tableBox += '       <table id="' + tableValList + '" lay-filter="' + tableValList + '"></table>';
            tableBox += '    </div>';
            tableBox += '  </div>';
            tableBox += '</div>';

            tableBox += '</div>';
            tableBox = $(tableBox);
            $('body').append(tableBox);
            
            //数据缓存
            var checkedData = [];
            $('#searchMode').val(opt.searchMode);

            //渲染TABLE
            opt.table.elem = "#"+tableName;
            opt.table.id = tableName;
            var dataFilter = {};
            //dataFilter[opt.searchKey] = elem.attr('ts-selected'); //不使用当前选择内容做查询条件，确保可以查询出所有记录先
            dataFilter['dataCategory'] = opt.dataCategory;
            opt.table.where = dataFilter;
            opt.table.done = function (res, curr, count) {
                defaultChecked(res, curr, count);
                setChecked(res, curr, count);
                tableDone(res, curr, count);
            };
            var tableSelect_table = table.render(opt.table);

            var tableValList_table = function (data) {
                table.render({
                    elem: '#' + tableValList,
                    limit: 100,
                    height: 318,
                    page: {
                        layout: ['prev', 'next', 'count']
                    },
                    data: data,
                    cols: [[
                        { field: 'colNo', type: 'numbers',style:'background-color:gray;color:white;' }
                        , { field: opt.checkedKey, title: 'Selected', width: 160, style: 'background-color:gray;color:white;' }
                        , { field: 'colOpr', fixed: 'right', width: '50', toolbar: '<div><a lay-event="selRemove" style="color:white;cursor: pointer;"><i class="layui-icon layui-icon-delete"></i></a></div>', style: 'background-color:gray;color:white;' }
                    ]]
                    , done: function (res, curr, count) {
                        $('.tableSelect table thead tr').css('background-color', 'rgb(158, 158, 158)');
                        $('.tableSelect table thead tr').css('color', 'white');
                        $('tbody [data-field="' + opt.checkedKey+'"] .layui-table-cell').css('text-align', 'left');
                        //$(".layui-col-md5 th[data-field='colNo']").css('background-color', '#9E9E9E');
                        //$(".layui-col-md5 th[data-field='" + opt.checkedKey + "']").css('background-color', '#9E9E9E');
                        //$(".layui-col-md5 th[data-field='" + opt.checkedKey + "']").css('color', 'white');
                        //$(".layui-col-md5 th[data-field='colOpr']").css('background-color', '#9E9E9E');
                    },
                });
            }
            //从选中列表中删除特定项目
            table.on('tool(' + tableValList + ')', function (obj) {
                var data = obj.data;
                if (obj.event == 'selRemove') {
                    var iV = -1;
                    if (checkedData) {
                        for (var i = 0; i < checkedData.length; i++) {
                            if (checkedData[i][opt.checkedKey] == data[opt.checkedKey]) {
                                iV = i;
                                break;
                            }
                        }
                        if (iV > -1) {
                            checkedData.splice(iV, 1);
                            setChecked('', '', '');
                            isChanged = true;
                        }
                    }
                }
            });

            //分页选中保存数组
            table.on('radio('+tableName+')', function(obj){
                if(opt.checkedKey){
                    checkedData = table.checkStatus(tableName).data
                }
                updataButton(table.checkStatus(tableName).data.length)
            })
            table.on('checkbox(' + tableName + ')', function (obj) {
                if (opt.checkedKey) {
                    if (obj.checked) {
                        for (var i = 0; i < table.checkStatus(tableName).data.length; i++) {
                            checkedData.push(table.checkStatus(tableName).data[i])
                        }
                    } else {
                        if (obj.type == 'all') {
                            for (var j = 0; j < table.cache[tableName].length; j++) {
                                for (var i = 0; i < checkedData.length; i++) {
                                    if (checkedData[i][opt.checkedKey] == table.cache[tableName][j][opt.checkedKey]) {
                                        checkedData.splice(i, 1)
                                    }
                                }
                            }
                        } else {
                            //因为LAYUI问题，操作到变化全选状态时获取到的obj为空，这里用函数获取未选中的项。
                            function nu() {
                                var noCheckedKey = '';
                                for (var i = 0; i < table.cache[tableName].length; i++) {
                                    if (!table.cache[tableName][i].LAY_CHECKED) {
                                        noCheckedKey = table.cache[tableName][i][opt.checkedKey];
                                    }
                                }
                                return noCheckedKey
                            }
                            var noCheckedKey = obj.data[opt.checkedKey] || nu();
                            for (var i = 0; i < checkedData.length; i++) {
                                if (checkedData[i][opt.checkedKey] == noCheckedKey) {
                                    checkedData.splice(i, 1);
                                }
                            }
                        }
                    }
                    checkedData = uniqueObjArray(checkedData, opt.checkedKey);
                    updataButton(checkedData.length)
                } else {
                    updataButton(table.checkStatus(tableName).data.length)
                }
                tableValList_table(checkedData);
            });

            //渲染表格后选中
            function setChecked(res2, curr, count) {
                //取消参数，直接读取内存值，可以通用
                var res = table.cache[tableName];
                for (var i = 0; i < res.length; i++) {
                    var isChecked = false;
                    for (var j = 0; j < checkedData.length; j++) {
                        if (res[i][opt.checkedKey] == checkedData[j][opt.checkedKey]) {
                            res[i].LAY_CHECKED = true;
                            var index = res[i]['LAY_TABLE_INDEX'];
                            var checkbox = $('#' + tableName + '').next().find('tr[data-index=' + index + '] input[type="checkbox"]');
                            checkbox.prop('checked', true).next().addClass('layui-form-checked');
                            var radio = $('#' + tableName + '').next().find('tr[data-index=' + index + '] input[type="radio"]');
                            radio.prop('checked', true).next().addClass('layui-form-radioed').find("i").html('&#xe643;');

                            isChecked = true;
                        }
                    }
                    if (!isChecked) {
                        $('#' + tableName).next().find("div.layui-table-body").find("tr[data-index='" + i + "'] div.layui-form-checked").click();
                        $('#' + tableName).next().find("div.layui-table-body").find("tr[data-index='" + i + "'] div.layui-form-checked").removeClass("layui-form-checked");
                    }
                }

                var checkStatus = table.checkStatus(tableName);
                if(checkStatus.isAll){
                    $('#'+tableName+'').next().find('.layui-table-header th[data-field="0"] input[type="checkbox"]').prop('checked', true);
                    $('#'+tableName+'').next().find('.layui-table-header th[data-field="0"] input[type="checkbox"]').next().addClass('layui-form-checked');
                }
                updataButton(checkedData.length)
                tableValList_table(checkedData);
            }
            
            //写入默认选中值(puash checkedData)
            function defaultChecked(res, curr, count) {
                if (opt.checkedKey && elem.attr('ts-selected')) {
                    var selected = elem.attr('ts-selected').split(",");
                    //直接读取缓存值，不做匹配，修复首页不匹配时选中你值的问题
                    //for(var i=0;i<res.data.length;i++){
                    //    for(var j=0;j<selected.length;j++){
                    //        if(res.data[i][opt.checkedKey] == selected[j]){
                    //            checkedData.push(res.data[i])
                    //        }
                    //    }
                    //}

                    //显示查询条件
                    var iKeyword = $('#searchKey').val() || elem.attr('ts-selected');
                    $('#searchKey').val(iKeyword);

                    for (var i = 0; i < selected.length; i++) {
                        var iSel = {};
                        iSel[opt.checkedKey] = selected[i];
                        checkedData.push(iSel);
                    }
                    checkedData = uniqueObjArray(checkedData, opt.checkedKey);
                }
            }

            //更新选中数量
            function updataButton (n) {
                tableBox.find('.tableSelect_btn_select span').html(n==0?'':'('+n+')')
            }
            
            //数组去重
            function uniqueObjArray(arr, type){
                var newArr = [];
                var tArr = [];
                if(arr.length == 0){
                    return arr;
                }else{
                    if(type){
                        for(var i=0;i<arr.length;i++){
                            if(!tArr[arr[i][type]]){
                                newArr.push(arr[i]);
                                tArr[arr[i][type]] = true;
                            }
                        }
                        return newArr;
                    }else{
                        for(var i=0;i<arr.length;i++){
                            if(!tArr[arr[i]]){
                                newArr.push(arr[i]);
                                tArr[arr[i]] = true;
                            }
                        }
                        return newArr;
                    }
                }
            }

            //FIX位置
            var overHeight = (elem.offset().top + elem.outerHeight() + tableBox.outerHeight() - $(window).scrollTop()) > $(window).height();
            var overWidth = (elem.offset().left + tableBox.outerWidth()) > $(window).width();
            overHeight && tableBox.css({'top':'auto','bottom':'0px'});
            overWidth && tableBox.css({'left':'auto','right':'5px'})
			
            //关键词搜索
            form.on('submit(tableSelect_btn_search)', function (data) {
                var dataFilter = {};
                dataFilter[opt.searchKey] = data.field[opt.searchKey];
                dataFilter['dataCategory'] = opt.dataCategory;
                debugger;
                tableSelect_table.reload({
                    where: dataFilter,
                    page: {
                        layout: ['prev', 'next', 'count']
                    }
                });
                return false;
            });

            //双击行选中
            table.on('rowDouble('+tableName+')', function(obj){
                var checkStatus = {data:[obj.data]};
                selectDone(checkStatus);
            })

            tableBox.find('.tableSelect_btn_close').on('click', function () {
                if (isChanged) {
                    var checkStatus = table.checkStatus(tableName);
                    if (checkedData.length > 1) {
                        checkStatus.data = checkedData;
                    }
                    selectDone(checkStatus);
                }
                else {
                    tableBox.remove();
                    delete table.cache[tableName];
                }
            });
            tableBox.find('.tableSelect_btn_Clean').on('click', function () {
                checkedData = [];
                isChanged = true;
                setChecked('', '', '');
            });

            //按钮选中
            tableBox.find('.tableSelect_btn_select').on('click', function () {
                var checkStatus = table.checkStatus(tableName);
                if(checkedData.length > 0){
                	checkStatus.data = checkedData;
                }
                selectDone(checkStatus);
            })

            //写值回调和关闭
            function selectDone(checkStatus) {
                if(opt.checkedKey){
                    var selected = [];
                    for (var i = 0; i < checkStatus.data.length; i++) {
                        selected.push(checkStatus.data[i][opt.checkedKey])
                    }
                    elem.attr("ts-selected", selected.join(","));
                    isChanged = false;
                }
                opt.done(elem, checkStatus);
                tableBox.remove();
                delete table.cache[tableName];
                checkedData = [];
            }
            
            //点击其他区域关闭
            //$(document).mouseup(function(e){
            //    var userSet_con = $(''+opt.elem+',.tableSelect');
            //    if(!userSet_con.is(e.target) && userSet_con.has(e.target).length === 0){
            //        tableBox.remove();
            //        delete table.cache[tableName];
            //        checkedData = [];
            //    }
            //});
        })
    }

    /**
    * 隐藏选择器
    */
    tableSelect.prototype.hide = function (opt) {
        $('.tableSelect').remove();
    }

    //自动完成渲染
    var tableSelect = new tableSelect();

    //FIX 滚动时错位
    if(window.top == window.self){
        $(window).scroll(function () {
            tableSelect.hide();
        });
    }

    exports(MOD_NAME, tableSelect);
})