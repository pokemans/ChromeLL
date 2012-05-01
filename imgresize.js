chrome.extension.sendRequest({need: "chromeLL_imgresize"}, function(response) {
	if(response.data == "true"){
		document.addEventListener('DOMNodeInserted', imgSize);
		document.addEventListener('DOMNodeInserted', expimg);
		for(var i = 0; document.getElementsByTagName('img')[i]; i++){
			imgSize(document.getElementsByTagName('img')[i]);
		}
	}
});
function imgSize(el){
	chrome.extension.sendRequest({need: "chromeLL_imgres"}, function(response) {	
	  	imgresize(response.data, el);
  	});
 }
function imgresize(size, em){
	var el = em.srcElement;	
	if(em.width){
		el = em;
	}
	try{
		if(el.tagName.toLowerCase() == 'img'){
			//console.log('resizing');
			if(el.width > size){				
				//console.log(el);
				console.log('resizing:', el);
				el.height = (el.height / (el.width / size));
				el.parentNode.style.height = el.height + 'px';
				el.width = size;
				el.parentNode.style.width = size + 'px';
			}
		}
	}catch(e){}
}
function resizeParent(el, w, h){
	console.log(el.tagName);
	if(el.tagName == ''){
	}
}
function imgexp(size, el){
	if(el.tagName == 'IMG'){
		var par2 = el.parentNode;
		var par3 = el.parentNode.parentNode.parentNode;
		var par4 = el.parentNode.parentNode.parentNode.parentNode.parentNode;
		if(el.width > el.height){				
				el.height = (el.height / (el.width / size));
				par2.style.height = el.height + 'px';
				par3.style.height = el.height + 'px';
				par4.style.height = el.height + 25 + 'px';
				//el.parentNode.style.height = (el.height / (el.width / size));
				el.width = size;
				par2.style.width = size + 'px';
				par3.style.width = size + 'px';
				par4.style.width = size + 'px';
				//console.log(par2, par3, par4, par3.style.height, par3.style.width, par4.style.height, par4.style.width);
				//el.parentNode.style.width = size;
				console.log('resizing to width');
			}
			else{
				el.height = size;
				par2.style.height = size + 'px';
				par3.style.height = size + 'px';
				par4.style.height = size + 25 + 'px';
				el.width = (el.width / (el.height / size));
				par2.style.width = el.width + 'px';
				par3.style.width = el.width + 'px';
				par4.style.width = el.width + 'px';
				console.log('resizing to height');
				//resizeParent(el.parentNode, (el.width / (el.height / size)), size);
			}
	}
}
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
function expand(e){
	//console.log(e.srcElement);
	el = e.srcElement;
	chrome.extension.sendRequest({need: "chromeLL_imgres"}, function(response) {	
	  	imgexp(response.data, el);
  	});
}
