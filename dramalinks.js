chrome.extension.sendRequest({need: "chromeLL_dramaonmessage"}, function(response) {
		if(window.location.href.indexOf('showtopics') != -1 || (window.location.href.indexOf('showmessages') != -1 && response.data == 'true')){
			chrome.extension.sendRequest({need: "chromeLL_hidedrama"}, function(response) {
				if(response.data == 'true'){
					chrome.extension.sendRequest({need: "drama"}, function(response) {
						dramalinks(response.data, true);
						dramaHide();	
					});
				}
				else{
					chrome.extension.sendRequest({need: "drama"}, function(response) {
						dramalinks(response.data, false);	
					});
				}
			});
		} 
});
  
function dramalinks(dramas, hide) {
	var divs=document.getElementsByTagName("div");
	var ticker=document.createElement("center");
	var update=document.createElement("center");
	ticker.innerHTML="Dramalinks loading...";
	ticker.id="dramalinks_ticker";
	update.innerHTML="";
	update.id="dramalinks_update";
	for (var i=0; i<divs.length; i++)
	{
		if (divs[i].className=="userbar")
		{
			divs[i].parentNode.insertBefore(ticker,divs[i]);
			divs[i].parentNode.insertBefore(update,divs[i]);
			break;
		}
	}
	if(hide){
		document.getElementById("dramalinks_ticker").style.display = 'none';
	}
	document.getElementById("dramalinks_ticker").innerHTML=dramas;
}
function dramaHide(){
	var t = document.getElementById("dramalinks_ticker");
	//t.style.display = 'none';
	var color = t.getElementsByTagName('div')[0].style.background;
	document.getElementsByTagName('h1')[0].style.color = color;
	document.getElementsByTagName('h1')[0].ondblclick = switchDrama;
}
function switchDrama(){
	document.getElementById("dramalinks_ticker").style.display == 'none' ? document.getElementById("dramalinks_ticker").style.display = 'block': document.getElementById("dramalinks_ticker").style.display = 'none';
}
