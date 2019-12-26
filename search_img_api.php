<?php
	header('Content-Type: text/html; charset=UTF-8');

	$full = "python crawler.py ".$_POST["search_word"];
	exec($full, $out);

	foreach($out as $iter){
		echo $iter;
	}

?>
