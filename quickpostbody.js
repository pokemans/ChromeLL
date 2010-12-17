function qpbody(){
	var m = document.getElementsByClassName('quickpost-body')[0];
	var txt = document.getElementById('u0_13');
	var insM = document.createElement('input');
	insM.value = 'Mod';
	insM.name = 'Mod';
	insM.type = 'button';
	insM.id = 'mod';
	insM.addEventListener("click", qpbHandler, false);
	var insA = document.createElement('input');
	insA.value = 'Admin';
	insA.name = 'Admin';
	insA.type = 'button';
	insA.addEventListener("click", qpbHandler, false);
	insA.id = 'adm';
	var insQ = document.createElement('input');
	insQ.value = 'Quote';
	insQ.name = 'Quote';
	insQ.type = 'button';
	insQ.addEventListener("click", qpbHandler, false);
	insQ.id = 'quote';
	var insS = document.createElement('input');
	insS.value = 'Spoiler';
	insS.name = 'Spoiler';
	insS.type = 'button';
	insS.addEventListener("click", qpbHandler, false);
	insS.id = 'spoiler';
	var insP = document.createElement('input');
	insP.value = 'Preformated';
	insP.name = 'Preformated';
	insP.type = 'button';
	insP.addEventListener("click", qpbHandler, false);
	insP.id = 'pre';
	var insU = document.createElement('input');
	insU.value = 'Underline';
	insU.name = 'Underline';
	insU.type = 'button';
	insU.addEventListener("click", qpbHandler, false);
	insU.id = 'u';
	var insI = document.createElement('input');
	insI.value = 'Italic';
	insI.name = 'Italic';
	insI.type = 'button';
	insI.addEventListener("click", qpbHandler, false);
	insI.id = 'i';
	var insB = document.createElement('input');
	insB.value = 'Bold';
	insB.name = 'Bold';
	insB.type = 'button';
	insB.addEventListener("click", qpbHandler, false);
	insB.id = 'b';
	m.insertBefore(insM, m.getElementsByTagName('br')[0]);
	//m.insertBefore(insA, insM);
	m.insertBefore(insQ, insM);
	m.insertBefore(insS, insQ);
	m.insertBefore(insP, insS);
	m.insertBefore(insU, insP);
	m.insertBefore(insI, insU);
	m.insertBefore(insB, insI);
	m.insertBefore(document.createElement('br'), insB);
	
}
chrome.extension.sendRequest({need: "chromeLL_qponbottom"}, function(response) {
	if(response.data == "true"){
		injqbcss();
	}
});
function qpbHandler(e){
	if(e.target.tagName != 'INPUT'){
		return 0;
	}
	//from foxlinks
	var tag = e.target.id;
        var open = new RegExp("\\*", "m");
        var ta = e.target.nextSibling;

        while (ta.nodeName.toLowerCase() != "textarea")
            ta = ta.nextSibling;

        var st   = ta.scrollTop;
        var before = ta.value.substring(0, ta.selectionStart);
        var after  = ta.value.substring(ta.selectionEnd, ta.value.length);
        var select = ta.value.substring(ta.selectionStart, ta.selectionEnd);

        if (ta.selectionStart == ta.selectionEnd) {
            if (open.test(e.target.value)) {
                e.target.value = e.target.name;
                var focusPoint = ta.selectionStart + tag.length + 3;
                ta.value = before + "</" + tag + ">" + after;
            } else {
                e.target.value = e.target.name + "*";
                var focusPoint = ta.selectionStart + tag.length + 2;
                ta.value = before + "<" + tag + ">" + after;
            }

            ta.selectionStart = focusPoint;
        } else {
            var focusPoint = ta.selectionStart + (tag.length * 2) + select.length + 5;
            ta.value = before + "<" + tag + ">" + select + "</" + tag + ">" + after;
            ta.selectionStart = before.length;
        }

        ta.selectionEnd = focusPoint;
        ta.scrollTop = st;
        ta.focus();
}
function injqbcss(){
	//from foxlinks
	var cssCode = "body:not(.quickpost-expanded) form.quickpost {"+
        "display: block;"+
        "position: static;"+
        "}"+
        "body:not(.quickpost-expanded) form.quickpost a.quickpost-nub {"+
        "position: fixed;"+
        "}"+
        "body:not(.quickpost-expanded) form.quickpost div.quickpost-canvas {"+
        "display: block;"+
        "}";
	var styleElement = document.createElement("style");
        styleElement.type = "text/css";
        if (styleElement.styleSheet) {
            styleElement.styleSheet.cssText = cssCode;
        } else {
            styleElement.appendChild(document.createTextNode(cssCode));
        }
    	document.getElementsByTagName("head")[0].appendChild(styleElement);
}
function postBeforePreview(){
	var m = document.getElementsByClassName('quickpost-body')[0].getElementsByTagName('input');
	var preview;
	var post;
	for(var i = 0; m[i]; i++){
		if(m[i].name == 'preview'){
			preview = m[i];
		}
		if(m[i].name == 'post'){
			post = m[i];
		}
	}
	post.parentNode.removeChild(post);
	preview.parentNode.insertBefore(post, preview);
}
if(window.location.href.indexOf('showmessages') != -1){
chrome.extension.sendRequest({need: "chromeLL_tagbuttons"}, function(response) {
	if(response.data == "true"){
		qpbody();
	}
});
chrome.extension.sendRequest({need: "chromeLL_postbeforepreview"}, function(response) {
	if(response.data == "true"){
		postBeforePreview();
	}
});
}
	