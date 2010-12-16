chrome.extension.sendRequest({need: "chromeLL_ignoretopicsbyon"}, function(response) {
  if(response.data == "true"){
  chrome.extension.sendRequest({need: "chromeLL_ignoretopicsby"}, function(response) {
    rmby(response.data);
    document.addEventListener('DOMNodeInserted', rmby_livelinks, false);
});
}
});
function rmby(topics){
var w = "" + window.location;
var index;
var ignores = topics.toLowerCase().split(',');
for(var r = 0; r < ignores.length; r++){
	if(ignores[r].substring(0,1) == ' '){
		ignores[r] = ignores[r].substring(1,ignores[r].length);
	}
}
if(w.indexOf("showtopics") != -1){
	var g = document.getElementsByTagName('tr');
	var title;
	for(var i = 1; g.item(i); i++){
		title = g.item(i).getElementsByTagName('td').item(1);
		for(var f = 0; f < ignores.length; f++){
			if(title.getElementsByTagName('a').item(0).innerHTML.toLowerCase() == ignores[f]){
				console.log('found topic to remove: \"' + g.item(i).getElementsByTagName('td').item(0).getElementsByTagName('a').item(0).innerHTML.toLowerCase() + "\" author: " + ignores[f] + " topic: " + i);
				if(title.getElementsByTagName('a').item(0)){
					title.parentNode.parentNode.removeChild(title.parentNode);
					i--;
				}
				
			}
		}
	}
}
if(w.indexOf("showmessages") != -1){
	var s;
	for(var j = 0; document.getElementsByClassName('message-top').item(j); j++){
		s = document.getElementsByClassName('message-top').item(j);
		for(var f = 0; ignores[f]; f++){
			if(s.getElementsByTagName('a').item(0).innerHTML.toLowerCase() == ignores[f]){
				s.parentNode.parentNode.removeChild(s.parentNode);
				j--;
				console.log('removed post by ' + ignores[f]);
			}
		}
	}
}
}
function rmby_livelinks(el){
	try{
		var m = el.srcElement.getElementsByClassName('message-top')[0];
		chrome.extension.sendRequest({need: "chromeLL_ignoretopicsby"}, function(response) { var ignores = response.data; rm_livelinks(ignores, el); });
	}
	catch(e){console.log('y')}
}
function rm_livelinks(topics, el){
	try{
			var ignores = topics.toLowerCase().split(',');
			for(var r = 0; r < ignores.length; r++){
				if(ignores[r].substring(0,1) == ' '){
					ignores[r] = ignores[r].substring(1,ignores[r].length);
				}
			}
			var m = el.srcElement.getElementsByClassName('message-top')[0];
			for(var f = 0; ignores[f]; f++){
				if(m.getElementsByTagName('a')[0].innerHTML.toLowerCase() == ignores[f]){
					el.srcElement.parentNode.removeChild(el.srcElement);
					console.log('removed livelinks post by ' + ignores[f]);
					//return 1;
				}
			}	
		}catch(e){
	}
}