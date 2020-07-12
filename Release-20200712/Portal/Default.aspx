<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="FlyEnter.BISuit.Portal.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>User Login</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta id="i18n_pagename" content="common" />
    <script src="Scripts/boot.js"></script>
    <link rel="stylesheet" href="Scripts/css/felogin.css" />
    <style>
        body {
            background: url(images/background.jpg) no-repeat center left;
            background-position: center;
            background-attachment: fixed;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            -moz-background-size: 100% 100%;
        }
    </style>
</head>
<body>
    <div class="login">
        <div class="login-topbar">
            <div class="logo">
                <a href="http://www.flyenter.com" target="_blank">
                    <img id="sys-logo" style="z-index: 1;" src=".\images\logo.png" />
                </a>
            </div>
        </div>
        <div class="login-area">
            <div class="msg">
                <span style="color: red;" data-i18n-text="lbl-welcome-title">
                </span>
                <br />
                <br />
                <span style="color: white; font-size: 40px;" data-i18n-text="lbl-welcome-content">FlyEnter BI-Express
                </span>
                <br />
                <span style="color: white; font-size: 40px;" data-i18n-text="lbl-welcome-content-name2">Schedule Control Platform
                </span>
            </div>
            <div id="loginInfo" class="loginInfo">
                <form class="layui-form layui-form-pane" action="">
                    <div class="loginTitle">
                        <img src="Images/LogUser.png" style="width: 60px;" />
                    </div>
                    <div class="layui-form-item" style="margin-top: 20px; text-align: center;">
                        <div class="layui-inline" style="margin-bottom: 5px;">
                            <label class="layui-form-label" style="width: 110px;"><i class="layui-icon layui-icon-username" style="font-size: 25px;"></i></label>
                            <div class="layui-input-inline">
                                <input type="text" id="UserName" name="UserName" data-i18n-placeholder="lbl-user-name" class="layui-input" autocomplete="off" lay-verify="required" runat="server" />
                            </div>
                        </div>
                        <div class="layui-inline" style="margin-bottom: 5px;">
                            <label class="layui-form-label" style="width: 110px;"><i class="layui-icon layui-icon-password" style="font-size: 25px;"></i></label>
                            <div class="layui-input-inline">
                                <input type="password" name="Password" data-i18n-placeholder="lbl-password" class="layui-input" autocomplete="off" />
                            </div>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <div class="layui-input-block" style="margin-left: 0px; text-align: center;">
                            <button class="layui-btn" lay-submit="" lay-filter="btnLogin" style="width: 300px; background-color: #e1000f;"><span data-i18n-text="btn-login-by-account">Log In</span></button>
                        </div>
                    </div>
                    <hr />
                    <div class="layui-form-item">
                        <div class="layui-input-block" style="margin-left: 0px; text-align: center;">
                            <input type="hidden" id="CurrDomainUserName" name="CurrDomainUserName" runat="server" />
                            <button class="layui-btn" id="btnDomainUser" lay-submit="" lay-filter="btnDomainLogin" style="width: 300px; height: 80px; line-height: 20px; background-color: #e1000f; font-size:large" runat="server">
                                <span data-i18n-text="btn-login-by-domain"></span><br />
                                <span id="currentDomainName" runat="server"></span>
                            </button>
                        </div>
                    </div>
                    <div style="text-align: center;transform:translateY(-15%)">
                        <input type="checkbox" lay-skin="switch" lay-text="中文简体|English" lay-filter="languageChoose" name="languageChoose" id="languageChoose">
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script>
        var form;
        var _subIndex = -1;

        layui.use(['form'], function () {
            var $ = layui.$;
            form = layui.form;

            checkLocalLang();

            form.on('submit(btnLogin)', function (data) {
                var _data = data.field;
                Login(_data.UserName, _data.Password, 'user');
                return false;
            });
            form.on('submit(btnDomainLogin)', function (data) {
                var _data = data.field;
                Login(_data.CurrDomainUserName, '', 'domain');
                return false;
            });
            form.on('switch(languageChoose)', function (data) {

                var lang = this.checked ? 'cn' : 'en';
                getCookie("userLanguage", lang, {
                    expires: 30,
                    path: '/'
                });
                execI18n('scripts/i18n/', lang);

                var iframeSet = document.getElementsByTagName('iframe');
                for (var i = 0; i < iframeSet.length; i++) {
                    if (typeof iframeSet[i].contentWindow.refreshLanguage != 'undefined') {
                        iframeSet[i].contentWindow.refreshLanguage();
                    }
                }
            });
            function Login(userName, password, loginMode) {
                var _loadingFlag;
                $.ajax({
                    url: 'Data/svcLoginProvider.aspx?method=ValidateUserLoginInfo',
                    type: 'POST',
                    data: { UserName: userName, Password: password, LoginMode: loginMode },
                    beforeSend: function (XMLHttpRequest) {
                        _loadingFlag = layer.msg('Load...');
                    },
                    success: function (item) {
                        layer.close(_loadingFlag);
                        var item = JSON.parse(item);
                        if (item.ErrMsg != null && item.ErrMsg != '') {
                            layer.open({
                                title: 'Rover',
                                content: $.i18n.prop('msg-access-err-code-'+item.ErrMsg)
                            });
                        }
                        else {
                            location.href = "BIStudio.html?v=" + My_GetTimeNumberList();
                        }
                    },
                    error: function (error) {
                        layer.close(_loadingFlag);
                        layer.open({
                            title: 'Rover',
                            content: error
                        });
                    }
                });
            }

        });

        function checkLocalLang() {
            var iLang = 'cn';
            iLang = GetLocalLang();
            execI18n('scripts/i18n/', iLang);

            if (iLang == 'cn')
                $('#languageChoose').prop('checked', true);
            else
                $('#languageChoose').prop('checked', false);

            form.render('checkbox');
        }

    </script>
</body>
</html>
