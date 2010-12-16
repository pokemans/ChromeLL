function insl(e){
	try{
		e.target.getElementsByClassName("message-top").item(0);
	}
	catch (e){
		return 0;
	}
	if(e.target.getElementsByClassName("message-top").item(0) != null){		var es=e.target.getElementsByClassName("message-top");
		var re = new RegExp("<number>(.*)</number>");
		var num = es[0].innerHTML.match(re);
		try{
			es[0].innerHTML = es[0].innerHTML.replace(num[1], "");			es[0].innerHTML += ' | <a href="##like" onclick="like(this);">Like</a>' + num[1];
		}catch(e){
			es[0].innerHTML += ' | <a href="##like" onclick="like(this);">Like</a>';
		}	}
}
function like(el){
	var e = el.parentNode.parentNode;
	//if(e.getElementsByClassName("message-top").item(0) != null){
		var img = '<img src="http://i4.endoftheinter.net/i/n/f818de60196ad15c888b7f2140a77744/like.png" />';
		var username = document.getElementsByClassName('userbar')[0].getElementsByTagName('a')[0].innerHTML.replace(/ \((.*)\)$/, "");
		var ins = img + ' ' + username + ' likes ' + e.getElementsByTagName('a').item(0).innerHTML + '\'s post';
		var text = document.getElementsByName('message').item(0).innerHTML;
		//var head = text.split('---')[0];
		var sigs = text.split('---');
		var sig = '';
		for(var i = 1; sigs[i]; i++){
			sig += sigs[i];
		}
		sig = '\n---' + sig;
		ins = ins.replace(/</g, '&lt;').replace(/>/g, '&gt;') + sig;
		document.getElementsByName('message').item(0).innerHTML = ins;
		QuickPost.publish('quote', el);
	//}
}
document.addEventListener('DOMNodeInserted', insl, false);