chrome.extension.sendRequest({need: "chromeLL_page_qlinks"}, function(response) {
  if(response.data == "true" || response.data == undefined){
        init();
  	}
});
function init(){
    if(window.location.href.indexOf('showtopics') != -1){
        //for(var i = 1; document.getElementsByTagName('tr').item(i); i++){
            //document.getElementsByTagName('tr').item(i).getElementsByTagName('td').item(0).addEventListener('mousedown', mouseHandler, false);
        //}
        document.addEventListener('mousedown', mouseHandler, false);
        rehl();
        rerm();
    }
}
function mouseHandler(e){
    if(!e.shiftKey && e.altKey){
        if(e.toElement.cellIndex == 0){
            hluser(e.toElement.firstChild);
            /*var x = e.toElement.getElementsByTagName('a')[0];
            var t1 = '0123456789abcdef#';
            var t2 = 'fedcba9876543210#';
            var bg = e.toElement.style.backgroundColor;
            console.log('bg: ' + bg);
            var m = bg.match(/rgb\((.*), (.*), (.*)\)/);
            m[1] = 255 - m[1];
            m[2] = 255 - m[2];
            m[3] = 255 - m[3];
            console.log(m);
            x.style.color = "rgb(" + m[1] + ", " + m[2] + ", " + m[3] + ")";*/
        }if(e.toElement.cellIndex == 1){
            chrome.extension.sendRequest({need: "topic_userhl", user: e.toElement.innerText, color: rcolor(), rm: 'false'}, function(response){
            });
            userhl_init();
        }if(e.toElement.cellIndex == 2){
            pg = prompt("","Page Number");
            if(pg == undefined || pg == "Page Number"){
                return 0;
            }
            window.location = e.toElement.parentNode.cells[0].getElementsByTagName('a')[0].href + '&page=' + pg;
        }
    }if(e.metaKey){
        console.log(e); 
    }if(e.shiftKey && e.altKey){
        if(e.toElement.cellIndex == 0){
            addrmtc(e.toElement.firstChild);
            e.toElement.getElementsByTagName('a')[0].style.color = '';
        }if(e.toElement.cellIndex == 1){
            chrome.extension.sendRequest({need: "topic_userhl", user: e.toElement.innerText, color: '', rm: 'true'}, function(response){
            });
            for(var i = 0; e.toElement.parentNode.getElementsByTagName('td')[i]; i++){
                e.toElement.parentNode.getElementsByTagName('td')[i].style.background = '';
            }
        }if(e.toElement.cellIndex == 2){
            window.location = e.toElement.parentNode.cells[0].getElementsByTagName('a')[0].href + '&page=' + Math.ceil(e.toElement.innerHTML.split('<')[0] / 50);
        }
    }
}
function hluser(element){
	//console.log(element.parentNode.parentNode.parentNode);
	if(localStorage['chromeLL_page_hl'] == undefined){
		console.log('ls not def');
		localStorage['chromeLL_page_hl'] = '';
	}
	var el = element.parentNode.parentNode;
	var topics = parsetopics();
	var colors = parsecolors();
	var c = '#' + rcolor();
    el.getElementsByTagName('a')[0].style.color = c;
	//highlight(el, c);
	var g = el.getElementsByTagName('a').item(0).href;
	var f = g.indexOf('topic');
	var ct = g.substring(f, g.length).split('=')[1];
	var r = ishl(topics, ct);
	//console.log("r " + r);

	if(r[0]){
		colors[r[1]] = c;
	}
	else{
		topics[topics.length] = ct;
		colors[topics.length - 1] = c;
	}
	savehl(topics, colors);
}

