chrome.extension.sendRequest({need: "chromeLL_forcehttps"}, function(response) {
	if(response.data == "true"){
		if(window.location.protocol == "http:"){
			window.location.href = window.location.href.replace(/http:/i, "https:");
		}
	}
});