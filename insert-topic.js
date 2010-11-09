function expqrep(el){
	var over = localStorage['chromeLL_qr'].split(';$$_QREND_$$;');
	var titles = Array();
	var text = Array();
	var ins = '';
	for(var q = 0; over[q]; q++){
		titles[q] = over[q].split(':$_QRTXTB_$:')[1];
		text[q] = over[q].split(':$_QRTXTB_$:')[0].replace(/\"/g, '_');
		ins += ' [<a href="##' + titles[q] + '" onclick="qp(' + q + ', this)" title="' + text[q] + '">' + titles[q] + '</a>]';
		
	}
	el.parentNode.innerHTML = '[<a href="##" onclick="colqr(this)">&lt;</a>' + ins + ']';
}
function qp(index, element){
	var over = localStorage['chromeLL_qr'].split(';$$_QREND_$$;');
	var ins = over[index].split(':$_QRTXTB_$:')[0];
	var f = element.parentNode.parentNode.getElementsByTagName('a').item(0).innerHTML;
	var uib = element.parentNode.parentNode.getElementsByTagName('a').item(0).href.indexOf('user=');
	//console.log(uib);
	var uid = element.parentNode.parentNode.getElementsByTagName('a').item(0).href;
	//console.log(uid);
	var ui = uid.substring(uib + 5, uid.length);
	var u = document.getElementsByClassName('userbar').item(0).getElementsByTagName('a').item(0).innerHTML.split('(')[0];
	u = u.substring(0, u.length - 1);
	var text = document.getElementsByName('message').item(0).innerHTML;
	//var head = text.split('---')[0];
	var sigs = text.split('---');
	var sig = '';
	for(var i = 1; sigs[i]; i++){
		sig += sigs[i];
	}
	sig = '\n---' + sig;
	ins = ins.replace('%f', f).replace(/%u/g, u).replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/%i/ig, ui) + sig;
	if(ins.indexOf('%q') == -1){
		QuickPost.publish('quote', element.parentNode);
		document.getElementsByName('message').item(0).innerHTML = ins;
	}
	else{
		document.getElementsByName('message').item(0).innerHTML = ins.replace('%q ', '').replace('%q', '');
		QuickPost.publish('quote', element.parentNode);
	}
}
function colqr(el){
	el.parentNode.innerHTML = '[<a href="##" onclick="expqrep(this);">&gt;</a>]';
}
function insmsg(e){
	try{e.target.getElementsByClassName("message-top").item(0);}
	catch (e){
		return 0;
	}
	if(e.target.getElementsByClassName("message-top").item(0) != null){
		var es=e.target.getElementsByClassName("message-top");
		es.item(0).innerHTML += ' | <span class="chromeLL-qr">[<a href="##" onclick="expqrep(this);">&gt;</a>]</span>';
	}
}
document.addEventListener('DOMNodeInserted', insmsg, false);
function toggleWatch(loc){
	get = getUrlVars(loc);
	if(localStorage['chromeLL_watched'].indexOf(get['topic']) == -1){
	console.log('1');
		localStorage['chromeLL_watched'] += ';' + get['topic'];
		document.getElementById('chromeLL_watch').innerHTML = 'Unwatch'
		location.reload(true);
	}else{
		var re = new RegExp(get['topic'],"g");
		console.log('2 ' + re);
		localStorage['chromeLL_watched'] = localStorage['chromeLL_watched'].replace(re, '');
		location.reload(true);
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