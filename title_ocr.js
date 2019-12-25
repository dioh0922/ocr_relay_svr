
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

	$("#send_crop_btn").hide();

	control_result.text = "タイトル部分を選択してください";

	$("<img>").attr({
		src: "",
		id: "prev_src",
		alt: "",
	}).prependTo("#img_preview");

	$("#send_crop_btn").show();


	let formdata = new FormData($("#img_form").get(0));
	let src = window.URL.createObjectURL(file);

	if(crop_obj != null){
		crop_obj.destroy();
	}

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
			url: svr + "get_area_api.php",
			cacha:false,
			contentType: false,
			processData: false,
			data: formdata,
			dataType: "html"
		})
		.done(function(ajax_data){
			//現状はOCRサーバでは文字列の抽出のみ行うため、結果表示のみ
			control_result.text = ajax_data;
		})
		.fail(function(){
			control_result.text = "OCRサーバへの通信が失敗しました。";
		});
	}, "image/jpeg"); //jpeg形式にする(toBlob()そのままだとpngになる)
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
		//現状はOCRサーバでは文字列の抽出のみ行うため、結果表示のみ
		control_result.text = ajax_data;
	})
	.fail(function(){
		control_result.text = "OCRサーバへの通信が失敗しました。";
	});

}

//起動時の処理
(window.onload = function(){
	//get_img_class();
});
