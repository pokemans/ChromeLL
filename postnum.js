chrome.extension.sendRequest({need: "chromeLL_numberposts"}, function(response) {
  if(response.data == "true"){
  	postnum();
  }
});
function postnum(){
var divs=document.getElementsByTagName("div");
var tops=document.getElementsByClassName("message-top");
var containers=document.getElementsByClassName("message-container");
var get=getUrlVars(window.location.href);
var pagenum=get["page"];
if (pagenum==null)
{
	pagenum=1;
}
var ofset=pagenum-1;
ofset=ofset*50;

function getUrlVars(urlz)
{
	//thanks for the function citizenray
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

function num(bar, bars)
{
	var postnum=bar+ofset;
	var count=document.createElement("number");
	count.innerHTML=" | #";
	if (postnum<10)
	{
		count.innerHTML+="000";
	}
	if (postnum>=10&&postnum<100)
	{
		count.innerHTML+="00";
	}
	if (postnum>=100&&postnum<1000)
	{
		count.innerHTML+="0";
	}
	count.innerHTML+=postnum;
	if(bars != undefined){
		bars.appendChild(count);
	}
}

function messagebar()
{
	for (i=0;i<containers.length;i++)
	{
		var quotes=0;
		var mess=containers[i];
		mess=mess.getElementsByClassName("message-top");
		mess=mess[0];
			var post=i+1;
			num(post, mess);
	}
}

function new_message(e)
{
	try{e.target.getElementsByClassName("message-top").item(0);}
	catch (e){
		return 0;
	}
	if(e.target.getElementsByClassName("message-top").item(0) != null){
	var es=e.target.getElementsByClassName("message-top");
	var post=document.getElementsByClassName("message-container").length;
	num(post, es[0]);
	//es.item(0).innerHTML += ' | <span class="chromeLL-qr">[<a href="##" onclick="expqrep(this);">&gt;</a>]</span>';
	}
}

messagebar();
document.addEventListener('DOMNodeInserted', new_message, false);
}