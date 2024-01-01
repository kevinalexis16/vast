<?php
$filelink='https://ok.ru/videoembed/'.$_GET['v'].'';
if (strpos($filelink,"ok.ru") !==false) {
  //$user_agent = player user_agent !!!!!
  if ($flash=="flash")
  $user_agent     =   $_SERVER['HTTP_USER_AGENT'];
  else {
  $user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36';
  }
  $pattern = '/(?:\/\/|\.)(ok\.ru|odnoklassniki\.ru)\/(?:videoembed|video)\/(\d+)/';
  preg_match($pattern,$filelink,$m);
  $id=$m[2];
  $l="http://www.ok.ru/dk";
  $post="cmd=videoPlayerMetadata&mid=".$id;
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $l);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_USERAGENT, $user_agent);
  curl_setopt($ch, CURLOPT_FOLLOWLOCATION  ,1);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt ($ch, CURLOPT_POST, 1);
  curl_setopt ($ch, CURLOPT_POSTFIELDS, $post);
  curl_setopt($ch, CURLOPT_REFERER,"http://www.ok.ru");
  curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
  curl_setopt($ch, CURLOPT_TIMEOUT, 15);
  $h = curl_exec($ch);
  curl_close($ch);
  $z=json_decode($h,1);

  $vids=$z["videos"];
  $c=count($vids);
  $link=$vids[$c-1]["url"];
  if ($link) {
    $t1=explode("?",$link);
    $link=$t1[0]."/ok.mp4?".$t1[1];
  }
}
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="UTF-8"/>
<title>OKRU</title>
<meta name="robots" content="noindex" />
<META NAME="GOOGLEBOT" CONTENT="NOINDEX" />
<meta name="referrer" content="never">
<meta http-equiv="X-UA-Compatible" content="IE=11" />
<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" id="viewport" name="viewport">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
<link href="https://cdn.rawgit.com/ufilestorage/a/master/skins/jw-logo-bar.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="https://cdn.rawgit.com/ufilestorage/a/master/jquery-2.2.3.min.js"></script>
<script src="https://ssl.p.jwpcdn.com/player/v/8.13.0/jwplayer.js"></script>
<script>jwplayer.key="64HPbvSQorQcd52B8XFuhMtEoitbvY/EXJmMBfKcXZQU2Rnn";</script>
<style type="text/css">body,html{margin:0;padding:0}#uplay_player{position:absolute;width:100%important!;height:100%important!;border:none;overflow:hidden;}</style>
</head>
<body>
<div id="uplay_player"></div>
<script type="text/javascript">
var videoPlayer = jwplayer("uplay_player");
videoPlayer.setup({
sources: [{'file':'<?=$link?>','type':'video/mp4'}],
width: "100%",
height: "100%",
controls: true,
displaytitle: false,
flashplayer: "https://p.jwpcdn.com/player/v/7.12.8/jwplayer.flash.swf",
fullscreen: "true",
primary: "html5",
autostart: false,
image:'<?php echo $cover; ?>',
advertising: {
                                client: "vast",
                                tag: "https://syndication.exdynsrv.com/splash.php?idzone=4802736"
                            },
tracks: [{
			file: "<?php echo $sub; ?>",
			label: "Subs",
			kind:  "captions",
			default: "true",
			}],
			captions: {
			color: "#FFFF00",
			fontSize: 14,
			edgeStyle: "uniform",
			backgroundOpacity: 0,
			},
 logo: {
			file: "",
			logoBar: "",
			position: "top-left",
			link: ""
		},
			aboutlink:"",
			abouttext:"",
sharing: {
		//code: encodeURI("<iframe width=\"640\" height=\"380\" src=\"empty-url\" frameborder=\"0\" scrolling=\"no\"></iframe>"),
	},
});
videoPlayer.on("ready",function() {
		jwLogoBar.addLogo(videoPlayer);
	});
videoPlayer.addButton(
                "https://raw.githubusercontent.com/ufilestorage/img/master/download.png",
                "Download Movie", 
        
        function(){
    window.open(videoPlayer.getPlaylistItem()["file"]+"","_blank").blur();
	//window.location.href = jwplayer().getPlaylistItem()['file"];
	}, "download"
	);

</script>
</body>
</html>