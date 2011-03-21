chrome.extension.sendRequest({need: "chromeLL_tchighlight"}, function(response) {
  if(response.data == "true"){
  	chrome.extension.sendRequest({need: "chromeLL_tchighlightcolor"}, function(response) {
  	if(window.location.href.indexOf('board=444') != -1){
  		ha(response.data);
  	}
  	else{
		tchl(response.data);
	}
	  });  
	}
});
function tchl(hlcolor){
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
		s.getElementsByTagName('a').item(0).style.color = hlcolor;
	}
	j = j + 1;
}
if(index == -1){
	console.log('unknown tc!');
}else{
	save(tcs, tnum, hlcolor);
}
}
function getTopic(pw){
	return pw.substring(pw.indexOf("topic") + 6, pw.indexOf("topic") + 13);
}
function save(tc, tl, hlc){
	var def = '';
	if(tc.length > 10){
		for(var i = tc.length - 10; i <= 10; i++){
			def += tc[i] + ":" + tl[i] + ";";
		}
		//console.log('cache rebuilt');
	}
	else{
		for(var i = 0; i < tc.length; i++){
			def += tc[i] + ":" + tl[i] + ";";
		}
	}
	localStorage['chromeLL_currenttc'] = def + "$COL$" + hlc;
}
function ha(hlc){
	console.log('TC highlighting has been disabled on HA');
}
document.addEventListener('DOMNodeInserted', tchl_update, false);
function tchl_update(e){
	var ls = localStorage['chromeLL_currenttc'];
	var hlcolor = ls.split('$COL$')[1];
	//the easy way out
	//tchl(hlcolor);
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
					s.getElementsByTagName('a').item(0).style.color = hlcolor;
				}
			}
		}
	}
}
function getUrlVars(urlz)
{
	//thanks for the function citizenray
	var vars = [], hash;
	var hashes = urlz.slice(urlz.indexOf('?') + 1).split('&');
	 
	for(var i = 0; i < hashes.length; i++)
	{
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
		if (hash[1]!=null && hash[1].indexOf("#")>=0)
		{
			vars[hash[0]]=hash[1].slice(0,hash[1].indexOf("#"));
		}
	}
	 
	return vars;
}
