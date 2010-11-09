function exp(el){
	if(window.location.href.indexOf('showtopics') != -1){
		var g = el.parentNode.getElementsByTagName('a').item(0).href;
		var topic = g.substring(g.indexOf("topic") + 6, g.indexOf("topic") + 13);
		console.log(topic);
		el.innerHTML = '[<a href="##" onclick="dec(this.parentNode)">&gt;</a>[<a href="##' + topic + '-rm" onclick="addrmtc(this)" title="remove topic/remove highlight">R</a>][<a href="##' + topic + '-pg" onclick="pgjump(this)" title="jump to page">P</a>][<a href="##' + topic + '-hl" onclick="hluser(this)" title="highlight topic/change highlight color">H</a>]]';
	}
}
function dec(el){
	var g = el.parentNode.getElementsByTagName('a').item(0).href;
	var topic = g.substring(g.indexOf("topic") + 6, g.indexOf("topic") + 13);
	el.innerHTML = '[<a href="##' + topic + '-exp" onclick="exp(this.parentNode)">&lt;</a>]';
}
function addrmtc(el){
try{
	topics = parsetopics();
	colors = parsecolors();
	var element = el.parentNode.parentNode.parentNode;
	var g = element.getElementsByTagName('a').item(0).href;
	var f = g.indexOf('topic');
	var ct = g.substring(f, g.length).split('=')[1];
	if(ishl(topics, ct)[0]){
		for(var i = 0; element.getElementsByTagName('td').item(i); i++){
			element.getElementsByTagName('td').item(i).style.background = '';
		}
		var g = element.getElementsByTagName('a').item(0).href;
		var f = g.indexOf('topic');
		var ct = g.substring(f, g.length).split('=')[1];
		for(var i = 0; i < topics.length; i++){
			if(topics[i] == ct){
				topics.splice(i, 1);
				colors.splice(i, 1);
				break;
			}
		}
		savehl(topics, colors);
	}
	else{
		var rms = parserm();
		rms[rms.length - 1] = ct;
		console.log(rms);
		element.parentNode.removeChild(element);
		saverm(rms);
	}
}
catch(e){}
}
function rerm(){
	if(localStorage['chromeLL_page_rm'] == undefined){
		localStorage['chromeLL_page_rm'] = '';
	}
	var ignores = parserm();
	if(window.location.href.indexOf('showtopics') != -1){
		var g = document.getElementsByTagName('tr');
		var title;
		for(var i = 1; g.item(i); i++){
			title = g.item(i).getElementsByTagName('td').item(0);
			for(var f = 0; f < ignores.length; f++){
				if(title.getElementsByTagName('a').item(0).href.toLowerCase().indexOf(ignores[f]) != -1 && ignores[f] != ''){
					//console.log('found topic to remove: \"' + g.item(i).getElementsByTagName('td').item(0).getElementsByTagName('a').item(0).innerHTML.toLowerCase() + "\" author: " + ignores[f] + " topic: " + i);
					//console.log(title.getElementsByTagName('a').item(0).href.toLowerCase() + " + ");
					title.parentNode.parentNode.removeChild(title.parentNode);
					i--;			
				}
			}
		}
	}
}
function hluser(element){
	//console.log(element.parentNode.parentNode.parentNode);
	if(localStorage['chromeLL_page_hl'] == undefined){
		console.log('ls not def');
		localStorage['chromeLL_page_hl'] = '';
	}
	var el = element.parentNode.parentNode.parentNode;
	var topics = parsetopics();
	var colors = parsecolors();
	var c = '#' + rcolor();
	highlight(el, c);
	var g = el.getElementsByTagName('a').item(0).href;
	var f = g.indexOf('topic');
	var ct = g.substring(f, g.length).split('=')[1];
	var r = ishl(topics, ct);
	//console.log("r " + r);

	if(r[0]){
		colors[r[1]] = c;
	}
	else{
		topics[topics.length] = ct;
		colors[topics.length - 1] = c;
	}
	savehl(topics, colors);
}

