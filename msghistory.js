chrome.extension.sendRequest({need: "chromeLL_historypg"}, function(response) {
	if(response.data == "true"){
		insHJump();
	}
});
chrome.extension.sendRequest({need: "chromeLL_expsearch"}, function(response) {
	if(response.data == "true"){
		document.getElementById('search_bar').style.display = 'block';
	}
});
function insHJump(){
	var trs = document.getElementsByTagName('table')[0].getElementsByTagName('tr');
	var insert;
	var tmp;
	for(var i = 1; trs[i]; i++){
		insert = document.createElement('span');
		insert.style.float = 'right';
		insert.addEventListener('click', jumpHandler, false);
		tmp = trs[i].getElementsByTagName('td')[1].getElementsByTagName('a')[0].href.match(/topic=([0-9]+)/)[1];
		insert.innerHTML = '<a href="##' + tmp + '">#</a>';
		trs[i].getElementsByTagName('td')[1].insertBefore(insert, trs[i].getElementsByTagName('td')[1].getElementsByTagName('a')[0]);
	}
	
}
function jumpHandler(ev){
	var a = ev.srcElement.parentNode.parentNode.parentNode.getElementsByTagName('td')[2]
	pg = prompt("Page Number (" + Math.ceil(a.innerHTML.split('<')[0] / 50) + " total)","Page");
            if(pg == undefined || pg == "Page"){
                return 0;
            }
            window.location = ev.srcElement.parentNode.parentNode.parentNode.getElementsByTagName('td')[1].getElementsByTagName('a')[1].href + '&page=' + pg;
}
