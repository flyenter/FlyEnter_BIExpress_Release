
__CreateJSPath = function (js) {
    var scripts = document.getElementsByTagName("script");
    var path = {};
    for (var i = 0, l = scripts.length; i < l; i++) {
        var src = scripts[i].src;
        src = src.replace('../', '');
        src = src.replace('~/', '');
        if (src.indexOf(js) != -1) {
            var ss = src.split(js);
            path.filePath = ss[0];
            break;
        }
    }
    var arrDefL = path.filePath.split("/");
    var defScriptRoot = '';
    for (var i = 3; i < arrDefL.length; i++) {
        if (arrDefL[i] != '')
            defScriptRoot = defScriptRoot + arrDefL[i] + '/';
    }
    path.DefaultScriptRoot = defScriptRoot;

    var href = location.href;
    href = href.split("#")[0];
    href = href.split("?")[0];
    var ss = href.split("/");
   // ss.length = 8;  //get the site location path, this value changes according to actual situation.
    href = ss.join("/");
    path.parentPath = href;
    if (path.filePath.indexOf("https:") == -1 && path.filePath.indexOf("http:") == -1 && path.filePath.indexOf("file:") == -1 && path.filePath.indexOf("\/") != 0) {
        path.filePath = path.filePath.replace('../', '');
        path.filePath = href + "/" + path.filePath;
    }    

    var iDiff = path.parentPath.split('/').length - path.filePath.split('/').length;
    if (iDiff > 0)
        iDiff = iDiff + 1;
    for (var i = 0; i < iDiff; i++) {
        path.DefaultScriptRoot = '../' + path.DefaultScriptRoot;
    }

    return path;
}

var bootPATH = __CreateJSPath("boot.js");
var sitePath = bootPATH.parentPath;

document.write('<script src="' + bootPATH.DefaultScriptRoot + 'jquery-3.4.1.min.js" type="text/javascript"></script>');
document.write('<script src="' + bootPATH.DefaultScriptRoot + 'jquery.i18n.properties.js" type="text/javascript"></script>');
document.write('<script src="' + bootPATH.DefaultScriptRoot + 'layuiadmin/layui/Layui.js" type="text/javascript"></script>');
document.write('<script src="' + bootPATH.DefaultScriptRoot + 'my/shareFunction.js" type="text/javascript"></script>');
document.write('<script src="' + bootPATH.DefaultScriptRoot + 'my/sharedDataOps.js" type="text/javascript"></script>');
document.write('<script src="' + bootPATH.DefaultScriptRoot + 'my/myI18Nlanuage.js" type="text/javascript"></script>');
document.write('<script src="' + bootPATH.DefaultScriptRoot + 'my/DateTimeExt.js" type="text/javascript"></script>');

document.write('<link href="' + bootPATH.DefaultScriptRoot + 'layuiadmin/layui/css/layui.css" rel="stylesheet" type="text/css" />'); 
document.write('<link href="' + bootPATH.DefaultScriptRoot + 'font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css" />'); 
document.write('<link href="' + bootPATH.DefaultScriptRoot + 'css/flyenter.css" rel="stylesheet" type="text/css" />'); 


////////////////////////////////////////////////////////////////////////////////////////
function getCookie(sName) {
    var aCookie = document.cookie.split("; ");
    var lastMatch = null;
    for (var i = 0; i < aCookie.length; i++) {
        var aCrumb = aCookie[i].split("=");
        if (sName == aCrumb[0]) {
            lastMatch = aCrumb;
        }
    }
    if (lastMatch) {
        var v = lastMatch[1];
        if (v === undefined) return v;
        return unescape(v);
    }
    return null;
}