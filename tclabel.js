chrome.extension.sendRequest({need: "chromeLL_tclabel"}, function(response) {
    if(response.data == "true"){
        if(window.location.href.indexOf('board=444') != -1){
            hal();
        }
        else{
            tcll();
            document.addEventListener('DOMNodeInserted', tcll_update, false);
        }
    }
});
function tcll(){
if(localStorage['chromeLL_currenttc'] == undefined){
	localStorage['chromeLL_currenttc'] = 'test:234341;fsdef:34234';
}
var ls = localStorage['chromeLL_currenttc'];
var g = document.getElementsByTagName('div').item(6).getElementsByTagName('a').item(0).innerHTML;
var o = document.getElementsByClassName('message-top').item(0).getElementsByTagName('a').item(0).innerHTML;
var j = 0;
var w = "" + window.location;
var tcs = new Array();
var tnum = new Array();
var topicnum = getTopic(w);
var index = -1;
if(ls.indexOf(":") == -1){
	ls = 'test:234341;fsdef:34234';
}
var ovr = ls.split('$COL$')[0];
var tlists = ovr.split(';');
for(var q = 0; tlists[q]; q++){
	tcs[q] = tlists[q].split(':')[0].toLowerCase();
	tnum[q] = tlists[q].split(':')[1].toLowerCase();
}
if(w.indexOf("page") == -1 || w.indexOf("page=1") != -1){
	if(ls.indexOf(getTopic(w)) == -1){
		tcs[tcs.length] = o.toLowerCase();
		tnum[tnum.length] = getTopic(w);
		index = tcs.length - 1;
	}
}
if(index == -1){
	for(var i = 0; i < tcs.length; i++){
		if(tnum[i] == getTopic(w)){
			index = i;
		}
	}
}
while(document.getElementsByClassName('message-top').item(j)){
	var s = document.getElementsByClassName('message-top').item(j);
	if(s.getElementsByTagName('a').item(0).innerHTML.toLowerCase() == tcs[index]){
        var ipx = document.createElement('span');
        ipx.innerHTML = ' | <b>(TC)</b> ';
		s.insertBefore(ipx, s.getElementsByTagName('a')[0].nextSibling);
	}
	j = j + 1;
}
}
function hal(){
	console.log('TC labeling has been disabled on HA');
}
function tcll_update(e){
	var ls = localStorage['chromeLL_currenttc'];
	var hlcolor = ls.split('$COL$')[1];
	try{e.target.getElementsByClassName("message-top").item(0);}
	catch (e){
		return 0;
	}
	var ls = localStorage['chromeLL_currenttc'];
	var ovr = ls.split('$COL$')[0];
	var hlcolor = ls.split('$COL$')[1];
	var tlists = ovr.split(';');
	var tcs = Array();
	var tnum = Array();
	var get=getUrlVars(window.location.href);
	for(var q = 0; tlists[q]; q++){
		tcs[q] = tlists[q].split(':')[0].toLowerCase();
		tnum[q] = tlists[q].split(':')[1].toLowerCase();
	}
	var updates = 0;
	if(e.target.getElementsByClassName("message-top").item(0) != null){
		var es=e.target.getElementsByClassName("message-top");
		var s = es.item(0);
		//console.log(tnum, get['topic']);
		//console.log(s.getElementsByTagName('a').item(0).innerHTML);
		for(var index = 0; tnum[index]; index++){
			if(tnum[index] == get['topic']){
				if(s.getElementsByTagName('a').item(0).innerHTML.toLowerCase() == tcs[index]){
					var ipx = document.createElement('span');
                   			ipx.innerHTML = ' | <b>(TC)</b> ';
                   			s.insertBefore(ipx, s.getElementsByTagName('a')[0].nextSibling);
				}
			}
		}
	}
}
