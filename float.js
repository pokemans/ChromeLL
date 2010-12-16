function floater(){
	document.getElementsByClassName('menubar')[0].style.position = "fixed";
	document.getElementsByClassName('menubar')[0].style.width = "99%";
	document.getElementsByClassName('menubar')[0].style.marginTop = "-10px";
	document.getElementsByTagName('h1')[0].style.paddingTop = '40px';
	document.getElementsByClassName('userbar')[0].style.position = "fixed";
	document.getElementsByClassName('userbar')[0].style.borderBottomLeftRadius = '5px';
	document.getElementsByClassName('userbar')[0].style.borderBottomRightRadius = '5px';
	document.getElementsByClassName('userbar')[0].style.width = "99%";
	/*
	if(window.location.href.indexOf('showmessages.php') != -1){
		document.getElementsByClassName('userbar')[0].style.marginTop = "-89px";
	}else if(window.location.href.indexOf('showtopics.php') != -1){
		document.getElementsByClassName('userbar')[0].style.marginTop = "-66px";
	}else if(window.location.href.indexOf('links.endoftheinter.net') != -1){
		document.getElementsByClassName('userbar')[0].style.marginTop = "-66px";
	}if(window.location.href.indexOf('linkme.php') != -1){
		document.getElementsByClassName('userbar')[0].style.top = "101px";
	}*/
	document.getElementsByClassName('userbar')[0].style.top = "33px";
	document.getElementsByClassName('menubar')[0].style.marginRight = "20px";
}
chrome.extension.sendRequest({need: "chromeLL_floatbars"}, function(response) {
	if(response.data == "true"){
		floater();
	}
});