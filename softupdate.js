function sfInsert(){
	document.getElementsByClassName('userbar')[0].addEventListener('click', sfUpdate, false);
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