function savehl(tc, tl){
	var def = '';
	var size = 64;
	if(tc.length > size){
		for(var i = tc.length - size; i <= size; i++){
			def += tc[i] + ":" + tl[i] + ";";
		}
	}
	else{
		for(var i = 0; i < tc.length; i++){
			def += tc[i] + ":" + tl[i] + ";";
		}
	}
	//console.log(def);
	//console.log(tc.length);
	localStorage['chromeLL_page_hl'] = def;
}
function saverm(td){
	var def = '';
	var size = 64;
	if(td.length > size){
		for(var i = td.length - size; i <= size; i++){
			def += td[i] + ":";
		}
		console.log("over");
	}
	else{
		for(var i = 0; i < td.length; i++){
			def += td[i] + ":";
		}
	}
	//console.log(def);
	//console.log(tc.length);
	localStorage['chromeLL_page_rm'] = def;
}
function rehl(){
try{
	var users = parsetopics();
	var colors = parsecolors();
	var tc = '';
	var index;
	if(window.location.href.indexOf('showtopics') != -1){
		var g = document.getElementsByTagName('tr');
		for(var i = 1; g.item(i); i++){
			tc = g.item(i).getElementsByTagName('td').item(0).getElementsByTagName('a').item(0).href.substring(g.item(i).getElementsByTagName('td').item(0).getElementsByTagName('a').item(0).href.indexOf('topic'), g.item(i).getElementsByTagName('td').item(0).getElementsByTagName('a').item(0).href.length).split('=')[1];
			for(var e = 0; users[e]; e++){
				if(users[e] == tc){
					index = e;
					//console.log("found tc to highlight: " + e);
					for(var s = 0; g.item(i).getElementsByTagName('td').item(s); s++){
						g.item(i).getElementsByTagName('td').item(s).style.background = colors[index];
						//console.log("highlighing topic \"" + tc + "\" color " + colors[index] + " section " + s);
					}
				}
			}
		}
	}
}catch(e){}
}
function highlight(element, color){
	for(var i = 0; element.getElementsByTagName('td').item(i); i++){
		element.getElementsByTagName('td').item(i).style.background = color;
	}
}
function updatelist(index){
	var topics = parsetopics();
	var colors = parsecolors();
	var tsave = topics[index];
	var csave = colors[index];
	//console.log(topics);
	//console.log(colors);
	//console.log(index);
	//console.log(tsave, csave);
	if(index == topics.length - 1){
		console.log('skipping');
	}
	else{
		for(var i = index; i < topics.length; i++){
			topics[i-1] = topics[i];
			colors[i-1] = colors[i];
		}
		topics[topics.length - 1] = tsave;
		colors[colors.length - 1] = csave;
	}
	//console.log(topics);
	//console.log(colors);
	savehl(topics, colors);
}
function parsetopics(){
	try{
		var ms = localStorage['chromeLL_page_hl'].split(';');
		var topics = Array();
		for(var i = 0; i < ms.length - 1; i++){
			topics[i] = ms[i].split(':')[0];
		}
		return topics;
	}catch(e){
		return null;
	}
}
function parsecolors(){
	try{
	var ms = localStorage['chromeLL_page_hl'].split(';');
	var topics = Array();
	for(var i = 0; i < ms.length - 1; i++){
		topics[i] = ms[i].split(':')[1];
	}
	return topics;
	}catch(e){
		return null;
	}
}
function parserm(){
	return localStorage['chromeLL_page_rm'].split(':');
}
function ishl(topics, ct){
	for(var i = 0; i < topics.length; i++){
		if(topics[i] == ct){
			return [true, i];
		}
	}
	return [false, 1];
}
	
function rcolor(){
	colors = new Array(14)
	colors[0]="0"
	colors[1]="1"
	colors[2]="2"
	colors[3]="3"
	colors[4]="4"
	colors[5]="5"
	colors[5]="6"
	colors[6]="7"
	colors[7]="8"
	colors[8]="9"
	colors[9]="a"
	colors[10]="b"
	colors[11]="c"
	colors[12]="d"
	colors[13]="e"
	colors[14]="f"
	digit = new Array(5)
	color=""
	for (i=0;i<6;i++){
		digit[i]=colors[Math.round(Math.random()*14)]
		color = color+digit[i]
	}
	return color;
}
function pgjump(el){
	pg = prompt("","Page Number");
	if(pg == undefined || pg == "Page Number"){
		break;
	}
	var element = el.parentNode.parentNode.parentNode;
	var g = element.getElementsByTagName('a').item(0).href;
	window.location = g + "&page=" + pg;
}
function clearstg(){
	if(confirm("This will re-enable ALL removed topics")){
		localStorage['chromeLL_page_rm'] = '';
	}
}
function like(element){
	var p = element.parentNode.getElementsByTagName('a').item(0).innerHTML;
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
	document.getElementsByName('message').item(0).innerHTML = localStorage['chromeLL_page_liketxt'].replace('%f', p).replace('%u', u).replace('<', '&lt;').replace('>', '&gt;') + sig;
	QuickPost.publish('quote', element);
}
function showonline(){
	if(document.getElementById('chat_online').innerHTML == '+ online'){
		document.getElementById('chat_list').style.display = 'block';
		document.getElementById('chat_online').innerHTML = '- online';
	}else{
		document.getElementById('chat_list').style.display = 'none';
		document.getElementById('chat_online').innerHTML = '+ online';
	}
}
rehl();
rerm();