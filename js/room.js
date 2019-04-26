$(function(){
	//1.检查用户是否登录
	$.util.getUserInfo({
		Token:true
	});

	//2.获取所有可以使用的房间
	$.util.getRooms();

	//3.为选择操作添加事件
	$(".room-block").on('click','.room-item-btn-val',function(){
		var roomId=$(this).attr("data-set");
		$.util.addRoom(roomId);
	});
});