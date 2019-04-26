$(function(){
	//1.检查用户是否登录
	$.util.getUserInfo({
		Token:true
	});

	//2.获取所有的订单
	var cur_url=window.location.href;
	var result=$.util.readParam(cur_url);
	var type=result.orderType;

	// console.log(type);

	$.util.orderList(type);

	//1.取消订单的方法
	$("body").on('click','.order-item-cancel',function(){
		var orderNo=$(this).attr('data-set');
		$.util.cancelOrder(orderNo);
	});

	//2.查看订单详情的方法
	$("body").on('click','.order-item-detail',function(){
		var orderNo=$(this).attr('data-set');
		window.location.href="order-detail.html?orderNo="+orderNo;
	});
	
	//3.立即付款的方法
	$("body").on('click','.order-item-pay',function(){
		var orderNo=$(this).attr('data-set');
		$.util.pay(orderNo);
	});

	//删除图标触发的事件
	$("body").on('click','.order-item-del',function(){
		var orderNo=$(this).attr('data-set');
		$.util.cancelOrder(orderNo);
	});
	
});