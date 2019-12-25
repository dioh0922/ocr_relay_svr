<?php
	header('Content-Type: text/html; charset=UTF-8');

	//POSTしてきた画像でOCRするように変更する

	//ファイル名は引数で入力するように変更する
	$file_name = $_FILES["upload_img"]["tmp_name"];

	if(!is_uploaded_file($file_name)){
		print("画像ファイルが以上です");
		exit();
	}

	$tmp_img_name = "tmp.jpg";

	if(file_exists($tmp_img_name)){
		unlink($tmp_img_name);
	}

	move_uploaded_file($file_name, $file_name);

	list($width, $height) = getimagesize($file_name);

	$row_image = imagecreatefromjpeg($file_name);


	$resize_w = (int)($width);
	$resize_h = (int)($height);

	$image = imagecreatetruecolor($resize_w, $resize_h);

	imagecopyresampled($image, $row_image, 0, 0, 0, 0, $resize_w, $resize_h, $width, $height);

	$id = mb_substr($file_name, -8, 4);

	imagejpeg($image, $tmp_img_name);
	//いつさくじょするか？

	echo $id;

?>
