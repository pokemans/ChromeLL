chrome.extension.sendRequest({need: "chromeLL_autodl"}, function(response) {
	if(response.data == "true"){
		autodl();
	}
});
function autodl(){
setTimeout('if ((dlLink = document.getElementById("downloadlink")))window.location.href = dlLink.firstChild.href;',
           parseInt(document.getElementById("countdown").innerHTML)*1000+1);
void(count = 2);
}