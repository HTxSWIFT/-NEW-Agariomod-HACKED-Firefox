package main

import(
 "path/filepath"
 "fmt"
 "strings"	
 "os"
)
var path = "i/";

func main() {
	fmt.Print(`
<html>
		<head>
			<title>AGARIOMODS - SKINS</title>
			<link rel="shortcut icon" href="//www.iconj.com/ico/o/x/oxfb9bqt6o.ico" type="image/x-icon" />
			<meta charset="utf-8">
			<link rel="stylesheet" type="text/css" href="//agariomods.com/sitestyle.css">
  			<meta name="viewport" content="width=device-width, initial-scale=1">
  			<link href='//fonts.googleapis.com/css?family=Ubuntu:700' rel='stylesheet' type='text/css'>
  			<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
  			<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
  			<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
<style>
img.skins {
	
-webkit-border-radius: 360px;
-moz-border-radius: 360px;
border-radius: 360px;
border: #00ee00 solid 5px;
}
div.skins {
text-align: center;
width: 100px;
height: 100px;
float:left;
margin: 10px;
background-color: #00ff00;
-webkit-border-radius: 360px;
-moz-border-radius: 360px;
border-radius: 360px;
box-shadow: 10px -10px rgba(0,0,0,0.6); -moz-box-shadow: 10px -10px rgba(0,0,0,0.6); -webkit-box-shadow: 10px -10px rgba(0,0,0,0.6); -o-box-shadow: 10px -10px rgba(0,0,0,0.6);
}
span.skins {
position: relative;
top: -50px;
   text-shadow:
       3px 3px 0 #000,
     -1px -1px 0 #000,  
      1px -1px 0 #000,
      -1px 1px 0 #000,
       1px 1px 0 #000;
width:20px;
}
</style>
		</head>
		<!--DIVISION MARKER: HEAD - BODY-->
		<body>
			<!--Navigation Links-->
			<nav class="navbar navbar-inverse navbar-fixed-top">
			  <div class="container-fluid navigate">
			    <div class="navbar-header">
				 <button type="button" class="navbar-toggle navbar-right btn-lg " data-toggle="collapse" data-target="#myNavbar" style="background-color: rgba(128, 128, 128, .75)">
				   <span class="icon-bar"></span>
				   <span class="icon-bar"></span>
				   <span class="icon-bar"></span>
				 </button>
				 <a class="navbar-brand" href="//agariomods.com/index.html"><img id="logo" src="//i.imgur.com/vUa6ZqF.png"></a>
			    </div>
			    <div class="collapse navbar-collapse" id="myNavbar">
				 <ul class="nav navbar-nav">
				   <li><a href="//agariomods.com/index.html">Home</a></li>
				   <li class="active"><a href="//skins.agariomods.com">Skins</a></li>
				   <li><a href="//agariomods.com/chat.html">Chatroom</a></li>
				   <li><a href="//agariomods.com/help.html">Help</a></li>
				 </ul>
			    </div>
			  </div>
			</nav>
			<main id="information">
			<div id="information">
<h1>agariomods.com skin server</h1>
<p><em>Thank you for using agariomods.</em></p>
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- skins -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-6274246726682904"
     data-ad-slot="9200688950"
     data-ad-format="auto"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>
`);
	files, _ := filepath.Glob(path + "*")
	for _,basename := range files {
		name := strings.TrimSuffix(basename, filepath.Ext(basename))
		name = strings.Replace(name, path, "", -1)
		namenbsp := strings.Replace(name, " ", "&nbsp", -1)
		if ((name != "dong") && (name != "fuckfacebook")) {
			if _, err := os.Stat("i/c/" +name+ " (Custom).png"); err == nil {
				fmt.Println("<div class=\"skins\"><img class=\"skins\" width=\"100px\" src=\"i/c/" +name+ " (Custom).png\" alt=\"" +  name+ "\"/><span class=\"skins\">",namenbsp,"</span></div>");
			} else {
				fmt.Println("<div class=\"skins\"><img class=\"skins\" width=\"100px\" src=\"i/" +name+ ".png\" alt=\"" +  name+ "\"/><span class=\"skins\">",namenbsp,"</span></div>");
			}
		}
	}

	fmt.Print(`
<div class="hidden-xs hidden-sm">
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- skins -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-6274246726682904"
     data-ad-slot="9200688950"
     data-ad-format="auto"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>
</div>
				</div>
			</main>
        </body>
</html>
`);

}
