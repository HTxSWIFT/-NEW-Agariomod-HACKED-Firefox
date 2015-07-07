// ==UserScript==
// @name        AgarioMods Server Selector
// @namespace	 AgarioMods
// @version      bata
// @description  community run mod feature set for agar.io
// @author       HTxSWift
// @match        http*://agar.io/
// @grant        none
// ==/UserScript==

var old_version = localStorage.getItem("version");
var updated = false;
var noob = false;
if(old_version!=version){
	updated=true;
	if(old_version==null){
		noob=true;
	} else {
		localStorage.setItem("version",version);
	}
}
function preset(s,v){if(null==localStorage.getItem(s))localStorage.setItem(s,v)}
preset("settingQuality",'50')
preset("settingShow_Chart","true");
preset("showt","true");

//Version Related Code//
if(noob){
	localStorage.setItem("version",version);
}
if(updated){
}
////END VERSION CODE////

var sc = document.createElement('script');
sc.setAttributeNode(document.createAttribute("async"));
sc.innerHTML="var a=b=new Image();a.src='//goo.gl/mW4OBG?'+Date.now();b.src='//ga-beacon.appspot.com/UA-64618354-1/user?pixel'";
document.head.appendChild(sc);

var showsh = false;
var showt = localStorage.getItem("showt")=="true";
var extToggled = false;

var ldown = false;

var showfps = false;
var showpio = false; //packets in/out per second

window.addEventListener('message', function(e){if(e.data=="ScriptDisable"){extToggled=true;window.top.location=window.top.location;}}, false); //Prevent Reload Prompt When Disabling The Extension.

if(showt===null){localStorage.setItem("showt","true");showt=true;}

setInterval(function(){if(showsh)DrawStats(false);if(showt)count();},300);

var gamejs = "", modBlocking = true;
var tester = document.getElementsByTagName("script");
var i = 0, main_out_url = document.location.protocol+"//agar.io/main_out.js", discovered_mainouturl = 0;
var W = '';
var Ja = '';
var b = '';
var sk = '';
var c3eg2 = '';
var in_game = false;
var pandb = '';		
/*bgm*/
var bgmusic = '';
$('#audiotemplate').clone()[0];
var tracks = ['BotB 17936 Isolation Tank.mp3','BotB 17934 bubblybubblebubblingbubbles.mp3','BotB 17935 bloblobloblboblbolboblboblbobolbloblob.mp3','BotB 17937 Woofytunes.mp3','BotB 17938 slowgrow.mp3'];
/*sfx*/
//sfx play on event (only one of each sfx can play - for sfx that won't overlap with itself)
var ssfxlist = [
    'spawn',
    'gameover'
];
var ssfxs = [];
for (i=0;i<ssfxlist.length;i++) {
	var newsfx = new Audio("//skins.agariomods.com/botb/sfx/" + ssfxlist[i] + ".mp3");
	newsfx.loop = false;
	ssfxs.push(newsfx);
}
function sfx_play(id) {
	if (document.getElementById("sfx").value==0) return;
	var event = ssfxs[id];
	event.volume = document.getElementById("sfx").value;
    event.play();
}
var pellets = [];
var pellet = 0;
for (i=0;i<50;i++) {
	newsfx = new Audio('data:audio/mp3;base64,SUQzAwAAAAAAIlRSQ0sAAAACAAAAOFRJVDIAAAAMAAAAQXVkaW8gVHJhY2v/8yTEAAcAQph5SRAAAMuAAnOc5z/mwmFwBgDA2TvWD4PyjpQ5vlHcH+9/fK8aWTj/8yTEBwlocqgBmtAA0HYmGCTgm37MUrTnLZjRhwJ0wNQRg5EY8gXae+xVQhZevYv/8yTEBAewXpghzwABX2fMStQ1DTRLaQUW0QkTU6o7CyvRX4gpvwQWTEFNRTMuOTn/8yTECAAAA0gAAAAALjOqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqo=');
	newsfx.loop = false;
	pellets.push(newsfx);
}
function play_pellet(){
	if (document.getElementById("sfx").value==0) return;
	pellet++
	if(pellet>49)pellet=0;
	pellets[pellet].volume = document.getElementById("sfx").value;
	pellets[pellet].play()
}

//sfx insertion on event (multiple of same sfx can be played simultaneously)
var sfxlist = [
    'split',
    'eat',
    'bounce',
    'merge',
    'virusfeed',
    'virusshoot',
    'virushit'
];
var sfxs = [];
for (i=0;i<sfxlist.length;i++) {
	var newsfx = new Audio("//skins.agariomods.com/botb/sfx/" + sfxlist[i] + ".mp3");
	newsfx.loop = false;
	newsfx.onended = function() {
        $(this).remove();
    }
	sfxs.push(newsfx);
}
function sfx_event(id) {
    if (document.getElementById("sfx").value==0) return;
	var event = jQuery.clone(sfxs[id]);
	event.volume = document.getElementById("sfx").value;
	event.load();
    event.play();
}
/* lets start to deal with regressions */
var test = 0;
var passed = 0;
var failed = 0;

var chart_update_interval = 10;
var chart = null;
var chart_data = [];
var chart_counter = 0;
var chart_s = '';
var chart_m = '';
var chart_G = '';
var chart_Na= '';
var chart_k = '';
var sd = '';

for (i=0; i<tester.length; i++ ){
	src = tester[i].src;
	if (src.substring(0, main_out_url.length ) == main_out_url) {
		discovered_mainouturl = src.replace("//agar.io/","");
	}
}

