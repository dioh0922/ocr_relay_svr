<?php
	header('Content-Type: text/html; charset=UTF-8');

	$full = "python3 crawler.cgi ".$_POST["search_word"];
	exec($full, $out);

	foreach($out as $iter){
		echo $iter;
	}

	//ディレクトリを全部見て、画像のパスを\n区切りで返す

?>
