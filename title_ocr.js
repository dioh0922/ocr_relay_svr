
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

var crop_obj = null;

function load_local_Image(e){
	let file = e.target.files[0];
	if(!file.type.match("image.*")){
		alert("画像でない");
		return;
	}

	if(crop_obj != null){
		crop_obj.destroy();
	}

	$("#img_preview").empty();

	control_result.text = "タイトル部分を選択してください";

	$("<img>").attr({
		src: "",
		id: "prev_src",
		alt: "",
	}).appendTo("#img_preview");


	$("<input>").attr({
		type: "button",
		id: "send_crop_btn",
		value: "選択完了",
		class: "btn btn-success",
		style: "margin-top: 10px;",
	}).appendTo("#img_preview");

	$(document).on("click", "#send_crop_btn", send_crop_img_to_api);


	let formdata = new FormData($("#img_form").get(0));
	let src = window.URL.createObjectURL(file);

	$("#prev_src").attr("src", src);
	$("#prev_src").ready(function(){
		let el = $("#prev_src").get(0);
		crop_obj = new Cropper(el,{
			cropend(event){
			}
		});
	});
}

function send_crop_img_to_api(){
	control_result.text = "識別しています";

	crop_obj.getCroppedCanvas().toBlob((blob) => {
		let formdata = new FormData();
		formdata.append("upload_img", blob);
		$.ajax({
			type: "POST",
			url: svr + "get_title_api.php",
			cacha:false,
			contentType: false,
			processData: false,
			data: formdata,
			dataType: "html"
		})
		.done(function(ajax_data){
			//現状はOCRサーバでは文字列の抽出のみ行うため、結果表示のみ
			control_result.text = "「" + ajax_data + "」でした";
			get_img_result_word(ajax_data);
		})
		.fail(function(){
			control_result.text = "OCRサーバへの通信が失敗しました。";
		});
	}, "image/jpeg"); //jpeg形式にする(toBlob()そのままだとpngになる)
}

function get_img_result_word(txt){
	let post_data = {
	};

	post_data["search_word"] = txt;

	$.ajax({
		type: "POST",
		url: svr + "search_img_api.php",
		cacha:false,
		data: post_data,
	})
	.done(function(ajax_data){
		//現状はOCRサーバでは文字列の抽出のみ行うため、結果表示のみ
		console.log(ajax_data);
	})
	.fail(function(){
		control_result.text = "OCRサーバへの通信が失敗しました。";
	});

}

//起動時の処理
(window.onload = function(){
});
