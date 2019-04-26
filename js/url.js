$(function(){
	const prefix_url="http://localhost:8080/ssh/";

	function getUrl(url){
		return prefix_url+url;
	}

	$.urls={
		//获取美食列表
		foodListUrl:getUrl("food/list.action"),

		//获取购物车列表
		cartListUrl:getUrl("cart/list.action"),

		//获取指定美食详情
		foodDetailUrl:getUrl("food/detail.action"),

		//添加美食到购物车
		addCartUrl:getUrl("cart/add.action"),

		//删除购物车
		removeCartUrl:getUrl("cart/remove.action"),

		//更新购物车
		updateCartUrl:getUrl("cart/update.action"),

		//订单详情
		orderDetailUrl:getUrl("order/detail.action"),

		//订单状态
		orderStatusUrl:getUrl("order/status.action"),

		//创建订单
		addOrderUrl:getUrl("order/add.action"),

		//取消订单
		removeOrderUrl:getUrl("order/cancel.action"),

		//获取用户订单
		ordersUrl:getUrl("order/list.action"),

		//支付订单
		payUrl:getUrl("order/pay.action"),

		//获取用户的未支付订单
		noPayUrl:getUrl("order/nopay.action"),

		//获取用户的已支付订单
		isPayUrl:getUrl("order/ispay.action"),

		//获取用户的已完成订单
		successPayUrl:getUrl("order/success.action"),

		//获取所有可以使用的房间信息
		roomListUrl:getUrl("room/list.action"),

		//查看用户的房间的详细信息
		roomVoUrl:getUrl("room/roomvo.action"),

		//添加房间
		addRoomUrl:getUrl("room/add.action"),

		//取消房间
		cancelRoomUrl:getUrl("room/cancel.action"),

		//检查用户名是否可以使用
		containUserUrl:getUrl("user/containUserName.action"),

		//检查邮箱是否可以使用
		containUserEmail:getUrl("user/containUserEmail.action"),

		//通过用户名获取验证码
		codeByUser:getUrl("user/getCodeByUserName.action"),

		//通过邮箱获取验证码
		codeByEmail:getUrl("user/getCodeByUserEmail.action"),

		//用户登录
		loginUrl:getUrl("user/login.action"),

		//用户退出
		logoutUrl:getUrl("user/logout.action"),

		//用户注册
		registUrl:getUrl("user/regist.action"),

		//用户更改邮箱
		resetUrl:getUrl("user/update.action"),
		
		//获取当前用户信息
		info:getUrl("user/info.action")
	}


});