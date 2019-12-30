<?php
	header('Content-Type: text/html; charset=UTF-8');

	$json_name = "api_key.json";
	$setup_data = file_get_contents($json_name);
	$setup_data_arr = json_decode($setup_data, true);

	$key = $setup_data_arr["key"];
	$id = $setup_data_arr["id"];
	$q = $_POST["search_word"];
	$url = "https://www.googleapis.com/customsearch/v1?";

	$p_arr = array(
		"q" => $q,
		"key" => $key,
		"cx" => $id,
		"alt" => "json",
		"start" => 1,
		"num" => 3
	);
	$query = http_build_query($p_arr);

	$request = $url.$query;
	$return = file_get_contents($request, true);
	$ret_json = json_decode($return, true);
	file_put_contents("tmp.txt", $return);

	foreach($ret_json["items"] as $iter){
		$src = $iter["pagemap"]["cse_thumbnail"][0]["src"];
		echo $src."\n";
	}

?>
