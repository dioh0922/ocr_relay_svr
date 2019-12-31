<?php
	header('Content-Type: text/html; charset=UTF-8');

	$dir = "get_result/";
	$f_list = glob($dir."*");
	foreach ($f_list as $iter) {
		echo $iter."\n";
	}

?>
