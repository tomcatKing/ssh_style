$(function(){

	var user="";
	var code="";

	//获取验证码事件
	$(".get-code").on('click',getCode);

	$(".get-user").blur(function(){
		var cur_user=$(this).val();
		cur_user==""?cur_user="":cur_user=cur_user.trim();
		if(cur_user==""){
			$(this).css({'border':"1px solid #f92020"});	
			return;
		}else{
			$(this).css({'border':"1px solid #fff"});	
		}
		user=cur_user;
	});

	$(".code-user").blur(function(){
		var code_val=$(this).val();
		code_val==""?code_val="":code_val=code_val.trim();
		if(code_val==""){
			$(this).css({'border':"1px solid #f92020","box-sizing":"border-box"});	
			return;
		}else{
			$(this).css({'border':"1px solid #fff"});
		}
		code=code_val;
	});

	function getCode(e){
		//触发请求
		var url=$.urls.codeByUser;
		if(user==""){
			$(".error-msg").text("数据不能为空!!");
			return;
		}
		$.network.network_get({
			url:url,
			data:{
				userName:user,
			},
			success:function(res){
				if(res.status==200){
					alert("验证码已发送!!");
				}else{
					$(".error-msg").text("验证码发送失败!!");
				}
			}
		});
		var that=$(this);
		that.css('background-color',"#ccc");
		var count=60;
		that.off('click');
		var timer=setInterval(function(){
			count--;
			that.text(count+"秒后重新获取");
			if(count<=0){
				that.css('background-color',"#2db7f5").html("获取验证码");
				that.on('click',getCode);
				clearInterval(timer);
			}
		},1000);
	}

	//登录按钮
	$(".user-login-btn").click(function(){
		if(user=="" || code==""){
			$(".error-msg").text("请保证数据的完整性!!");
			return;
		}
		var url=$.urls.loginUrl;
		$.network.network_get({
			url:url,
			data:{
				userName:user,
				code:code
			},
			success:function(res){
				if(res.status==200){
					alert("登录成功");
					window.location.href="index.html";
				}else{
					$(".error-msg").text("登录失败!错误原因:["+res.msg+"]");
				}
			}
		})
	});

	//修改邮箱
	$(".goto").click(function(){
		window.location.href="reset.html";
	});
});