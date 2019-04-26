$(function(){
	//1.检查用户是否登录
	$.util.getUserInfo({
		Token:true
	});

	//每隔5s获取一次订单状态
	var getOrderStatus=setInterval(function(){
		var returnStatus=$.util.payissuccess();
		if(returnStatus==true){
			clearInterval(getOrderStatus);
		}	
	},5000);
});