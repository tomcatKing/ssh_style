$(function(){
	//1.检查用户是否登录
	$.util.getUserInfo({
		Token:false
	});

	var cur_url=window.location.href;
	var result=$.util.readParam(cur_url);
	// console.log(result);
	var foodId=result.foodId;

	if(typeof foodId=="undefined"){
		alert("当前美食不存在,跳转到美食页面");
		window.location.href="list.html";
	}

	$.util.foodDetail({
		foodId:foodId
	});

	//添加到购物车
	$("body").on('click','.food-buy-btn',function(){
		$.util.addCart({
			foodId:foodId,
			foodNum:1,
		})
	});

});