var gamejs = "", modBlocking = true;
var tester = document.getElementsByTagName("script");
var i = 0, main_out_url = "http://agar.io/main_out.js", discovered_mainouturl = 0;
var W = '';
var Ja = '';
var b = '';
var c3eg2 = '';

/* lets start to deal with regressions */
var test = 0;
var passed = 0;
var failed = 0;
for (i=0; i<tester.length; i++ ){
	src = tester[i].src;
	if (src.substring(0, main_out_url.length ) == main_out_url) {
		discovered_mainouturl = src.replace("http://agar.io/","");
	}
}

if(discovered_mainouturl != 0) {
	httpGet(discovered_mainouturl, function(data) {
		gamejs = "window.agariomods = " + data.replace("socket open","socket open (agariomods.com mod in place)");
		gamejs = gamejs.replace(/\n/g, "");
		offset = gamejs.search("..=\"poland;");
		Ja =  gamejs.substr(offset,2);
		offset = gamejs.search(".....src=\"skins");
		b = gamejs.substr(offset+2,1);
		offset = gamejs.search(".."+b+"..src");
		W = gamejs.substr(offset,1);
		var components = /strokeText\((.{1,14})\);/.exec(gamejs);
		c3eg2 = components[1];
		agariomodsRuntimeInjection();
	});
}

// XMLHttp, because apparently raven is doing funky stuff with jQuery
function httpGet(theUrl, callback) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", theUrl, true);
	xmlHttp.send(null);
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			callback(xmlHttp.responseText);
		}
	};
}
function agariomodsRuntimeInjection() {
	var tester = document.getElementsByTagName("head");
	var oldhtml = tester[0].innerHTML;
	oldhtml = oldhtml.replace('width:350px;', '');
	//	oldhtml = oldhtml.replace('top:50%;margin-right:-50%;transform:translate(-50%,-50%);', 'width:650px;');
	oldhtml = oldhtml.replace('-webkit-transform:translate(-50%,-50%);', '');
	oldhtml = oldhtml.replace('-ms-transform:translate(-50%,-50%);', '');
	oldhtml = oldhtml.replace('transform:translate(-50%,-50%);', '');
	oldhtml = oldhtml.replace('top:50%;left:50%;','margin:10px;');
	tester[0].innerHTML = oldhtml;
	var script = document.createElement("script");
	agariomodsRuntimePatches();
	script.innerHTML = gamejs;
	document.head.appendChild(script);
	agariomodsRuntimeHacks();

	window.onbeforeunload = function() {
		return 'Are you sure you want to quit agar.io?';
	};
	// as a trackpad user, this fix should reduce the frequency at which I am killed.
	$("#canvas").on('mousedown', function(event){
		event.preventDefault();
	});
	/* added an advert unit to the landing page as we now have server rental to consider */
	var iframe = document.createElement("iframe");
	iframe.id = "agariomods";
	iframe.style.width = "468px";
	iframe.style.height = "20px";
	iframe.style.zIndex = 3;
	iframe.style.position = "relative";
	iframe.style.padding = "0px";
	iframe.style.margin = "0px";
	iframe.style.left = "0px";
	iframe.style.overflow = "hidden";
        iframe.style.border = "0px";
        iframe.src = "http://agariomods.com/adverts.mod.js.html";
	var overlay = document.getElementById("includedContent");
	overlay.appendChild(iframe);
}
function agariomodsRuntimePatches() {
	var ourskins = "agariomods.com;albania;apple;atari;awesome;baka;bandaid;baseball;beats;bitcoin;blobfish;bobross;bobsaget;boogie2988;borg;bp;buckballs;burgundy;butters;byzantium;chechenya;chrome;cj;cokacola;controless;converse;cornella;creeper;cyprus;czechrepublic;deathstar;derp;dickbutt;doggie;domo;dong;dreamcast;ebin;egypt;eye;facebook;fastforward;fbi;fishies;freemason;friesland;frogout;fuckfacebook;getinmybelly;getinthebox;gimper;github;giygas;gnomechild;halflife3;handicapped;hap;hipsterwhale;hitler;honeycomb;hydro;iceland;illuminati;imgur;imperialjapan;instagram;isaac;isis;isreal;itchyfeetleech;jew;jimmies;kenny;kingdomoffrance;kingjoffrey;klingon;knightstemplar;knowyourmeme;kyle;lenny;libertyy;liechtenstien;love;macedonia;malta;maryland;masterball;mastercheif;mcdonalds;meatboy;megamilk;moldova;mortalkombat;mr.bean;mr.popo;nasa;nazi;nick;northbrabant;nosmoking;notch;osu;pedobear;peka;pepe;pepsi;pewdiepie;pi;pig;pinkfloyd;pinkstylist;piratebay;playstation;quantum leap;rageface;rewind;rockstar;rolfharris;serbia;shell;shrek;sinistar;slack;slovakia;slovenia;snafu;snapchat;soccer;soliare;somalia;space;spawn;spore;spy;starbucks;superman;tintin;tubbymcfatfuck;turkey;ukip;uppercase;uruguay;voyager;wewlad;white  light;wwf;wykop;ylilauta;yourmom;zoella";
        gamejs = gamejs.replace(';reddit;',';reddit;'+ourskins+';');
        gamejs = gamejs.replace(b+'=this.name.toLowerCase();', b+'=this.name.toLowerCase();var agariomods="";var ourskins = "'+ourskins+'";if(('+b+'.length >0) && (ourskins.split(";").indexOf('+b+')>-1)) {agariomods="http://skins.agariomods.com/i/"+'+b+'+".png";} else if ('+b+'.substring(0, 2) == "i/") {agariomods="http://i.imgur.com/"+this.name.substring(2)+".jpg";} else {agariomods="http://agar.io/skins/" + this.name.toLowerCase() + ".png";}');
        gamejs = gamejs.replace(W +'['+b+'].src="skins/"+'+b+'+".png"',W+'['+b+'].src=agariomods');
        gamejs = gamejs.replace("this._stroke&&b.strokeText("+c3eg2+");b.fillText("+c3eg2+")", "if (String(c).substring(0, 2) != \"i/\") {this._stroke&&b.strokeText("+c3eg2+");b.fillText("+c3eg2+")}");
        gamejs = gamejs.replace(b+"=this.name.toLowerCase();", b+"=this.name.toLowerCase(); if ("+b+".substring(0, 2) == \"i/\") {" +Ja+ "+="+b+";} ;");
	console.log ("Begin regression testing of agariomods.com userscript.");
	testCondition((-1 != gamejs.indexOf(';reddit;'+ourskins)), test++, "add our skinlist to the original game skinlist.");
	testCondition((-1 != gamejs.indexOf('var agariomods="";var ourskins'  )), test++, "add check for which skin mode we are in. be it no skin, default skin, imgur skin, or an agariomods skin.");
	testCondition((-1 != gamejs.indexOf('else if ('+b+'.substring(0, 2) == "i/") {agariomods' )),test++,"add imgur check #1");
	testCondition((-1 != gamejs.indexOf( b+"=this.name.toLowerCase(); if ("+b+".substring(0, 2) == \"i/\") {" +Ja+ "+="+b+";} ;"  )), test++, "add imgur check #2.");
	testCondition((-1 != gamejs.indexOf(W+'['+b+'].src=agariomods')), test++, "add agariomods variable to replace src of image");
	testCondition((-1 != gamejs.indexOf("if (String(c).substring(0, 2) != \"i/\") {this._stroke")), test++, "add imgur check for hiding username when using imgur id");
	console.log ("Testing complete, "+passed+" units passed and "+failed+" units failed.");
}
function testCondition (condition, id, comment) {
        if(condition) {
                console.log("test: #"+id+" PASSED - "+ comment);
                passed++;
        } else {
                console.log("test: #"+id+" FAILED - "+ comment);
		failed++;
        }
}


