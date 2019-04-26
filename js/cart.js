$(function(){
	//1.检查用户是否登录
	$.util.getUserInfo({
		Token:true
	});

	//获取用户的购物车清单
	$.util.cartList();

	//用户单选按钮
	$("body").on('click',".cart-select",function(){
		$.util.selectCart(parseInt($(this).children("img").attr("data-set")));
	});

	//全选按钮
	$(".cart-buy-img").click(function(){
		$.util.allSelectCart($(this));
	});

	//购物车数量添加事件
	$("body").on('click','.cart-add',function(){
		var foodNum=parseInt($(this).prev().text());
		var cartId=parseInt($(this).parent().attr('data-set'));
		$.util.addCartNum(cartId,foodNum);
	});

	//购物车数量减少事件
	$("body").on('click','.cart-rem',function(){
		var foodNum=parseInt($(this).next().text());
		var cartId=parseInt($(this).parent().attr('data-set'));
		$.util.removeCartNum(cartId,foodNum);
	});

	//删除购物车事件
	$("body").on('click',".cart-remove",function(){
		var cartId=parseInt($(this).children("img").attr("data-set"));
		$.util.delCart(cartId);
	});

	//创建订单
	$("body").on('click','.cart-buy-btn',function(){
		$.util.updateCart();
	});

});