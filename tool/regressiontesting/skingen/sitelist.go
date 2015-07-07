package main

import(
 "path/filepath"
 "fmt"
 "strings"	
)
var path = "i/";

func main() {
	fmt.Print(`
<html>
	<head>
		<head>
			<title>AGARIOMODS - SKINS - we have got you covered !</title>
			<link rel="shortcut icon" href="//www.iconj.com/ico/o/x/oxfb9bqt6o.ico" type="image/x-icon" />
			<meta charset="utf-8">
			<link rel="stylesheet" type="text/css" href="//agariomods.com/sitestyle.css">
  			<meta name="viewport" content="width=device-width, initial-scale=1">
  			<link href='//fonts.googleapis.com/css?family=Ubuntu:700' rel='stylesheet' type='text/css'>
  			<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
  			<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
  			<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
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
				 <a class="navbar-brand"><img id="logo" src="http://i.imgur.com/vUa6ZqF.png"></a>
			    </div>
			    <div class="collapse navbar-collapse" id="myNavbar">
				 <ul class="nav navbar-nav">
				   <li><a href="http://agariomods.com/index.html">Home</a></li>
				   <li><a href="http://agariomods.com/mumble.html">Mumble</a></li>
				   <li><a href="http://agariomods.com/about.html">About</a></li> 
				   <li><a href="http://agariomods.com/links.html">Links</a></li>
				   <li class="active"><a href="http://skins.agariomods.com">Skins</a></li>
                                   <li><a href="http://chat.agariomods.com">Chatroom</a></li>
                                   <li><a href="http://agariomods.com/twitch.html">Twitch</a></li>
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
			fmt.Println("<div class=\"skins\"><img width=\"20%\" src=\"i/" +name+ ".png\" alt=\"" +  name+ "\"/><span class=\"skins\">",namenbsp,"</span></div>");
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
