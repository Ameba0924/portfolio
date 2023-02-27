function setCookie(cName, cValue, cDay){
	var expire = new Date();
	expire.setDate(expire.getDate() + cDay); //하루
//	expire.setTime(expire.getTime() + 1*60*1000); // 1분
	cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
	if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
	document.cookie = cookies;
}
function getCookie(cName) {
	cName = cName + '=';
	var cookieData = document.cookie;
	var start = cookieData.indexOf(cName);
	var cValue = '';
	if(start != -1){
		start += cName.length;
		var end = cookieData.indexOf(';', start);
		if(end == -1)end = cookieData.length;
		cValue = cookieData.substring(start, end);
	}
	return unescape(cValue);
}


$('#favorite').click(function(){
	var bookmarkURL = window.location.href;
	var bookmarkTitle = document.title;
	var triggerDefault = false;

	if (window.sidebar && window.sidebar.addPanel) {
		// Firefox version < 23
		window.sidebar.addPanel(bookmarkTitle, bookmarkURL, '');
	} else if ((window.sidebar && (navigator.userAgent.toLowerCase().indexOf('firefox') > -1)) || (window.opera && window.print)) {
		// Firefox version >= 23 and Opera Hotlist
		var $this = $(this);
		$this.attr('href', bookmarkURL);
		$this.attr('title', bookmarkTitle);
		$this.attr('rel', 'sidebar');
		$this.off(e);
		triggerDefault = true;
	} else if (window.external && ('AddFavorite' in window.external)) {
		// IE Favorite
		window.external.AddFavorite(bookmarkURL, bookmarkTitle);
	} else {
		// WebKit - Safari/Chrome
		alert((navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Cmd' : 'Ctrl') + '+D 키를 눌러 즐겨찾기에 등록하실 수 있습니다.');
	}

	return triggerDefault;
});


function scrollToBottom() {
	$('html, body').animate({scrollTop:$(document).height()}, 'slow');
}
function scrollToTop() {
	$('html, body').animate({scrollTop:0}, 'slow');
}

$(window).scroll(function() {
	var position = $(window).scrollTop();
	console.log(position);
	if(position > 50){
		$(".jbMenu").addClass("jbFixed");
	}
	else if(position < 50){
		$(".jbMenu").removeClass("jbFixed");
	}
});

$('.sub_location ul li span').click(function(){
	$(this).next('ul').slideToggle('fast');
	$(this).parents('ul').addClass('on');
});
$('.sub_location ul').mouseleave(function(){
	$(this).find('ul').slideUp('fast');
	$(this).removeClass('on');
});


$(".subnav1>li>div").click(function() {
	$(".subnav").slideUp();
	if($(this).next("ul").length){
		$(this).next().slideToggle("slow");
		return false;
	}

});

$("#back_cover").css("height",($('body').prop("scrollHeight")));

	$("#sideMenu").blur(function(){
		$("#sideMenu").stop().animate({'left':'-250px'},500);
	});

	$("#back_cover").click(function () {
		$('#sideMenu').stop().animate({'left':'-250px'},500);
		$(this).hide();
	});

$(".qbt").click(function () {

	var rq = $("#sideMenu").css("left");

	if(rq == "-250px"){
		$("#back_cover").show();
		$('#sideMenu').stop().animate({'left':'0'},500);

	}else{
		$("#back_cover").hide();
		$('#sideMenu').stop().animate({'left':'-250px'},500);
	}
});


$(window).scroll(function() {
  if($(this).scrollTop() != 0) {
   $('#backtotop').fadeIn();
  } else {
   $('#backtotop').fadeOut();
  }
 });

 $('#backtotop').click(function() {
  $('body,html').animate({scrollTop:0},800);
 });




$('div.select_bo_cate a.sel').click(function () {  
	if($(this).siblings('ul').css("display") == "none"){   
		$(this).siblings('ul').animate({"height":"show"},300);
	} else {  
		$(this).siblings('ul').animate({"height":"hide"},300); 
	}  
}); 



$(".plist img").hover(function() {
	$(this).next().fadeIn(500);
});

$(".plist").mouseleave(function() {
	$(".pi_u").fadeOut(500);
});
