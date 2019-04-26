$(function(){
	//1.检查用户是否登录
	$.util.getUserInfo({
		Token:true
	});

	$(".select-btns").on("click","div",function(){
		if($(this).hasClass("isTrue")){
		}else{
			var eles=$(this).siblings();
			for(var index=0;index<eles.length;index++){
				var cur_ele=eles.eq(index);
				cur_ele.removeClass("isTrue");
				cur_ele.children("img").attr("src","img/"+cur_ele.text()+".png");
			}
			$(this).addClass("isTrue").children("img").attr("src","img/"+$(this).text()+"(1).png");
		}
		//跳转到当前页面
		window.location.href=$(this).attr("href");
	});

	//开始加载
	$.util.roomVo();

	//取消房间
	$("body").on("click",".exit_room",function(){
		$.util.roomCancel();
	});

});