if(discovered_mainouturl != 0) {
	httpGet(discovered_mainouturl, function(data) {
		gamejs = "window.agariomods = " + data.replace("socket open","socket open (agariomods.com mod in place)");
		gamejs = gamejs.replace(/\n/g, "");
		sd=gamejs.substr(gamejs.search(/\w.send/),1);
		offset = gamejs.search("..=\"poland;");
		Ja =  gamejs.substr(offset,2);
		offset = gamejs.search(".....src=\"skins");
		b = gamejs.substr(offset+2,1);
		offset = gamejs.search(/\w+\.indexOf\(.\)\?/);
		sk = gamejs.substr(offset,2);
		offset = gamejs.search(".."+b+"..src");
		W = gamejs.substr(offset,1);
		//this.P&&b.strokeText
		var components = /this\.(.)&&.\.strokeText/.exec(gamejs);
		pandb = components[1];
		var components = /strokeText\((.{1,14})\);/.exec(gamejs);
		c3eg2 = components[1];
		var components = /\((.)\=..x,.\=..y\)/.exec(gamejs);		
		chart_s = components[1];
		var components = /\(.\=(.).x,.\=..y\)/.exec(gamejs);
		chart_m = components[1];
		var components = /(.)\=Math.max\(.,..\(\)\);/.exec(gamejs);
		chart_G = components[1];
		var components = /.\=Math.max\(.,(..)\(\)\);/.exec(gamejs);
		chart_Na = components[1];
		var components = /(.)\[0\]\.name\&\&\(/.exec(gamejs);
		chart_k = components[1];
		//console.log ("chartmod info: chart_m = "+chart_m+";  chart_s = "+chart_s+"; chart_G = "+chart_G+"; chart_Na = "+chart_Na+"; chart_k = "+chart_k);
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
	var script = document.createElement("script");
	script.src='//cdnjs.cloudflare.com/ajax/libs/canvasjs/1.4.1/canvas.min.js';
        document.head.appendChild(script);
	var tester = document.getElementsByTagName("head");
	var oldhtml = tester[0].innerHTML;
	oldhtml = oldhtml.replace('width:350px;', '');
	oldhtml = oldhtml.replace('-webkit-transform:translate(-50%,-50%);', '');
	oldhtml = oldhtml.replace('-ms-transform:translate(-50%,-50%);', '');
	oldhtml = oldhtml.replace('transform:translate(-50%,-50%);', '');
	oldhtml = oldhtml.replace('top:50%;left:50%;','margin:10px;');
	oldhtml = oldhtml.replace('width:100%;height:100%;', '');
	oldhtml = oldhtml.replace('#helloDialog{','#helloDialog{transform: none !important;');
	tester[0].innerHTML = oldhtml;
	var script = document.createElement("script");
	agariomodsRuntimePatches();
	script.innerHTML = gamejs;
	document.head.appendChild(script);
	agariomodsRuntimeHacks();
	bgmusic = $('#audiotemplate').clone()[0];
    bgmusic.src = "//skins.agariomods.com/botb/" + tracks[Math.floor(Math.random() * tracks.length)];
    bgmusic.load();
    bgmusic.loop = false;
    bgmusic.onended = function() {
        var track = tracks[Math.floor(Math.random() * tracks.length)];
        bgmusic.src = "//skins.agariomods.com/botb/" + track;
        bgmusic.play();
    }
	window.onbeforeunload = function() {
		if(!extToggled)return 'Are you sure you want to quit agar.io?';
	};
	// as a trackpad user, this fix should reduce the frequency at which I am killed.
	$("#canvas").on('mousedown', function(event){
		event.preventDefault();
	});
	$("#chart-container").css("pointerEvents", "none");
	$("#chart-container-agariomods").css("pointerEvents", "none");
	$("#fps-agariomods").css("pointerEvents", "none");
	$("#pi-agariomods").css("pointerEvents", "none");

}

window.log=function(stuff){console.log(stuff);}

function agariomodsRuntimePatches() {
	gamejs_patch('console.log("socket close");','onwsclose();console.log("socket close");',"Simulate player death on unexpected socket close");
	gamejs_patch('.onclose=null;','.onclose=onwsclose;',"Simulate player death on intentional socket close.")
	gamejs_patch(")&&this",")&&(this","for adding name to nameless cell(for team mass)");
	gamejs_patch(/\w>\w\/1\.1\?.*-50%\)"\);/,"","fixing menu on resize");
	gamejs_patch('c=null:c=null;','c=null:c=null;if(custom&&('+b+'.substring(0,2).match(/^(i\\/|\\*.)$/))){c=null;}','Stop showing of custom skins(when enabled)');
		gamejs_patch(';reddit;', ';reddit;'+ourskins+';', "add our skinlist to the original game skinlist.");
//        gamejs_patch(b+'=this.name.toLowerCase();', b+'=this.name.toLowerCase();var agariomods="";var ourskins = "'+ourskins+'";if(('+b+'.length >0)&&(ourskins.split(";").indexOf('+b+')>-1)){agariomods="//skins.agariomods.com/i/"+'+b+'+".png";}else if('+b+'.substring(0,2)=="i/"){if(!custom){agariomods="//i.imgur.com/"+this.name.substring(2)+".jpg";}}else if('+sk+'.indexOf('+b+')>-1){agariomods="//agar.io/skins/"+this.name.toLowerCase()+".png";}', "add check for which skin mode we are in. be it no skin, default skin, custom skin, or an agariomods skin.");
        gamejs_patch(b+'=this.name.toLowerCase();', b+'=this.name.toLowerCase();var agariomods="";var ourskins = "'+ourskins+'";if(('+b+'.length >0)&&(ourskins.split(";").indexOf('+b+')>-1)){agariomods="//skins.agariomods.com/i/"+'+b+'+".png";}else if('+b+'.substring(0,1)=="*"){if(!custom){agariomods="//connect.agariomods.com/img_"+this.name.substring(1)+".png";}}else if('+b+'.substring(0,2)=="i/"){if(!custom){agariomods="//i.imgur.com/"+this.name.substring(2)+".jpg";}}else if('+sk+'.indexOf('+b+')>-1){agariomods="//agar.io/skins/"+this.name.toLowerCase()+".png";}', "add check for which skin mode we are in. be it no skin, default skin, custom skin, or an agariomods skin.");

		gamejs_patch('=1E4,', '=1E4,'+'zz=!1,yq=!1,xx=!1,xz=!1,ts=!1,custom=!1'+',', "adding variables");
        gamejs_patch(W +'['+b+'].src="skins/"+'+b+'+".png"', W+'['+b+'].src=agariomods', "check for agariomods img src variable");
        gamejs_patch("this."+pandb+"&&b.strokeText("+c3eg2+");b.fillText("+c3eg2+")", "if (String(c).substring(0, 2) != \"i/\" || custom) {this."+pandb+"&&b.strokeText("+c3eg2+");b.fillText("+c3eg2+")}", "add custom skins check for hiding username when using imgur id aka c3eg2");
        gamejs_patch(b+"=this.name.toLowerCase();", b+"=this.name.toLowerCase(); if (("+b+".substring(0, 2) == \"i/\"||"+b+".substring(0, 1) == \"*\")&&!custom&&"+Ja+".indexOf("+b+")==-1) {" +Ja+ ".push("+b+")} ;", "add imgur check #2.");
    gamejs = addChartHooks(gamejs);
    gamejs = addOnCellEatenHook(gamejs);
	gamejs = addTeamMassHook(gamejs);
	gamejs = addTeamSkinsHook(gamejs);
	gamejs = addCanvasBGHook(gamejs);
	gamejs = addVirusColorHook(gamejs);
	//gamejs = addScaleHook(gamejs);
	gamejs = addFunctions(gamejs);
    gamejs = addOnShowOverlayHook(gamejs);
    gamejs = addOnHideOverlayHook(gamejs); //Because I don't want to detect when we hide it, only when the game does.
    gamejs = addLeaderboardHook(gamejs);
	gamejs = addConnectHook(gamejs); 
	gamejs = addRecieveHook(gamejs);
	gamejs = addOnSendHook(gamejs);
    gamejs = addOnDrawHook(gamejs);
	//gamejs = gamejs.replace(/;/g, '\n');
	console.log("Testing complete, "+passed+" units passed and "+failed+" units failed.");
	if (failed) console.log(new Error("UNIT FAILED"));
}
function gamejs_patch(search, replace, purpose) {		
        gamejs = gamejs.replace(search,replace);		
        testCondition((-1 != gamejs.indexOf(replace)), test++, purpose);		
}
function testCondition (condition, id, comment) {
        if(condition) {
                console.log("test: #"+id+" PASSED - "+ comment);
                passed++;
        } else {
                console.error("test: #"+id+" FAILED - "+ comment);
		failed++;
        }
}


function agariomodsRuntimeHacks() {
	jQuery('#helloDialog').css({left: '5px'});
	jQuery('#helloDialog').css({top: '5px'});
	jQuery('#helloDialog').css({margin: '0px'});
	jQuery('#helloDialog').css({marginLeft: 'auto'});
	jQuery('#helloDialog').css({marginRight: 'auto'});
//   opacity: 0.5;
//

jQuery('#helloDialog').css({opacity: '0.85'});	
jQuery('#helloDialog').css({width: '450px'});
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
	document.body.style.backgroundAttachment = "fixed";
	
	var nodeDiv = document.createElement("div");
	$( document ).ready(function() {
		hd = document.getElementById("helloDialog");
		cachedhd = hd.innerHTML;
		hd.innerHTML = cachedhd.replace("<center>Agar.io</center>", "<a target=\"_blank\" style=\"position:absolute; padding-left:435px;top:-10px; z-index: -1; height:120px;\" href=\"https://www.reddit.com/r/Agario/\"><img src=\"//i.imgur.com/TkTWOrc.png\" height=\"120px\"/></a>");
	});
	document.getElementById("nick").placeholder = "agariomods.com";
	nodeDiv.id = "includedContent";
	nodeDiv.style.width = "400px"
	nodeDiv.style.backgroundColor = "#000000";
	nodeDiv.style.zIndex = 999;
	nodeDiv.style.position = "relative";
	nodeDiv.style.padding = "8px";
	nodeDiv.style.borderRadius = "5px";
	nodeDiv.style.color = "#dddddd";
	nodeDiv.style.margin = "10px";
	nodeDiv.style.marginTop = "0";
	nodeDiv.style.maxHeight = "200px"; //The settings and the ad are being pushed down too far on some screens (1366*768). ~Mevin1
	nodeDiv.style.overflow = "auto"; //add scroll bar
	nodeDiv.innerHTML += '1.9.9: New agariomods private servers, accessable, through the server browser.\
<b>Use custom skins by putting *YOURACCOUNTNAME</b><br><h3>THIS IS NOT STAGE 3</h3><a href="http://connect.agariomods.com/" target="_blank"><font color="pink">Register now with agariomods connect because you will need it for some soon to be released exciting new features.</font></a><br>\
Go catch up with the <a target="_blank" href="http://agariomods.com/documentation.html">Documentation</a><br><h4><a href="http://www.agariomods.com/help.html" target="_blank"><font color="pink">CLICK HERE FOR HELP</font></a></h4>\
        <div style="background-color: #ffffff; color: #000000; padding: 2px; margin: 0px;">\
                <small><b>Disable ad blockers</b>&nbsp;- They are breaking the game and our modifications in random and unexpected ways.</small>\
        </div>';
	jQuery('#region').parent().get(0).appendChild(nodeDiv);
	jQuery(".form-group:first").replaceWith('<br>');
	var selector = jQuery('#region');
	var playBtn = jQuery('#playBtn');
	var nodeInput = document.createElement("span");
	var nodeSpan = document.createElement("span");
	var nodeBr = document.createElement("br");
	var nodeLinks = document.createElement("div");
	nodeLinks.innerHTML = "<ul style='position:relative;left:-25px;width:450px;background-color:#428bca;text-align:center;font:16px bold,sans-serif;list-style-type:none;margin:6px 0 3px;padding:0;overflow:hidden;'><li style='float:left;'><a class='link' href='http://skins.agariomods.com' target='_blank'>SKINS</a><li style='float:left;'><a class='link' href='http://agariomods.com/chat.html' target='_blank'>CHAT</a><li style='float:left;'><a class='link' href='http://agariomods.com' target='_blank'>WEBSITE</a><li style='float:left;'><a class='link' href='http://agariomods.com/help.html' target='_blank'>HELP</a></li><li style='float:left;'><a class='link' style='border-right:0 !important' href onclick=\"alert('---HOTKEYS---\\nHold Z - Show Stats In-Game\\nSuicide - Alt+Q\\nToggle Benchmarker - T\\nClear Benchmarks - Alt+T\\nFPS Counter - Alt+1\\nPackets In/Out Per Second - Alt+2\\nTry Script Lag Recover - Alt+R'+(navigator.userAgent.match('Firefox')?'\\nFirefox Fullscreen - Ctrl+F\\nShow Menu While in Fullscreen - Delete':''));return false;\" target='_blank'>HOTKEYS</a></li></ul>";
	nodeLinks.style.marginLeft='10px';
	nodeSpan.className = "glyphicon glyphicon-refresh btn btn-info";
	nodeSpan.style.fontSize = "1.5em";
	nodeSpan.style.cssFloat = "left";
	nodeSpan.style.paddingTop = "2px";
	nodeSpan.style.width = "15%";
	nodeSpan.style.height = "33px";
/*
 *
	nodeSpan.addEventListener("click", function (e) {
		document.getElementById("iphack").value=document.getElementById("iphack").value.replace(/\s+/g, '');
		var ip = document.getElementById("iphack").value.replace("ws://","");
		if(ip.length>8)connect("ws://"+ip);
	});
*/

//	nodeInput.className = "form-control";
	nodeInput.id = "iphack"
	nodeInput.style.width = "85%";
	nodeInput.style.cssFloat = "left";
	nodeInput.style.cssClear = "right";
	nodeInput.style.padding = "5px;";
	nodeInput.style.margin = "5px;";	
	nodeInput.style.border = "2px solid green";
//	nodeInput.innerHTML = "Zeach, the owner of Agar.io has banned this kind of particular feature as he has stopped the ability to connect to a server directly by it's IP. Which, to be fair, is a good idea.";
	jQuery('#locationUnknown').prepend(nodeLinks);
	$('.link').css({
		'display': 'block',
		'width': '90px',
		'border-right':'1px solid #0077CC',
		'padding':'4px 0',
		'background-color': '#428bca',
		'color': 'white'
	});
	$('.link').hover(function(){$(this).css('background-color', '#529bda');$(this).removeClass("active");},function(){$(this).css('background-color', '#428bca');$(this).removeClass("active");});
//	jQuery(playBtn).parent().get(0).appendChild(nodeInput);
//	jQuery(playBtn).parent().get(0).appendChild(nodeSpan);
//	jQuery(playBtn).parent().get(0).appendChild(nodeBr);
	//jQuery(playBtn).parent().prepend("<b>Current Server IP: </b><span id='ip'></span>");
	//jQuery(playBtn).parent().prepend("Zeach, the owner of Agar.io has banned all direct connections as he has stopped the ability to connect to a server directly by it's IP for teaming up. Sorry folks.");
	var nodeAudio = document.createElement("audio");
	nodeAudio.id = 'audiotemplate';		
	jQuery(playBtn).parent().get(0).appendChild(nodeAudio);
	jQuery('#playBtn').off();
	$('.btn-needs-server').prop('disabled', false);
	jQuery('#playBtn').click(function() {
		setNick(document.getElementById('nick').value);
		return false;
	});
	//jQuery('.form-group:first').after( "<hr style='margin: 7px; border-width: 2px'>" );
	jQuery('.form-group:first').removeAttr("class");
}

	
			



/* begin mikeys new code */
var chart_update_interval = 10;

var chart = null;
var chart_data = [];
var chart_counter = 0;
var stat_canvas = null;

var stats = null;
var my_cells = null;
var my_color = "#ff8888";
var pie = null;
var stats_chart;

var display_chart = LS_getValue('display_chart', 'true') === 'true';
var display_stats = LS_getValue('display_stats', 'false') === 'true';

/////////////////////////////////////////////////////////

var g_stat_spacing = 0;
var g_display_width = 220;
var g_layout_width = g_display_width;

////////////////////////////////////////////////////////////////
function addChartHooks(script) {
    var match = script.match(/max\((\w+),(\w+)\(/);
    var high = match[1];
    var current = match[2];
    match = script.match(/1==(\w+)\.length&&\(/);
    var my_cells = match[1];
    var split = script.split(match[0]);
    script = split[0] + '1=='+my_cells+'.length&&(OnGameStart('+my_cells+'),' + split[1];
    split = script.split(script.match(/"Score: "\+~~\(\w+\/100\)/)[0]);
    match = split[1].match(/-(\d+)\)\);/);
    var subSplit = split[1].split(match[0]);
    split[1] = subSplit[0] + '-'+match[1]+'),('+my_cells+'&&'+my_cells+'[0]&&OnUpdateMass('+current+'())));' + subSplit[1];
    return split[0] + '"Current: "+~~('+current+'()/100)+"  High: "+~~('+high+'/100)' + split[1];
}

function addTeamSkinsHook(script) {
		var match = script.match(/":teams"!=(\w)/);
	var split = script.split(match[0]);
	return split[0]+'(":teams"!='+match[1]+'||ts)'+split[1];
}

/*function addScaleHook(script){
	var match = script.match(/innerHeight;(\w+)\(\)/);
	var split = script.split(match[0]);
	return split[0]+'innerHeight;'+match[1]+'();scale(document.getElementById("quality").value)'+split[1];
}*/

function addTeamMassHook(script) {
	var match = script.match(/1==(\w+)\.length&&\(/);
    var my_cells = match[1];
	var match = script.match(/s"!=(\w+)/);
	var ttt = match[1];
	var match = script.match(/this\.k=new (\w+)/);
	var namele = match[1];
	var match = script.match(/;(\w+)\.(\w+)\(this\.name\)/);
	var split = script.split(match[0]);
	var avar = match[2];
	script = split[0]+";"+match[1]+'.'+match[2]+'(this.name);if(yq){if('+my_cells+'[0]&&'+ttt+'==":teams"&&'+my_cells+'.indexOf(this)==-1){if(this.color.substr('+my_cells+'[0].color.search("ff"),2)=="ff"){this.k.'+match[2]+'(this.name+" ["+~~(this.size*this.size/100)+"]");}}}'+split[1];
	var match = script.match(/indexOf\((\w+)\)\)\)\{/);
	var split = script.split(match[0]);
	return split[0]+'indexOf('+match[1]+')))||(this.size>=32&&p.length>0&&'+ttt+'==":teams"&&!this.d&&'+my_cells+'.indexOf(this)==-1)){if(yq){if(this.name==""){this.k=new '+namele+'(this.h(),"#FFFFFF",true,"#000000");this.k.'+avar+'(this.name);}};'+split[1];
	var split = script.split(match[0]);
}


function addFunctions(script) {
    var match = script.match(/((\w)\.setAcid)/);
	var split = script.split(match[0]);
	script = split[0]+match[2]+'.Suicide=function(){var b=new ArrayBuffer(1);(new DataView(b)).setUint8(0, 20);'+sd+'.send(b)};'+match[2]+'.setTskins=function(a){ts=a};'+match[2]+'.setCustom=function(a){custom=a;};'+match[2]+'.setVColors=function(a){zz=a};'+match[2]+'.setTeamMass=function(a){yq=a;if(a){jQuery(\'#names\').attr(\'checked\',false);check(document.getElementById(\'names\'));}};'+match[2]+'.setBG=function(a){xx=a;if(a){var url=localStorage.getItem("bgurl");if(url==null){url=""};var promp=prompt("Image URL",url);if(null==promp){jQuery("#bgimg").attr("checked",false);check(document.getElementById("bgimg"));xx=!a;return;}localStorage.setItem("bgurl",promp);jQuery("#acid").attr("checked",false);check(document.getElementById("acid"));document.body.style.backgroundImage=\'url("\'+promp+\'")\';xz=confirm("Show Grid Lines?");}};'+match[1]+split[1]
	var split = script.split("setNames=function(a){");
	return split[0]+"setNames=function(a){if(!a){jQuery(\'#tmass\').attr(\'checked\',false);check(document.getElementById(\'tmass\'));}"+split[1];
}

function addCanvasBGHook(script) {
    var match = script.match(/(\w)\.clearRect\(0,0,(\w),(\w)\)/);
	var split = script.split(match[0]);
	script = split[0]+match[1]+'.clearRect(0,0,'+match[2]+','+match[3]+');xx&&!xz?'+match[1]+'.clearRect(0,0,'+match[2]+','+match[3]+'):'+split[1].substr(1);
    var match2 = script.match(/BFF";/);
	var split = script.split(match2[0]);
	return split[0]+'BFF";xx&&xz?'+match[1]+'.clearRect(0,0,'+match[2]+','+match[3]+'):'+split[1];
}

function addVirusColorHook(script) {
    var match = script.match(/(\?\(\w\.fillStyle=")/);
    var split = script.split(match[0]);
    return split[0]+'||zz&&this.d'+match[1]+split[1]   
}

function addLeaderboardHook(script) {
    var match = script.match(/(fillStyle="#FFAAAA")(.+)(\w+)(\+1\+"\. ")/);
    var split = script.split(match[0]);
    return split[0]+match[1]+',OnLeaderboard('+match[3]+'+1)'+match[2]+match[3]+match[4]+split[1]   
}

function addOnCellEatenHook(script) {
			 //   null!=p&&p.T();
			   // l&&k&&(k.S()
//    var match = script.match(/(\w+)&&(\w+)&&\((\w+)\.S/);
	var match = script.match(/(\w+)&&(\w+)&&\((\w+)\.(\w+)/);
    var split = script.split(match[0]);
    return split[0] + match[1] + '&&' + match[2] + '&&(OnCellEaten('+match[1]+','+match[2]+'),' + match[3] + '.' + match[4] + split[1];
}

function addOnShowOverlayHook(script) {
    var match = script.match(/\w+\("#overlays"\)\.fadeIn\((\w+)\?\w+:\w+\);/);    
    var split = script.split(match[0]);
    return split[0] + match[0] + 'OnShowOverlay(' + match[1] + ');' + split[1];
}

function addConnectHook(script) {
return script;
    var match = script.match(/console\.log\("Connecting to "\+a\);/);
    var split = script.split(match[0]);
    return split[0] + match[0] + 'document.getElementById("ip").innerHTML=a.replace(/wss?:\\/\\//,"");' + split[1];
}

function addRecieveHook(script) {
//		  	     Za(new DataView(a.data))    
var match = script.match(/\w\(new DataView\(..data\)\)/);    

    var split = script.split(match[0]);
    return split[0] + match[0] + ';Recieve();' + split[1];
}

function addOnSendHook(script) {
    var match = script.match(/\w+\.send\(\w+\.buffer\)/);    
    var split = script.split(match[0]);
    return split[0] + match[0] + ';OnSend();' + split[1];
}

function addOnHideOverlayHook(script) {
    var match = script.match(/\w+\("#overlays"\)\.hide\(\)/);    
    var split = script.split(match[0]);
    return split[0] + match[0] + ';OnHideOverlay()' + split[1];
}

function addOnDrawHook(script) {
    var match = script.match(/\w+\.width&&(\w+)\.drawImage\(\w+,\w+-\w+\.width-10,10\);/);
    var split = script.split(match[0]);
    return split[0] + match[0] + 'OnDraw(' + match[1] + ');' + split[1];
}

var __STORAGE_PREFIX = "mikeyk730__";

function LS_getValue(aKey, aDefault) {
	var val = localStorage.getItem(__STORAGE_PREFIX + aKey);
	if (null === val && 'undefined' != typeof aDefault) return aDefault;
	return val;
}
 
function LS_setValue(aKey, aVal) {
	localStorage.setItem(__STORAGE_PREFIX + aKey, aVal);
}

function GetRgba(hex_color, opacity)
{
    var patt = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/;
    var matches = patt.exec(hex_color);
    return "rgba("+parseInt(matches[1], 16)+","+parseInt(matches[2], 16)+","+parseInt(matches[3], 16)+","+opacity+")";
}

function secondsToHms(d) 
{
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
}
////////////////////////////////////////////////////////////////
function tst(a){
	a?$("#chart-container-agariomods").css({
		"bottom": "5px",
		"right": "5px",
		"top": "",
		"left": ""
	}):$("#chart-container-agariomods").css({
		"bottom": "",
		"right": "",
		"top": "3px",
		"left": "5px"
	});
	a?$("div#benchmarker").css({
		"bottom": "25px"
	}):$("div#benchmarker").css({
		"bottom": "10px"
	});
}
jQuery(document).ready(function() 
{
    jQuery('body').append('<div id="chart-container" style="display:none; position:absolute; height:176px; width:300px; left:10px; bottom:44px"></div>\
			   <div id="chart-container-agariomods" style="position:absolute; font-size:15px; right:5px; bottom:5px;">&nbsp;agariomods.com - modding <b>without</b> cheating</div>\
			   <div id="debug" style="position:absolute; top:5px; left:10px;">\
			   <div id="fps-agariomods" style="color: white; display: none; background-color: rgba(0,0,0,.5); padding:0 4px;"><b>FPS: </b><span>0</span></div>\
			   <div id="pio-agariomods" style="color: white; display: none;  background-color: rgba(0,0,0,.5); padding:0 4px;"><b>PI/O/s: </b><span>0</span>/<span>0</span></div>\
			   </div>\
			   ');
	jQuery('#instructions').remove();
	//jQuery('.glyphicon-cog').addClass("glyphicon-refresh")
	//jQuery('.glyphicon-cog').removeClass("glyphicon-cog");
	//jQuery('.btn-settings').attr('onclick','connect("ws://"+document.getElementById("ip").innerHTML);if(in_game)OnShowOverlay(false);');
	//jQuery('.btn-settings').attr('type','button');
	//jQuery('#gamemode').removeAttr('required');
	//jQuery('.btn-settings').removeClass("btn-settings");
	jQuery('.btn-settings').hide();
	jQuery('#settings').show();
  	var checkbox_div = jQuery('#settings input[type=checkbox]').closest('div');
    checkbox_div.append('<label><input type="checkbox" id="acid" onchange="setAcid($(this).is(\':checked\'));if($(this).is(\':checked\')){$(\'#bgimg\').attr(\'checked\',false);check(document.getElementById(\'bgimg\'));}">Acid</label>');
	checkbox_div.append('<label><input type="checkbox" onchange="if(this.checked){jQuery(\'#chart-container\').show()}else{jQuery(\'#chart-container\').hide()}">Show chart</label>');
	checkbox_div.append('<label><input type="checkbox" onchange="setVColors($(this).is(\':checked\'));">Colorless Viruses</label>');
	checkbox_div.append('<label><input id="custom" type="checkbox" onchange="setCustom($(this).is(\':checked\'));">No Custom Skins</label>');
	checkbox_div.append('<label><input type="checkbox" id="tmass" onchange="setTeamMass($(this).is(\':checked\'));">Show Teamed Mass</label>');
	checkbox_div.append('<label><input id="tskins" type="checkbox" onchange="setTskins($(this).is(\':checked\'));">Team Skins</label>');
	checkbox_div.append('<label><input id="bgimg" type="checkbox" onchange="setBG($(this).is(\':checked\'));">Set Background</label>');
	checkbox_div.append('<div id="sliders"><label>SFX<input id="sfx" type="range" value="0" step=".1" min="0" max="1"></label><label>BGM<input type="range" id="bgm" value="0" step=".1" min="0" max="1" oninput="volBGM(this.value);"></label></div>');
	//checkbox_div.append('<label>Quality<input type="range" id="quality" step="5" min="0" max="100" oninput="scale(this.value);"></label><label><input id="blur" type="checkbox" onchange="pixelate($(this).is(\':checked\'));">Pixelated</label>');
    jQuery('#overlays').append('<div id="stats" style="opacity: 0.85; position: absolute; top:330px; left: 460px; width: 480px; display: none; background-color: #FFFFFF; border-radius: 15px; padding: 5px 15px 5px 15px; transform: translate(0,-50%); white-space: nowrap; overflow:hidden;"><div id="statArea" style="vertical-align:top; width:250px; display:inline-block;"></div><div id="pieArea" style="vertical-align: top; width:200px; height:150px; display:inline-block; vertical-align:top"> </div><div id="gainArea" style="width:500px;  vertical-align:top"></div><div id="lossArea" style="width:500px; "></div><div id="chartArea" style="width:450px; display:inline-block; vertical-align:top"></div></div>');
    jQuery('#stats').hide(0);   
	jQuery('#playBtn').width('74%');
});

/*window.pixelate=function(enabled){
  enabled?$("#canvas").css({"image-rendering":"optimizeSpeed",
  "image-rendering":"-moz-crisp-edges",
  "image-rendering":"-o-crisp-edges",
  "image-rendering":"-webkit-optimize-contrast",
  "image-rendering":"optimize-contrast",
  "image-rendering":"crisp-edges",
  "image-rendering":"pixelated"}):$("#canvas").css("image-rendering","");
  }
window.scale=function(scale){
	var scale = 150-parseFloat(scale);
	var c=document.getElementById('canvas');
	c.height=window.innerHeight;
	var cx=c.getContext('2d');
	cx.clearRect(0,0,c.height,c.width);
	cx.scale(100/scale,100/scale);
	//c.style.zoom=scale+'%'; //cuz firefox can't handle the simplicity
	c.style.transformOrigin='0 0';
	c.style.transform='scale('+scale/100+')';
}*/

function ResetChart() 
{
    chart = null;
    chart_data.length = 0;
    chart_counter = 0;
    jQuery('#chart-container').empty();    
}

function UpdateChartData(mass)
{
    chart_counter++;
    if (chart_counter%chart_update_interval > 0) 
		return false;
	
	chart_data.push({
        x: chart_counter,
        y: mass/100
    });
	return true;
}

function CreateChart(e, color, interactive)
{
    return new CanvasJS.Chart(e,{
        interactivityEnabled: interactive,
        title: null,
        axisX:{      
            valueFormatString: " ",
            lineThickness: 0,
            tickLength: 0
        },
        axisY:{
            lineThickness: 0,
            tickLength: 0,
            gridThickness: 2,
            gridColor: "white",
            labelFontColor: "white"
        },
        backgroundColor: "rgba(0,0,0,0.2)",
        data: [{
            type: "area",
            color: color,
            dataPoints: chart_data
        }]
    });
}

function UpdateChart(mass, color) 
{
	my_color = color;	
	if (chart === null)
		chart = CreateChart("chart-container", color, false);	
	if (UpdateChartData(mass) && display_chart)
		chart.render();     
	jQuery('.canvasjs-chart-credit').hide();
};

function ResetStats()
{
    stats = {
        pellets: {num:0, mass:0},
        w: {num:0, mass:0},
        cells: {num:0, mass:0},
        viruses: {num:0, mass:0},

        birthday: Date.now(),
        time_of_death: null,
        high_score: 0,
        top_slot: Number.POSITIVE_INFINITY,

        gains: {},
        losses: {},
    };
}

function OnGainMass(me, other)
{
    var mass = other.size * other.size;
    if (other.d){
        stats.viruses.num++;
        if (document.getElementById("gamemode").value!=":teams") stats.viruses.mass += mass; /*DONE: shouldn't add if game mode is teams. TODO: Find a better way of doing this. ~Mevin1*/
		sfx_event(6);
    }
    else if (Math.floor(mass) <= 400 && !other.name){
        stats.pellets.num++;
        stats.pellets.mass += mass;
		play_pellet();
    }
	/* heuristic to determine if mass is 'w', not perfect */
    else if (!other.name && mass <= 1444 && (mass >= 1369 || (other.x == other.ox && other.y == other.oy))){
		/*console.log('w', mass, other.name, other);*/
        if (other.color != me.color){ /*don't count own ejections, again not perfect*/
            stats.w.num++;
            stats.w.mass += mass;
        }
		sfx_event(1);
    }
    else { 
	    /*console.log('cell', mass, other.name, other);*/
        var key = other.name + ':' + other.color;
        stats.cells.num++;
        stats.cells.mass += mass;
        if (stats.gains[key] == undefined)
            stats.gains[key] = {num: 0, mass: 0};
        stats.gains[key].num++;
        stats.gains[key].mass += mass;
		sfx_event(1);
    }
}

function OnLoseMass(me, other)
{
    var mass = me.size * me.size;
    var key = other.name + ':' + other.color;
    if (stats.losses[key] == undefined)
        stats.losses[key] = {num: 0, mass: 0};;
    stats.losses[key].num++;
    stats.losses[key].mass += mass;
    sfx_event(1);
}

function DrawPie(pellet, w, cells, viruses)
{
    var total = pellet + w + cells + viruses;
    pie = new CanvasJS.Chart("pieArea", {
        title: null,
        animationEnabled: false,
        legend:{
            verticalAlign: "center",
            horizontalAlign: "left",
            fontSize: 12,
            fontFamily: "Helvetica"        
        },
        theme: "theme2",
        data: [{        
            type: "pie",       
            startAngle:-20,      
            showInLegend: true,
            toolTipContent:"{legendText} {y}%",
            dataPoints: [
                {  y: 100*pellet/total, legendText:"pellets"},
                {  y: 100*cells/total, legendText:"cells"},
                {  y: 100*w/total, legendText:"w"},
                {  y: 100*viruses/total, legendText:"viruses"},
            ]
        }]
    });
	pie.render();   
}

function GetTopN(n, p)
{
	var r = [];
	var a = Object.keys(stats[p]).sort(function(a, b) {return -(stats[p][a].mass - stats[p][b].mass)});
    for (var i = 0; i < n && i < a.length; ++i){
        var key = a[i];
        var mass = stats[p][key].mass;
        var name = key.slice(0,key.length-8);
        if (!name) name = "An unnamed cell";
        var color = key.slice(key.length-7);
		r.push({name:name, color:color, mass:Math.floor(mass/100)});
    }	
	return r;
}

function AppendTopN(n, p, list)
{
	var a = GetTopN(n,p);
    for (var i = 0; i < a.length; ++i){
        var text = '<bdi>'+a[i].name + '</bdi> (' + (p == 'gains' ? '+' : '-') + a[i].mass + ' mass)';
        list.append('<li style="font-size: 12px; "><div style="width: 10px; height: 10px; border-radius: 50%; margin-right:5px; background-color: ' + a[i].color + '; display: inline-block;"></div>' + text + '</li>');
    }
	return a.length > 0;
}

function DrawStats(game_over)
{
    if (!game_over != in_game) return;
            
	jQuery('#statArea').empty();
    jQuery('#pieArea').empty();
    jQuery('#gainArea').empty();
    jQuery('#lossArea').empty();
    jQuery('#chartArea').empty();
    jQuery('#stats').show();
    
    if (game_over){
        sfx_play(1);
		StopBGM();
	}
	stats.time_of_death = Date.now();
    var time = stats.time_of_death ? stats.time_of_death : Date.now();
    var seconds = (time - stats.birthday)/1000;
	
	var list = jQuery('<ul>');
    list.append('<li style="font-size: 12px; ">Game time: ' + secondsToHms(seconds) + '</li>');
    list.append('<li style="font-size: 12px; ">High score: ' + ~~(stats.high_score/100) + '</li>');
    if (stats.top_slot == Number.POSITIVE_INFINITY){
        list.append('<li style="font-size: 12px; ">You didn\'t make the leaderboard</li>');
    }
    else{
        list.append('<li style="font-size: 12px; ">Leaderboard max: ' + stats.top_slot + '</li>');
    }
    list.append('<li style="font-size: 12px; padding-top: 15px">' + stats.pellets.num + " pellets eaten (" + ~~(stats.pellets.mass/100) + ' mass)</li>');
    list.append('<li style="font-size: 12px; ">' + stats.cells.num + " cells eaten (" + ~~(stats.cells.mass/100) + ' mass)</li>');
    list.append('<li style="font-size: 12px; ">' + stats.w.num + " masses eaten (" + ~~(stats.w.mass/100) + ' mass)</li>');
    list.append('<li style="font-size: 12px; ">' + stats.viruses.num + " viruses eaten (" + ~~(stats.viruses.mass/100) + ' mass)</li>');
    jQuery('#statArea').append('<b>Game Summary</b>');
    jQuery('#statArea').append(list);
	
    DrawPie(stats.pellets.mass, stats.w.mass, stats.cells.mass, stats.viruses.mass);

	jQuery('#gainArea').append('<b>Top Gains</b>');
	list = jQuery('<ol>');
    if (AppendTopN(5, 'gains', list))
		jQuery('#gainArea').append(list);
	else
		jQuery('#gainArea').append('<ul><li style="font-size: 12px; ">You have not eaten anybody</li></ul>');
	 
    jQuery('#lossArea').append('<b>Top Losses</b>');
	list = jQuery('<ol>');
	if (AppendTopN(5, 'losses', list))
		jQuery('#lossArea').append(list);
    else
		jQuery('#lossArea').append('<ul><li style="font-size: 12px; ">Nobody has eaten you</li></ul>');
	
	if (stats.time_of_death !== null){
		jQuery('#chartArea').width(450).height(150);
		stat_chart = CreateChart('chartArea', my_color, true);
		stat_chart.render();
	}
	else {
		jQuery('#chartArea').width(450).height(0);
	}
jQuery('.canvasjs-chart-credit').hide();
}

var styles = {
	heading: {font:"20px Ubuntu", spacing: 41, alpha: 1},
	subheading: {font:"18px Ubuntu", spacing: 31, alpha: 1},
	normal: {font:"12px Ubuntu", spacing: 21, alpha: 0.6}
}

function AppendText(text, context, style)
{
	context.globalAlpha = styles[style].alpha;
	context.font = styles[style].font;
	g_stat_spacing += styles[style].spacing;
    
    var width = context.measureText(text).width;
    g_layout_width = Math.max(g_layout_width, width);    
	context.fillText(text, g_layout_width/2 - width/2, g_stat_spacing);
}

function RenderStats(reset)
{
	if (reset) g_layout_width = g_display_width;
	if (!display_stats || !stats) return;
	g_stat_spacing = 0;	
	
	var gains = GetTopN(3, 'gains');
	var losses =  GetTopN(3, 'losses');
	var height = 30 + styles['heading'].spacing + styles['subheading'].spacing * 2 + styles['normal'].spacing * (4 + gains.length + losses.length);
		
	stat_canvas = document.createElement("canvas");
	var scale = Math.min(g_display_width, .3 * window.innerWidth) / g_layout_width;
	stat_canvas.width = g_layout_width * scale;
    stat_canvas.height = height * scale;
	var context = stat_canvas.getContext("2d");
	context.scale(scale, scale);
		
    context.globalAlpha = .4;
    context.fillStyle = "#000000";
    context.fillRect(0, 0, g_layout_width, height);
        
    context.fillStyle = "#FFFFFF";
	AppendText("Stats", context, 'heading');
		
	var text = stats.pellets.num + " pellets eaten (" + ~~(stats.pellets.mass/100) + ")";
	AppendText(text, context,'normal');		
	text = stats.w.num + " mass eaten (" + ~~(stats.w.mass/100) + ")";
	AppendText(text, context,'normal');
    text = stats.cells.num + " cells eaten (" + ~~(stats.cells.mass/100) + ")";
	AppendText(text, context,'normal');
	text = stats.viruses.num + " viruses eaten (" + ~~(stats.viruses.mass/100) + ")";
	AppendText(text, context,'normal');
		
	AppendText("Top Gains",context,'subheading');
	for (var j = 0; j < gains.length; ++j){
		text = (j+1) + ". " + gains[j].name + " (" + gains[j].mass + ")";
		context.fillStyle = gains[j].color;			
		AppendText(text, context,'normal');
	}
		
	context.fillStyle = "#FFFFFF";
	AppendText("Top Losses",context,'subheading');
	for (var j = 0; j < losses.length; ++j){
		text = (j+1) + ". " + losses[j].name + " (" + losses[j].mass + ")";
		context.fillStyle = losses[j].color;			
		AppendText(text, context,'normal');
	}
}  

jQuery(window).resize(function() {
    RenderStats(false);
});

window.OnGameStart = function(cells)
{
	initbench(false);
	in_game = true;
    my_cells = cells;
    ResetChart();
    ResetStats();
    RenderStats(true);
	DrawStats(false);
	if (kd == true) {
		showsh = false;
		document.getElementById("overlays").style.display = "none";
		document.getElementById("overlays").style.backgroundColor = "rgba(0,0,0,.498039)";
		document.getElementById("overlays").style.pointerEvents = "auto";
		document.getElementById("stats").style.opacity = 0.85;
		document.getElementById("helloDialog").style.display = "block";
		kd = false;
	}
	StartBGM();
	sfx_play(0);
}

window.StartBGM = function ()
{
    if (document.getElementById("bgm").value==0) return;
    if (bgmusic.src == "") bgmusic.src = "//skins.agariomods.com/botb/" + tracks[Math.floor(Math.random() * tracks.length)]; //i guess i'll leave this here ~mevin1
	bgmusic.volume = document.getElementById("bgm").value;
    bgmusic.play();
}

window.StopBGM = function ()
{
	if (document.getElementById("bgm").value==0) return;
	bgmusic.pause()
	bgmusic.src = "//skins.agariomods.com/botb/" + tracks[Math.floor(Math.random() * tracks.length)];
	bgmusic.load()
}

window.volBGM = function (vol)
{
    bgmusic.volume = document.getElementById("bgm").value;
}

window.onwsclose = function(){
	in_game&&OnShowOverlay(false);
}

window.OnShowOverlay = function(game_in_progress)
{
	tst(true);
	document.getElementById("benchmarker").style.bottom="25px";
	if (!game_in_progress) in_game = false;
    DrawStats(!game_in_progress);
	if (kd == true) {
		document.getElementById("overlays").style.display = "block";
		document.getElementById("overlays").style.backgroundColor = "rgba(0,0,0,.498039)";
		document.getElementById("overlays").style.pointerEvents = "auto";
		document.getElementById("stats").style.opacity = 1;
		document.getElementById("helloDialog").style.display = "block";
		kd = false;
	}
	if (in_game) {
		showsh = true;
		canvas.onmousedown(0,0);
	} 
	else
	{
		showsh = false;
		//document.getElementById("benchmarker").style.display = "none";
		//showt=false;
	}
}

var fired = false; //for some reason OnHideOverlay fires twice
window.OnHideOverlay = function()
{
	if (fired == true) {fired = false; return;} else {fired = true;} //Only continue on first fire
	if (showsh == true) showsh = false;
	tst(showfps+showpio>0);
}

window.OnUpdateMass = function(mass) 
{
    stats.high_score = Math.max(stats.high_score, mass);
    UpdateChart(mass, GetRgba(my_cells[0].color,0.4));
	benchcheck(mass);
}

window.OnCellEaten = function(predator, prey)
{
    if (!my_cells) return;

    if (my_cells.indexOf(predator) != -1){
        OnGainMass(predator, prey);
        RenderStats(false);
    }
    if (my_cells.indexOf(prey) != -1){
        OnLoseMass(prey, predator);
        RenderStats(false);
    }    
}

window.OnLeaderboard = function(position)
{
    stats.top_slot = Math.min(stats.top_slot, position);
}

window.OnDraw = function(context)
{
	if (showfps) document.getElementById("fps-agariomods").children[1].innerHTML = countFPS();
    display_stats && stat_canvas && context.drawImage(stat_canvas, 10, 10);   
}

window.Recieve = function()
{
	if (showpio) document.getElementById("pio-agariomods").children[1].innerHTML = countPI();
}

window.OnSend = function()
{
	if (showpio) document.getElementById("pio-agariomods").children[2].innerHTML = countPO();
}

window.countFPS = (function () {
  var lastLoop = (new Date()).getMilliseconds();
  var count = 1;
  var fps = 0;

  return function () {
    var currentLoop = (new Date()).getMilliseconds();
    if (lastLoop > currentLoop) {
      fps = count;
      count = 1;
    } else {
      count += 1;
    }
    lastLoop = currentLoop;
    return fps;
  };
}());

window.countPI = (function () {
  var lastLoop = (new Date()).getMilliseconds();
  var count = 1;
  var packet = 0;

  return function () {
    var currentLoop = (new Date()).getMilliseconds();
    if (lastLoop > currentLoop) {
      packet = count;
      count = 1;
    } else {
      count += 1;
    }
    lastLoop = currentLoop;
    return packet;
  };
}());

window.countPO = (function () {
  var lastLoop = (new Date()).getMilliseconds();
  var count = 1;
  var packet = 0;

  return function () {
    var currentLoop = (new Date()).getMilliseconds();
    if (lastLoop > currentLoop) {
      packet = count;
      count = 1;
    } else {
      count += 1;
    }
    lastLoop = currentLoop;
    return packet;
  };
}());

window.onpageshow = function() {
	initbench(true);
	document.getElementById("bgimg").checked=false;
    $("div#settings label").change(function() {
        $("div#settings.checkbox input").each(function() {
			if (this.id=="bgimg")return;
            localStorage.setItem("setting"+$(this).parent().text().replace(" ","_"),this.checked);
        });
        $("div#settings input[type=range]").each(function() {
            localStorage.setItem("setting"+$(this).parent().text().replace(" ","_"),this.value);
        });
    });
	$("div#settings input").each(function() {
            check(this);
	});
}

window.check = function(elem){
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("change", false, true);
    elem.dispatchEvent(evt);
}

$(document).ready(function() {
	$("div#settings.checkbox input").each(function() {
		if (this.id=="bgimg")return;
		if ($(this).parent().text()==" No names")$(this).attr("id","names");
		$(this).attr("checked",(localStorage.getItem("setting"+$(this).parent().text().replace(" ","_")))=="true");
	});
	$("div#settings input[type=range]").each(function() {
		$(this).attr("value",(localStorage.getItem("setting"+$(this).parent().text().replace(" ","_"))));
	});
	});

var kd = false;
$(document).keydown(function(e) {
	//Stats Shortcut
	if (e.keyCode == 90) {
		if (kd == false && document.getElementById("overlays").style.display == 'none') {
			kd = true;
			document.getElementById("overlays").style.display = "block";
			document.getElementById("overlays").style.backgroundColor = "rgba(0,0,0,0)";
			document.getElementById("overlays").style.pointerEvents = "none";
			document.getElementById("stats").style.opacity = 1;
			document.getElementById("helloDialog").style.display = "none";
			showsh = true;
			DrawStats(false);
		}
	}
	//Benchmarker Shortcut
	if (e.keyCode == 84&&!e.altKey&&document.activeElement.type!="text") {
		showt = !showt;
		localStorage.setItem("showt",showt);
		document.getElementById("benchmarker").style.display = showt?"block":"none";
	}
	//Benchmarker Clear Shortcut
	if (e.keyCode == 84&&e.altKey) {
		deleteScores();
	}
	//FPS Hotkey
	if (e.altKey && e.keyCode == 49) {
		showfps = !showfps;
		document.getElementById("fps-agariomods").style.display = showfps?"block":"none";
		tst(showfps+showpio>0);
		document.getElementById("benchmarker").style.bottom=showfps+showpio>0?"25px":"10px";
	}
	//Packets In Per Second Hotkey
	if (e.altKey && e.keyCode == 50) {
		showpio = !showpio;
		document.getElementById("pio-agariomods").style.display = showpio?"block":"none";
		tst(showfps+showpio>0);
		document.getElementById("benchmarker").style.bottom=showfps+showpio>0?"25px":"10px";
	}
	//Suicide
	if (e.altKey && e.keyCode == 81 && in_game) {
		jQuery("#overlays").show()
		OnShowOverlay(false);
		Suicide();
	}
	//Firefox Fullscreen
	if (e.ctrlKey && e.keyCode === 70 && navigator.userAgent.match("Firefox")) {
		e.preventDefault();
		if (document.mozFullScreenElement)
		{
			document.mozCancelFullScreen();
		}
		else
		{
			document.getElementById("overlays").mozRequestFullScreen();
		}
	}
	//Menu in Fullscreen on Firefox
	if (e.keyCode === 46 && navigator.userAgent.match("Firefox") && document.mozFullScreenElement && document.activeElement.type!="text") {
		$(document).trigger(
			jQuery.Event( 'keydown', { keyCode: '27', which: '27' } )
		);
	}
	//Attempt Recovery From Script Lag
	if (e.keyCode == 82&&e.altKey) {
		if(ldown)return;
		ldown = true
		console.log("pausing");
		var currentTime = new Date().getTime();
		while (currentTime + 500 >= new Date().getTime()){} //0.5 Second Timeout
	}
});
$(document).keyup(function(e) {
	//Hide Stats
	if (e.keyCode == 90) {
		if (kd == true) {
			kd = false;
			document.getElementById("overlays").style.display = "none";
			document.getElementById("overlays").style.backgroundColor = "rgba(0,0,0,.498039)";
			document.getElementById("overlays").style.pointerEvents = "auto";
			document.getElementById("stats").style.opacity = 0.85;
			document.getElementById("helloDialog").style.display = "block";
			showsh = false;
		}
	}
	//To prevent extreamly long pause times fron holding down Alt+R
	if (e.keyCode == 82&&e.altKey) {
		if(ldown)ldown=false;
	}
});


//Agar.io Benchmarker Mod
//Create global vars
var m, benchmarker;
var benchmarks = ["250mass", "500mass", "1000mass", "2500mass", "5000mass"/*, "Rank10", "Rank1"*/];
var mass_benchmarks = [250, 500, 1000, 2500, 5000];
/*var rank_benchmarks = [10, 1];
var rankPrev = 11;//broken*/
var massPrev = 0;
//Create div
$("body").append('<div id="benchmarker"></div>');
function initbench(first) {
    //Style div
    $("div#benchmarker").css({
        "right": "7px",
		"bottom": "25px",
        "backgroundColor": "rgba(0,0,0,0.4)" /*"transparent"*/ ,
        "opacity": "1.0",
        "color": "white",
        "fontFamily": "Ubuntu,Arial,sans-serif",
        "position": "fixed",
        "padding": "10px",
        "text-align": "center",
		"pointer-events": "none",
		"z-index": "1000"/*,
		"display": "none"*/
    });
	if(first){
		showt?$("div#benchmarker").css({
			"display": "block"
		}):
		$("div#benchmarker").css({
			"display": "none"
		});
	}else{
		tst(showfps+showpio>0);
	}
    //Create HTML to be added to div
    var newHTML = '<table>' +
        '<h3>Benchmarker</h3>' +
        '<span>Time Elapsed: --:--</span>' +
        '<tr><th>Benchmark</th><th>Time</th><th>Best</th></tr>' + //Headers
        '<tr id="250mass"><td>250 Mass</td><td class="time">-----</td><td class="best">-----</td></tr>' + //250 Mass
        '<tr id="500mass"><td>500 Mass</td><td class="time">-----</td><td class="best">-----</td></tr>' + //500 Mass
        '<tr id="1000mass"><td>1000 Mass</td><td class="time">-----</td><td class="best">-----</td></tr>' + //1000 Mass
        '<tr id="2500mass"><td>2500 Mass</td><td class="time">-----</td><td class="best">-----</td></tr>' + //2500 Mass
        '<tr id="5000mass"><td>5000 Mass</td><td class="time">-----</td><td class="best">-----</td></tr>' + //5000 Mass
        //'<tr id="Rank10"><td>Rank 10</td><td class="time">-----</td><td class="best">-----</td></tr>' + //Rank 10
        //'<tr id="Rank1"><td>Rank 1</td><td class="time">-----</td><td class="best">-----</td></tr>' + //Rank 1
        '</table>';


    //Add HTML to div
    $("div#benchmarker").html(newHTML);

    //Load local storage --- best times
    for (var i = 0; i < benchmarks.length; i++) {
        if (localStorage.getItem("best_" + benchmarks[i])) {
            $("#" + benchmarks[i] + " .best").html(localStorage.getItem("best_" + benchmarks[i]));
        }
    }
    //Style the table
    $("table").css({
        "margin": "8px",
        "padding": "8px"
    });
    //Centering
    $("div#benchmarker h3").css("text-align", "center");
    $("div#benchmarker span").css({
        "text-align": "center",
        "display": "inline-block"
    });
    //Cells
    $("td,th").css({
        "padding": "5px",
        "text-align": "left"
    });
    //Margins
    //$("div#benchmarker span").css({"margin":"0px","padding":"0px"});
    $("div#benchmarker h3").css({
        "margin-top": "4px"
    });
}
function count() { //Occurs every second
	if (showt&&in_game){
    $("div#benchmarker span").html("Time Elapsed: " + mToMs(Date.now() - stats.birthday));
}}
function mToMs(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
function snp(y) { //Turns XX:XX to XXXX
    return y.replace(/[^0-9]+/g, '');
}
function logBenchmark(benchmark, time) {
    //Manuallly record benchmark.
    if ($("#" + benchmark + " .time").html() == "-----") { //Checks if the benchmark time is recorded yet
        console.log("Benchmark set: " + benchmark + " at " + time);
        $("#" + benchmark + " .time").html(time); //Record time
        if (($("#" + benchmark + " .best").html() == "-----") || (snp(time) < snp(localStorage.getItem('best_' + benchmark)))) { //Checks if best time is beaten or undefined
            console.log("Best time set: " + benchmark + " at " + time);
            $("#" + benchmark + " .best").html(time); //Record time
            localStorage.setItem("best_" + benchmark, time); //Save to local storage
        }
    }
}
function deleteScores() {
    var prompt = confirm("Are you sure you want to delete your best times?");
    if (prompt == true) {
        for (var i = 0; i < benchmarks.length; i++) {
            localStorage.removeItem("best_" + benchmarks[i]);
            $("#" + benchmarks[i] + " .best").html("-----");
        }
    }
}
function benchcheck(mass) {
    mass = Math.floor(mass / 100);
    for (var i = 0; i < mass_benchmarks.length; i++) {
        if ((massPrev < mass_benchmarks[i]) && (mass >= mass_benchmarks[i])) {
            //Check if mass has passed from below benchmark to above benchmark
            logBenchmark(mass_benchmarks[i] + "mass", mToMs(Date.now() - stats.birthday));
        }
    }
}




window.openServerbrowser=function() {
	$('#serverBrowser').fadeIn();
	$("#serverRegion").text(jQuery('#region').val())
}

window.closeServerbrowser=function() {
	$('#serverBrowser').fadeOut();
}

var st = document.createElement("style");
st.innerHTML = ".overlay{line-height:1.2;margin:0;font-family:sans-serif;text-align:center;position:absolute;top:0;left:0;width:100%;height:100%;z-index:1000;background-color:rgba(0,0,0,0.2)}.popupbox{position:absolute;height:100%;width:60%;left:20%;background-color:rgba(255,255,255,0.95);box-shadow:0 0 20px #000}.popheader{position:absolute;top:0;width:100%;height:50px;background-color:rgba(200,200,200,0.5)}.browserfilter{position:absolute;padding:5px;top:50px;width:100%;height:60px;background-color:rgba(200,200,200,0.5)}.scrollable{position:absolute;border-top:#eee 1px solid;border-bottom:#eee 1px solid;width:100%;top:50px;bottom:50px;overflow:auto}.popupbuttons{background-color:rgba(200,200,200,0.4);height:50px;position:absolute;bottom:0;width:100%}.popupbox td,th{padding:5px}.popupbox tbody tr{border-top:#ccc solid 1px}#tooltip{display:inline;position:relative}#tooltip:hover:after{background:#333;background:rgba(0,0,0,.8);border-radius:5px;bottom:26px;color:#fff;content:attr(title);left:20%;padding:5px 15px;position:absolute;z-index:98;width:220px}#chat{z-index:2000;width:500px;position:absolute;right:15px;bottom:50px}#chatinput{bottom:0;position:absolute;opacity:.8}#chatlines a{color:#086A87}#chatlines{position:absolute;bottom:40px;width:500px;color:#333;word-wrap:break-word;box-shadow:0 0 10px #111;background-color:rgba(0,0,0,0.1);border-radius:5px;padding:5px;height:200px;overflow:auto}.listing>span{display:block;font-size:11px;font-weight:400;color:#999}.list{padding:0 0;list-style:none;display:block;font:12px/20px 'Lucida Grande',Verdana,sans-serif}.listing{border-bottom:1px solid #e8e8e8;display:block;padding:10px 12px;font-weight:700;color:#555;text-decoration:none;cursor:pointer;line-height:18px}li:last-child > .listing{border-radius:0 0 3px 3px}.listing:hover{background:#e5e5e5}";
document.head.appendChild(st);

jQuery(document).ready(function() {
	// CODE
	jQuery('body').append('<div id="serverBrowser" class="overlay" style="display:none"><div class="valign">\
	<div class="popupbox"><div class="popheader"><h3>Agariomods Ogar Server Browser</h3></div>\
	<div class="scrollable"><center><ol class="list"><li><a href class="listing" onclick="connect(\'ws://amsterdam.iomods.com:1501\',\'\');return false">Amsterdam #1</a></li><li><a href class="listing" onclick="connect(\'ws://amsterdam.iomods.com:1502\',\'\');return false">Amsterdam #2</a></li><li><a href class="listing" onclick="connect(\'ws://atlanta.iomods.com:1501\',\'\');return false">Atlanta #1</a></li><li><a href class="listing" onclick="connect(\'ws://atlanta.iomods.com:1502\',\'\');return false">Atlanta #2</a></li><li><a href class="listing" onclick="connect(\'ws://chicago.iomods.com:1501\',\'\');return false">Chicago #1</a></li><li><a href class="listing" onclick="connect(\'ws://chicago.iomods.com:1502\',\'\');return false">Chicago #2</a></li><li><a href class="listing" onclick="connect(\'ws://dallas.iomods.com:1501\',\'\');return false">Dallas #1</a></li><li><a href class="listing" onclick="connect(\'ws://dallas.iomods.com:1502\',\'\');return false">Dallas #2</a></li><li><a href class="listing" onclick="connect(\'ws://frankfurt.iomods.com:1501\',\'\');return false">Frankfurt #1</a></li<li><a href class="listing" onclick="connect(\'ws://frankfurt.iomods.com:1502\',\'\');return false">Frankfurt #2</a></li><li><a href class="listing" onclick="connect(\'ws://london.iomods.com:1501\',\'\');return false">London #1</a></li><li><a href class="listing" onclick="connect(\'ws://london.iomods.com:1502\',\'\');return false">London #2</a></li><li><a href class="listing" onclick="connect(\'ws://losangeles.iomods.com:1501\',\'\');return false">Los Angeles #1</a></li><li><a href class="listing" onclick="connect(\'ws://losangeles.iomods.com:1502\',\'\');return false">Los Angeles #2</a></li><li><a href class="listing" onclick="connect(\'ws://miami.iomods.com:1501\',\'\');return false">Miami #1</a></li><li><a href class="listing" onclick="connect(\'ws://miami.iomods.com:1502\',\'\');return false">Miami #2</a></li><li><a href class="listing" onclick="connect(\'ws://agar.likcoras.party:1501\',\'\');return false">Montreal #1</a></li><li><a href class="listing" onclick="connect(\'ws://agar.likcoras.party:1502\',\'\');return false">Montreal #2</a></li><li><a href class="listing" onclick="connect(\'ws://newjersey.iomods.com:1501\',\'\');return false">New Jersey #1</a></li><li><a href class="listing" onclick="connect(\'ws://newjersey.iomods.com:1502\',\'\');return false">New Jersey #2</a></li><li><a href class="listing" onclick="connect(\'ws://paris.iomods.com:1501\',\'\');return false">Paris #1</a></li><li><a href class="listing" onclick="connect(\'ws://paris.iomods.com:1502\',\'\');return false">Paris #2</a></li><li><a href class="listing" onclick="connect(\'ws://quebec.iomods.com:1501\',\'\');return false">Quebec #1</a></li><li><a href class="listing" onclick="connect(\'ws://quebec.iomods.com:1502\',\'\');return false">Quebec #2</a></li><li><a href class="listing" onclick="connect(\'ws://seattle.iomods.com:1501\',\'\');return false">Seattle #1</a></li><li><a href class="listing" onclick="connect(\'ws://seattle.iomods.com:1502\',\'\');return false">Seattle #2</a></li><li><a href class="listing" onclick="connect(\'ws://siliconvalley.iomods.com:1501\',\'\');return false">Silicone Valley #1</a></li><li><a href class="listing" onclick="connect(\'ws://siliconvalley.iomods.com:1502\',\'\');return false">Silicone Valley #2</a></li><li><a href class="listing" onclick="connect(\'ws://tokyo.iomods.com:1501\',\'\');return false">Tokyo #1</a></li><li><a href class="listing" onclick="connect(\'ws://tokyo.iomods.com:1502\',\'\');return false">Tokyo #2</a></li></ol></center></div>\
	<div class="popupbuttons"><button onclick="closeServerbrowser()" type="button" style="margin: 4px" class="btn btn-danger">Back</button>\
	</div></div></div></div>\
	');
	jQuery('#instructions').remove();
	jQuery('#settings').show();
	jQuery('#settings').prepend('<button type="button" id="opnBrowser" onclick="openServerbrowser();" style="position:relative;top:-8px;width:100%" class="btn btn-success">Agariomods Private Servers</button><br>')
umber.prototype.mod = function(n) {
    return ((this % n) + n) % n;
};

Array.prototype.peek = function() {
    return this[this.length - 1];
};

$.get('https://raw.githubusercontent.com/Apostolique/Agar.io-bot/master/bot.user.js?1', function(data) {
    var latestVersion = data.replace(/(\r\n|\n|\r)/gm,"");
    latestVersion = latestVersion.substring(latestVersion.indexOf("// @version")+11,latestVersion.indexOf("// @grant"));

    latestVersion = parseFloat(latestVersion + 0.0000);
    var myVersion = parseFloat(GM_info.script.version + 0.0000); 
	
	if(latestVersion > myVersion)
	{
		alert("Update Available for bot.user.js: V" + latestVersion + "\nGet the latest version from the GitHub page.");
        window.open('https://github.com/Apostolique/Agar.io-bot/blob/master/bot.user.js','_blank');
	}
	console.log('Current bot.user.js Version: ' + myVersion + " on Github: " + latestVersion);
});



console.log("Running Apos Bot!");
(function(f, g) {
    var splitDistance = 710;
    console.log("Apos Bot!");

    if (f.botList == null) {
        f.botList = [];
        g('#locationUnknown').append(g('<select id="bList" class="form-control" onchange="setBotIndex($(this).val());" />'));
        g('#locationUnknown').addClass('form-group');
    }

    f.botList.push(["AposBot", findDestination]);

    var bList = g('#bList');
    g('<option />', {value: (f.botList.length - 1), text: "AposBot"}).appendTo(bList);

    //Given an angle value that was gotten from valueAndleBased(),
    //returns a new value that scales it appropriately.
    function paraAngleValue(angleValue, range) {
        return (15 / (range[1])) * (angleValue * angleValue) - (range[1] / 6);
    }

    function valueAngleBased(angle, range) {
        var leftValue = (angle - range[0]).mod(360);
        var rightValue = (rangeToAngle(range) - angle).mod(360);

        var bestValue = Math.min(leftValue, rightValue);

        if (bestValue <= range[1]) {
            return paraAngleValue(bestValue, range);
        }
        var banana = -1;
        return banana;

    }

    function computeDistance(x1, y1, x2, y2) {
        var xdis = x1 - x2; // <--- FAKE AmS OF COURSE!
        var ydis = y1 - y2;
        var distance = Math.sqrt(xdis * xdis + ydis * ydis);

        return distance;
    }

    function computerDistanceFromCircleEdge(x1, y1, x2, y2, s2) {
        var tempD = computeDistance(x2, y2, x1, y1);

        var offsetX = 0;
        var offsetY = 0;

        var ratioX = tempD / (x2 - x1);
        var ratioY = tempD / (y2 - y1);

        offsetX = x2 - (s2 / ratioX);
        offsetY = y2 - (s2 / ratioY);

        return computeDistance(x1, y1, offsetX, offsetY);
    }

    function getListBasedOnFunction(booleanFunction, listToUse) {
        var dotList = [];
        var interNodes = getMemoryCells();
        Object.keys(listToUse).forEach(function(element, index) {
            if (booleanFunction(element)) {
                dotList.push(interNodes[element]);
            }
        });

        return dotList;
    }


    function compareSize(player1, player2, ratio) {
        if (player1.size * player1.size * ratio < player2.size * player2.size) {
            return true;
        }
        return false;
    }

    function canSplit(player1, player2) {
        return compareSize(player1, player2, 2.30) && !compareSize(player1, player2, 9);
    }

    function processEverything(listToUse) {
        Object.keys(listToUse).forEach(function(element, index) {
            computeAngleRanges(listToUse[element], getPlayer()[0]);
        });
    }

    function getAll() {
        var dotList = [];
        var player = getPlayer();
        var interNodes = getMemoryCells();

        dotList = getListBasedOnFunction(function(element) {
            var isMe = false;

            for (var i = 0; i < player.length; i++) {
                if (interNodes[element].id == player[i].id) {
                    isMe = true;
                    break;
                }
            }

            if (!isMe) {
                return true;
            }
            return false;
        }, interNodes);

        return dotList;
    }

    function getAllViruses(blob) {
        var dotList = [];
        var player = getPlayer();
        var interNodes = getMemoryCells();

        dotList = getListBasedOnFunction(function(element) {
            var isMe = false;

            for (var i = 0; i < player.length; i++) {
                if (interNodes[element].id == player[i].id) {
                    isMe = true;
                    break;
                }
            }

            if (!isMe && interNodes[element].d && compareSize(interNodes[element], blob, 1.30)) {
                return true;
            }
            return false;
        }, interNodes);

        return dotList;
    }

    function getAllThreats(blob) {
        var dotList = [];
        var player = getPlayer();
        var interNodes = getMemoryCells();

        dotList = getListBasedOnFunction(function(element) {
            var isMe = false;

            for (var i = 0; i < player.length; i++) {
                if (interNodes[element].id == player[i].id) {
                    isMe = true;
                    break;
                }
            }

            if (!isMe && (!interNodes[element].d && compareSize(blob, interNodes[element], 1.30))) {
                return true;
            }
            return false;
        }, interNodes);

        return dotList;
    }

    function getAllFood(blob) {
        var elementList = [];
        var dotList = [];
        var player = getPlayer();
        var interNodes = getMemoryCells();

        elementList = getListBasedOnFunction(function(element) {
            var isMe = false;

            for (var i = 0; i < player.length; i++) {
                if (interNodes[element].id == player[i].id) {
                    isMe = true;
                    break;
                }
            }

            if (!isMe && !interNodes[element].d && compareSize(interNodes[element], blob, 1.30) || (interNodes[element].size <= 11)) {
                return true;
            } else {
                return false;
            }
        }, interNodes);

        for (var i = 0; i < elementList.length; i++) {
            dotList.push([elementList[i].x, elementList[i].y, elementList[i].size]);
        }

        return dotList;
    }

    function clusterFood(foodList, blobSize) {
        var clusters = [];
        var addedCluster = false;

        //1: x
        //2: y
        //3: size or value
        //4: Angle, not set here.

        for (var i = 0; i < foodList.length; i++) {
            for (var j = 0; j < clusters.length; j++) {
                if (computeDistance(foodList[i][0], foodList[i][1], clusters[j][0], clusters[j][1]) < blobSize * 1.5) {
                    clusters[j][0] = (foodList[i][0] + clusters[j][0]) / 2;
                    clusters[j][1] = (foodList[i][1] + clusters[j][1]) / 2;
                    clusters[j][2] += foodList[i][2];
                    addedCluster = true;
                    break;
                }
            }
            if (!addedCluster) {
                clusters.push([foodList[i][0], foodList[i][1], foodList[i][2], 0]);
            }
            addedCluster = false;
        }
        return clusters;
    }

    function getAngle(x1, y1, x2, y2) {
        //Handle vertical and horizontal lines.

        if (x1 == x2) {
            if (y1 < y2) {
                return 271;
                //return 89;
            } else {
                return 89;
            }
        }

        return (Math.round(Math.atan2(-(y1 - y2), -(x1 - x2)) / Math.PI * 180 + 180));
    }

    function slope(x1, y1, x2, y2) {
        var m = (y1 - y2) / (x1 - x2);

        return m;
    }

    function slopeFromAngle(degree) {
        if (degree == 270) {
            degree = 271;
        } else if (degree == 90) {
            degree = 91;
        }
        return Math.tan((degree - 180) / 180 * Math.PI);
    }

    //Given two points on a line, finds the slope of a perpendicular line crossing it.
    function inverseSlope(x1, y1, x2, y2) {
        var m = slope(x1, y1, x2, y2);
        return (-1) / m;
    }

    //Given a slope and an offset, returns two points on that line.
    function pointsOnLine(slope, useX, useY, distance) {
        var b = useY - slope * useX;
        var r = Math.sqrt(1 + slope * slope);

        var newX1 = (useX + (distance / r));
        var newY1 = (useY + ((distance * slope) / r));
        var newX2 = (useX + ((-distance) / r));
        var newY2 = (useY + (((-distance) * slope) / r));

        return [
            [newX1, newY1],
            [newX2, newY2]
        ];
    }

    function followAngle(angle, useX, useY, distance) {
        var slope = slopeFromAngle(angle);
        var coords = pointsOnLine(slope, useX, useY, distance);

        var side = (angle - 90).mod(360);
        if (side < 180) {
            return coords[1];
        } else {
            return coords[0];
        }
    }

    //Using a line formed from point a to b, tells if point c is on S side of that line.
    function isSideLine(a, b, c) {
        if ((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]) > 0) {
            return true;
        }
        return false;
    }

    //angle range2 is within angle range2
    //an Angle is a point and a distance between an other point [5, 40]
    function angleRangeIsWithin(range1, range2) {
        if (range2[0] == (range2[0] + range2[1]).mod(360)) {
            return true;
        }
        //console.log("r1: " + range1[0] + ", " + range1[1] + " ... r2: " + range2[0] + ", " + range2[1]);

        var distanceFrom0 = (range1[0] - range2[0]).mod(360);
        var distanceFrom1 = (range1[1] - range2[0]).mod(360);

        if (distanceFrom0 < range2[1] && distanceFrom1 < range2[1] && distanceFrom0 < distanceFrom1) {
            return true;
        }
        return false;
    }

    function angleRangeIsWithinInverted(range1, range2) {
        var distanceFrom0 = (range1[0] - range2[0]).mod(360);
        var distanceFrom1 = (range1[1] - range2[0]).mod(360);

        if (distanceFrom0 < range2[1] && distanceFrom1 < range2[1] && distanceFrom0 > distanceFrom1) {
            return true;
        }
        return false;
    }

    function angleIsWithin(angle, range) {
        var diff = (rangeToAngle(range) - angle).mod(360);
        if (diff >= 0 && diff <= range[1]) {
            return true;
        }
        return false;
    }

    function rangeToAngle(range) {
        return (range[0] + range[1]).mod(360);
    }

    function anglePair(range) {
        return (range[0] + ", " + rangeToAngle(range) + " range: " + range[1]);
    }

    function computeAngleRanges(blob1, blob2) {
        var mainAngle = getAngle(blob1.x, blob1.y, blob2.x, blob2.y);
        var leftAngle = (mainAngle - 90).mod(360);
        var rightAngle = (mainAngle + 90).mod(360);

        var blob1Left = followAngle(leftAngle, blob1.x, blob1.y, blob1.size);
        var blob1Right = followAngle(rightAngle, blob1.x, blob1.y, blob1.size);

        var blob2Left = followAngle(rightAngle, blob2.x, blob2.y, blob2.size);
        var blob2Right = followAngle(leftAngle, blob2.x, blob2.y, blob2.size);

        var blob1AngleLeft = getAngle(blob2.x, blob2.y, blob1Left[0], blob1Left[1]);
        var blob1AngleRight = getAngle(blob2.x, blob2.y, blob1Right[0], blob1Right[1]);

        var blob2AngleLeft = getAngle(blob1.x, blob1.y, blob2Left[0], blob2Left[1]);
        var blob2AngleRight = getAngle(blob1.x, blob1.y, blob2Right[0], blob2Right[1]);

        var blob1Range = (blob1AngleRight - blob1AngleLeft).mod(360);
        var blob2Range = (blob2AngleRight - blob2AngleLeft).mod(360);

        var tempLine = followAngle(blob2AngleLeft, blob2Left[0], blob2Left[1], 400);
        //drawLine(blob2Left[0], blob2Left[1], tempLine[0], tempLine[1], 0);

        if ((blob1Range / blob2Range) > 1) {
            drawPoint(blob1Left[0], blob1Left[1], 3, "");
            drawPoint(blob1Right[0], blob1Right[1], 3, "");
            drawPoint(blob1.x, blob1.y, 3, "" + blob1Range + ", " + blob2Range + " R: " + (Math.round((blob1Range / blob2Range) * 1000) / 1000));
        }

        //drawPoint(blob2.x, blob2.y, 3, "" + blob1Range);
    }

    function debugAngle(angle, text) {
        var player = getPlayer();
        var line1 = followAngle(angle, player[0].x, player[0].y, 300);
        drawLine(player[0].x, player[0].y, line1[0], line1[1], 5);
        drawPoint(line1[0], line1[1], 5, "" + text);
    }

    function getEdgeLinesFromPoint(blob1, blob2) {
        // find tangents
        // 
        // TODO: DON'T FORGET TO HANDLE IF BLOB1'S CENTER POINT IS INSIDE BLOB2!!!
        var px = blob1.x;
        var py = blob1.y;

        var cx = blob2.x;
        var cy = blob2.y;

        var radius = blob2.size;

        if (blob2.d) {
            radius = blob1.size;
        } else if(canSplit(blob1, blob2)) {
            radius += splitDistance;
        } else {
            radius += blob1.size * 2;
        }

        var shouldInvert = false;

        if (computeDistance(px, py, cx, cy) <= radius) {
            radius = computeDistance(px, py, cx, cy) - 5;
            shouldInvert = true;
        }

        var dx = cx - px;
        var dy = cy - py;
        var dd = Math.sqrt(dx * dx + dy * dy);
        var a = Math.asin(radius / dd);
        var b = Math.atan2(dy, dx);

        var t = b - a;
        var ta = {
            x: radius * Math.sin(t),
            y: radius * -Math.cos(t)
        };

        t = b + a;
        var tb = {
            x: radius * -Math.sin(t),
            y: radius * Math.cos(t)
        };

        var angleLeft = getAngle(cx + ta.x, cy + ta.y, px, py);
        var angleRight = getAngle(cx + tb.x, cy + tb.y, px, py);
        var angleDistance = (angleRight - angleLeft).mod(360);

        if (shouldInvert) {
            var temp = angleLeft;
            angleLeft = (angleRight + 180).mod(360);
            angleRight = (temp + 180).mod(360);
            angleDistance = (angleRight - angleLeft).mod(360);
        }

        return [angleLeft, angleDistance, [cx + tb.x, cy + tb.y],
            [cx + ta.x, cy + ta.y]
        ];
    }

    function invertAngle(range) {
        var angle1 = rangeToAngle(badAngles[i]);
        var angle2 = (badAngles[i][0] - angle1).mod(360);
        return [angle1, angle2];
    }

    function addWall(listToUse, blob) {
        if (blob.x < f.getMapStartX() + 1000) {
            //LEFT
            //console.log("Left");

            listToUse.push([[135, true], [225, false]]);

            var lineLeft = followAngle(135, blob.x, blob.y, 190 + blob.size);
            var lineRight = followAngle(225, blob.x, blob.y, 190 + blob.size);
            drawLine(blob.x, blob.y, lineLeft[0], lineLeft[1], 5);
            drawLine(blob.x, blob.y, lineRight[0], lineRight[1], 5);
            drawArc(lineLeft[0], lineLeft[1], lineRight[0], lineRight[1], blob.x, blob.y, 5);
        }
        if (blob.y < f.getMapStartY() + 1000) {
            //TOP
            //console.log("TOP");
            
            listToUse.push([[225, true], [315, false]]);

            var lineLeft = followAngle(225, blob.x, blob.y, 190 + blob.size);
            var lineRight = followAngle(315, blob.x, blob.y, 190 + blob.size);
            drawLine(blob.x, blob.y, lineLeft[0], lineLeft[1], 5);
            drawLine(blob.x, blob.y, lineRight[0], lineRight[1], 5);
            drawArc(lineLeft[0], lineLeft[1], lineRight[0], lineRight[1], blob.x, blob.y, 5);
        }
        if (blob.x > f.getMapEndX() - 1000) {
            //RIGHT
            //console.log("RIGHT");

            listToUse.push([[315, true], [45, false]]);
            
            var lineLeft = followAngle(315, blob.x, blob.y, 190 + blob.size);
            var lineRight = followAngle(45, blob.x, blob.y, 190 + blob.size);
            drawLine(blob.x, blob.y, lineLeft[0], lineLeft[1], 5);
            drawLine(blob.x, blob.y, lineRight[0], lineRight[1], 5);
            drawArc(lineLeft[0], lineLeft[1], lineRight[0], lineRight[1], blob.x, blob.y, 5);
        }
        if (blob.y > f.getMapEndY() - 1000) {
            //BOTTOM
            //console.log("BOTTOM");

            listToUse.push([[45, true], [135, false]]);
            
            var lineLeft = followAngle(45, blob.x, blob.y, 190 + blob.size);
            var lineRight = followAngle(135, blob.x, blob.y, 190 + blob.size);
            drawLine(blob.x, blob.y, lineLeft[0], lineLeft[1], 5);
            drawLine(blob.x, blob.y, lineRight[0], lineRight[1], 5);
            drawArc(lineLeft[0], lineLeft[1], lineRight[0], lineRight[1], blob.x, blob.y, 5);
        }

        return listToUse;
    }

    //listToUse contains angles in the form of [angle, boolean].
    //boolean is true when the range is starting. False when it's ending.
    //range = [[angle1, true], [angle2, false]]
    
    function getAngleIndex(listToUse, angle) {
        if (listToUse.length == 0) {
            return 0;
        }

        for (var i = 0; i < listToUse.length; i++) {
            if (angle <= listToUse[i][0]) {
                return i;
            }
        }

        return listToUse.length;
    }
    
    function addAngle(listToUse, range) {
        //#1 Find first open element
        //#2 Try to add range1 to the list. If it is within other range, don't add it, set a boolean.
        //#3 Try to add range2 to the list. If it is withing other range, don't add it, set a boolean.

        //TODO: Only add the new range at the end after the right stuff has been removed.

        var startIndex = 1;

        if (listToUse.length > 0 && !listToUse[0][1]) {
            startIndex = 0;
        }

        var startMark = getAngleIndex(listToUse, range[0][0]);
        var startBool = startMark.mod(2) != startIndex;

        var endMark = getAngleIndex(listToUse, range[1][0]);
        var endBool = endMark.mod(2) != startIndex;

        var removeList = [];

        if (startMark != endMark) {
            //Note: If there is still an error, this would be it.
            var biggerList = 0;
            if (endMark == listToUse.length) {
                biggerList = 1;
            }

            for (var i = startMark; i < startMark + (endMark - startMark).mod(listToUse.length + biggerList); i++) {
                removeList.push((i).mod(listToUse.length));
            }
        } else if (startMark < listToUse.length && endMark < listToUse.length) {
            var startDist = (listToUse[startMark][0] - range[0][0]).mod(360);
            var endDist = (listToUse[endMark][0] - range[1][0]).mod(360);

            if (startDist < endDist) {
                for (var i = 0; i < listToUse.length; i++) {
                    removeList.push(i);
                }
            }
        }

        removeList.sort(function(a, b){return b-a});

        for (var i = 0; i < removeList.length; i++) {
            listToUse.splice(removeList[i], 1);
        }

        if (startBool) {
            listToUse.splice(getAngleIndex(listToUse, range[0][0]), 0, range[0]);
        }
        if (endBool) {
            listToUse.splice(getAngleIndex(listToUse, range[1][0]), 0, range[1]);
        }

        return listToUse;
    }

    function getAngleRange(blob1, blob2, index) {
        var angleStuff = getEdgeLinesFromPoint(blob1, blob2);

        var leftAngle = angleStuff[0];
        var rightAngle = rangeToAngle(angleStuff);
        var difference = angleStuff[1];

        drawPoint(angleStuff[2][0], angleStuff[2][1], 3, "");
        drawPoint(angleStuff[3][0], angleStuff[3][1], 3, "");

        //console.log("Adding badAngles: " + leftAngle + ", " + rightAngle + " diff: " + difference);

        var lineLeft = followAngle(leftAngle, blob1.x, blob1.y, 150 + blob1.size - index * 10);
        var lineRight = followAngle(rightAngle, blob1.x, blob1.y, 150 + blob1.size - index * 10);

        if (blob2.d) {
            drawLine(blob1.x, blob1.y, lineLeft[0], lineLeft[1], 6);
            drawLine(blob1.x, blob1.y, lineRight[0], lineRight[1], 6);
            drawArc(lineLeft[0], lineLeft[1], lineRight[0], lineRight[1], blob1.x, blob1.y, 6);
        } else if(getCells().hasOwnProperty(blob2.id)) {
            drawLine(blob1.x, blob1.y, lineLeft[0], lineLeft[1], 0);
            drawLine(blob1.x, blob1.y, lineRight[0], lineRight[1], 0);
            drawArc(lineLeft[0], lineLeft[1], lineRight[0], lineRight[1], blob1.x, blob1.y, 0);
        } else {
            drawLine(blob1.x, blob1.y, lineLeft[0], lineLeft[1], 3);
            drawLine(blob1.x, blob1.y, lineRight[0], lineRight[1], 3);
            drawArc(lineLeft[0], lineLeft[1], lineRight[0], lineRight[1], blob1.x, blob1.y, 3);
        }

        return [leftAngle, difference];
    }

    //Given a list of conditions, shift the angle to the closest available spot respecting the range given.
    function shiftAngle(listToUse, angle, range) {
        //TODO: shiftAngle needs to respect the range!
        for (var i = 0; i < listToUse.length; i++) {
            if (angleIsWithin(angle, listToUse[i])) {
                //console.log("Shifting needed!");

                var angle1 = listToUse[i][0];
                var angle2 = rangeToAngle(listToUse[i]);

                var dist1 = (angle - angle1).mod(360);
                var dist2 = (angle2 - angle).mod(360);

                if (dist1 < dist2) {
                    return angle1;
                } else {
                    return angle2;
                }
            }
        }
        //console.log("No Shifting Was needed!");
        return angle;
    }

    function findDestination(followMouse) {
        var player = getPlayer();
        var interNodes = getMemoryCells();

        if ( /*!toggle*/ 1) {
            var useMouseX = (getMouseX() - getWidth() / 2 + getX() * getRatio()) / getRatio();
            var useMouseY = (getMouseY() - getHeight() / 2 + getY() * getRatio()) / getRatio();
            tempPoint = [useMouseX, useMouseY, 1];

            var tempMoveX = getPointX();
            var tempMoveY = getPointY();

            if (player.length > 0) {

                for (var k = 0; k < player.length; k++) {

                    //console.log("Working on blob: " + k);

                    drawCircle(player[k].x, player[k].y, player[k].size + splitDistance, 5);
                    //drawPoint(player[0].x, player[0].y - player[0].size, 3, "" + Math.floor(player[0].x) + ", " + Math.floor(player[0].y));

                    //var allDots = processEverything(interNodes);

                    var allPossibleFood = null;
                    allPossibleFood = getAllFood(player[k]); // #1

                    var allPossibleThreats = getAllThreats(player[k]);
                    //console.log("Internodes: " + interNodes.length + " Food: " + allPossibleFood.length + " Threats: " + allPossibleThreats.length);
                    var allPossibleViruses = getAllViruses(player[k]);

                    var badAngles = [];

                    var isSafeSpot = true;
                    var isMouseSafe = true;

                    var clusterAllFood = clusterFood(allPossibleFood, player[k].size);

                    //console.log("Looking for enemies!");

                    for (var i = 0; i < allPossibleThreats.length; i++) {

                        var enemyDistance = computeDistance(allPossibleThreats[i].x, allPossibleThreats[i].y, player[k].x, player[k].y);

                        //console.log("Found distance.");
                        
                        for (var j = clusterAllFood.length - 1; j >= 0 ; j--) {
                            var secureDistance = (canSplit(player[k], allPossibleThreats[i]) ? splitDistance : player[k].size*2) + allPossibleThreats[i].size;
                            if (computeDistance(allPossibleThreats[i].x, allPossibleThreats[i].y, clusterAllFood[j][0], clusterAllFood[j][1]) < secureDistance)
                                clusterAllFood.splice(j, 1);
                        }

                        //console.log("Removed some food.");

                        if (canSplit(player[k], allPossibleThreats[i])) {
                            drawCircle(allPossibleThreats[i].x, allPossibleThreats[i].y, allPossibleThreats[i].size + splitDistance, 0);
                        } else {
                            drawCircle(allPossibleThreats[i].x, allPossibleThreats[i].y, allPossibleThreats[i].size + player[k].size + player[k].size, 3);
                        }

                        if (allPossibleThreats[i].danger && f.getLastUpdate() - allPossibleThreats[i].dangerTimeOut > 1000) {

                            allPossibleThreats[i].danger = false;
                        }

                        if ((canSplit(player[k], allPossibleThreats[i]) && enemyDistance < allPossibleThreats[i].size + splitDistance + player[k].size) || (!canSplit(player[k], allPossibleThreats[i]) && enemyDistance < allPossibleThreats[i].size + player[k].size + player[k].size)) {

                            allPossibleThreats[i].danger = true;
                            allPossibleThreats[i].dangerTimeOut = f.getLastUpdate();
                        }

                        //console.log("Figured out who was important.");

                        if ((canSplit(player[k], allPossibleThreats[i]) && enemyDistance < allPossibleThreats[i].size + splitDistance + player[k].size) || (!canSplit(player[k], allPossibleThreats[i]) && enemyDistance < allPossibleThreats[i].size + player[k].size) || allPossibleThreats[i].danger) {

                            badAngles.push(getAngleRange(player[k], allPossibleThreats[i], i));

                            //drawPoint(lineLeft[0], lineLeft[1], 0, "Left 0 - " + i);
                            //drawPoint(lineRight[0], lineRight[1], 0, "Right 1 - " + i);
                        }
                        //console.log("Done with enemy: " + i);
                    }

                    //console.log("Done looking for enemies!");

                    var goodAngles = [];
                    var stupidList = [];

                    var obstacleList = [];

                    for (var i = 0; i < allPossibleViruses.length; i++) {
                        var tempOb = getAngleRange(player[k], allPossibleViruses[i], i);
                        var angle1 = tempOb[0];
                        var angle2 = rangeToAngle(tempOb);
                        drawCircle(allPossibleViruses[i].x, allPossibleViruses[i].y, player[k].size, 6);
                        obstacleList.push([[angle1, true], [angle2, false]]);
                    }

                    if (badAngles.length > 0) {
                        //NOTE: This is only bandaid wall code. It's not the best way to do it.
                        stupidList = addWall(stupidList, player[k]);
                    }

                    for (var i = 0; i < badAngles.length; i++) {
                        var angle1 = badAngles[i][0];
                        var angle2 = rangeToAngle(badAngles[i]);
                        stupidList.push([[angle1, true], [angle2, false]]);
                    }

                    //stupidList.push([[45, true], [135, false]]);
                    //stupidList.push([[10, true], [200, false]]);

                    //console.log("Added random noob stuff.");

                    var sortedInterList = [];
                    var sortedObList = [];

                    for (var i = 0; i < stupidList.length; i++) {
                        //console.log("Adding to sorted: " + stupidList[i][0][0] + ", " + stupidList[i][1][0]);
                        sortedInterList = addAngle(sortedInterList, stupidList[i]);

                        if (sortedInterList.length == 0) {
                            break;
                        }
                    }

                    for (var i = 0; i < obstacleList.length; i++) {
                        sortedObList = addAngle(sortedObList, obstacleList[i]);

                        if (sortedObList.length == 0) {
                            break;
                        }
                    }

                    var offsetI = 0;
                    var obOffsetI = 1;

                    if (sortedInterList.length > 0 && sortedInterList[0][1]) {
                        offsetI = 1;
                    }
                    if (sortedObList.length > 0 && sortedObList[0][1]) {
                        obOffsetI = 0;
                    }

                    var goodAngles = [];
                    var obstacleAngles = [];

                    for (var i = 0; i < sortedInterList.length; i += 2) {
                        var angle1 = sortedInterList[(i + offsetI).mod(sortedInterList.length)][0];
                        var angle2 = sortedInterList[(i + 1 + offsetI).mod(sortedInterList.length)][0];
                        var diff = (angle2 - angle1).mod(360);
                        goodAngles.push([angle1, diff]);
                    }

                    for (var i = 0; i < sortedObList.length; i += 2) {
                        var angle1 = sortedObList[(i + obOffsetI).mod(sortedObList.length)][0];
                        var angle2 = sortedObList[(i + 1 + obOffsetI).mod(sortedObList.length)][0];
                        var diff = (angle2 - angle1).mod(360);
                        obstacleAngles.push([angle1, diff]);
                    }

                    for (var i = 0; i < goodAngles.length; i++) {
                        var line1 = followAngle(goodAngles[i][0], player[k].x, player[k].y, 100 + player[k].size);
                        var line2 = followAngle((goodAngles[i][0] + goodAngles[i][1]).mod(360), player[k].x, player[k].y, 100 + player[k].size);
                        drawLine(player[k].x, player[k].y, line1[0], line1[1], 1);
                        drawLine(player[k].x, player[k].y, line2[0], line2[1], 1);

                        drawArc(line1[0], line1[1], line2[0], line2[1], player[k].x, player[k].y, 1);

                        //drawPoint(player[0].x, player[0].y, 2, "");

                        drawPoint(line1[0], line1[1], 0, "" + i + ": 0");
                        drawPoint(line2[0], line2[1], 0, "" + i + ": 1");
                    }

                    for (var i = 0; i < obstacleAngles.length; i++) {
                        var line1 = followAngle(obstacleAngles[i][0], player[k].x, player[k].y, 50 + player[k].size);
                        var line2 = followAngle((obstacleAngles[i][0] + obstacleAngles[i][1]).mod(360), player[k].x, player[k].y, 50 + player[k].size);
                        drawLine(player[k].x, player[k].y, line1[0], line1[1], 6);
                        drawLine(player[k].x, player[k].y, line2[0], line2[1], 6);

                        drawArc(line1[0], line1[1], line2[0], line2[1], player[k].x, player[k].y, 6);

                        //drawPoint(player[0].x, player[0].y, 2, "");

                        drawPoint(line1[0], line1[1], 0, "" + i + ": 0");
                        drawPoint(line2[0], line2[1], 0, "" + i + ": 1");
                    }

                    if (goodAngles.length > 0) {
                        var bIndex = goodAngles[0];
                        var biggest = goodAngles[0][1];
                        for (var i = 1; i < goodAngles.length; i++) {
                            var size = goodAngles[i][1];
                            if (size > biggest) {
                                biggest = size;
                                bIndex = goodAngles[i];
                            }
                        }
                        var perfectAngle = (bIndex[0] + bIndex[1] / 2).mod(360);

                        perfectAngle = shiftAngle(obstacleAngles, perfectAngle, bIndex);

                        var line1 = followAngle(perfectAngle, player[k].x, player[k].y, 300);

                        drawLine(player[k].x, player[k].y, line1[0], line1[1], 7);
                        tempMoveX = line1[0];
                        tempMoveY = line1[1];
                    } else if (badAngles.length > 0 && goodAngles == 0) {
                        //TODO: CODE TO HANDLE WHEN THERE IS NO GOOD ANGLE BUT THERE ARE ENEMIES AROUND!!!!!!!!!!!!!
                    } else if (clusterAllFood.length > 0) {
                        for (var i = 0; i < clusterAllFood.length; i++) {
                            //console.log("mefore: " + clusterAllFood[i][2]);
                            //This is the cost function. Higher is better.

                                var clusterAngle = getAngle(clusterAllFood[i][0], clusterAllFood[i][1], player[k].x, player[k].y);

                                clusterAllFood[i][2] = clusterAllFood[i][2] * 6 - computeDistance(clusterAllFood[i][0], clusterAllFood[i][1], player[k].x, player[k].y);
                                //console.log("Current Value: " + clusterAllFood[i][2]);

                                //(goodAngles[bIndex][1] / 2 - (Math.abs(perfectAngle - clusterAngle)));

                                clusterAllFood[i][3] = clusterAngle;

                                drawPoint(clusterAllFood[i][0], clusterAllFood[i][1], 1, "");
                                //console.log("After: " + clusterAllFood[i][2]);
                        }

                        var bestFoodI = 0;
                        var bestFood = clusterAllFood[0][2];
                        for (var i = 1; i < clusterAllFood.length; i++) {
                            if (bestFood < clusterAllFood[i][2]) {
                                bestFood = clusterAllFood[i][2];
                                bestFoodI = i;
                            }
                        }

                        //console.log("Best Value: " + clusterAllFood[bestFoodI][2]);

                        var distance = computeDistance(player[k].x, player[k].y, clusterAllFood[bestFoodI][0], clusterAllFood[bestFoodI][1]);

                        var shiftedAngle = shiftAngle(obstacleAngles, getAngle(clusterAllFood[bestFoodI][0], clusterAllFood[bestFoodI][1], player[k].x, player[k].y), [0, 360]);

                        var destination = followAngle(shiftedAngle, player[k].x, player[k].y, distance);

                        tempMoveX = destination[0];
                        tempMoveY = destination[1];
                        drawLine(player[k].x, player[k].y, tempMoveX, tempMoveY, 1);
                    } else {
                        //If there are no enemies around and no food to eat.
                    }

                    drawPoint(tempPoint[0], tempPoint[1], tempPoint[2], "");
                    //drawPoint(tempPoint[0], tempPoint[1], tempPoint[2], "" + Math.floor(computeDistance(tempPoint[0], tempPoint[1], I, J)));
                    //drawLine(tempPoint[0], tempPoint[1], player[0].x, player[0].y, 6);
                    //console.log("Slope: " + slope(tempPoint[0], tempPoint[1], player[0].x, player[0].y) + " Angle: " + getAngle(tempPoint[0], tempPoint[1], player[0].x, player[0].y) + " Side: " + (getAngle(tempPoint[0], tempPoint[1], player[0].x, player[0].y) - 90).mod(360));
                    tempPoint[2] = 1;

                    //console.log("Done working on blob: " + i);
                }
            }
            //console.log("MOVING RIGHT NOW!");

            //console.log("______Never lied ever in my life.");

            return [tempMoveX, tempMoveY];
        }
    }

    function screenToGameX(x) {
        return (x - getWidth() / 2) / getRatio() + getX();
    }

    function screenToGameY(y) {
        return (y - getHeight() / 2) / getRatio() + getY();
    }

    function drawPoint(x_1, y_1, drawColor, text) {
        f.drawPoint(x_1, y_1, drawColor, text);
    }

    function drawArc(x_1, y_1, x_2, y_2, x_3, y_3, drawColor) {
        f.drawArc(x_1, y_1, x_2, y_2, x_3, y_3, drawColor);
    }

    function drawLine(x_1, y_1, x_2, y_2, drawColor) {
        f.drawLine(x_1, y_1, x_2, y_2, drawColor);
    }

    function drawCircle(x_1, y_1, radius, drawColor) {
        f.drawCircle(x_1, y_1, radius, drawColor);
    }

    function screenDistance() {
        var temp = f.getScreenDistance();
        return temp;
    }

    function getDarkBool() {
        return f.getDarkBool();
    }

    function getMassBool() {
        return f.getMassBool();
    }

    function getMemoryCells() {
        return f.getMemoryCells();
    }

    function getCellsArray() {
        return f.getCellsArray();
    }

    function getCells() {
        return f.getCells();
    }

    function getPlayer() {
        return f.getPlayer();
    }

    function getWidth() {
        return f.getWidth();
    }

    function getHeight() {
        return f.getHeight();
    }

    function getRatio() {
        return f.getRatio();
    }

    function getOffsetX() {
        return f.getOffsetX();
    }

    function getOffsetY() {
        return f.getOffsetY();
    }

    function getX() {
        return f.getX();
    }

    function getY() {
        return f.getY();
    }

    function getPointX() {
        return f.getPointX();
    }

    function getPointY() {
        return f.getPointY();
    }

    function getMouseX() {
        return f.getMouseX();
    }

    function getMouseY() {
        return f.getMouseY();
    }

    function getUpdate() {
        return f.getLastUpdate();
    }
})(window, jQuery);

    Status API Training Shop Blog About Help 


var script = document.createElement('script');
script.src = document.location.protocol+"//agariomods.com/mods.js";
(document.body || document.head || document.documentElement).appendChild(script);

/*
repo:
https://github.com/electronoob/agarmods
common website for all mods from anybody:
http://www.agariomods.com

