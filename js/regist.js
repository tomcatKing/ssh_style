$(function(){
	//1.检查用户是否登录
	$.util.getUserInfo({
		Token:false
	});

	var _userName="";
	var _userEmail="";
	var _code="";

	function setErrorMsg(msg,type){
		if(type==false){
			$(".error-msg").text(msg).css('color','#e40e0e');
		}else{
			$(".error-msg").text(msg).css('color','#11dc3d');
		}
	}

	//用户名失去焦点
	$(".user-name").blur(function(){
		var userName=$(this).val();
		userName==""?userName="":userName=userName.trim();
		if(userName==""){
			setErrorMsg("用户名不能为空",false);
			return;
		}else{
			_userName=userName;
			setErrorMsg("",true);
			//发送ajax请求
			userIsLive();
		}
	});

	//用户是否已经存在
	function userIsLive(){
		var url=$.urls.containUserUrl;
		$.network.network_get({
			url:url,
			data:{
				userName:_userName
			},
			success:function(res){
				if(res.status==200){
					$(".user-name").css("border","1px solid #31b328");
				}else{
					$(".user-name").css("border","1px solid #ea2612");
				}
			}
		});
	} 

	//邮箱是否已经存在
	function emailIsLive(){
		var url=$.urls.containUserEmail;
		$.network.network_get({
			url:url,
			data:{
				userEmail:_userEmail
			},
			success:function(res){
				if(res.status==200){
					$(".user-email").css("border","1px solid #31b328");
				}else{
					$(".user-email").css("border","1px solid #ea2612");
				}
			}
		});
	}

	//邮箱失去焦点
	$(".user-email").blur(function(){
		var userEmail=$(this).val();
		userEmail==""?userEmail="":userEmail=userEmail.trim();
		if(userEmail==""){
			setErrorMsg("邮箱不能为空",false);
			return;
		}else{
			_userEmail=userEmail;
			setErrorMsg("");
			//发送ajax请求
			emailIsLive();
		}
	});

	//获取验证码事件
	//获取验证码
	$(".get-code").on('click',getCode);

	function getCode(e){
		//触发请求
		var url=$.urls.codeByEmail;
		if(_userName=="" || _userEmail==""){
			$(".error-msg").text("请保证数据的完整!!",false);
			return;
		}
		$.network.network_get({
			url:url,
			data:{
				userEmail:_userEmail
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

	//验证码失去焦点
	$(".user-code").blur(function(){
		var code=$(this).val();
		code==""?code="":code=code.trim();
		if(code==""){
			setErrorMsg("验证码不能为空",false);
			return;
		}else{
			_code=code;
			setErrorMsg("");
		}
	})

	//注册
	$(".user-login-btn").click(function(){
		if(_userEmail=="" || _userName=="" || _code==""){
			setErrorMsg("请保证数据的完整性",false);
			return;
		}else{
			setErrorMsg("");
			var url=$.urls.registUrl;
			$.network.network_get({	
				url:url,
				data:{
					userName:_userName,
					userEmail:_userEmail,
					code:_code
				},
				success:function(res){
					if(res.status==200){
						alert("注册成功!!");
					}else{
						setErrorMsg(res.msg,false);
					}
				}
			})
		}
	});
});