chrome.extension.sendRequest({need: "chromeLL_updatereaders"}, function(response) {
  if(response.data == "true"){
  	//updatereaders();
  }
});
function updatereaders(){
if((location.host == "boards.endoftheinter.net") && (location.href.search("showmessages.php") > -1)){
	ajaxPeople();
}

function ajaxPeople()
{
	var xmlHttp;
	try { xmlHttp=new XMLHttpRequest(); }
		catch (e) {
			try { xmlHttp=new ActiveXObject("Msxml2.XMLHTTP"); }
			catch (e) {
			try { xmlHttp=new ActiveXObject("Microsoft.XMLHTTP"); }
			catch (e) { return false; }
		}
	}
  
	xmlHttp.onreadystatechange=function() {
		if(xmlHttp.readyState==4) {
			var response = xmlHttp.responseText;
			response = response.substring(response.lastIndexOf('<div class="infobar"')+31,response.length);
			response = response.substring(0, response.indexOf('</div>'));
			document.getElementsByClassName('infobar')[2].innerHTML = " " + response;	//Set the new text
			
			//Checks to see if you are the only one viewing the topic
			if(document.getElementsByClassName('infobar')[2].innerHTML.indexOf(' 1 ') == -1){
				t = setTimeout(ajaxPeople,1000); //Fast update speed for when there is more than one person viewing the topic
			} else {
				t = setTimeout(ajaxPeople,10000); //Slow update speed for when you are the only one viewing the topic
			}			
		}
	}
	var url = window.location.toString()+'&u=-9000'; //Page to grab the text from
	xmlHttp.open("GET",url,true);
	xmlHttp.send(null);
}
}