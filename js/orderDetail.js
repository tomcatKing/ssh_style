$(function(){
	//1.检查用户是否登录
	$.util.getUserInfo({
		Token:true
	});

	var cur_url=window.location.href;
	var result=$.util.readParam(cur_url);

	var orderNo=result.orderNo;
	//初始化订单详情
	$.util.orderDetail(orderNo);
	
});