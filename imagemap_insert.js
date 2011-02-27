
var boxHeight = 250;

if (document.location.href.indexOf("https") == -1) {
        var https = "http";
} else {
        var https = "https";
}

var textarea = document.getElementsByTagName('textarea')[0];
var currentPage = 1;
var exposed = false;
var alt = false;

function getElementsByClass(searchClass,node,tag) {
        var classElements = new Array();
        if (node == null)
                node = document;
        if ( tag == null)
                tag = '*';
        var els = node.getElementsByTagName(tag);
        var elsLen = els.length;
        for (var i = 0, j = 0; i < elsLen; i++) {
                if (els[i].className == searchClass) {
                        classElements[j] = els[i];
                        j++;
                }
        }
        return classElements;
}

function coolCursor() {
        this.style.cursor = "pointer";
}

function processImage(HTML) {
        var vOffset = textarea.scrollTop;
        var spaceBefore = textarea.selectionStart;
        if (spaceBefore == textarea.selectionEnd) {
                textarea.value = textarea.value.substr(0, spaceBefore) + HTML.split('<br/>')[1].replace('&gt;', '>').replace('&lt;', '<').replace(/&quot;/gi, '"') + textarea.value.substr(spaceBefore);
        }
        textarea.scrollTop = vOffset;
}

function loadImgSrc() {
        GM_xmlhttpRequest({
                method: "GET",
                url: this.id,
                headers: {
                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                'Accept': 'application/atom+xml,application/xml,text/xml',
                },
                onload: function(responseDetails) {
                if (responseDetails.status == 200) {
                        processImage(responseDetails.responseText);
                } else {
                        alert('Error: The image link could not be loaded.');
                }
            }
          });
}

function removeImageMap() {
        var imageBlock = document.getElementById('imagemapBlocks');
        imageBlock.parentNode.removeChild(imageBlock);
        exposed = false;
}

function loadMoreImages() {
        currentPage++;
        GM_xmlhttpRequest({
                        method: "GET",
                        url: https + '://images.endoftheinter.net/imagemap.php?page=' + currentPage,
                        headers: {
                        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                        'Accept': 'application/atom+xml,application/xml,text/xml',
                },
                        onload: function(responseDetails) {
                        if (responseDetails.status == 200) {
                                var newDiv = document.createElement('div');
                                        newDiv.innerHTML = responseDetails.responseText;
                                        var imgBloxs = getElementsByClass('image_grid', newDiv, 'div')[0];
                                        var descRemove = getElementsByClass('block_desc', imgBloxs, 'div');
                                        for (var i =0; i < descRemove.length; i++) {
                                                descRemove[i].parentNode.removeChild(descRemove[i]);
                                        }
                                        var allLinks =  imgBloxs.getElementsByTagName('a');
                                        for (var j = 0; j < allLinks.length; j++) {
                                                allLinks[j].id = allLinks[j].href;
                                                allLinks[j].addEventListener('mouseover', coolCursor, true);
                                                allLinks[j].addEventListener('click', loadImgSrc, true);
                                                allLinks[j].title = 'Insert this image';
                                                allLinks[j].removeAttribute('href');
                                        }
                                        document.getElementById('imagemapBlocks').insertBefore(imgBloxs, document.getElementById('moreLink'));                  
                        } else {
                                alert('Error: The next page could not be loaded.');
                        }
                }
          });
}

function processPage(HTML) {
        var newDiv = document.createElement('div');
        newDiv.innerHTML = HTML;
        var imgBlocks = getElementsByClass('image_grid', newDiv, 'div')[0];
        var descRemove = getElementsByClass('block_desc', imgBlocks, 'div');
        for (var i =0; i < descRemove.length; i++) {
                descRemove[i].parentNode.removeChild(descRemove[i]);
        }
        var allLinks =  imgBlocks.getElementsByTagName('a');
        for (var j = 0; j < allLinks.length; j++) {
                allLinks[j].id = allLinks[j].href;
                allLinks[j].addEventListener('mouseover', coolCursor, true);
                allLinks[j].addEventListener('click', loadImgSrc, true);
                allLinks[j].title = 'Insert this image';
                allLinks[j].removeAttribute('href');
        }
        imgBlocks.setAttribute('style', 'position: fixed; border-bottom: 1px #555 solid; padding-bottom: 4px; top: 0; left: 0; width: 100%; height: ' + boxHeight + 'px; overflow: auto; z-index: 10; background: #F5F5F5');
        imgBlocks.id = 'imagemapBlocks';
        var removeLink = document.createElement('a');
        removeLink.innerHTML = 'X';
        removeLink.setAttribute('style', 'position: fixed; right: 25px; top: 5px; font-size: 16px; font-weight: bold; color: red');
        removeLink.title = 'Close the imagemap box';
        removeLink.addEventListener('click', removeImageMap, true);
        removeLink.addEventListener('mouseover', coolCursor, true);
        var moreLink = document.createElement('a');
        moreLink.innerHTML = 'Load more...';
        moreLink.id = 'moreLink';
        moreLink.setAttribute('style', 'display: block; text-align: center; width: 80px; margin: 0 auto;');
        moreLink.addEventListener('mouseover', coolCursor, true);
        moreLink.addEventListener('click', loadMoreImages, true);
        imgBlocks.appendChild(moreLink);
        imgBlocks.appendChild(removeLink);
        document.body.appendChild(imgBlocks);
} 

function checkKeys(e) {
        if (e.altKey) {
                alt = true;
        }
        if (e.which == 73 && alt == true) {
                if (exposed == true) {
                        removeImageMap();
                } else {
                        loadImageMap();
                }
        }
}

function handleButton() {
        if (exposed == true) {
                removeImageMap();
        } else {
                loadImageMap();
        }
}

function loadImageMap() {
        var xh = new XMLHttpRequest();
        xh.open('get', 'images.endoftheinter.net/imagemap.php', false);
        xh.send();
        console.log(xh);
        /*
        GM_xmlhttpRequest({
                method: "GET",
                url: https + '://images.endoftheinter.net/imagemap.php',
                headers: {
                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                'Accept': 'application/atom+xml,application/xml,text/xml',
                },
                onload: function(responseDetails) {
                if (responseDetails.status == 200) {
                        processPage(responseDetails.responseText);
                        exposed = true;
                } else {
                        alert('Error: The imagemap could not be loaded.');
                }
        }
        });*/
}

function removeAlt(e) {
        if (alt == true && !e.altKey) {
                alt = false;
        }
}


var button = document.createElement('input');
button.addEventListener('click', handleButton, true);
button.value = 'Imagemap';
button.type = 'button';
textarea.parentNode.appendChild(button);
document.addEventListener('keydown', checkKeys, true);
document.addEventListener('keyup', removeAlt, true);