function agariomodsRuntimeHacks() {
//	jQuery('#helloDialog').css({left: 'auto;'});
	jQuery('#helloDialog').css({margin: '0px'});
	jQuery('#helloDialog').css({marginLeft: 'auto'});
	jQuery('#helloDialog').css({marginRight: 'auto'});
	var nodeDiv = document.createElement("div");
	$( document ).ready(function() {
		hd = document.getElementById("helloDialog");
		cachedhd = hd.innerHTML;
		hd.innerHTML = cachedhd.replace("<center>Agar.io</center>", "<a target=\"_blank\" style=\"position:absolute; padding-left:650px;top:-10px; z-index: -1; height:200px;\" href=\"https://www.reddit.com/r/Agario/\"><img src=\"http://i.imgur.com/TkTWOrc.png\" height=\"200px\"/></a>");
	});
	document.getElementById("nick").placeholder = "agariomods.com";
	$( document ).ready(function() {
		nh = document.getElementById("overlays");
		cachednh = nh.innerHTML;
		nh.innerHTML = cachednh.replace("<p>Type your nick or leave it empty:</p>", "<small>Version 1.7.7</small>&nbsp;<a target=\"_blank\" href='http://skins.agariomods.com'>click here for list of agariomods skins</a>");
	});
	nodeDiv.id = "includedContent";
	nodeDiv.style.width = "640px"
	nodeDiv.style.backgroundColor = "#000000";
	nodeDiv.style.zIndex = 9999999999;
//	nodeDiv.style.position = "relative";
	nodeDiv.style.padding = "8px";
//	nodeDiv.style.left = "-170px";
	nodeDiv.style.marginBottom = "10px";
	nodeDiv.style.borderRadius = "5px";
	nodeDiv.style.color = "#dddddd";
//	nodeDiv.innerHTML = "<small>Version 1.7.7-BestAgarPlayer2015&nbsp;&nbsp;The very best in skin modding</small>";
//	nodeDiv.innerHTML += "<p><a target=\"_blank\" href=\"http://forum.agariomods.com/\"><img width=\"15px\" src=\"http://i.imgur.com/oWFWwDo.png\">&nbsp</a><i>Get your friends using this script so they can see your new avatar too!</i><p><font color=\"yellow\"><b>1:</b> upload pic to imgur.com, <b>2:</b> get the id of img, <b>3:</b> type i/ followed by the id. ex: i/rIWgY2u</font></p>";
	nodeDiv.innerHTML += "\
		Get IP address from friend.\
		Put it in text box below.\
		Press the swirly icon next to it.\
		<p><b>Note:</b> Check with your friend to see whos #1 on the leaderboard</p>\
	<div style=\"background-color: #ffffff; color: #000000; padding: 2px; margin: 0px;\">\
		<small><b>Disable ad blockers</b>&nbsp;- They are breaking the game and our modifications in random and unexpected ways.</small>\
	</div>\
			<center><a href=\"http://chat.agariomods.com\" target=\"_blank\">Come join us in agariomods chat. Seriously, click here, please?</a></center>\
	";
	jQuery('#region').parent().get(0).appendChild(document.createElement("br"));
	jQuery('#region').parent().get(0).appendChild(nodeDiv);
	var selector = jQuery('#region');
	var playBtn = jQuery('#playBtn');
	var nodeInput = document.createElement("input");
	var nodeSpan = document.createElement("span");
	var nodeBr = document.createElement("br");
	nodeSpan.className = "glyphicon glyphicon-refresh";
	nodeSpan.style.fontSize = "1.5em";
	nodeSpan.style.cssFloat = "left";
	nodeSpan.style.paddingTop = "5px";
	nodeSpan.style.paddingLeft = "15px";
	nodeSpan.addEventListener("click", function (e) {
		if (modBlocking == false) {
                        //jQuery('#region').style.height = "0px";
                        jQuery('#region').hide();
                        //jQuery('#gamemode').style.height = "0px";
                        jQuery('#gamemode').hide();
			console.log ("clicked refresh");
			var oldregionval = jQuery('#region').val;
			jQuery('#region').val("EU-London");
			jQuery('#region').change();
			jQuery('#region').val("SG-Singapore");
			jQuery('#region').change();
			jQuery('#region').val(oldregionval);
			jQuery('#region').change();
			jQuery('#gamemode').change();
			//jQuery(this).fadeOut(100).fadeIn(100);
		}
	});
	nodeInput.className = "form-control";
	nodeInput.id = "iphack"
	nodeInput.style.width = "85%";
	nodeInput.style.cssFloat = "left";
	nodeInput.style.cssClear = "right";
	nodeInput.style.border = "2px solid green";
	nodeInput.placeholder = "Alternative server ip:port here.";
	jQuery(playBtn).parent().get(0).appendChild(nodeBr);
	jQuery(playBtn).parent().get(0).appendChild(nodeInput);
	jQuery(playBtn).parent().get(0).appendChild(nodeSpan);
	jQuery(playBtn).parent().get(0).appendChild(nodeBr);
	jQuery('#iphack').change(function() {
		if (jQuery('#iphack').val() == "") {
			modBlocking = true;
		}
		modBlocking = false;
	});
	jQuery('#playBtn').off();
	$('.btn-needs-server').prop('disabled', true);
	jQuery('#playBtn').click(function() {
		setNick(document.getElementById('nick').value);
		return false;
	});
}

