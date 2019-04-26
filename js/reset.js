$(function(){
	//1.检查用户是否登录
	$.util.getUserInfo({
		Token:false
	});

	var _userName="";
	var _oldEmail="";
	var _newEmail="";
	var _code="";

	//用户名
	$(".user-name").blur(function(){
		var userName=$(this).val();
		userName==""?userName="":userName=userName.trim();
		if(userName==""){
			setErrorMsg("用户名不能为空",false);
			return;
		}else{
			_userName=userName;
			setErrorMsg("");
		}
	});

	//旧邮箱
	$(".old-email").blur(function(){
		var oldEmail=$(this).val();
		oldEmail==""?oldEmail="":oldEmail=oldEmail.trim();
		if(oldEmail==""){
			setErrorMsg("旧邮箱不能为空",false);
			return;
		}else{
			_oldEmail=oldEmail;
			setErrorMsg("");
		}
	});

	//新邮箱
	$(".new-email").blur(function(){
		var newEmail=$(this).val();
		newEmail==""?newEmail="":newEmail=newEmail.trim();
		if(newEmail==""){
			setErrorMsg("新邮箱不能为空",false);
			return;
		}else{
			_newEmail=newEmail;
			setErrorMsg("");
		}
	});

	function setErrorMsg(msg,type){
		if(type==false){
			$(".error-msg").text(msg).css('color','#e40e0e');
		}else{
			$(".error-msg").text(msg).css('color','#11dc3d');
		}
	}

	//获取验证码
	$(".get-code").on('click',getCode);

	function getCode(e){
		//触发请求
		var url=$.urls.codeByEmail;
		if(_userName=="" || _newEmail=="" || _oldEmail==""){
			setErrorMsg("请保证数据的完整!!",false);
			return;
		}
		$.network.network_get({
			url:url,
			data:{
				userEmail:_oldEmail
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

	//验证码失焦
	$(".user-code").blur(function(){
		var code=$(this).val();
		code==""?code="":code=code.trim();
		if(code==""){
			setErrorMsg("验证码不能为空");
			return;
		}else{
			_code=code;
			setErrorMsg("");
		}
	});

	//重置用户
	$(".user-login-btn").click(function(){
		if(_userName=="" || _newEmail=="" || _oldEmail==""){
			setErrorMsg("情保证数据的完整性!!");
			return;
		}else{
			//重置
			var url=$.urls.resetUrl;
			$.network.network_get({
				url:url,
				data:{
					userName:_userName,
					oldEmail:_oldEmail,
					newEmail:_newEmail,
					code:_code
				},
				success:function(res){
					alert(res.msg);
				}
			});
		}
	});

	$(".goto").click(function(){
		window.location.href="login.html";
	})
});