function quotify_init(){
	chrome.extension.sendRequest({need: "chromeLL_cssquotes"}, function(response) {
		if(response.data == "true"){
			setQuotes();
		}
	});
}
quotify_init();
function quotify(mcol){
	mcol = "#" + mcol;
	var m = document.getElementsByClassName('quoted-message');
	var n;
	for(var i = 0; m[i]; i++){
		try{
		m[i].style.borderStyle = 'solid';
		m[i].style.borderWidth = '4px';
		m[i].style.borderRadius = '5px';
		m[i].style.marginRight = '30px';
		m[i].style.marginLeft = '10px';
		m[i].style.paddingBottom = '10px';
		m[i].style.marginTop = '10px';
		m[i].style.borderColor = mcol;
		n = m[i].getElementsByClassName('message-top')[0];
		n.style.background = mcol;
		n.style.marginTop = '-2px';
		n.style.paddingBottom = '2px';
		n.style.marginLeft = '-6px';
		//console.log(m[i].parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('message-top')[0].style);
		}catch(e){}
	}
}
function setQuotes(){
	chrome.extension.sendRequest({need: "chromeLL_cssquotes_color"}, function(response) {
		quotify(response.data);
	});
}
function roundify(){
	var n = document.getElementsByTagName('div');
	for(var i = 0; n[i]; i++){
		n[i].style.borderRadius = '5px';
	}
	var o = document.getElementsByTagName('td');
	for(var i = 0; o[i]; i++){
		o[i].style.borderRadius = '5px';
	}
}
document.addEventListener('DOMNodeInserted', quotifyUpdate, false);
function quotifyUpdate(e){
    try{e.target.getElementsByClassName("message-top").item(0);}
	catch (err){
		return 0;
	}
    if(e.target.getElementsByClassName("message-top").item(0) != null){
        quotify_init();
    }
}
	