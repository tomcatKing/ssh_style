$(function(){
	//1.检查用户是否登录
	$.util.getUserInfo({
		Token:false
	});

	//获取当前的页面链接
	var cur_url=window.location.href;

	var keyword="",foodTypes="",orderBy="";
	var result=$.util.readParam(cur_url);

	keyword=result.keyword;
	foodTypes=result.foodTypes;
	orderBy=result.orderBy;

	typeof keyword == "undefined" ? keyword="" :keyword=keyword;
	typeof foodTypes == "undefined" ? foodTypes="" :foodTypes=foodTypes;
	typeof orderBy == "undefined" ? orderBy="" :orderBy=orderBy;
	console.log(keyword+","+foodTypes+","+orderBy);

	//初始化操作
	$.util.getFoodList({
		keyword:keyword,
		foodTypes:foodTypes,
		orderBy:orderBy
	});

	//搜索关键字的方法
	$(".search_food_btn").click(function(){
		var _keyword=$(this).parent().prev().val();
		_keyword==""?keyword="":keyword=_keyword.trim();
		if(keyword==""){
			alert("关键字不能为空!!");
		}else{
			$.util.getFoodList({
				keyword:keyword,
				orderBy:orderBy
			});
		}
	});

	//按价格排序
	$(".order-by-price").click(function(){
		if($(this).hasClass("is-price")){
			//已经按价格排序了
			$(this).removeClass("is-price");
			orderBy="";
		}else{
			//添加这个class
			$(this).addClass("is-price");
			orderBy="foodPrice";
		}
		if(keyword==""){
			foodTypes="";
		}
		$.util.getFoodList({
			keyword:keyword,
			orderBy:orderBy,
			foodTypes:foodTypes
		})
	});

	//点击下一页和点击上一页
	$(".prev_food").click(function(){
		$.util.prevFoodList();
	});

	$(".next_food").click(function(){
		$.util.nextFoodList();
	});

	//美食详情事件
	$(".Fiery-list").on('click','.Fiery-item',function(){
		var to_url=$(this).attr("href");
		window.location.href=to_url;
	});

})