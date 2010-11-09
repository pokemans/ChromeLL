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
var ignores = topics.toLowerCase().split(',');
for(var r = 0; r < ignores.length; r++){
	if(ignores[r].substring(0,1) == ' '){
		ignores[r] = ignores[r].substring(1,ignores[r].length);
	}
}
if(w.indexOf("showtopics") != -1){
	var g = document.getElementsByTagName('tr');
	var title = '';
	for(var i = 1; g.item(i); i++){
		title = g.item(i).getElementsByTagName('td').item(0);
		for(var f = 0; f < ignores.length; f++){
			if(title.getElementsByTagName('a').item(0).innerHTML.toLowerCase().indexOf(ignores[f]) != -1){
				console.log('found topic to remove: \"' + title.getElementsByTagName('a').item(0).innerHTML.toLowerCase() + "\" keyword: " + ignores[f] + " topic: " + i);
				if(title.getElementsByTagName('a').item(0)){
					title.parentNode.parentNode.removeChild(title.parentNode);
					i--;
				}
				
			}
		}
	}
}
}