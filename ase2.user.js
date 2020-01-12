// ==UserScript==
// @name         ASE2
// @namespace    https://github.com/collinb1129
// @version      1.0.0
// @description  download file
// @author       collinb1129
// @require      http://code.jquery.com/jquery-latest.js
// @match        http*://www.analog.com/en/products/*
// @grant        none
// ==/UserScript==

document.body.addEventListener("keyup", function(event) {

    if (event.keyCode === 13) { // 13 is the enter key, but it can be changed.

        event.preventDefault();
        var name = $(".titletext")[0].innerHTML.replace(/\s\s+/g, "");
        var description = $(".col-md-7")[0].innerHTML.replace(/\s\s+/g, '').replace(/(\r\n|\n|\r)/gm,"");

        var link = document.createElement("A");
        var html = document.createElement("HTML");
        var p = document.createElement("P");

        link.href = "https://www.analog.com/en/products/lt1766.html#product-overview";

        link.append(name);
        p.appendChild(link);
        p.append(" -- " + description);
        html.appendChild(p);

        html = html.outerHTML;

        function download(data, filename, type) {
            var file = new Blob([data], {type: type});
            if (window.navigator.msSaveOrOpenBlob) // IE10+
                window.navigator.msSaveOrOpenBlob(file, filename);
            else { // Others
                var a = document.createElement("a"),
                        url = URL.createObjectURL(file);
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                setTimeout(function() {
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                }, 0);
            }
        }

        download(html, "link.html", "text/html")
    }
});