function savehl(tc, tl){
	var def = '';
	var size = 64;
	if(tc.length > size){
		for(var i = tc.length - size; i <= size; i++){
			def += tc[i] + ":" + tl[i] + ";";
		}
	}
	else{
		for(var i = 0; i < tc.length; i++){
			def += tc[i] + ":" + tl[i] + ";";
		}
	}
	//console.log(def);
	//console.log(tc.length);
	localStorage['chromeLL_page_hl'] = def;
}
function rcolor(){
	colors = new Array(14)
	colors[0]="0"
	colors[1]="1"
	colors[2]="2"
	colors[3]="3"
	colors[4]="4"
	colors[5]="5"
	colors[5]="6"
	colors[6]="7"
	colors[7]="8"
	colors[8]="9"
	colors[9]="a"
	colors[10]="b"
	colors[11]="c"
	colors[12]="d"
	colors[13]="e"
	colors[14]="f"
	digit = new Array(5)
	color=""
	for (i=0;i<6;i++){
		digit[i]=colors[Math.round(Math.random()*14)]
		color = color+digit[i]
	}
	return color;
}
function parsecolors(){
	try{
	var ms = localStorage['chromeLL_page_hl'].split(';');
	var topics = Array();
	for(var i = 0; i < ms.length - 1; i++){
		topics[i] = ms[i].split(':')[1];
	}
	return topics;
	}catch(e){
		return null;
	}
}
function parsetopics(){
	try{
		var ms = localStorage['chromeLL_page_hl'].split(';');
		var topics = Array();
		for(var i = 0; i < ms.length - 1; i++){
			topics[i] = ms[i].split(':')[0];
		}
		return topics;
	}catch(e){
		return null;
	}
}
function highlight(element, color){
	for(var i = 0; i < element.getElementsByTagName('td').length - 1; i++){
		element.getElementsByTagName('td').item(i).style.background = color;
	}
}
function ishl(topics, ct){
	for(var i = 0; i < topics.length; i++){
		if(topics[i] == ct){
			return [true, i];
		}
	}
	return [false, 1];
}
function rehl(){
try{
	var users = parsetopics();
	var colors = parsecolors();
	var tc = '';
	var index;
	//if(window.location.href.indexOf('showtopics') != -1){
		var g = document.getElementsByTagName('tr');
		for(var i = 1; g[i]; i++){
			tc = g.item(i).getElementsByTagName('td').item(0).getElementsByTagName('a').item(0).href.substring(g.item(i).getElementsByTagName('td').item(0).getElementsByTagName('a').item(0).href.indexOf('topic'), g.item(i).getElementsByTagName('td').item(0).getElementsByTagName('a').item(0).href.length).split('=')[1];
			for(var e = 0; users[e]; e++){
				if(users[e] == tc){
					index = e;
					//console.log("found tc to highlight: " + e);
					//for(var s = 0; g.item(i).getElementsByTagName('td').item(s+1); s++){
						g.item(i).getElementsByTagName('td')[0].getElementsByTagName('a')[0].style.color = colors[index];
						//console.log("highlighing topic \"" + tc + "\" color " + colors[index] + " section " + s);
					//}
				}
			}
		}
	//}
}catch(e){console.log("rehl: " + e)}
}
function addrmtc(el){
try{
	topics = parsetopics();
	colors = parsecolors();
	var element = el.parentNode.parentNode;
	var g = element.getElementsByTagName('a').item(0).href;
	var f = g.indexOf('topic');
	var ct = g.substring(f, g.length).split('=')[1];
	if(ishl(topics, ct)[0]){
		//for(var i = 0; element.getElementsByTagName('td').item(i); i++){
			element.getElementsByTagName('td')[0].getElementsByTagName('a')[0].style.color = '';
		//}
		var g = element.getElementsByTagName('a').item(0).href;
		var f = g.indexOf('topic');
		var ct = g.substring(f, g.length).split('=')[1];
		for(var i = 0; i < topics.length; i++){
			if(topics[i] == ct){
				topics.splice(i, 1);
				colors.splice(i, 1);
				break;
			}
		}
		savehl(topics, colors);
	}
	else{
		var rms = parserm();
		rms[rms.length - 1] = ct;
		console.log(rms);
		element.parentNode.removeChild(element);
		saverm(rms);
	}
}
catch(e){}
}
function rerm(){
	if(localStorage['chromeLL_page_rm'] == undefined){
		localStorage['chromeLL_page_rm'] = '';
	}
	var ignores = parserm();
	if(window.location.href.indexOf('showtopics') != -1){
		var g = document.getElementsByTagName('tr');
		var title;
		for(var i = 1; g.item(i); i++){
			title = g.item(i).getElementsByTagName('td').item(0);
			for(var f = 0; f < ignores.length; f++){
				if(title.getElementsByTagName('a').item(0).href.toLowerCase().indexOf(ignores[f]) != -1 && ignores[f] != ''){
					//console.log('found topic to remove: \"' + g.item(i).getElementsByTagName('td').item(0).getElementsByTagName('a').item(0).innerHTML.toLowerCase() + "\" author: " + ignores[f] + " topic: " + i);
					//console.log(title.getElementsByTagName('a').item(0).href.toLowerCase() + " + ");
					title.parentNode.parentNode.removeChild(title.parentNode);
					i--;			
				}
			}
		}
	}
}