$(function(){
	function get(params){
		all(params,"GET");
	}

	function post(params){
		all(params,"POST");
	}

	function all(params,type){
		console.log(params.data);
		$.ajax({
			url:params.url,
			type:type,
			dataType: 'json',
			data:params.data,
			xhrFields:{
		        withCredentials:true
		    },
			success:function(res){
				console.log(res);
				params.success(res);

			}
		});
	}

	/**导出network*/
	$.network={
		network_post:function(params){
			post(params);
		},
		network_get:function(params){
			get(params);
		}
	}
});