function batchUploadButton(){
	document.body.innerHTML += '<form id="chromell_batchupload" enctype="multipart/form-data" action="http://u.endoftheinter.net/u.php" method="post"><input name="file" type="file" id="bupload" multiple><input type="button" id="supload" value="upload"></form><div id="dupload" style="width: 200px; height: 100px; background: #fff;">+</div>';
	//document.getElementsByClassName('quickpost-body')[0].innerHTML += '<input id="supload" type="button" value="batch upload">';
	document.getElementById('supload').addEventListener('click', startUpload);
	document.getElementById('dupload').addEventListener('dragover', upload);	
	document.getElementById('dupload').addEventListener('drop', upload);
}
function startUpload(el){
	var r;	
	var file;
	//for(var i = 0; i < document.getElementById('bupload').files.length; i++){
		file = document.getElementById('bupload');
		
		//r = new FileReader();
		//r.onloadend = doUpload;
		//r.readAsBinaryString(file)
		//doUpload(r);
		mkUpload(file.files[0]);
	//}
}
function mkUpload(file){
        var xhr = new XMLHttpRequest();
                                               
        xhr.upload.onprogress = function(e){
            if (e.lengthComputable){
                console.log(e.loaded);
            }
        };

        xhr.onreadystatechange = function(){            
            if (xhr.readyState == 4){
                console.log('done');                    
            }
        };

        xhr.open("POST", 'http://u.endoftheinter.net/u.php', true);
        //xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        //xhr.setRequestHeader("X-File-Name", "test.jpg");
        xhr.setRequestHeader("Content-Type", "multipart/form-data");
        xhr.send(file);
}
function doUpload(el){
	//file = el.target.result;
	file = el;
	var rand = Math.floor(Math.random() * 999999999999999);
	rand = "000000000000000".substr(0, 15 - rand.toString().length) + rand;
/*
	var boundary = "---------------------------" + rand;
	var requestBody = "--" + boundary + "\n" +
	"Content-Type: image/jpeg" + "\n" +
	"Content-Disposition: form-data; name=\"file\"; filename=\"test.jpg\"\n\n";
	var requestEnd = "\n--" + boundary + "--\n";
	var ul = requestBody + file + requestEnd;*/
	
	var boundary = "---------------------------" + rand;
    var dashdash = '--';
    var crlf     = '\n';

    var builder = '';

    builder += dashdash;
    builder += boundary;
    builder += crlf;
        builder += 'Content-Type: image/jpeg';
	builder += crlf;

	builder += 'Content-Disposition: form-data; name="file"; filename="test.jpg"';
       
        builder += crlf;
        builder += crlf; 

        builder += file;
        builder += crlf;

        builder += dashdash;
        builder += boundary;
	builder += dashdash;
        builder += crlf;
    /*
    builder += dashdash;
    builder += boundary;
    builder += dashdash;
    builder += crlf;*/
/*

	var xhr = new XMLHttpRequest();
		xhr.open('post', 'http://u.endoftheinter.net/u.php', true);
      		xhr.onreadystatechange = function() {
        		if (this.readyState != 4) { return; } // request finished - handle response
			console.log('finished');
			console.log(xhr.responseText);
			console.log(xhr.status);
      		};
		xhr.setRequestHeader('Content-type', 'multipart/form-data')//; boundary=' + boundary);
		xhr.setRequestHeader('Cache-Control', 'no-cache');
		//xhr.setRequestHeader('X-File-Name', file.fileName);
		//xhr.setRequestHeader('X-File-Size', file.fileSize);
		//xhr.setRequestHeader('X-File-Type', file.type);
		*/XMLHttpRequest.prototype.sendAsBinary = function(string) {
    var bytes = Array.prototype.map.call(string, function(c) {
      return c.charCodeAt(0) & 0xff;
    });
    this.send(new Uint8Array(bytes).buffer);
  };
		//xhr.sendAsBinary(builder);
		//console.log(file);
		var xhr = new XMLHttpRequest();
xhr.onload = function(event) { 
        /* If we got an error display it. */
        console.log('finishedd');
	console.log(xhr.status);
	console.log(xhr.responseText);
    };
 xhr.open('POST', 'http://u.endoftheinter.net/u.php', true);
  var boundary = 'ohaiimaboundary';
 xhr.setRequestHeader(
  'Content-Type', 'multipart/form-data; boundary=' + boundary);
  xhr.sendAsBinary([
    '--' + boundary,
    'Content-Disposition: form-data; name="file"; filename="test.jpg"',
    'Content-Type: multipart/form-data',
    '',
    file,
    '--' + boundary + '--'
  ].join('\r\n'));
	
}
function showUpload(el){

}
function upload(event) {
    
    var data = event.dataTransfer;
event.stopPropagation();
event.preventDefault();

    var boundary = '------multipartformboundary' + (new Date).getTime();
    var dashdash = '--';
    var crlf     = '\r\n';

    /* Build RFC2388 string. */
    var builder = '';

    builder += dashdash;
    builder += boundary;
    builder += crlf;
    
    var xhr = new XMLHttpRequest();
    XMLHttpRequest.prototype.sendAsBinary = function(string) {
    var bytes = Array.prototype.map.call(string, function(c) {
      return c.charCodeAt(0) & 0xff;
    });
    this.send(new Uint8Array(bytes).buffer);
  };
    /* For each dropped file. */
    for (var i = 0; i < data.files.length; i++) {
        var file = data.files[i];

        /* Generate headers. */            
        builder += 'Content-Disposition: form-data; name="user_file[]"';
        if (file.fileName) {
          builder += '; filename="' + file.fileName + '"';
        }
        builder += crlf;

        builder += 'Content-Type: application/octet-stream';
        builder += crlf;
        builder += crlf; 

        /* Append binary data. */
        builder += file.getAsBinary();
        builder += crlf;

        /* Write boundary. */
        builder += dashdash;
        builder += boundary;
        builder += crlf;
    }
    
    /* Mark end of the request. */
    builder += dashdash;
    builder += boundary;
    builder += dashdash;
    builder += crlf;

    xhr.open("POST", "http://u.endoftheinter.net/u.php", true);
    xhr.setRequestHeader('content-type', 'multipart/form-data; boundary=' 
        + boundary);
    xhr.sendAsBinary(builder);        
    
    xhr.onload = function(event) { 
        /* If we got an error display it. */
        console.log('finished');
	console.log(xhr.responseText);
    };
    
}
//batchUploadButton();
