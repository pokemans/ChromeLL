chrome.extension.sendRequest({need: "chromeLL_userhighlighton"}, function(response) {
  if(response.data == "true"){
  //document.addEventListener('DOMNodeInserted', reupdate, false);
  chrome.extension.sendRequest({need: "chromeLL_userhighlight"}, function(response) {
    userhl(response.data);
});
}
});
function reupdate(e){
    try{
        e.target.getElementsByClassName("message-top");
        if(e.target.getElementsByClassName("message-top").item(0) != null){
            chrome.extension.sendRequest({need: "chromeLL_userhighlight"}, function(response) {
                userhl(response.data);
            });
        }
    }catch(e){
        //return 0;
    }/*
	if(e.target.getElementsByClassName("message-top").item(0) != null){
		chrome.extension.sendRequest({need: "chromeLL_userhighlight"}, function(response) {
            userhl(response.data);
		});
	}*/
}
function userhl(ulist){
var over = ulist.split(';');
var users = new Array();
var colors = new Array();
var textc = new Array();
var userstring = '';
for(var q = 0; over[q]; q++){
	users[q] = over[q].split(':')[0].toLowerCase();
	userstring += " " + over[q].split(':')[0].toLowerCase();
	colors[q] = over[q].split(':')[1].toLowerCase();
	textc[q] = over[q].split(':')[2].toLowerCase();
}
//console.log(users);
//console.log(colors);
//console.log("users to highlight: " + userstring);
var w = "" + window.location;
var index;
if(w.indexOf("showtopics") != -1){
	var g = document.getElementsByTagName('tr');
	var tc = '';
	for(var i = 1; g.item(i); i++){
		tc = g.item(i).getElementsByTagName('td').item(1).getElementsByTagName('a').item(0).innerHTML.toLowerCase();
		if(userstring.indexOf(tc) != -1){
			for(var e = 0; users[e]; e++){
				if(users[e] == tc){
					index = e;
					console.log("found tc to highlight: " + e);
				}
			}
			for(var s = 0; g.item(i).getElementsByTagName('td').item(s); s++){
				g.item(i).getElementsByTagName('td').item(s).style.background = "#" + colors[index];
				//console.log("highlighing tc \"" + tc + "\" color " + colors[index] + " section " + s);
			}
		}
	}
}
if(w.indexOf("showmessages") != -1){
    try{
	var s = document.getElementsByClassName('message-container');
	var tc = '';
	for(var i = 0; s.item(i); i++){
		tc = s.item(i).getElementsByClassName('message-top')[0].getElementsByTagName('a').item(0).innerHTML.toLowerCase();
		for(var e = 0; users[e]; e++){
			if(users[e] == tc){
				s[i].getElementsByClassName('message-top')[0].style.background = "#" + colors[e];
				s[i].getElementsByClassName('message-body')[0].style.color = "#" + textc[e];
				//console.log("found tc to highlight: " + e);
			}
		}
		//s.item(i).style.background = "#" + colors[index];
		//document.getElementsByClassName('message')[i].style.color = '#' + textc[index];
		//console.log("(topic) " + i + " - " + tc);
	}
    }catch(e){console.log('userhl died ' + e);}
}
if(w.indexOf("main.php") != -1){
	var g = document.getElementsByTagName('tr');
	var tc = '';
	for(var i = 2; g.item(i); i++){
		tc = g.item(i).getElementsByTagName('td').item(1).getElementsByTagName('a').item(0).innerHTML.toLowerCase();
		if(userstring.indexOf(tc) != -1){
			for(var e = 0; users[e]; e++){
				if(users[e] == tc){
					index = e;
					//console.log("found tc to highlight: " + e);
				}
			}
			for(var s = 0; g.item(i).getElementsByTagName('td').item(s); s++){
				g.item(i).getElementsByTagName('td').item(s).style.background = "#" + colors[index];
				//console.log("highlighing tc \"" + tc + "\" color " + colors[index] + " section " + s);
			}
		}
		//console.log("(homepage) " + i + " - " + tc + " (" + userstring.indexOf(tc) + ")");
	}
}
document.addEventListener('DOMNodeInserted', reupdate /*function(event){ update_hl(ulist, event) }*/, false);
}
function update_hl(ul, e){
/*
	try{e.target.getElementsByClassName("message-top").item(0);}
	catch (e){
        console.log('userhl update dying: ' + e);
		return 0;
	}
	var over = ul.split(';');
	var users = new Array();
	var colors = new Array();
	var userstring = '';
	for(var q = 0; over[q]; q++){
		users[q] = over[q].split(':')[0].toLowerCase();
		colors[q] = over[q].split(':')[1].toLowerCase();
	}
	if(e.target.getElementsByClassName("message-top").item(0) != null){
		var es = e.target.getElementsByClassName("message-top");
		var s = es.item(0);
		//console.log(s.getElementsByTagName('a').item(0).innerHTML);
		for(var index = 0; users[index]; index++){
			if(s.getElementsByTagName('a').item(0).innerHTML.toLowerCase() == users[index]){
				s.style.background = colors[index];
			}
		}
	}*/
    //userhl(ul);
}