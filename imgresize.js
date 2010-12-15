chrome.extension.sendRequest({need: "chromeLL_imgresize"}, function(response) {
	if(response.data == "true"){
		document.addEventListener('DOMNodeInserted', imgSize, false);
	}
});
function imgSize(el){
	chrome.extension.sendRequest({need: "chromeLL_imgres"}, function(response) {	
	  	imgresize(response.data, el);
  	});
  }
function imgresize(size, em){
	var el = em.srcElement;
	try{
		if(el.tagName.toLowerCase() == 'img'){
			if(el.width > size){
				console.log('resizing');
				console.log(el);
				el.height = (el.height / (el.width / size));
				el.width = size;
			}
		}
	}catch(e){}
}