var httpCacheUtil = {
    createXHR: function () {
        if (typeof XMLHttpRequest != "undefined") {
            return new XMLHttpRequest();
        }
        else if (typeof ActiveXObject != "undefined") {
            if (typeof arguments.callee.activeXString != "string") {
                var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"];
                for (var i = 0, len = versions.length; i < len; ++i) {
                    try {
                        var xhr = new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        return xhr;
                    }
                    catch (ex) {
                        // pass
                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        }
        else {
            throw new Error("No XHR object available");
        }
    },
    update: function (url) {
        try {
            var success = function (responseText) {

            };
            var error = function (errorStatus) {

            };
            var xhr = httpCacheUtil.createXHR();
            if (typeof xhr != "undefined" && xhr != null) {
                xhr.onreadystatechange = function (event) {
                    if (xhr.readyState == 4) {
                        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                            if (typeof success === "function")
                                success(xhr.responseText);
                        }
                        else {
                            if (typeof error === "function")
                                error(xhr.status);
                        }
                    }
                };
                xhr.open("GET", url, false);
                xhr.setRequestHeader("If-None-Match", "\"22426f327b8cd1:0\"");
                xhr.setRequestHeader("If-Modified-Since", "Sat, 31 Dec 2011 02:51:00 GMT");
                xhr.send(null);
            }
        }
        catch (e) {
            // throw no exception
        }
    }
};