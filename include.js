chrome.extension.sendRequest({need: "chromeLL_shorttitle"}, function(response) {
  if(response.data == "true"){
  	shorten();
  }
});
chrome.extension.sendRequest({need: "chromeLL_like"}, function(response) {
	if(response.data == "true"){
		inslike();
	}
});
chrome.extension.sendRequest({need: "chromeLL_watch"}, function(response) {
	if(response.data == "true"){
		topicnotifier();
	}
});
chrome.extension.sendRequest({need: "chromeLL_filterme"}, function(response) {
	if(response.data == "true"){
		if(window.location.href.indexOf('showmessages') != -1){
			filterMe();
		}
	}
});
chrome.extension.sendRequest({need: "chromeLL_expspoilers"}, function(response) {
	if(response.data == "true"){
		if(window.location.href.indexOf('showmessages') != -1){
			setSpoilerButton();
		}
	}
});
chrome.extension.sendRequest({need: "chromeLL_historypg"}, function(response) {
	if(response.data == "true"){
		insHJumpTopic();
	}
});
function inlineExp(){
	var q = document.getElementsByClassName('quoted-message');
	for(var i = 0; q[i]; i++){
		if(q[i].getElementsByTagName('a') != undefined){
			for(var j = 0; q[i].getElementsByTagName('a')[j]; j++){
				if(q[i].getElementsByTagName('a')[j].getElementsByTagName('span') != undefined){
					q[i].getElementsByTagName('a')[j].removeAttribute('href');
					for(var k = 0; 	q[i].getElementsByTagName('a')[j].getElementsByTagName('span')[k]; k++){			
						q[i].getElementsByTagName('a')[j].onclick = doExpand;
					}
				}
			}
		}
	}
}
//inlineExp();
function doExpand(ev){
	if(ev.srcElement.tagName == 'IMG'){
		var l = ev.srcElement.src;
		var i = document.createElement('img');
		i.src = l;
		console.log(i.width);
		ev.srcElement.width = i.width;
		//ev.srcElement.parentNode.insertBefore(ev.srcElement, i);
	}
		
}
function insHJumpTopic(){
	var trs = document.getElementsByTagName('table')[0].getElementsByTagName('tr');
	if(document.getElementsByTagName('table')[1]){
		trs = document.getElementsByTagName('table')[1].getElementsByTagName('tr');
	}	
	var insert;
	var tmp;
	for(var i = 1; trs[i]; i++){
		if(trs[i].getElementsByTagName('td')[0]){
		insert = document.createElement('span');
		insert.style.float = 'right';
		insert.addEventListener('click', jumpHandlerTopic, false);
		tmp = trs[i].getElementsByTagName('td')[0].getElementsByTagName('a')[0].href.match(/topic=([0-9]+)/)[1];
		insert.innerHTML = '<a href="##' + tmp + '" id="jumpWindow">#</a> <a href="##' + tmp + '" id="jumpLast">&gt;</a>';
		trs[i].getElementsByTagName('td')[0].insertBefore(insert, trs[i].getElementsByTagName('td')[0].getElementsByTagName('a')[0]);
		}
	}
	
}
function jumpHandlerTopic(ev){
	var a = ev.srcElement.parentNode.parentNode.parentNode.getElementsByTagName('td')[2]
	var last = Math.ceil(a.innerHTML.split('<')[0] / 50);
	if(ev.srcElement.id == 'jumpWindow'){
	pg = prompt("Page Number (" + last + " total)","Page");
            if(pg == undefined || pg == "Page"){
                return 0;
            }
	}else{
		console.log(last);
		pg = last;
	}
            window.location = ev.srcElement.parentNode.parentNode.parentNode.getElementsByTagName('td')[0].getElementsByTagName('a')[2].href + '&page=' + pg;
}
function filterMe(){
	var me = '&u=' + document.getElementsByClassName('userbar')[0].getElementsByTagName('a')[0].href.match(/\?user=([0-9]+)/)[1];
	var txt = 'Filter Me';
	var board = window.location.href.match(/board=([0-9]+)/)[1];
	var topic = window.location.href.match(/topic=([0-9]+)/)[1];
	var fmh;
	if(window.location.href.indexOf(me) == -1){
		
		fmh = window.location.href.split('?')[0] + '?board=' + board + '&topic=' + topic + me;
	}else{
		fmh = window.location.href.replace(me, '');
		txt = 'Unfilter Me';
	}
	document.getElementsByClassName('infobar')[0].innerHTML += ' | <a href="' + fmh + '">' + txt + '</a>';
}
function setSpoilerButton(){
	var ains = document.createElement('span');
	ains.id = 'chromell_spoilers';
	document.addEventListener('click', spoilerToggle, false);
	ains.innerHTML = ' | <a href="##" id="chromell_spoiler">Expand Spoilers</a>';
	var la = document.getElementsByClassName('infobar')[0].getElementsByClassName('a');
	document.getElementsByClassName('infobar')[0].insertBefore(ains, la[la.size]);
}
function spoilerToggle(el){
	if(el.srcElement.id != 'chromell_spoiler'){
		return;
	}
	var spans = document.getElementsByClassName('spoiler_on_close');
	var nnode;	
	for(var i = 0; spans[i]; i++){
		nnode = spans[i].getElementsByTagName('a')[0];
		toggle_spoiler(nnode);
	}
}
function toggle_spoiler(obj){
	while (!/spoiler_(?:open|close)/.test(obj.className)){
		obj=obj.parentNode;
	}
	obj.className=obj.className.indexOf('closed') != -1 ? obj.className.replace('closed', 'opened') : obj.className.replace('opened', 'closed');	
	return false;
}
function pgGet(){
/*
    if(window.location.href.indexOf('showmessages') != -1){
        document.getElementById('u0_3').innerHTML += ' | <a href="##" id="nextPg">load next page</a>';
    }*/
    var g = getUrlVars(window.location.href);
    var pg;
    var x = new XMLHttpRequest();
    var ld;
    if(g['ld'] == undefined){
        ld = 1;
    }else{
        ld = g['ld'];
    }
    if(g['page'] == undefined){
        pg = 1;
    }else{
        pg = g['page'];
    }
    if(ld > pg){
        pg = ld + 1;
    }else{
        pg++;
    }
    x.open('get', 'showmessages.php?topic=' + g['topic'] + '&page=' + pg, false);
    x.send();
    window.location.href = window.location.href + '##&ld=' + pg;
    document.getElementById('u0_1').innerHTML += x.responseText.match(/<div id="u0_1">([^`]*?)<div class="infobar" id="u0_3">/)[1];
}
//var p = document.createElement('a');
//p.innerHTML = ' ->allow notifications';
//p.onclick = 'setAllowNotification()';
//p.href = '##allow';
//document.getElementsByClassName('menubar').item(0).appendChild(p);
function shorten(){
	document.title = document.title.replace(/End of the Internet - /i, '');
	document.addEventListener('DOMNodeInserted', updateposts, false);
	document.addEventListener('mousemove', clrupdates, false);
	document.addEventListener('mousewheel', clrupdates, false);
	
    //document.addEventListener('mousedown', mouseHandler, false);
}
function topicnotifier(){
    if(window.location.href.indexOf('showmessages') != -1){
        document.getElementsByClassName('userbar')[0].innerHTML += ' | <a href="##" id="chromeLL_watch" onclick="toggleWatch(window.location.href)">Watch</a>';
        if(localStorage['chromeLL_watched'] == undefined){
            localStorage['chromeLL_watched'] = '';
        }
        var tpcs = new Array();
        var get=getUrlVars(window.location.href);
        if(localStorage['chromeLL_watched'].indexOf(get['topic']) != -1){
            document.getElementById('chromeLL_watch').innerHTML = "Unwatch";
            document.addEventListener('DOMNodeInserted', notifywatch, false);
        }
        var headID = document.getElementsByTagName("head")[0];         
	var newScript = document.createElement('script');
	newScript.type = 'text/javascript';
	newScript.src = chrome.extension.getURL('watcher.js');
	headID.appendChild(newScript);
    }	
}
function updateposts(e){
	try{e.target.getElementsByClassName("message-top").item(0);}
	catch (e){
		return 0;
	}
	if(e.target.getElementsByClassName("message-top").item(0) != null){
		if(document.title.substring(0,1) == '('){
			var ud = document.title.substring(1, document.title.indexOf(')'));
			ud++;
            if(document.getElementsByClassName('message-container')[49]){
                ud = ud + "+";
                chrome.extension.sendRequest({need: "chromeLL_newpg"}, function(response) {
                    if(response.data == "true"){
                        chrome.extension.sendRequest({need: "notify", title: "New Page Created", message: document.title}, function(response) {
                            // empty
                        });
                    }
                });
            }
			document.title = '(' + ud + ')' + document.title.substring(document.title.indexOf(')') + 1, document.title.length);
        }
		else{
			document.title = '(1) ' + document.title;
        }
        //notify(e, document.title);
	}
}

function notifywatch(e){
    try{
        if(e.target.getElementsByClassName("message-top").item(0) != null){
            var by = e.target.getElementsByClassName("message-top")[0].getElementsByTagName('a')[0].innerHTML;
            enotifywatch(document.title, by);
        }
    }catch(err){
        //lol
    }
}
chrome.extension.sendRequest({need: "chromeLL_hlnotify"}, function(response) {
    if(response.data == 'true'){
        document.addEventListener('DOMNodeInserted', notifyUpdate, false);
   }
});
function notifyUpdate(e){
    try{e.target.getElementsByClassName("message-top").item(0);}
	catch (err){
		return 0;
	}
    if(e.target.getElementsByClassName("message-top").item(0) != null){
        notify(e, document.title);
    }
}
function notify(e, dtitle){
            var by = e.target.getElementsByClassName("message-top")[0].getElementsByTagName('a')[0].innerHTML;
            chrome.extension.sendRequest({need: "chromeLL_userhighlight"}, function(response) {
                enotify(dtitle, by, response.data);
            });
        
    chrome.extension.sendRequest({need: "chromeLL_qtnotify"}, function(response) {
        if(response.data == 'true'){
            try{
                var el = e.target.getElementsByClassName("quoted-message");
                qnotify(dtitle, el);
            }catch(err){
            }
        }
    });
}
function enotifywatch(t, m){
	t = t.replace(/End of the Internet - /i, '');
	chrome.extension.sendRequest({need: "notify", title: "Post by " + m, message: t}, function(response) {
		// empty
	});
}
function enotify(t, m, data){
	t = t.replace(/End of the Internet - /i, '');
	var over = data.split(';');
	var users = new Array();
	var colors = new Array();
	var userstring = '';
	for(var q = 0; over[q]; q++){
		users[q] = over[q].split(':')[0].toLowerCase();
		userstring += " " + over[q].split(':')[0].toLowerCase();
		colors[q] = over[q].split(':')[1].toLowerCase();
	}
	for(var i = 0; users[i]; i++){
		if(users[i].toLowerCase() == m.toLowerCase()){
			chrome.extension.sendRequest({need: "notify", title: "Post by highlighted user " + m, message: t}, function(response) {
				// empty
			});
		}
	}
}
function qnotify(t, el){
    t = t.replace(/End of the Internet - /i, '');
    try{
        for(var i = 0; el[i].getElementsByClassName('message-top')[0]; i++){
            if(el[i].getElementsByClassName('message-top')[0].getElementsByTagName('a')[0].innerHTML == document.getElementsByClassName('userbar')[0].getElementsByTagName('a')[0].innerHTML.replace(/ \((.*)\)$/, "")){
                chrome.extension.sendRequest({need: "notify", title: "You\'ve been quoted!", message: t}, function(response) {
				// empty
                });
            }
        }
    }catch(e){}
}
function readCookie(name)
{
	var	nameEQ = name	+	"=";
	var	ca = document.cookie.split(';');
	for(var	k=0;k	<	ca.length;k++)
	{
		var	c	=	ca[k];
		if	(c.indexOf(" ")==0)
		{
			c	=	c.substring(1);
		}
		if (c.indexOf(nameEQ)==0)
		{
			return c.substring(nameEQ.length,c.length);
		}
	}
	return null;
}
function clrupdates(e){
	if(document.title.substring(0,1) == '('){
		document.title = document.title.substring(document.title.indexOf(')') + 1, document.title.length);
	}
}
function definels(){
	if(localStorage['chromeLL_page_like'] == undefined){
		localStorage['chromeLL_page_like'] = 'true';
	}
	if(localStorage['chromeLL_page_liketxt'] == undefined){
		localStorage['chromeLL_page_liketxt'] = '<img src="http://i4.endoftheinter.net/i/n/f818de60196ad15c888b7f2140a77744/like.png" /> %u likes %f\'s post';
	}
}
//console.log(chrome.extension.getURL('ignoreby.js'));
/*
chrome.extension.sendRequest({need: "chromeLL_page_like"}, function(response) {
   if(response.data == "true"){
   	//console.log(response.data);
   	//inslike();
   	chrome.extension.sendRequest({need: "chromeLL_page_liketxt"}, function(response) {
   		localStorage['chromeLL_page_liketxt'] = response.data;
   	});
  }
});*/
chrome.extension.sendRequest({need: "chromeLL_page_qreply"}, function(response) {
   if(response.data == "true"){
   	//console.log(response.data);
   	chrome.extension.sendRequest({need: "chromeLL_qr"}, function(response) {
   		localStorage['chromeLL_qr'] = response.data;
   		insqreply();
   	});
  }
});
function insjs(){
	var headID = document.getElementsByTagName("head")[0];         
	var newScript = document.createElement('script');
	var g;
	var m;
	var topic;
	newScript.type = 'text/javascript';
	newScript.src = chrome.extension.getURL('insert.js');
	headID.appendChild(newScript);
	if(window.location.href.indexOf('showtopics') != -1){
		for(var i = 1; document.getElementsByTagName('tr').item(i); i++){
			m = document.getElementsByTagName('tr').item(i).getElementsByTagName('td').item(0);
            m.addEventListener('mousedown', mouseHandler, false);
			g = m.getElementsByTagName('a').item(0).href;
			//console.log(g);
			topic = g.substring(g.indexOf("topic") + 6, g.indexOf("topic") + 13);
			//onmouseover="bghelp(this)" onmouseout="bghelp(this)"
			m.innerHTML += '<span id="chromeLL_menu" style="float:right;">[<a href="##' + topic + '-exp" onclick="exp(this.parentNode)">&lt;</a>]</span>';
		}
	}
}
function instopicjs(){
	var headID = document.getElementsByTagName("head")[0];         
	var newScript = document.createElement('script');
	newScript.type = 'text/javascript';
	newScript.src = chrome.extension.getURL('insert-topic.js');
	headID.appendChild(newScript);
}
/*
chrome.extension.sendRequest({need: "chromeLL_navi"}, function(response) {
  if(response.data == "true"){
  	insnavi();
  }
});*/
function insnavi(){
	var headID = document.getElementsByTagName("head")[0];         
	var newScript = document.createElement('script');
	newScript.type = 'text/javascript';
	newScript.src = chrome.extension.getURL('navi.js');
	headID.appendChild(newScript);
}
function inslike(){
	if(window.location.href.indexOf('showmessages') != -1){
		var headID = document.getElementsByTagName("head")[0];         
		var newScript = document.createElement('script');
		newScript.type = 'text/javascript';
		newScript.src = chrome.extension.getURL('like.js');
		headID.appendChild(newScript);
		for(var i = 0; document.getElementsByClassName('message-top').item(i); i++){
			if(document.getElementsByClassName('message-top').item(i).getElementsByTagName('a').item(2)){
				document.getElementsByClassName('message-top').item(i).innerHTML += ' | <a href="##like" onclick="like(this);">Like</a>';
			}
		}
	}
}
function insqreply(){
	if(window.location.href.indexOf('showmessages') != -1){
			for(var i = 0; document.getElementsByClassName('message-top').item(i); i++){
				if(document.getElementsByClassName('message-top').item(i).parentNode.className != 'quoted-message'){
					document.getElementsByClassName('message-top').item(i).innerHTML += ' | <span class="chromeLL-qr">[<a href="##" onclick="expqrep(this);">&gt;</a>]</span>';
				}
			}
			instopicjs();
	}
}

/*
if(window.location.href.indexOf('showmessages') != -1){
for(var i = 0; document.getElementsByClassName('message-top').item(i); i++){
	document.getElementsByClassName('message-top').item(i).innerHTML += '<span id="chromeLL_menu" style="float:right;">[<a href="#" onclick="exp(this.parentNode)">&lt;</a>]</span>';
}
}*/
//console.log(window.location.href);
//localStorage['userid'] = readCookie("userid");
//var usend = "userid:" + readCookie("userid");
//chrome.extension.sendRequest({need: usend}, function(response) {
  //console.log('sent: ' + usend + " + " + response.data);
//});
function scrollz(){
	console.log(window.pageYOffset);
	console.log("height: " + document.body.offsetHeight / 1.08290378);
}
/*
if(window.location.href.indexOf('showtopics') != -1){
	document.getElementsByTagName('small').item(0).innerHTML += ' (<a href="##" onclick="clearstg()">clear removed topics</a>)';
}*/
//console.log(document.getElementsByTagName('small').item(0).innerHTML);
//self.setInterval('scroll()', 5000);

//thanks for this function random person on the internet
function getObjectClass(obj) {
    if (obj && obj.constructor && obj.constructor.toString) {
        var arr = obj.constructor.toString().match(
            /function\s*(\w+)/);

        if (arr && arr.length == 2) {
            return arr[1];
        }
    }

    return undefined;
}
function setAllowNotification()
{
window.webkitNotifications.requestPermission(permissionGranted);
}
/*
function getChatList(){
	$().ready(function(){ 
	    var url = 'http://www.google.com/';
	    $.get(url, function(data) {
	        console.log(data);
	    });
});
}
function update(){
        chrome.extension.sendRequest({need: "cfapi", cookie: document.cookie, action: "update"}, function(response) {
	  console.log("response: " + response.data);
});
}

function getList(){
	chrome.extension.sendRequest({need: "cfapi", action: "list"}, function(response) {
	  console.log("list: " + response.data);
});
}
function getUL(){
        $.get("http://t1.chairface.org/4f.php?api=userlist", function(data){
                console.log(data);
        });
        var req = new XMLHttpRequest();
        req.open('GET', 'http://t1.chairface.org/4f.php?api=userlist', true);
        req.onreadystatechange = function(aEvt) {
                if (req.readyState == 4){
                        if(req.status == 200){
                                console.log( req.responseText );
                        }else{
                                console.log("Error loading page");
                        }
                }
        };
        req.send(null);
}
function postMsg(){
        chrome.extension.sendRequest({need: "cfapi", action: "send", to: "test_to", message: "test message"}, function(resp) {
                console.log(resp.data);
        });
}
function getList(){
	chrome.extension.sendRequest({need: "cfapi", action: "list"}, function(resp) {
		var rd = resp.data.replace(/:/g, '<br>');
	  	document.getElementById('chat_list').innerHTML = rd;
	});
}
function getMessages(){
	chrome.extension.sendRequest({need: "cfapi", action: "get"}, function(resp){
		console.log(resp.data);
		localStorage['chromell_chat_data'] += resp.data;
	});
}*/
/*
getMessages();
var chatWindow = '<div class="chat_window" style="width: 200px; height: 300px; display: none;"><form name="chat_form" onsubmit="chat_postmsg(this); return false;"><div id="chat_text" style="top: 0; width: 100%; height: 60%; background: #ccc;"></div><textarea name="chat_msgcontent" style="bottom: 0; width: 100%; height: 20%;"></textarea><input type="submit" style="display: none"></form>';

document.body.innerHTML += '<div id="chat_box" style="width: 100%; background: #fff; position: fixed; bottom: 0; margin-top: 20px; color: #000;">'
+ '<div id="chat_list" style="background: #fff; position: fixed; bottom: 20px; width: 200px; display: none;"></div>'
+ '<a href="##online" onclick="showonline()" id="chat_online" style="color: #000">online</a></div>';
update();
getList();
*/
//getUL();
//getChatList();
