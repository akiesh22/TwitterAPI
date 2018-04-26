$(function(){
 	 $('#login-form').on('submit', function(event){
 	 	event.preventDefault();
 	 	var username = $("#username");
 	 	var password = $("#password");
 	 	if (username.val() === "" || password.val() ==="") {
			 	$('.alert').css('visibility','visible').hide().slideDown();
			 	$('#err-msg').text(function(){
			 	$(this).text("I am empty !").css({
			 	"textAlign":"center",
				"font-size":"large" 
				});
				});
				}
		else if(username.val().length <5 || password.val().length <5){
				 	$('.alert').css('visibility','visible').hide().slideDown();
				 	$('#err-msg').text(function(){
				 	$(this).text("Username or password too short !").css('text-align','center');
				 	});
 	 	   		 }   
		else {
	 	 	$.ajax({
	 	 		url  : '/login',
	 	 		method : 'POST',
	 	 		contentType : 'application/json',
	 	 		data : JSON.stringify({
	 	 			username : username.val(),
	 	 			password : password.val()
	 	 		}),
	 	 		success : function(response){
	 	 			if(response.redirectUrl){
	 	 				window.location = response.redirectUrl;
	 	 			}else if(response.msg){
	 	 			$('.alert').css('visibility','visible').hide().slideDown();
	 	 			$('#err-msg').text(function(){
	 	 			$(this).text(response.msg).css({
	 	 				"textAlign":"center",
	   					"font-size":"large" 
	 	 			});
	 	 		 	});
	 	 			}
	 	 		}
	 	 	})
 	  	}
 	 });
});