(function(window) {
	var WebSocket_original = window.WebSocket;
	window.WebSocket_original = WebSocket_original;
	var newWebSocket = 0;
	window.WebSocket = function(data) {
		if (modBlocking == true) {
			newWebSocket = new window.WebSocket_original(data);
			jQuery('#includedContent').html("electronoob says, \"I am deeply sorry for taking over 24 hours to fix the skin modification, it is now fixed and I have added some unit testing to make sure that It's easier to track in the future. As a thank you for your patience I will begin the boring process of adding another 300 or so skins to the game which I was able to collect from reddit posts, these additions will take a while but it's the least I can do for making everyone wait so long to have their skins back.\"<br><br>Here is the IP address of the server you are connected to currently, pass it to your friends for team playing.<br><h1>" + data.replace('ws://', '') + "</h1>&nbsp;");
		} else {
			console.log("HAXXED: connecting to " + jQuery('#iphack').val() + "(ignoring: " + data + ")");
			newWebSocket = new window.WebSocket_original("ws://" + jQuery('#iphack').val());
			jQuery('#includedContent').html("<h3>Connected to " +  jQuery('#iphack').val() + "</h3><br>Check leaderboard with your friend to ensure you are both on the exact world on the sameserver.<br><br>If you cannot see the same people in the leaderboard as your friend, press the swirly icon next the ip box to try another world on the same game server.");
        	}
        	return newWebSocket;
	};
})(window);
