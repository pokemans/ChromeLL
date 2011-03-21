function batchUploadButton(){
	document.getElementsByClassName('quickpost-body')[0].innerHTML += '</div><div id="chromeLL_batchupload"><input name="uploadss" id="bupload" type="file" multiple>';
	document.getElementsByClassName('quickpost-body')[0].innerHTML += '<input id="supload" type="button" value="batch upload">';
	document.getElementById('supload').addEventListener('click', startUpload);
}
function startUpload(el){
	var r;
	var file;
	for(var i = 0; i < document.getElementById('bupload').files.length; i++){
		file = document.getElementById('bupload').files[i];
		//r = new FileReader();
		//r.onloadend = doUpload;
		//r.readAsBinaryString(file)
		doUpload(file);
	}
}
function doUpload(el){
	//file = el.target.result;
	file = el;
var boundary = '------multipartformboundary' + (new Date).getTime();
    var dashdash = '--';
    var crlf     = '\r\n';

    var builder = '';

    builder += dashdash;
    builder += boundary;
    builder += crlf;
	builder += 'Content-Disposition: form-data; name="file"; filename="test.png"';
        builder += crlf;

        builder += 'Content-Type: image/png';
        builder += crlf;
        builder += crlf; 

        builder += file;
        builder += crlf;

        builder += dashdash;
        builder += boundary;
        builder += crlf;
    
    builder += dashdash;
    builder += boundary;
    builder += dashdash;
    builder += crlf;

	var xhr = new XMLHttpRequest();
		xhr.open('post', 'http://u.endoftheinter.net/u.php', true);
      		xhr.onreadystatechange = function() {
        		//if (this.readyState != 4) { return; } // request finished - handle response
			console.log('finished');
			console.log(xhr.responseText);
      		};
		xhr.setRequestHeader('Content-type', 'multipart/form-data');// boundary=' + boundary);
		/*xhr.setRequestHeader('X-File-Name', file.fileName);
		xhr.setRequestHeader('X-File-Size', file.fileSize);
		xhr.setRequestHeader('X-File-Type', file.type);*/
		xhr.send(file);
		//console.log(file);
	
}
function showUpload(el){

}
batchUploadButton();
