<?php

	$file_name = $_FILES["upload_img"]["tmp_name"];

	$file = file_get_contents($file_name);

	$url = "https://dioh09-herokutest.herokuapp.com/get_area_api.php";

	$curl = curl_init();
	$cfile = new CURLFile($file_name, "image/jpeg", "upload_img");

	//ここがクライアントのnameに相当する
	$params = array("upload_img" => $cfile);

	curl_setopt($curl, CURLOPT_URL, $url);
	curl_setopt($curl, CURLOPT_POST, true);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: multipart/form-data'));
	curl_setopt($curl, CURLOPT_POSTFIELDS, $params);
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

	$data = curl_exec($curl);
	curl_close($curl);

	print($data);

?>
