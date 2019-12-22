
const svr = "http://localhost/ocr_relay_svr/";

var control_result = new Vue({
	el: "#result_area",
	data:{
		text: "ファイルを選んでください"
	}
});

var control_file_select = new Vue({
	el: "#load_img",
	methods:{
		selected: load_local_Image
	}
});

function load_local_Image(e){
	var file = e.target.files[0];
	if(!file.type.match("image.*")){
		alert("画像でない");
		return;
	}

	var blob = window.URL.createObjectURL(file);
	$("#resultImg").empty();
	$("<img>").attr({
		src: blob,
		id: "prev_src",
		alt: "",
		style: "margin-bottom: 20px; width:50%; height:50%;"
	}).appendTo("#img_preview");
	control_result.text = "判別しています";
	//get_img_title();

	var formdata = new FormData($("#img_form").get(0));

	$.ajax({
		type: "POST",
		url: svr + "test_ather_post.php",
		cacha:false,
		contentType: false,
		processData: false,
		data: formdata,
		dataType: "html"
	})
	.done(function(ajax_data){
		console.log(ajax_data);
		control_result.text = ajax_data;
	})
	.fail(function(){
		control_result.text = "OCRサーバへの通信が失敗しました。";
	});
}

function get_all_area_img(cnt){
	for(let i = 0; i < cnt; i++){

		let src = svr + "area/" + i + ".jpg";
		let id = "img" + i;
		$("<img ><br>").attr({
			src: src,
			id: id,
			alt: "",
			name: i
		}).appendTo("#resultImg");
		$("#"+id).click(img_click);
	}

	//領域画像変更のイベントを登録しておき、文字識別処理を呼ばせる
	$(document).on("img_select", img_select);
}

function img_select(e, txt){
	let post = {
		"target" : txt
	};

	$.ajax({
		type: "POST",
		url: svr + "get_title_api.php",
		cacha:false,
		data: post,
	})
	.done(function(ajax_data){
		control_result.text = ajax_data + "番の画像を抽出します";
	})
	.fail(function(){
		control_result.text = "OCRサーバへの通信が失敗しました。";
	});
}

function img_click(){
		$(document).trigger("img_select", [this.name]);
		$("#resultImg").empty();
}

function get_img_title(){

	var formdata = new FormData($("#img_form").get(0));

	$.ajax({
		type: "POST",
		url: svr + "get_area_api.php",
		cacha:false,
		contentType: false,
		processData: false,
		data: formdata,
		dataType: "html"
	})
	.done(function(ajax_data){
		let str = ajax_data.slice(0, -1);
		str = str.split('\'').join("")
		str = "[" + str + "]";
		let json = JSON.parse(str);

		control_result.text = json.length + "個の文字列を抽出しました";

		prev_area_img(json);
	})
	.fail(function(){
		control_result.text = "OCRサーバへの通信が失敗しました。";
	});

}

function prev_area_img(pos_arr){
	let src = $("#img_preview").children("img").attr("src");
	let cvs = document.getElementById("img_canvas");
	let ctx = cvs.getContext("2d");
	let img = new Image();
	img.src = src;
	img.onload = function(){
		let xs = pos_arr[1].xs;
		let ys = pos_arr[1].ys;
		let xe = pos_arr[1].xe;
		let ye = pos_arr[1].ye;
		let dw = $(".canvas_wrapper").width();
		//cvs.width = dw;
		//cvs.height = dw;
		//ctx.drawImage(img, xs, ys, xe, ye, 0, 0, cvs.width, cvs.height);
		ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, cvs.width, cvs.height);
		let pr_img = ctx.getImageData(0, 0, img.width, img.height / 2);
		ctx.putImageData(pr_img, 0, 0)
	}
}

function part_result_from_array(result){
	var arr = result.split(",");
	console.log(arr);
}

//起動時の処理
(window.onload = function(){
	//get_img_class();
});
