<?php
	header('Content-Type: text/html; charset=UTF-8');

	//POSTしてきた画像でOCRするように変更する

	//ファイル名は引数で入力するように変更する

	foreach(getallheaders() as $name => $val){
		echo "$name: $val\n";
	}
?>
