function original() {
var keyWord = document.getElementById("keyWord");
keyWord.style.border = "1px solid #e6ecf0";
}

var max_id = 0;

keyWord.addEventListener("focus", original);

$(function(){
 	 $('#search-form').on('submit', function(event){
 	 	event.preventDefault();
 	 	var keyword = $("#keyWord");

 	 	if (keyword.val() === "") {
 	 		keyWord.style.border = "1px solid red";
 	 	}
 	 	else if(keyword.val().length >19){
 	 		keyWord.style.border = "1px solid red";
 	 	}else{
 	 	$.ajax({
 	 		url  : '/search',
 	 		  data: { 
			    q: keyword.val(), 
			  },
 	 		success : function(response){
 	 			max_id = response.tweets.pop().id-1;
 	 			$('.wrapper').css("display","block");
 	 			$('#recent, #popular').css("display","inline-block");
 	 			$('#result').text(keyword.val().toLowerCase());
 	 			var cards = $('#cards'); 
				cards.html('');
 	 			response.tweets.forEach(function(tweet){
					cards.append('\
							<div>\
							<hr>\
							<div class="user">\
							<a><img src="'+tweet.user.profile_image_url+'"></a>\
									<div id="userInfo">\
									<a href="https://twitter.com/'+tweet.user.screen_name+'">'+tweet.user.screen_name+'</a>\
									<p>'+tweet.text+'</p>\
									<p>'+tweet.created_at+'</p>\
									</div>\
							</div>\
							</div>\
						');	
 	 			});
 	 		}
 	 	})
 	  	}
 	 });

 	 $( "#loadMore" ).click(function() {
	   	 	$.ajax({
 	 		url  : '/search',
 	 		  data: { 
			    max_id: max_id-1, 
			  },
 	 		success : function(response){
 	 			max_id = response.tweets.pop().id;
 	 			var cards = $('#cards');
 	 			response.tweets.forEach(function(tweet){
					cards.append('\
							<div>\
							<hr>\
							<div class="user">\
							<a><img src="'+tweet.user.profile_image_url+'"></a>\
									<div id="userInfo">\
									<a href="https://twitter.com/'+tweet.user.screen_name+'">'+tweet.user.screen_name+'</a>\
									<p>'+tweet.text+'</p>\
									<p>'+tweet.created_at+'</p>\
									</div>\
							</div>\
							</div>\
						');
 	 			});
 	 		}
 	 	})
	});

 	  	 $( "#recent" ).click(function() {
 	  	 	$("#cards").empty();
	   	 	$.ajax({
 	 		url  : '/search',
 	 		  data: { 
			    result_type: 'recent'
			  },
 	 		success : function(response){
 	 			max_id = response.tweets.pop().id;
 	 			var cards = $('#cards');
 	 			response.tweets.forEach(function(tweet){
					cards.append('\
							<div>\
							<hr>\
							<div class="user">\
							<a><img src="'+tweet.user.profile_image_url+'"></a>\
									<div id="userInfo">\
									<a href="https://twitter.com/'+tweet.user.screen_name+'">'+tweet.user.screen_name+'</a>\
									<p>'+tweet.text+'</p>\
									<p>'+tweet.created_at+'</p>\
									</div>\
							</div>\
							</div>\
						');
 	 			});
 	 		}
 	 	})
	});



 	  	 $( "#popular" ).click(function() {
 	  	 	$("#cards").empty();
	   	 	$.ajax({
 	 		url  : '/search',
 	 		  data: { 
			    result_type: 'popular'
			  },
 	 		success : function(response){
 	 			max_id = response.tweets.pop().id;
 	 			var cards = $('#cards');
 	 			response.tweets.forEach(function(tweet){
					cards.append('\
							<div>\
							<hr>\
							<div class="user">\
							<a><img src="'+tweet.user.profile_image_url+'"></a>\
									<div id="userInfo">\
									<a href="https://twitter.com/'+tweet.user.screen_name+'">'+tweet.user.screen_name+'</a>\
									<p>'+tweet.text+'</p>\
									<p>'+tweet.created_at+'</p>\
									</div>\
							</div>\
							</div>\
						');
 	 			});
 	 		}
 	 	})
	});

});
