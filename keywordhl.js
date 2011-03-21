chrome.extension.sendRequest({need: "chromeLL_keywordhlon"}, function(response) {
  if(response.data == "true"){
  	chrome.extension.sendRequest({need: "chromeLL_keywordhl"}, function(response) {
	    keywordhl(response.data);
});
}
});
chrome.extension.sendRequest({need: "chromeLL_sortlast"}, function(response) {
	if(response.data == "true"){
		if(window.location.href.indexOf('profile.php') != -1){
			sortLast();
		}
	}
});

function sortLast(){
	var el = document.getElementsByTagName('table')[0].getElementsByTagName('a');
	for(var i = 0; el[i]; i++){
		if(el[i].href.indexOf('history.php') != -1){
			el[i].href = el[i].href + "?b";
		}
	}
}
function keywordhl(list){
var unp = list.split(';');
var keys = new Array();
var color = unp[1];
var over = unp[0].split(',');
for(var q = 0; over[q]; q++){
	keys[q] = over[q].split(',')[0].toLowerCase();
	if(keys[q].substring(0,1) == ' '){
		keys[q] = keys[q].substring(1,keys[q].length);
	}
}
var w = "" + window.location;
if(w.indexOf("showtopics") != -1){
	var g = document.getElementsByTagName('tr');
	var des;
	for(var i = 1; g.item(i); i++){
		des = g.item(i).getElementsByTagName('td').item(0).getElementsByTagName('a').item(0).innerHTML.toLowerCase();
		for(var e = 0; keys[e]; e++){
			if(des.indexOf(keys[e]) != -1){
				//g.item(i).getElementsByTagName('a').item(0).style.color = "#" + color;
				//g.item(i).getElementsByTagName('td').item(0).style.background = "#" + color;
				for(var a = 0; g.item(i).getElementsByTagName('td').item(a); a++){
					if(g.item(i).getElementsByTagName('td').item(a).style.background == ''){
						g.item(i).getElementsByTagName('td').item(a).style.background = "#" + color;
						//console.log(a);
						break;
					}
				}
				/*
				for(var s = 0; g.item(i).getElementsByTagName('td').item(s); s++){
							g.item(i).getElementsByTagName('td').item(s).style.background = "#" + color;
				}*/
			}
		}
	}
}
if(w.indexOf("main.php") != -1){
	var g = document.getElementsByTagName('tr');
	var des;
	for(var i = 2; g.item(i); i++){
		des = g.item(i).getElementsByTagName('td').item(0).getElementsByTagName('a').item(0).innerHTML.toLowerCase();
		//console.log(des);
			for(var e = 0; keys[e]; e++){
				if(des.indexOf(keys[e]) != -1){
					for(var a = 0; g.item(i).getElementsByTagName('td').item(a); a++){
						if(g.item(i).getElementsByTagName('td').item(a).style.background == ''){
							g.item(i).getElementsByTagName('td').item(a).style.background = "#" + color;
							console.log(a);
							break;
						}
					}
				}
			}
			/*
			for(var s = 0; g.item(i).getElementsByTagName('td').item(s); s++){
				g.item(i).getElementsByTagName('td').item(s).style.background = "#" + colors[index];
				console.log("highlighing tc \"" + tc + "\" color " + colors[index] + " section " + s);
			}*/
		//console.log("(homepage) " + i + " - " + tc + " (" + userstring.indexOf(tc) + ")");
	}
}
}
