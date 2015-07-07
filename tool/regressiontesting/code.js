
var fs = require('fs');
var filename = 'main_out.js';
var gamejs = fs.readFileSync(filename).toString();

var W = '';
var Ja = '';
var b = '';
var c3eg2 = '';

gamejs = "window.agariomods = " + gamejs.replace("socket open","socket open (agariomods.com mod in place)");
gamejs = gamejs.replace(/\n/g, "");
offset = gamejs.search("..=\"poland;");
Ja =  gamejs.substr(offset,2);
offset = gamejs.search(".....src=\"skins");
b = gamejs.substr(offset+2,1);
offset = gamejs.search(".."+b+"..src");
W = gamejs.substr(offset,1);
offset = gamejs.search(/strokeText\(c,3,.{1,8}\);/g);
var components = /strokeText\((c,3,.{1,8})\);/.exec(gamejs);
c3eg2 = components[1];

var ourskins = "agariomods.com;albania;apple;atari;awesome;baka;bandaid;baseball;beats;bitcoin;blobfish;bobross;bobsaget;boogie2988;borg;bp;buckballs;burgundy;butters;byzantium;chechenya;chrome;cj;cokacola;controless;converse;cornella;creeper;cyprus;czechrepublic;deathstar;derp;dickbutt;doggie;domo;dong;dreamcast;ebin;egypt;eye;facebook;fastforward;fbi;fishies;freemason;friesland;frogout;fuckfacebook;getinmybelly;getinthebox;gimper;github;giygas;gnomechild;halflife3;handicapped;hap;hipsterwhale;hitler;honeycomb;hydro;iceland;illuminati;imgur;imperialjapan;instagram;isaac;isis;isreal;itchyfeetleech;jew;jimmies;kenny;kingdomoffrance;kingjoffrey;klingon;knightstemplar;knowyourmeme;kyle;lenny;libertyy;liechtenstien;love;macedonia;malta;maryland;masterball;mastercheif;mcdonalds;meatboy;megamilk;moldova;mortalkombat;mr.bean;mr.popo;nasa;nazi;nick;northbrabant;nosmoking;notch;osu;pedobear;peka;pepe;pepsi;pewdiepie;pi;pig;pinkfloyd;pinkstylist;piratebay;playstation;quantum leap;rageface;rewind;rockstar;rolfharris;serbia;shell;shrek;sinistar;slack;slovakia;slovenia;snafu;snapchat;soccer;soliare;somalia;space;spawn;spore;spy;starbucks;superman;tintin;tubbymcfatfuck;turkey;ukip;uppercase;uruguay;voyager;wewlad;white  light;wwf;wykop;ylilauta;yourmom;zoella";
	gamejs = gamejs.replace(';reddit;',';reddit;'+ourskins+';');
	gamejs = gamejs.replace(b+'=this.name.toLowerCase();', b+'=this.name.toLowerCase();var agariomods="";var ourskins = "'+ourskins+'";if(('+b+'.length >0) && (ourskins.split(";").indexOf('+b+')>-1)) {agariomods="http://skins.agariomods.com/i/"+'+b+'+".png";} else if ('+b+'.substring(0, 2) == "i/") {agariomods="http://i.imgur.com/"+this.name.substring(2)+".jpg";} else {agariomods="http://agar.io/skins/" + this.name.toLowerCase() + ".png";}');
	gamejs = gamejs.replace(W +'['+b+'].src="skins/"+'+b+'+".png"',W+'['+b+'].src=agariomods');
	gamejs = gamejs.replace("this._stroke&&b.strokeText("+c3eg2+");b.fillText("+c3eg2+")", "if (String(c).substring(0, 2) != \"i/\") {this._stroke&&b.strokeText("+c3eg2+");b.fillText("+c3eg2+")}");
	gamejs = gamejs.replace(b+"=this.name.toLowerCase();", b+"=this.name.toLowerCase(); if ("+b+".substring(0, 2) == \"i/\") {" +Ja+ "+="+b+";} ;");


/* begin unit testing */
var test = 0;
var passed = 0;

testCondition((-1 != gamejs.indexOf(';reddit;'+ourskins)), test++, "add our skinlist to the original game skinlist.");
testCondition((-1 != gamejs.indexOf('var agariomods="";var ourskins'  )), test++, "add check for which skin mode we are in. be it no skin, default skin, imgur skin, or an agariomods skin.");
testCondition((-1 != gamejs.indexOf('else if ('+b+'.substring(0, 2) == "i/") {agariomods' )),test++,"add imgur check #1");
testCondition((-1 != gamejs.indexOf( b+"=this.name.toLowerCase(); if ("+b+".substring(0, 2) == \"i/\") {" +Ja+ "+="+b+";} ;"  )), test++, "add imgur check #2.");
testCondition((-1 != gamejs.indexOf("if (String(c).substring(0, 2) != \"i/\") {this._stroke")), test++, "add imgur check for hiding username when using imgur id");


console.log ("Testing complete, "+passed+" units passed.");
function testCondition (condition, id, comment) {
	if(condition) {
		console.log("test: #"+id+" PASSED - "+ comment);
		passed++;
	} else {
		console.log("test: #"+id+" FAILED - "+ comment);
		process.exit();
	}
}
/* end unit testing */
