$(function(){

	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
	  var current_url = tabs[0].url;
	  $(".current_url").text(current_url);
	});

	$(".new").on('mouseover',function(){
		$(this).addClass('net');
		$(".current").removeClass('net');
	});
	$(".current").on('mouseover',function(){
		$(this).addClass('net');
		$(".new").removeClass('net');
	});



	$(".new .title").on('click',function(){ 
		linkControl(); 
	});
	$('#link').keypress(function(e){
	 var key = e.which;
	 if(key == 13){ linkControl(); }
	});

});

function linkControl(){
	$link = $("#link").val();
	if( $link.match("^https://") || $link.match("^http://") || $link.match("^www.") ){
		$(".loading").show();
		callAPI();
	}else{
		showResult("URL Hatalı. Lütfen uygun bir url giriniz.");
	}
}

function callAPI(){
  $.ajax({
    type:"POST",
    url:"https://api.tik.to/create.php?url="+$link,
    dataType:'json',
    success: function(data) {
    	if(data.status){
    		showResult(data.short_url);
    	}else{
    		showResult(data.message);
    	}
    	$(".loading").hide();
    }
  });
}

function showResult($message){
	$(".result span").text($message)
	$(".result").slideDown();
}