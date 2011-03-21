chrome.extension.sendRequest({need: "chromeLL_asearch"}, function(response){
	if(response.data == "true"){
		if(window.location.href.indexOf('lsearch.php?a') == -1){
			aSearch();
		}
	}
});
function aSearch(){
	var ah = document.getElementsByClassName('menubar')[0].getElementsByTagName('a');
	for(var i = 0; ah[i]; i++){
		if(ah[i].innerHTML == "Search"){
			ah[i].href = (window.location.href.indexOf('https:') == -1) ? 'http://endoftheinter.net/lsearch.php?a':'https://endoftheinter.net/lsearch.php?a';
		}
	}
}
