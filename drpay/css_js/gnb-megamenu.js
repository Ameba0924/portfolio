/**
 * File Name : navi.js 
 * @author Web business Team / Jessica
 * Email : design@olymcompnay.com
* Date : 2014.02.05
* Update : 2014.02.05
 * Copyright (c) 2014 OLYM abouunications. All Rights Reserved.
 */

function lnb(){
	Gtarget = jQuery('.lnb_wrap');
	G_h = jQuery('.lnb_wrap').height();		//lnb

	Gtarget.find('> ul > li a').bind('mouseenter focus click',function(){
		snb_Flag(0);
	});
	Gtarget.bind('mouseleave',function(){
		snb_Flag(1);
	});

	jQuery('.otherMenu').find('a').focus(function(){
		snb_Flag(1);
	});

	Gtarget.find('> ul > li').bind('mouseenter mouseleave',function(event){
		if(event.type=='mouseenter'){
			if(!jQuery(this).hasClass('current')){
				jQuery(this).addClass('current');
			}
		}else{
			if(!jQuery(this).hasClass('actived')){
				jQuery(this).removeClass('current');
			}
		}
	});

	

	Gtarget.css({'height':60,'visibility':'visible'});

}

function snb_Flag(n){
	if(n==0){
		//snb
		// �꾩떆 �섏젙 190712
		// Gtarget.stop().animate({'height':G_h},900,'easeOutExpo');
		jQuery("#header").addClass("header_on");
	}else{
		//snb
		// �꾩떆 �섏젙 190712
		// Gtarget.stop().animate({'height':60},900,'easeOutExpo');
		setTimeout(function() {
			jQuery("#header").removeClass("header_on");
		}, 140);

	}
}

jQuery(document).ready(function() {
	lnb();
});