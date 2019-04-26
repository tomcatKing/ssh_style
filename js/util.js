$(function(){
	//存放用户名称信息的变量
	var _user_name="";
	//存放标题html的变量
	var _title="";

	//.html?key1=val1&key2=val2--->{key1:val1,key2:val2}
	function _readParam(url){
		var url=url.split("?")[1];
		if(typeof(url) == "undefined"){
			return {};
		}
		//key1=val&key2=val2
		var params=url.split("&");
		var result={};
		for(var index=0;index<params.length;index++){
			var cur_param=params[index];
			var key=cur_param.split("=")[0];
			var val=cur_param.split("=")[1];
			result[key]=val;
		}
		return result;
	}

	function _getUserInfo(param){
		var userInfo=$.urls.info;
		$.network.network_get({
			url:userInfo,
			success:function(res){
				if(res.status==200){
					_user_name=res.data;
				}
				if(param.Token==true){
					if(_user_name!=""){
						__initTitle();
					}else{
						__gotoLogin();
					}
				}else if(param.Token==false){
					__initTitle();
				}
			}
		});
	}

	function __exit(){
		var exit=$.urls.logoutUrl;
		$.network.network_get({
			url:exit,
			success:function(res){
				if(res.status==200){
					_user_name="";
					$(".title").html(_title);
				}else{
					alert("请求出错了!!O~O");
				}
			}
		})
	}

	//初始化标题栏方法
	function __initTitle(){
		_title=$(".title").html();
		if(_user_name.trim()==""){
			//当前没有用户登录,直接绑定事件
			$(".title").on('click','.title-item',function(){
				var target_url=$(this).attr('gt');
				window.location.href=target_url;
			});
		}else{
			if(_user_name.length>2){
				var show_user=_user_name.substr(0,2)+"..";
			}
			//更改样式
			$(".title").html('<div class="col-xs-5 col-sm-4 col-md-3 col-lg-3 title-button"><span class="title-item" gt="user.html"><span><img src="img/登录.png"/></span> '+show_user+'</span><span class="h5">|</span><span class="title-item" gt="exit">退出 <span><img src="img/退出.png"/></span> </span></div><div class="col-xs-5 col-sm-4 col-md-3 col-lg-3 col-xs-offset-2 col-sm-offset-4 col-md-offset-6 col-lg-offset-6 title-button" ><span class="isSelect title-item" gt="index.html"><span><img src="img/首页(select).png"/></span>首页</span><span class="h5">|</span><span class="title-item" gt="help.html">关于<span><img src="img/关于.png"/></span></span></div>');
			$(".title").on('click','.title-item',function(){
				var target_url=$(this).attr('gt');
				if(target_url==="exit"){
					__exit();
				}else{
					window.location.href=target_url;
				}
			});

		}
	}
	//定义购物车数组,存放购物车
	var cart={
		cur_page:0,
		total_page:0,
		list:[],
		total_price:0.0
	}

	function _cartList(){
		var url=$.urls.cartListUrl;
		$.network.network_get({
			url:url,
			success:function(res){
				if(res.status==200){
					cart.cur_page=res.data.currentPage;
					cart.total_page=res.data.totalPages;
					cart.list=res.data.list;
					//修改cart数据
					__initCartSelect();
					__initCart();
				}else{
					alert(res.msg);
				}
			}
		})
	}

	//增加购物车数量
	function _addCartNum(cartId,foodNum){
		var carts=cart.list;
		for(var index=0;index<carts.length;index++){
			var cur_cart=carts[index];
			if(cur_cart.cartId==cartId){
				cur_cart.foodNum==99?cur_cart.foodNum=99:cur_cart.foodNum=foodNum+1;
			}
		}
		cart.list=carts;
		__initCart();
		__countCartPrice();

	}

	//减少购物车数量
	function _removeCartNum(cartId,foodNum){
		var carts=cart.list;
		for(var index=0;index<carts.length;index++){
			var cur_cart=carts[index];
			if(cur_cart.cartId==cartId){
				cur_cart.foodNum==1?cur_cart.foodNum=1:cur_cart.foodNum=foodNum-1;
			}
		}
		cart.list=carts;
		__initCart();
		__countCartPrice();

	}

	//初始化购物车数据
	function __initCart(){
		var carts=cart.list;
		$(".cart-list").html("");
		if(carts.length==0){
			$(".cart-list").append('<div class="text-center">您的购物车空空如也!!<a href="list.html">去消费</a></div>');
			$(".cart-buy-frame").hide();
		}else{
			//添加数据
			for(var index=0;index<carts.length;index++){
				var cur_cart=carts[index];
				var select_img="";
				cur_cart.select==true ? select_img="img/已选择.png" : select_img="img/未选择.png";
				$(".cart-list").append('<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 cart-item"><div class="cart-select"><img data-set="'+cur_cart.cartId+'" src="'+select_img+'"/></div><div class="cart-food-img"><img src="'+cur_cart.foodImg+'"/></div><div class="cart-food-msg"><div class="cart-food-name">'+cur_cart.foodName+'</div><div class="cart-food-price">￥'+cur_cart.foodPrice+'</div><div class="cart-food-btn" data-set="'+cur_cart.cartId+'"><span class="cart-rem">﹣</span><text>'+cur_cart.foodNum+'</text><span class="cart-add">﹢</span></div></div><div class="cart-remove"><img data-set="'+cur_cart.cartId+'" src="img/删除.png"/></div></div>');
			}
			$(".cart-buy-frame").show();
		}
	}

	//计算购物车总价的方法
	function __countCartPrice(){
		var carts=cart.list;
		var tempTotalPrice=0.0;
		for(var index=0;index<carts.length;index++){
			var cur_cart=carts[index];
			if(cur_cart.select==true){
				tempTotalPrice+=(cur_cart.foodPrice)*(cur_cart.foodNum);
			}
		}
		cart.total_price=tempTotalPrice;
		$(".money-style").text("￥"+cart.total_price+"元")
	}
	
	//为购物车添加选择参数
	function __initCartSelect(){
		var carts=cart.list;
		for(var index=0;index<carts.length;index++){
			var cur_cart=carts[index];
			cur_cart.select=false;
		}
		//重新赋值
		cart.list=carts;
	}

	//选择购物车的方法(cartId=6)
	function _selectCart(param){
		var carts=cart.list;
		for(var index=0;index<carts.length;index++){
			var cur_cart=carts[index];
			if(cur_cart.cartId==param){
				if(cur_cart.select==true){
					cur_cart.select=false;
				}else{
					cur_cart.select=true;
				}
			}
		}
		__initCart();
		__countCartPrice();

	}
	
	//全选购物车的方法(全选,和反选),这是e是一个element
	function _allSelect(ele){
		var all_select_img=ele.children("img").attr('src');
		var select_val=false;
		if(all_select_img.indexOf('未')!=-1){
			//此时点击会产生全选效果
			ele.children("img").attr('src','img/已选择.png');
			select_val=true;
		}else{
			//此时点击会产生全取消效果
			ele.children("img").attr('src','img/未选择.png');
			select_val=false;
		}
		var carts=cart.list;
		for(var index=0;index<carts.length;index++){
			var cur_cart=carts[index];
			cur_cart.select=select_val;
		}
		__initCart();
		__countCartPrice();
	}
	
	//从数组中移除数据
	function __delCart(cartId){
		var carts=cart.list;
		for(var index=0;index<carts.length;index++){
			if(carts[index].cartId==cartId){
				carts.splice(index,1);
			}
		}
		cart.list=carts;
		__initCart();
		__countCartPrice();
	}

	//删除购物车的方法
	function _delCart(cartId){
		$.network.network_get({
			url:$.urls.removeCartUrl,
			data:{
				cartId:cartId
			},
			success:function(res){
				if(res.status==200){
					//从数组中移除
					__delCart(cartId);
				}else{
					alert("删除失败,失败原因:"+res.msg);
				}
			}
		})
	}
	



	//定义食物数组
	var food={
		cur_page:0,
		total_page:0,
		list:[],
		//用于存放上次请求传入的data,主要用于分页.唉!!
		param:{},
	};

	//获取食物的方法
	function _getFoodList(data){
		var url=$.urls.foodListUrl;
		//存储上一次操作
		food.param=data;

		$.network.network_get({
			url:url,
			data:data,
			success:function(res){
				if(res.status==200){
					food.cur_page=res.data.currentPage;
					food.total_page=res.data.totalPages;
					food.list=res.data.list;
					__initFood();
				}else{
					alert(res.msg);
				}
			}
		})
	}

	var room={
		cur_page:0,
		total_page:0,
		list:[]
	};

	//获取所有的可使用房间
	function _getRoomList(){
		var url=$.urls.roomListUrl;
		$.network.network_get({
			url:url,
			success:function(res){
				if(res.status==200){
					room.cur_page=res.data.currentPage;
					room.total_page=res.data.totalPages;
					room.list=res.data.list;
					__initRoom();
				}
			}
		})
	}

	function __initRoom(){
		var rooms=room.list;
		$(".room-block").html("");
		if(rooms.length==0){
			//说明没有数据
			$(".room-block").append('<div class="text-center">抱歉,找不到您要的数据!!</div>');
			//分页不显示
			$(".select-num").hide();
		}else{
			for(var index=0;index<rooms.length;index++){
				var cur_room=rooms[index];
				$(".room-block").append('<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 room-item "><div class="room-item-img"><img src="img/'+cur_room.roomType+'.png"/></div><div class="room-item-context"><div class="room-item-name">'+cur_room.roomName+'</div><div class="room-item-type">'+cur_room.roomType+'(￥'+cur_room.roomPrice+')</div></div><div class="room-item-btn"><div class="room-item-btn-val" data-set="'+cur_room.roomId+'">选择</div></div></div>');
			}
			if(room.total_page>1){
				//分页显示
				$(".pageStart").text(room.cur_page);
				$(".pageEnd").text(room.total_page);
				$(".select-num").show();
			}else{
				//分页不显示
				$(".select-num").hide();
			}
		}
	}

	//初始化食物列表
	function __initFood(){
		var foods=food.list;
		$(".Fiery-list").html("");
		if(foods.length==0){
			//说明没有数据
			$(".Fiery-list").append('<div class="text-center">抱歉,找不到您要的数据!!</div>');
			//分页不显示
			$(".select-num").hide();
		}else{
			for(var index=0;index<foods.length;index++){
				var cur_food=foods[index];
				$(".Fiery-list").append('<div class="Fiery-item col-xs-12 col-sm-6 col-md-4 col-lg-3" href="detail.html?foodId='+cur_food.foodId+'"><div class="fiery-item-img"><img src="'+cur_food.foodImg+'"/></div><div class="fiery-item-header"><div class="fiery-item-title">'+cur_food.foodName+'</div><div class="fiery-item-price">￥'+cur_food.foodPrice+'</div></div></div>');
			}
			if(food.total_page>1){
				//分页显示
				$(".pageStart").text(food.cur_page);
				$(".pageEnd").text(food.total_page);
				$(".select-num").show();
			}else{
				//分页不显示
				$(".select-num").hide();
			}
		}
	}

	//点击下一页
	function _nextFoodList(){
		var this_page=food.cur_page;
		var total_page=food.total_page;
		if(this_page==total_page){
			alert("已经是最后一页了!!");
			return;
		}else{
			food.param.pageNum=this_page+1;
			_getFoodList(food.param);
		}
	}

	//点击上一页
	function _prevFoodList(){
		var this_page=food.cur_page;
		var total_page=food.total_page;
		if(this_page==1){
			alert("前面没有页面了!!");
			return;
		}else{
			food.param.pageNum=this_page-1;
			_getFoodList(food.param);
		}
	}

	//前往登录页面
	function __gotoLogin(){
		window.location.href="login.html";
	}

	//获取美食详情
	function _foodDetail(param){
		var url=$.urls.foodDetailUrl;

		$.network.network_get({
			url:url,
			data:param,
			success:function(res){
				$(".food-item").html("");
				if(res.status==200){
					var cur_food=res.data;
					$(".food-item").html('<div class="food-item-img food-item-basic"><img src="'+cur_food.foodImg+'"/></div><div class="food-item-name food-item-basic">'+cur_food.foodName+'</div><div class="food-item-desc food-item-basic">'+cur_food.foodDetail+'</div><div class="food-item-price food-item-basic">￥'+cur_food.foodPrice+'</div><div class="food-buy-btn food-item-basic">加入美食清单</div>');
				}else{
					$(".food-item").html('<div class="text-center">抱歉,找不到您要的数据!!</div>');
				}
			}
		});
	}

	//添加商品到购物车
	function _addCart(param){
		var url=$.urls.addCartUrl;
		var oldhtml=$("body").html();
		$("body").html('<div class="container img-responsive show-loading text-center"><div class="tx_window"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556036357081&di=2836b178512a9ee606f3965250a4c42b&imgtype=0&src=http%3A%2F%2Ftx.haiqq.com%2Fuploads%2Fallimg%2F170811%2F031513O32-7.jpg"/></div></div>')
		$.network.network_post({
			url:url,
			data:param,
			success:function(res){
				if(res.status==200){
					$("body").html('<div class="container img-responsive show-loading text-center">添加成功!!</div>');
				}else{	
					$("body").html('<div class="container img-responsive show-loading text-center">添加失败o~o(原因:'+res.msg+')</div>');
				}
				setTimeout(function(){
					$("body").html(oldhtml);
				},2000);
			}
		});
	}

	//更新购物车
	function _updateCart(){
		var carts=cart.list;
		var updateCarts=[]; //需要更新的元素的数组
		for(var index=0;index<carts.length;index++){
			var cur_cart=carts[index];
			if(cur_cart.select==true){
				var cartId=cur_cart.cartId;
				var foodNum=cur_cart.foodNum;
				updateCarts.push(
					{
						"cartId":cartId,
						"foodNum":foodNum
					}
				);
			}
		}

		//如果没有元素需要更新
		if(updateCarts.length==0){
			return;
		}else{
			for(var index=0;index<updateCarts.length;index++){
				var cur_C=updateCarts[index];
				//表示这是最后一个需要更新的
				if(index==updateCarts.length-1){
					setTimeout(function(){},1000);
					$.network.network_get({
						url:$.urls.updateCartUrl,
						data:{
							cartId:cur_C.cartId,
							foodNum:cur_C.foodNum,
						},
						success:function(res){
							//创建订单
							$.network.network_get({
								url:$.urls.addOrderUrl,
								success:function(res2){
									if(res2.status==200){
										var orderNo=res2.data;
										//调用支付接口
										$.network.network_get({
											url:$.urls.payUrl,
											data:{
												orderNo:orderNo
											},
											success:function(res3){
												//支付接口,返回data
												if(res3.status==200){
													var payForm=res3.data;
													payForm=payForm.replace(/\\/g,"");
													$("body").html(payForm);
												}else{
													alert("预支付失败!!,失败原因:"+res3.msg);
												}
											}
										})
									}else{
										alert("下单失败");
									}
								}
							})
						}
					})
				}else{
					$.network.network_get({
						url:$.urls.updateCartUrl,
						data:{
							cartId:cur_C.cartId,
							foodNum:cur_C.foodNum,
						},
						success:function(res){}
					})
				}
			}
		}

	}

	//为用户添加房间
	function _addRoom(roomId){
		var url=$.urls.addRoomUrl;
		$.network.network_get({
			url:url,
			data:{
				roomId:roomId
			},
			success:function(res){
				if(res.status==200){
					alert("房间添加成功*_*");
				}else{
					alert("房间添加失败!!失败原因:"+res.msg);
				}
			}
		})
	}

	//订单变量
	var order={
		cur_page:0,
		total_page:0,
		list:[],
		//存放上一次查询的url
		url:""
	}

	//获取用户订单的所有方法
	function _orderList(type){
		var url="";
		if(type=="nopay"){
			url=$.urls.noPayUrl;
		}else if(type=="ispay"){
			url=$.urls.isPayUrl;
		}else if(type=="success"){
			url=$.urls.successPayUrl;
		}else{
			//全部
			url=$.urls.ordersUrl;
		}
		order.url=url;

		$.network.network_get({
			url:url,
			success:function(res){
				if(res.status==200){
					order.cur_page=res.data.currentPage;
					order.total_page=res.data.totalPages;
					order.list=res.data.list;
					_initOrder();
				}
			}
		});

	}

	//初始化订单视图
	function _initOrder(){
		var orders=order.list;
		$(".order-block").html("");
		if(orders.length==0){
			//说明没有数据
			$(".order-list").append('<div class="text-center">你还没有这部分的订单哟!!</div>');
			//分页不显示
			$(".select-num").hide();
		}else{
			for(var index=0;index<orders.length;index++){
				var cur_order=orders[index];
				if(cur_order.status==="未付款"){
					$(".order-list").append('<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 order-item "><div class="order-item-header"><div class="order-item-no">订单编号:'+cur_order.orderNo+'</div><div class="order-item-status">'+cur_order.status+'</div></div><div class="order-item-body"><div class="order-item-img"><img src="'+cur_order.orderItemVoList[0].foodImg+'"/></div><div class="order-item-name"><span>'+cur_order.orderItemVoList[0].foodName+'</span>等'+cur_order.orderItemVoList.length+'件商品</div><div class="order-item-del" data-set="'+cur_order.orderNo+'"><img src="img/删除.png"/></div></div><div class="order-item-last">共'+cur_order.orderItemVoList.length+'件商品,合计<span>￥'+cur_order.totalPrice+'元</span></div><div class="order-item-play"><div class="order-item-space"></div><div class="order-item-detail order-item-btn" data-set="'+cur_order.orderNo+'">订单详情</div><div class="order-item-cancel order-item-btn" data-set="'+cur_order.orderNo+'">取消订单</div><div class="order-item-pay order-item-btn" data-set="'+cur_order.orderNo+'">立即付款</div></div></div>');
				}else{
					$(".order-list").append('<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 order-item "><div class="order-item-header"><div class="order-item-no">订单编号:'+cur_order.orderNo+'</div><div class="order-item-status">'+cur_order.status+'</div></div><div class="order-item-body"><div class="order-item-img"><img src="'+cur_order.orderItemVoList[0].foodImg+'"/></div><div class="order-item-name"><span>'+cur_order.orderItemVoList[0].foodName+'</span>等'+cur_order.orderItemVoList.length+'件商品</div><div class="order-item-del" data-set="'+cur_order.orderNo+'"></div></div><div class="order-item-last">共'+cur_order.orderItemVoList.length+'件商品,合计<span>￥'+cur_order.totalPrice+'元</span></div><div class="order-item-play"><div class="order-item-space"></div><div class="order-item-detail order-item-btn" data-set="'+cur_order.orderNo+'">订单详情</div></div></div>');
				}
			}
			if(order.total_page>1){
				//分页显示
				$(".pageStart").text(order.cur_page);
				$(".pageEnd").text(order.total_page);
				$(".select-num").show();
			}else{
				//分页不显示
				$(".select-num").hide();
			}
		}
	}

	//点击订单下一页
	function _nextOrderList(){
		var url=order.url;
		var this_page=order.cur_page;
		var total_page=order.total_page;
		if(this_page==total_page){
			alert("后面没有页面了!!");
			return;
		}else{
			order.cur_page=this_page+1;
			_getOrderList();
		}
	}

	//点击订单上一页
	function _prevOrderList(){
		var url=order.url;
		var this_page=order.cur_page;
		var total_page=order.total_page;
		if(this_page==1){
			alert("前面没有页面了!!");
			return;
		}else{
			order.cur_page=this_page-1;
			_getOrderList();
		}
	}

	//获取食物的方法
	function _getOrderList(data){
		var url=order.url;

		$.network.network_get({
			url:url,
			data:{
				pageNum:order.cur_page
			},
			success:function(res){
				if(res.status==200){
					order.cur_page=res.data.currentPage;
					order.total_page=res.data.totalPages;
					order.list=res.data.list;
					_initOrder();
				}else{
					alert(res.msg);
				}
			}
		})
	}

	//清除订单的方法
	function __removeOrder(orderNo){
		var orders=order.list;
		for(var index=0;index<orders.length;index++){
			var cur_O=orders[index];
			if(cur_o.orderNo==orderNo){
				orders.splice(index,1);
			}
		}
		order.list=orders;
		_initOrder();
	}

	//取消订单
	function _cancelOrder(orderNo){
		var url=$.urls.removeOrderUrl;

		$.network.network_get({
			url:url,
			data:{
				orderNo:orderNo
			},
			success:function(res){
				if(res.status==200){
					//把订单给干掉
					__removeOrder(orderNo);
				}else{	
					alert(res.msg);
				}
			}
		});
	}


	//初始化订单详情方法
	function _initOrderDetail(data){
		var cur_order=data;
		var appendHtml='<div class="container order-detail"><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 order_detail_msg "><div class="order_detail_title">订单信息</div><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ordr_detail_msg_item"><div class="order_detail_no order_detail">订单号:<span>'+cur_order.orderNo+'</span></div><div class="order_detail_time order_detail">	创建时间:<span>'+cur_order.createTime+'</span></div><div class="order_detail_shipping order_detail">	房间信息:<span>'+cur_order.roomVo.roomAddress+'</span></div><div class="order_detail_status order_detail">订单状态:<span>'+cur_order.status+'</span></div><div class="order_detail_time order_detail">支付方式:<span>'+cur_order.paymentType+'</span></div></div></div></div>';
		appendHtml=appendHtml+'<div class="container order_detail_list">';
		//开始循环订单详情部分
		var foods=cur_order.orderItemVoList;
		for(var index=0;index<foods.length;index++){
			var food=foods[index];
			appendHtml=appendHtml+'<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 order_food_item"><div class="order_food_img"><img src="'+food.foodImg+'"/></div><div class="order_food_msg"><div class="order_food_name order_food_shuxing">'+food.foodName+'</div><div class="order_food_price order_food_shuxing">￥'+food.foodPrice+'元/件</div><div class="order_food_num order_food_shuxing">x'+food.foodNum+'</div></div></div>';
		}
		appendHtml=appendHtml+'</div>';
		//统计部分
		appendHtml=appendHtml+'<div class="container order_count"><div class="order_count_title">订单统计</div><div class="order_count_price">￥'+cur_order.totalPrice+'</div></div>';
		//现在填充
		$("body").append(appendHtml);
	}

	//订单详情
	function _orderDetail(orderNo){
		var url=$.urls.orderDetailUrl;
		$.network.network_get({
			url:url,
			data:{
				orderNo:orderNo
			},
			success:function(res){
				if(res.status==200){
					//初始化订单详情
					_initOrderDetail(res.data);
					/**接着写*/
				}
			}
		})
	}

	//立即付款
	function _pay(orderNo){
		var url=$.urls.payUrl;
		_orderNo=orderNo;
		$.network.network_get({
			url:url,
			data:{
				orderNo:orderNo
			},
			success:function(res){
				if(res.status==200){
					var FormHtml=res.data;
					FormHtml=FormHtml.replace(/\\/g,"");
					$("body").html(FormHtml);
				}else{
					alert("预付款失败!!");
				}
			}
		})
	}

	var _orderNo="";

	//监听订单的支付状态
	function _payIsSuccess(){
		var url=$.urls.orderStatusUrl;
		$.network.network_get({
			url:url,
			data:{
				orderNo:_orderNo
			},
			success:function(res){
				if(res.status==200){
					//订单支付成功
					$(".alipay").html('<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 order-item-success"><div class="order-pay-success">订单支付成功!!订单编号:<span>'+_orderNo+'</span></div><div class="order-pay-png"><img src="img/成功.png"/></div><div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 order-pay-btn col-sm-offset-3 col-md-offset-4 col-lg-offset-4"><div class="back pay-btn">返回首页</div><div class="list pay-btn">继续购物</div></div></div>');
					return true;
				}else{
					return false;
				}
			}
		})
	}

	function _roomVo(){
		var url=$.urls.roomVoUrl;
		$.network.network_get({
			url:url,
			success:function(res){
				if(res.status==200){
					var roomvo=res.data;
					var appendHtml='<div class="container room-body"><div class="room-msg"><div>位置</div><span>'+roomvo.roomAddress+'</span></div><div class="room-msg"><div>价格</div><span class="room-money">￥'+roomvo.roomPrice+'</span></div></div><div class="container room-title"><span>已点美食</span></div><div class="container room-body">';
					var orderItems=roomvo.orderItemVoList;
					for(var index=0;index<orderItems.length;index++){
						var orderItem=orderItems[index];
						appendHtml=appendHtml+'<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 food-item"><div class="food-item-msg"><div class="food-img"><img src="'+orderItem.foodImg+'"/></div><div class="food-msg"><div class="food-name">'+orderItem.foodName+'(x'+orderItem.foodNum+')</div><div class="food-price">总价:<span class="room-money">￥'+orderItem.totalPrice+'</span></div></div></div></div>';
					}
					appendHtml=appendHtml+'</div><div class="container exit_room_body"><span class="exit_room">取消房间</span></div>';
					$("body").append(appendHtml);
				}else{
					$(".order-list").append('<div class="container room-body"><div class="text-center">你还没有选择房间哟!!</div></div>');
				}
			}
		})
	}

	//取消房间
	function _roomCancel(){
		var url=$.urls.cancelRoomUrl;
		$.network.network_get({
			url:url,
			success:function(res){
				if(res.status==200){
					alert("房间已取消!!");
					window.location.reload();
				}
			}
		})
	}

	//暴露出来的工具方法
	$.util={
		/**
		 *@param {}
		 *Token=true 表示,此页面需要用户登录.
		 *Token=false 表示,此页面可以在用户未登录的情况下进入
		 */
		getUserInfo:function(param){
			_getUserInfo(param);
		},
		readParam:function(url){
			return _readParam(url);
		},
		/**
		 *{keyword:1,...}
		 */
		getFoodList:function(param){
			_getFoodList(param);
		},
		//下一个页面
		nextFoodList:function(){
			_nextFoodList();
		},
		//下一个页面
		prevFoodList:function(){
			_prevFoodList();
		},
		//获取美食详情
		foodDetail:function(param){
			_foodDetail(param);
		},
		//添加商品到购物车
		addCart:function(param){
			_addCart(param);
		},
		//获取当前用户的购物车
		cartList:function(){
			_cartList();
		},
		//购物车全选的方法
		allSelectCart:function(ele){
			_allSelect(ele);
		},
		//购物车单选的方法
		selectCart:function(cartId){
			_selectCart(cartId);
		},
		//添加购物车数量
		addCartNum:function(cartId,foodNum){
			_addCartNum(cartId,foodNum);
		},
		//减少购物车数量
		removeCartNum:function(cartId,foodNum){
			_removeCartNum(cartId,foodNum);
		},
		//删除购物车操作
		delCart:function(cartId){
			_delCart(cartId);
		},
		//清空购物车
		updateCart:function(){
			_updateCart();
		},
		//获取所有房间
		getRooms:function(){
			_getRoomList();
		},
		//添加房间
		addRoom:function(roomId){
			_addRoom(roomId);
		},
		//获取所有订单
		orderList:function(type){
			_orderList(type);
		},
		//下一页订单
		next_Order_List:function(){
			_nextOrderList();
		},
		//上一页订单
		prev_Order_List:function(){
			_prevOrderList();
		},
		//取消订单
		cancelOrder:function(orderNo){
			_cancelOrder(orderNo);
		},
		//订单详情
		orderDetail:function(orderNo){
			_orderDetail(orderNo);
		},
		//立即付款
		pay:function(orderNo){
			_pay(orderNo);
		},
		//监听订单是否交易成功
		payissuccess:function(){
			return _payIsSuccess();
		},
		//获取房间详情信息
		roomVo:function(){
			_roomVo();
		},
		//取消房间
		roomCancel:function(){
			_roomCancel();
		}
	}
});