function doUpload(i, fl){
	var file = fl.target.result;
	console.log('sending');
	console.log(filename);
	//var file = document.upload.file.files[0];
	XMLHttpRequest.prototype.sendAsBinary = function(datastr) {
       		/*var bb = new BlobBuilder();
       		var data = new ArrayBuffer(1);
       		var ui8a = new Uint8Array(data, 0);
       		for (var i in datastr) {
              		if (datastr.hasOwnProperty(i)) {
                       		var chr = datastr[i];
                       		var charcode = chr.charCodeAt(0)
                       		var lowbyte = (charcode & 0xff)
                       		ui8a[0] = lowbyte;
                       		bb.append(data);
              		}
       		}
       		var blob = bb.getBlob();
       		this.send(blob);*/
		function byteValue(x) {
        		return x.charCodeAt(0) & 0xff;
    		}
    		var ords = Array.prototype.map.call(datastr, byteValue);
    		var ui8a = new Uint8Array(ords);
    		this.send(ui8a.buffer);
	}
	var xh = new XMLHttpRequest();
	var http = 'https';
	if(window.location.href.indexOf('https:') == -1)
		http = 'http';
	xh.open('post', http + '://u.endoftheinter.net/u.php', true);
	//xh.open('post', 'http://dev.chairface.org/uploader.php', true);
	xh.onreadystatechange = function(){
		//console.log(this.responseText);
		if(this.readyState != 4){
			return;
		}
		//console.log(this.responseText);
		console.log('completed ' + i);
		var tmp = document.createElement('div');
		tmp.innerHTML = this.responseText;
		for(var k = 0; k < 8; k++){
			//console.log(tmp.getElementsByTagName('input')[k]);
			if(tmp.getElementsByTagName('input')[k].value){			
			if(tmp.getElementsByTagName('input')[k].value.substring(0, 4) == '<img'){
				uploaded = tmp.getElementsByTagName('input')[k].value + '\n\n';
				//console.log(uploaded);
				break;
			}}
		}
		mkNext(i + 1);
		//document.getElementById('response').innerHTML = this.responseText;
	};
	var rand = Math.floor(Math.random() * 999999999999999);
	rand = "000000000000000".substr(0, 15 - rand.toString().length) + rand;
	var boundary = '--fgsfds' + rand;
	xh.setRequestHeader('Content-Type', 'multipart/form-data;boundary=' + boundary);
	//xh.setRequestHeader('X-File-Name', file.fileName);
	//xh.setRequestHeader('X-File-Size', file.size);
	//xh.setRequestHeader('X-File-Type', 'image/png');
	var ctype = 'image/jpeg';
	if(filename.substr(-3) == 'gif')
		ctype = 'image/gif';
	if(filename.substr(-3) == 'png')
		ctype = 'image/png';
	console.log(ctype);
	var req = [
		'--' + boundary,
		'Content-Disposition: form-data; name="file"; filename="' + filename + '"',
		'Content-Type: ' + ctype,
		'',
		file,
		'--' + boundary + '--',
		''].join('\r\n');
	//console.log(req);
	xh.withCredentials = "true";
	xh.sendAsBinary(req);
}	
function mkUpload(){
	var r = new FileReader();
	r.onloadend = function(e){ doUpload(0, e); };
	filename = document.getElementById('bupload').files[0].fileName;
	document.getElementById('uploadstatus').innerHTML = 'uploading: 1';
	r.readAsBinaryString(document.getElementById('bupload').files[0]);
	document.getElementById('uploadedbox').style.display = 'block';
}
function mkNext(i){
document.getElementById('uploaded').innerHTML += uploaded;
	if(!document.getElementById('bupload').files[i]){
		document.getElementById('uploadstatus').innerHTML = 'upload complete';
		//localStorage['uploaded'] = uploaded;
		//var d = new Date();
		//localStorage['uploadtime'] = d.getTime();
		//window.location.href = 'http://u.endoftheinter.net/u.php';
		return;
	}
	var r = new FileReader();
	r.onloadend = function(e){ doUpload(i, e); };
	filename = document.getElementById('bupload').files[i].fileName;
	document.getElementById('uploadstatus').innerHTML = 'uploading: ' + (i + 1);
	r.readAsBinaryString(document.getElementById('bupload').files[i]);
}
var filename;
var uploaded = document.getElementById('uploaded');
function batchUploadButton(){
	var insi = '';
	if(window.location.href.indexOf('topic') != -1){
		insi = '<div style="width: 100%; text-align: right"><input type="button" value="Imagemap" onclick="window.location = \'/u.php\'" style="right: 0"></div>';
	}
	document.body.innerHTML = '<div id="uploadedbox" style="display: none">uploads:<br><textarea id="uploaded" style="width: 100%; height: 100px; font-size: 10px; font-family: arial;"></textarea></div>' + insi + '<form id="chromell_batchupload" enctype="multipart/form-data" action="http://u.endoftheinter.net/u.php" method="post"><input name="file" type="file" id="bupload" multiple style="width: 200px"><input type="button" id="supload" style="float: right" value="Batch Upload">&nbsp;&nbsp;<span id="uploadstatus"></span></form>' + document.body.innerHTML;
	//document.getElementsByClassName('quickpost-body')[0].innerHTML += '<input id="supload" type="button" value="batch upload">';
	document.getElementById('supload').addEventListener('click', mkUpload);
	//document.getElementById('dupload').addEventListener('dragover', upload);	
	//document.getElementById('dupload').addEventListener('drop', upload);
	/*var d = new Date;
	if(localStorage['uploadtime']){
		if(d.getTime() - parseInt(localStorage['uploadtime']) <= 180000){
			document.getElementById('uploaded').innerHTML = localStorage['uploaded'];
			document.getElementById('uploadedbox').style.display = 'block';
		}
	}*/	
}
chrome.extension.sendRequest({need: "chromeLL_batchupload"}, function(response){
	if(response.data == 'true'){
		if(window.location.href.match(/u\.endoftheinter\.net/)){
			batchUploadButton();
		}
	}
});
/*else{
	document.addEventListener('DOMNodeInserted', handleIns);
	//console.log(document.getElementsByTagName('iframe'));
}
function handleIns(e){
	if(e.srcElement.tagName != 'DIV')
		return;
	if(e.srcElement.getElementsByTagName('iframe')[0]){
		var el = e.srcElement.getElementsByTagName('iframe')[0];
		console.log(el);
		el.addEventListener('load', handleLoad);
	}
}
function handleLoad(e){
	console.log(e.srcElement);
	
	var el = e.srcElement;
	 var inp = document.createElement('input');
	 inp.type = 'file';
         inp.multiple = 'multiple';
         inp.id = 'bupload';
         var sbtn = document.createElement('input');
         sbtn.type = 'button';
         sbtn.addEventListener('click', mkUpload);
         sbtn.value = 'batch upload';
         //el.contentWindow.getElementsByTagName('body').insertBefore(el.getElementsByTagName('form'), sbtn);
         console.log(el.contentDocument);
	console.log('sending insert req');
	chrome.extension.sendRequest({need: "insbatchupload"}, function(response) {
        	console.log(response.data);
	});

}*/
