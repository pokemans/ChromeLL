function sfInsert(){
	if(document.getElementsByClassName('userbar')[0]){
		document.getElementsByClassName('userbar')[0].addEventListener('click', sfUpdate, false);
	}
}
sfInsert();
function sfUpdate(e){
	if(!e.altKey){
		return 1;
	}
	var x = new XMLHttpRequest();
	x.open('get', window.location.href, false);
    	x.send();
    	var nh = x.responseText.match(/<table class="grid">([^`]*?)<\/table>/)[1]
    	document.getElementsByTagName('tbody')[0].innerHTML = nh;
    	console.log(nh);
}

function linkUpdate(){
	console.log('linkUpdate');
	var x = new XMLHttpRequest();
	x.open('get', window.location.href, false);	
	x.send();
	document.getElementsByTagName('tbody')[0].innerHTML = x.responseText.match(/<table class="grid">([^`]*?)<\/table>/i)[0];
	cts();
	setTimeout(linkUpdate, 40000);
}
if(window.location.href.indexOf('postmsg') != -1){
	chrome.extension.sendRequest({need: "chromeLL_postnewline"}, function(response) {
		if(response.data == "true"){
			if(document.getElementsByTagName('textarea')[0].innerHTML.substring(0, 2) == '\n-'){
				document.getElementsByTagName('textarea')[0].innerHTML = "\n" + document.getElementsByTagName('textarea')[0].innerHTML;
				console.log('inserting newline');
			}
		}
	});
}

//if(window.location.href.match(/links\.php\?mode=new/i)){
//setTimeout(linkUpdate, 10000);
//}

