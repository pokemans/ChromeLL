function expimg(){
	for(var i = 0; document.getElementsByClassName('quoted-message').item(i); i++){
		if(document.getElementsByClassName('quoted-message').item(i).getElementsByTagName('img')){
			//console.log(document.getElementsByClassName('quoted-message').item(i).getElementsByTagName('img'));
			for(var j = 0; document.getElementsByClassName('quoted-message').item(i).getElementsByTagName('img').item(j); j++){
				//document.getElementsByClassName('img-loaded').item(i).getElementsByTagName('img').item(j).onclick = "javascript:console.log(this)";
				//console.log(document.getElementsByClassName('quoted-message').item(i).getElementsByTagName('img').item(j).parentNode.parentNode);				
				document.getElementsByClassName('quoted-message').item(i).getElementsByTagName('img').item(j).parentNode.parentNode.removeAttribute('href');
				document.getElementsByClassName('quoted-message').item(i).getElementsByTagName('img').item(j).parentNode.parentNode.onclick = expand;
			}
		}
	}
}
expimg();
document.addEventListener('DOMNodeInserted', expimg);
function expand(e){
	console.log(e.srcElement);
	el = e.srcElement;
	chrome.extension.sendRequest({need: "chromeLL_imgres"}, function(response) {	
	  	imgresize(response.data, el);
  	});
}
