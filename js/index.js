$(function(){
	//1.检查用户是否登录
	$.util.getUserInfo({
		Token:false
	});
	
	//搜索按钮应该跳转到指定搜索页面

	//美食分类
	$(".class_btn").click(function(){
		var foodTypes=$(this).attr("food_types");
		window.location.href="list.html?foodTypes="+foodTypes;
	});

	//美食关键字
	$(".Fiery-item").click(function(){
		var keyword=$(this).attr('keyword');
		window.location.href="list.html?keyword="+keyword;
	});

});