﻿/**
 * cookie操作
 */
var getCookie = function (name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var s = [cookie, expires, path, domain, secure].join('');
        var secure = options.secure ? '; secure' : '';
        var c = [name, '=', encodeURIComponent(value)].join('');
        var cookie = [c, expires, path, domain, secure].join('')
        document.cookie = cookie;
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

/**
 * 获取浏览器语言类型
 * @return { string } 浏览器国家语言
 */
var getNavLanguage = function () {
    if (navigator.appName == "Netscape") {
        var navLanguage = navigator.language;
        return navLanguage.substr(0, 2);
    }
    return false;
}

/*
 * 获取预先设置的语言类
 */
function GetLocalLang() {
    var i18nLanguage = 'cn';
    var webLanguage = ['cn', 'en'];
    /*
  首先获取用户浏览器设备之前选择过的语言类型
   */
    if (getCookie("userLanguage")) {
        i18nLanguage = getCookie("userLanguage");
    } else {
        // 获取浏览器语言
        var navLanguage = getNavLanguage();
        if (navLanguage) {
            // 判断是否在网站支持语言数组里
            var charSize = $.inArray(navLanguage, webLanguage);
            if (charSize > -1) {
                i18nLanguage = navLanguage;
                // 存到缓存中
                getCookie("userLanguage", navLanguage);
            };
        }
    }
    return i18nLanguage;
}

/**
 * 执行页面i18n方法
 * @return
 */
var execI18n = function (langPath,lang) {
    /*
    获取一下资源文件名
     */
    var optionEle = $("#i18n_pagename");
    if (optionEle.length < 1) {
        console.log("未找到页面名称元素，请在页面写入\n <meta id=\"i18n_pagename\" content=\"页面名(对应语言包的语言文件名)\">");
        return false;
    };
    var sourceName = optionEle.attr('content');
    sourceName = sourceName.split('-');

    /* 需要引入 i18n 文件*/
    if ($.i18n == undefined) {
        console.log("请引入i18n js 文件")
        return false;
    };

    /*
    这里需要进行i18n的翻译
     */
    jQuery.i18n.properties({
        name: sourceName, //资源文件名称
        path: langPath, //资源文件路径
        mode: 'map', //用Map的方式使用资源文件中的值
        language: lang,
        callback: function () {//加载成功后设置显示内容
            var _res_Name = '';
            var _res_Type = '';
            try {
                _res_Type = 'placeholder';
                //初始化页面元素
                $('[data-i18n-placeholder]').each(function () {
                    _res_Name = $(this).data('i18n-placeholder');
                    $(this).attr('placeholder', $.i18n.prop(_res_Name));
                });
                _res_Type = 'text';
                $('[data-i18n-text]').each(function () {
                    //如果text里面还有html需要过滤掉
                    var html = $(this).html();
                    var reg = /<(.*)>/;
                    if (reg.test(html)) {
                        var htmlValue = reg.exec(html)[0];
                        _res_Name = $(this).data('i18n-text');
                        $(this).html(htmlValue + $.i18n.prop(_res_Name));
                    }
                    else {
                        _res_Name = $(this).data('i18n-text');
                        $(this).text($.i18n.prop(_res_Name));
                    }
                });
                _res_Type = 'value';
                $('[data-i18n-value]').each(function () {
                    _res_Name = $(this).data('i18n-value');
                    $(this).val($.i18n.prop(_res_Name));
                });
                _res_Type = 'title';
                $('[data-i18n-title]').each(function () {
                    _res_Name = $(this).data('i18n-title');
                    $(this).attr('title', $.i18n.prop(_res_Name));
                });
                _res_Type = 'html';
                $('[data-i18n-html]').each(function () {
                    _res_Name = $(this).data('i18n-html');
                    $(this).html($.i18n.prop(_res_Name));
                });
            }
            catch (ex) {
                console.log(_res_Type + '-' + _res_Name + '-' + ex);
            }
        }
    });
}

$(document).ready(function () {
    refreshLanguage();
});

function refreshLanguage() {
    execI18n('../../scripts/i18n/', GetLocalLang());
    if (form != null) {
        form.render('checkbox');
        form.render('radio');
    }

    $('.layui-table-header [data-field]').each(function () {
        var fld = $(this).data('field');
        try {
            var fldName = $.i18n.prop('fld-' + fld);
            if (fldName != null && fldName != 'undefined')
                $('.layui-table-header [data-field="' + fld + '"] span').html(fldName);
        }
        catch (xxx) { }
    });

    if (_subIndex != 'undefined' && _subIndex > -1) {
        var iframe = window['layui-layer-iframe' + _subIndex];
        if (iframe != 'undefined' && iframe != null)
            iframe.refreshLanguage();

        iframe = parent.window['layui-layer-iframe' + _subIndex];
        if (iframe != 'undefined' && iframe != null)
            iframe.refreshLanguage();

    }
}