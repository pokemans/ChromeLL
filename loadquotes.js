chrome.extension.sendRequest({need: "chromeLL_loadquotes"}, function(response) {
  if(response.data == "true"){
  	loadquotes();
  }
});
function loadquotes(){

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if (node == null)
		node = document;
	if ( tag == null)
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	for (var i = 0, j = 0; i < elsLen; i++) {
		if (els[i].className == searchClass) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

function imagecount() {
	var imgs = document.getElementsByTagName('img').length;
	return imgs;
}

if (document.location.href.indexOf("https") == -1) {
	var url = "http";
} else {
	var url = "https";
}

function coolCursor() {
	this.style.cursor = 'pointer';
}

function processPage(XML, element) {
	var newPage = document.createElement("div");
	newPage.innerHTML = XML;
	var newmessage = getElementsByClass('message', newPage, null)[0];
	var scripttags = newmessage.getElementsByTagName('script');
	for (var i = 0; i < scripttags.length; i++) {
		var jsSource = scripttags[i].innerHTML.replace(/onDOMContentLoaded\(function\(\)\{new ImageLoader\(\$\("u0_1"\), "\\\/\\\//gi, '').replace(/\\/gi, '').replace(/\)\}\)/gi, '').split(',');
		var replacement = new Image();
		replacement.src = url + '://' + jsSource[0].replace(/"$/gi, '');
		replacement.className = 'expandimagesLOL';
		scripttags[i].parentNode.replaceChild(replacement, scripttags[i]);
		i--;
	}
	if (newmessage.innerHTML.indexOf('---') != -1) {
			var j = 0;
			while (newmessage.childNodes[j]) {
				if (newmessage.childNodes[j].nodeType == 3 && newmessage.childNodes[j].nodeValue.indexOf('---') != -1) {
					while (newmessage.childNodes[j]) {
						newmessage.removeChild(newmessage.childNodes[j]);	
					}
				}
				j++;
			}
	}
	element.parentNode.appendChild(newmessage);
}

function loadMessage() {	
	var mssgurl = this.id;
	var newSpan = document.createElement('span');
	newSpan.innerHTML = 'Loading message...';
	var loadingImg = new Image();
	loadingImg.src = 'data:image/gif;base64,' +
	'R0lGODlhEAAQAPIAAP///2Zm/9ra/o2N/mZm/6Cg/rOz/r29/iH/C05FVFNDQVBFMi4wAwEAAAAh/hpD' +
	'cmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZ' +
	'nAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi6' +
	'3P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAs' +
	'AAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKp' +
	'ZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8D' +
	'YlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJU' +
	'lIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe8' +
	'2p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAAD' +
	'Mgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAA' +
	'LAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsR' +
	'kAAAOwAAAAAAAAAAAA==';
	this.parentNode.insertBefore(newSpan, this);
	this.parentNode.replaceChild(loadingImg, this);
	var ajax = new XMLHttpRequest();
	ajax.open('GET', url + '://boards.endoftheinter.net/message.php?' + mssgurl, true);
	ajax.send(null);
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4) {
			if (ajax.status == 200) {
				processPage(ajax.responseText, newSpan);
				loadingImg.parentNode.removeChild(loadingImg);
				newSpan.parentNode.removeChild(newSpan);
			} else {
				alert("An error occurred loading the message. Fuck shit.");
			}
		}
	}
}

function findQuotes() {
	var quotes = getElementsByClass('quoted-message', document, 'div');
	for (var i = 0; i < quotes.length; i++) {
		var anchors = quotes[i].getElementsByTagName('a');
		for (var j = 0; j < anchors.length; j++) {
			if (anchors[j].innerHTML == '[quoted text omitted]') {
				anchors[j].removeAttribute('href');
				var parts = anchors[j].parentNode.getAttribute('msgid').split(',');
				var secondsplit = parts[2].split('@');
				anchors[j].id = 'id=' + secondsplit[0] + '&topic=' + parts[1] + '&r=' + secondsplit[1];
				anchors[j].addEventListener('click', loadMessage, true);
				anchors[j].style.textDecoration='underline';
				anchors[j].title = 'Click to load the omitted message';
				anchors[j].addEventListener('mouseover', coolCursor, true);
			}
		}	
	}
}

var currentMessages = 0;

function checkMssgs() {
	var mssgs = getElementsByClass('message-container', document.getElementById('u0_1'), 'div').length;
	if (mssgs > currentMessages) {
		findQuotes();
		currentMessages = mssgs;
	}
}

var interval = window.setInterval(checkMssgs, 1000);
}