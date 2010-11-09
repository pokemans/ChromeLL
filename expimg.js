function expimg(){
	for(var i = 0; document.getElementsByClassName('quoted-message').item(i); i++){
		if(document.getElementsByClassName('quoted-message').item(i).getElementsByTagName('img')){
			console.log(document.getElementsByClassName('quoted-message').item(i).getElementsByTagName('img'));
			for(var j = 0; document.getElementsByClassName('quoted-message').item(i).getElementsByTagName('img').item(j); j++){
				document.getElementsByClassName('img-loaded').item(i).getElementsByTagName('img').item(j).onclick = "javascript:console.log(this)";
				document.getElementsByClassName('img-loaded').item(i).getElementsByTagName('img').item(j).href = '';
			}
		}
	}
}
expimg();