var swiper = new Swiper('.swiper-container', {
	slidesPerView: 1,
	spaceBetween: 0,
	loop: true, //유투브 영상을 첫번째 컷으로 사용하실 경우 false 로 지정하셔야 합니다. 유투브영상이 없거나 두번째이상 컷에 넣으신다면 true 로 바꾸셔도 됩니다.
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	paginationClickable: true,
	speed: 1000,
	autoplay: {
		delay: 5000,
		disableOnInteraction: false
	}
});

swiper.on('slideChange', function () {	
	var isVideoa = swiper.slides[swiper.activeIndex].querySelector('#bgndVideo1');
	if (isVideoa) {		
		$("#bgndVideo").YTPPlay();	
	}else{
		$("#bgndVideo").YTPPause();
	}
});

$( ".swiper-container" ).mouseover(function(){
	$(".swiper-button-next").show();
	$(".swiper-button-prev").show();
});
$( ".swiper-container" ).mouseleave(function(){
	$(".swiper-button-next").hide();
	$(".swiper-button-prev").hide();
});
