chrome.extension.sendRequest({need: "chromeLL_ctcount"}, function(response) {
  if(response.data == "true"){
  	cts();
  }
});
function cts(){
function getUrlVars(urlz)
{
	var vars = [], hash;
	var hashes = urlz.slice(urlz.indexOf('?') + 1).split('&');
	 
	for(var i = 0; i < hashes.length; i++)
	{
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
		if (hash[1]!=null && hash[1].indexOf("#")>=0)
		{
			vars[hash[0]]=hash[1].slice(0,hash[1].indexOf("#"));
		}
	}
	 
	return vars;
}

var get=getUrlVars(window.location.href);
var page=location.pathname;
get=get.slice(1,2);

function calctokens(score,votes)
{
	return Math.round(Math.pow(votes*(score-5)/15.0,1/3.0)*100,2)/100;
}

if (page=="/links.php")
{
	if (get=="userid")
	{
		var tables=document.getElementsByTagName("table");
		for (var i=0; i<tables.length; i++)
		{
			if (tables[i].className=="grid")
			{
				var trs=tables[i].rows;
				trs[0].innerHTML+="<th>CTs</th>";
				for (var j=1; j<trs.length; j++)
				{
					var txt=trs[j].cells[2].innerHTML;
					txt=txt.slice(0,txt.indexOf(" votes"));
					var score=txt.replace(/([0-9\.]+)(\/10 \(based on )([0-9]+)/i,"$1");
					var votes=txt.replace(/([0-9\.]+)(\/10 \(based on )([0-9]+)/i,"$3");
					var cts=calctokens(score,votes);
					trs[j].innerHTML+="<td>"+cts+"</td>";
				}
				break;
			}
		}
	}

	else
	{
		var tables=document.getElementsByTagName("table");
		for (var i=0; i<tables.length; i++)
		{
			if (tables[i].className=="grid")
			{
				var trs=tables[i].rows;
				trs[0].innerHTML+="<th>CTs</th>";
				for (var j=1; j<trs.length; j++)
				{
					var txt=trs[j].cells[3].innerHTML;
					txt=txt.slice(0,txt.indexOf(" votes"));
					var score=txt.replace(/([0-9\.]+)(\/10 \(based on )([0-9]+)/i,"$1");
					var votes=txt.replace(/([0-9\.]+)(\/10 \(based on )([0-9]+)/i,"$3");
					var cts=calctokens(score,votes);
					trs[j].innerHTML+="<td>"+cts+"</td>";
				}
				break;
			}
		}
	}
}

if (page=="/linkme.php")
{
	var bs=document.getElementsByTagName("b");
	for (var i=0; i<bs.length; i++)
	{
		if (bs[i].innerHTML=="Categories:")
		{
			var txt=bs[i].parentNode.innerHTML;
			txt=txt.slice(txt.indexOf("Rating:</b> ")+12);
			txt=txt.slice(0,txt.indexOf(" votes"));
			var score=txt.replace(/([0-9\.]+)(\/10 \(based on )([0-9]+)/i,"$1");
			var votes=txt.replace(/([0-9\.]+)(\/10 \(based on )([0-9]+)/i,"$3");
			var cts=calctokens(score,votes);
			var span=document.createElement("span");
			span.innerHTML="<b>Earned CTs:</b> "+cts+"<br/>";
			bs[i].parentNode.insertBefore(span,bs[i]);
			break;
		}
	}
}
}