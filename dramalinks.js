function nextRealSibling(node)
{
        var cnode=node.nextSibling;
        while (cnode.nodeName=="#text")
        {
                cnode=cnode.nextSibling;
        }
        return cnode;
}

prefix = parent.location.protocol;
var ticker=document.createElement("center");
var update=document.createElement("center");
ticker.innerHTML="";
ticker.id="dramalinks_ticker";
update.innerHTML="";
update.id="dramalinks_update";
var divs=document.getElementsByTagName("div");
for (var i=0; i<divs.length; i++)
{
        if (divs[i].className=="userbar")
        {
                divs[i].parentNode.insertBefore(ticker,divs[i]);
                divs[i].parentNode.insertBefore(update,divs[i]);
                break;
        }
}
GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://wiki.endoftheinter.net/index.php?title=Dramalinks/current&action=raw&section=0&maxage=300',
        headers: {
                'User-agent': 'Mozilla/4.0 (compatible) Dramalinks Script (ChromeLL)',
        },
        onload: function(responseDetails) {
                var t=responseDetails.responseText;
                t=t.replace(/\[\[(.+?)(\|(.+?))\]\]/g,"<a href=\"" + prefix + "//wiki.endoftheinter.net/index.php/$1\">$3</a>");
                t=t.replace(/\[\[(.+?)\]\]/g,"<a href=\"" + prefix + "//wiki.endoftheinter.net/index.php/$1\">$1</a>");
                t=t.replace(/\[(.+?)\]/g,"<a href=\"$1\" style=\"padding-left: 0px\"><img src=\"" + prefix + "//wiki.endoftheinter.net/skins/monobook/external.png\"></a>");
                t=t.replace(/href="\/index\.php/g,"href=\"" + prefix + "//wiki.endoftheinter.net/index.php");
                t=t.replace(/http:/gi,prefix);
                t=t.replace(/style=/gi,"");
                t=t.replace(/<script/gi,"<i");
                t=t.replace(/(on)([A-Za-z]*)(=)/gi,"");
                t=t.slice(t.indexOf("<!--- NEW STORIES GO HERE --->")+29);
                var dramas=t.slice(0,t.indexOf("<!--- NEW STORIES END HERE --->"));
                t=t.slice(t.indexOf("<!--- CHANGE DRAMALINKS COLOR CODE HERE --->"));
                t=t.slice(t.indexOf("{{")+2);
                var bgcol=t.slice(0,t.indexOf("}}"));
                var col;
                var kermit=false;
                switch (bgcol)
                {
                        case "kermit":
                        document.getElementById("dramalinks_ticker").style.border="2px solid #990099";
                        bgcol="black";
                        kermit=true;
                        case "black":
                        status="LUELINKS IS FUCKED ABANDON WEBSITE";
                        break;
                        case "red":
                        status="INTERNET!  SERIOUS BUSINESS!";
                        break;
                        case "orange":
                        status="Elevated pointless drama";
                        break;
                        case "yellow":
                        status="Increased pointless drama";
                        break;
                        case "blue":
                        status="Slight pointless drama";
                        break;
                        case "green":
                        status="Little pointless drama";
                        break;
                        case "white":
                        status="No Drama :DD";
                        break;
                        default:
                        col="black";
                        break;
                }
                if (kermit==false)
                {
                dramas="<span style='text-transform:capitalize'>Current Dramalinks Level: <font color='" + bgcol + "'>" + bgcol + "</span><br/>" + status + "</font><br/>" + dramas.slice(2).replace(/\*/g,"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                }

                if (kermit==true)
                {
                dramas="Current Dramalinks Level: <blink><font color='" + bgcol + "'>CODE KERMIT</font></blink><br/>" + dramas.slice(2).replace(/\*/g,"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                }

//              document.getElementById("dramalinks_ticker").style.backgroundColor=bgcol;
//              document.getElementById("dramalinks_ticker").style.color=col;
                document.getElementById("dramalinks_ticker").innerHTML=dramas;
        }
});