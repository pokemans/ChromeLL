chrome.extension.sendRequest({need: "chromeLL_ignoretopicson"}, function(response) {
  if(response.data == "true"){
  chrome.extension.sendRequest({need: "chromeLL_ignoretopics"}, function(response) {
    tlist(response.data);
});
}
});
/*
chrome.extension.sendRequest({need: "chromeLL_ignorelinkson"}, function(response) {
  localStorage['chromeLL_ignorelinkson'] = response.data;
});*/
function tlist(topics){
var w = "" + window.location;
var index;
var ignores = topics.split(',');
for(var r = 0; r < ignores.length; r++){
	if(ignores[r].substring(0,1) == ' '){
		ignores[r] = ignores[r].substring(1,ignores[r].length);
	}
}
if(w.indexOf("showtopics") != -1){
	var g = document.getElementsByTagName('tr');
	var title = '';
	var sd = 0;
	var regex;
	for(var i = 1; g.item(i); i++){
		if(title = g.item(i).getElementsByTagName('td').item(0)){
		title = g.item(i).getElementsByTagName('td').item(0);
		if(title.getElementsByTagName('a')[0].innerHTML == '#'){
			sd = 2;
		}
		for(var f = 0; f < ignores.length; f++){
			if(ignores[f].substring(0, 1) == '/'){
			//console.log('found regex:', ignores[f]);
			if(ignores[f].substring(ignores[f].length - 1, ignores[f].length) == 'i'){
				regex = new RegExp(ignores[f].replace(/\//g, ''), 'i');
			}else{
			regex = new RegExp(ignores[f].replace(/\//g, ''));
			}
			//console.log(regex);
			if(title.getElementsByTagName('a')[sd].innerHTML.match(regex)){
				console.log('found topic to remove by regex: \"' + title.getElementsByTagName('a')[sd].innerHTML + "\" keyword: " + ignores[f] + " topic: " + i);
				//if(title.getElementsByTagName('a').item(0)){
					title.parentNode.style.display = 'none';//.parentNode.removeChild(title.parentNode);
					//i--;
				//}
				
			}
			}else{
			if(title.getElementsByTagName('a')[sd].innerHTML.toLowerCase().indexOf(ignores[f].toLowerCase()) != -1){
				console.log('found topic to remove: \"' + title.getElementsByTagName('a')[sd].innerHTML.toLowerCase() + "\" keyword: " + ignores[f] + " topic: " + i);
				//if(title.getElementsByTagName('a').item(0)){
					title.parentNode.style.display = 'none';//.parentNode.removeChild(title.parentNode);
					//i--;
				//}
				
			}
			}
		}
		}
	}
}
}
