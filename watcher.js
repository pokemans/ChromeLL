function toggleWatch(loc){
	get = getUrlVars(loc);
	if(localStorage['chromeLL_watched'].indexOf(get['topic']) == -1){
		localStorage['chromeLL_watched'] += ';' + get['topic'];
		document.getElementById('chromeLL_watch').innerHTML = 'Unwatch'
		location.reload(true);
	}else{
		var re = new RegExp(';' + get['topic'],"g");
		//console.log('2 ' + re);
		localStorage['chromeLL_watched'] = localStorage['chromeLL_watched'].replace(re, '');
		location.reload(true);
	}
}
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