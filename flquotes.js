var css = ".quoted-message{\n	margin-left: 15px;\n padding-left: 0px;\n border: 4px solid;\n -webkit-border-radius: 4px;\n}\n}";
var heads = document.getElementsByTagName("head");
var node = document.createElement("style");
node.type = "text/css";
node.appendChild(document.createTextNode(css));
heads[0].appendChild(node);