<?php
	header('Content-Type: text/html; charset=UTF-8');

	$target = $_POST["search_word"];

	$full = "python crawler.cgi ".$target;
	exec($full, $out);

	/*
	foreach($out as $iter){
		echo $iter;
	}
	*/

	$f_list = glob($dir."*");
	foreach ($f_list as $iter) {
		$dist_name = mb_substr($iter, -5);
		rename($iter, $dir.$target.$dist_name);
	}

	echo "画像を収集しています";
?>
