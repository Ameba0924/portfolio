
$(function(){


	
	
	

	





	var arrows;
    if (KTUtil.isRTL()) {
        arrows = {
            leftArrow: '<i class="la la-angle-right"></i>',
            rightArrow: '<i class="la la-angle-left"></i>'
        }
    } else {
        arrows = {
            leftArrow: '<i class="la la-angle-left"></i>',
            rightArrow: '<i class="la la-angle-right"></i>'
        }
    }
	$('#kt_datepicker_1, #kt_datepicker_2').datepicker({
		rtl: KTUtil.isRTL(),
		todayHighlight: true,
		orientation: "bottom left",
		templates: arrows,
		language: "kr",
		format: "yyyy-mm-dd",
		autoclose: true

	});

	$(".kt_datepicker").each(function(){
		$(this).datepicker({
			rtl: KTUtil.isRTL(),
			todayHighlight: true,
			orientation: "bottom left",
			templates: arrows,
			language: "kr",
			format: "yyyy-mm-dd",
			autoclose: true

		});
	});

	setTimeout(function(){
		$('[data-switch=true]').bootstrapSwitch();
		$('.bootstrap-select').selectpicker();
	},10);	

	$.fn.datepicker.dates['kr'] = {
		days: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"],
		daysShort: ["일", "월", "화", "수", "목", "금", "토", "일"],
		daysMin: ["일", "월", "화", "수", "목", "금", "토", "일"],
		months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
		monthsShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
	};

	// 메뉴 활성화
	var foloderPageName = location.pathname;
	$(".kt-menu__link").each(function(){
		var is_break = false;
		var href = $(this).attr("href");
		if(href){
			console.log(href);
			var href_new = "";
			var href_arr = href.split("/");
			if(href_arr[0]){
				href_new = "/" + href_arr[3] + "/" + href_arr[4];				

				if(foloderPageName == href_new){
					$(this).parents(".kt-menu__item").addClass("kt-menu__item--open");
					return false;
				}
			}			
		}
	});

	$(".copy_btn").click(function(){
		var dataAlert = $(this).attr("data-alert");
		var dataTarget = $(this).attr("data-target");

		//$(dataTarget).select() //복사할 텍스트를 선택
		//document.execCommand("copy") //클립보드 복사 실행

		//START :복사
		 var $temp = $("<input>");
		  $("body").append($temp);
		  $temp.val(dataTarget).select();
		  document.execCommand("copy");
		  $temp.remove();
		//END :복사	
		
		alert(dataAlert);
		//$(dataTarget).blur();
	});

	 
});

function formEnterEvent(ele, callback){
	ele.keyup(function(e){
		if(e.keyCode=="13"){
			callback();
		}
	});
}


function formValidate(ele, messageObjTemp){
	var rulesObj = {};
	var messageObj = {};
	
	/*
	ele.find("[data-required]").each(function(){
		var name = $(this).attr("name");
		rulesObj[name] = {required:true}		

		$.each(messageObjTemp, function (index, item) {
			messageObj[index] = {
				required:item
			}
		})
	});*/
	
	$.each(messageObjTemp, function (index, item) {
		rulesObj[index] = {required:true}
		messageObj[index] = {
			required:item
		}
	})

	ele.validate({
		onfocusout:false,
		onkeyup:false,
		rules: rulesObj,
		messages:messageObj,
		showErrors:function(errorMap, errorList){
			if(this.numberOfInvalids()) {
				// errorList[0].element.focus();
				alert(errorList[0].message);
			}
		}
	});
	
}

function formSubmitCheck(ele, complete){
	var is_complete = false;
	var form = ele.closest('form');
	var dataTarget = ele.attr("data-target");
	
	if(dataTarget)
	form = $(dataTarget);

	
	ele.click(function(e){
		var url = form.attr("action");	
		var submit_url = ele.attr("data-ajax-url");
		if(submit_url){
			url = submit_url;
		}
		e.preventDefault();
		
		if (!form.valid()) {
			return;
		}

		if(complete){ // complete custom 함수가 있다면 체크하기
			is_complete = complete(form[0]);
			if(is_complete==undefined){
				alert("오류 발생 : return 명시되지 않음");
			}
		}else{ // 없다면 강제로 complete
			is_complete = true;
		}
		
		// submit 시키기
		if(is_complete){
			// submit 함수
			ele.addClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', true);

			form.ajaxSubmit({
                url: url,
                success: function(response, status, xhr, $form) {
					 try {
						var obj = $.parseJSON(response);
					} catch (e) {
						var obj = {};
					}
					console.log(obj["alert"]);
                	// similate 2s delay
					if(obj["alert"] != "" && obj["alert"] != undefined){
						alert(obj["alert"]);
						ele.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);

						if(obj["link"] == "reload"){
							location.reload();							
						}else if(obj["link"]){
							location.href = obj["link"];
						}
					}else{
						if(obj["link"] == "reload"){
							location.reload();							
						}else if(obj["link"]){
							location.href = obj["link"];
						}
					}
					/*
                	setTimeout(function() {
	                    btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
	                    showErrorMsg(form, 'danger', 'Incorrect username or password. Please try again.');
                    }, 2000);*/
                }
            });

			// form.submit();
		}	
		

	});	
}





/**
 * 우편번호 창
 **/
var win_zip = function(frm_name, frm_zip, frm_addr1, frm_addr2, frm_jibeon) {
    if(typeof daum === 'undefined'){
        alert("다음 우편번호 postcode.v2.js 파일이 로드되지 않았습니다.");
        return false;
    }

    var zip_case = 0;   //0이면 레이어, 1이면 페이지에 끼워 넣기, 2이면 새창

    var complete_fn = function(data){
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 각 주소의 노출 규칙에 따라 주소를 조합한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var fullAddr = ''; // 최종 주소 변수
        var extraAddr = ''; // 조합형 주소 변수

        // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
            fullAddr = data.roadAddress;

        } else { // 사용자가 지번 주소를 선택했을 경우(J)
            fullAddr = data.jibunAddress;
        }

        // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
        if(data.userSelectedType === 'R'){
            //법정동명이 있을 경우 추가한다.
            if(data.bname !== ''){
                extraAddr += data.bname;
            }
            // 건물명이 있을 경우 추가한다.
            if(data.buildingName !== ''){
                extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
            extraAddr = (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
        }

        // 우편번호와 주소 정보를 해당 필드에 넣고, 커서를 상세주소 필드로 이동한다.
        var of = document[frm_name];

        of[frm_zip].value = data.zonecode;

        of[frm_addr1].value = fullAddr;
        //of[frm_addr3].value = extraAddr;

        if(of[frm_jibeon] !== undefined){
            of[frm_jibeon].value = data.userSelectedType;
        }
        
        setTimeout(function(){
            of[frm_addr2].focus();
        } , 100);
    };

    switch(zip_case) {
        case 1 :    //iframe을 이용하여 페이지에 끼워 넣기
            var daum_pape_id = 'daum_juso_page'+frm_zip,
                element_wrap = document.getElementById(daum_pape_id),
                currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
            if (element_wrap == null) {
                element_wrap = document.createElement("div");
                element_wrap.setAttribute("id", daum_pape_id);
                element_wrap.style.cssText = 'display:none;border:1px solid;left:0;width:100%;height:300px;margin:5px 0;position:relative;-webkit-overflow-scrolling:touch;';
                element_wrap.innerHTML = '<img src="//i1.daumcdn.net/localimg/localimages/07/postcode/320/close.png" id="btnFoldWrap" style="cursor:pointer;position:absolute;right:0px;top:-21px;z-index:1" class="close_daum_juso" alt="접기 버튼">';
                jQuery('form[name="'+frm_name+'"]').find('input[name="'+frm_addr1+'"]').before(element_wrap);
                jQuery("#"+daum_pape_id).off("click", ".close_daum_juso").on("click", ".close_daum_juso", function(e){
                    e.preventDefault();
                    jQuery(this).parent().hide();
                });
            }

            new daum.Postcode({
                oncomplete: function(data) {
                    complete_fn(data);
                    // iframe을 넣은 element를 안보이게 한다.
                    element_wrap.style.display = 'none';
                    // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
                    document.body.scrollTop = currentScroll;
                },
                // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분.
                // iframe을 넣은 element의 높이값을 조정한다.
                onresize : function(size) {
                    element_wrap.style.height = size.height + "px";
                },
                maxSuggestItems : 10,
                width : '100%',
                height : '100%'
            }).embed(element_wrap);

            // iframe을 넣은 element를 보이게 한다.
            element_wrap.style.display = 'block';
            break;
        case 2 :    //새창으로 띄우기
            new daum.Postcode({
                oncomplete: function(data) {
                    complete_fn(data);
                }
            }).open();
            break;
        default :   //iframe을 이용하여 레이어 띄우기
            var rayer_id = 'daum_juso_rayer'+frm_zip,
                element_layer = document.getElementById(rayer_id);
            if (element_layer == null) {
                element_layer = document.createElement("div");
                element_layer.setAttribute("id", rayer_id);
                element_layer.style.cssText = 'display:none;border:5px solid;position:fixed;width:300px;height:460px;left:50%;margin-left:-155px;top:50%;margin-top:-235px;overflow:hidden;-webkit-overflow-scrolling:touch;z-index:10000';
                element_layer.innerHTML = '<img src="//i1.daumcdn.net/localimg/localimages/07/postcode/320/close.png" id="btnCloseLayer" style="cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1" class="close_daum_juso" alt="닫기 버튼">';
                document.body.appendChild(element_layer);
                jQuery("#"+rayer_id).off("click", ".close_daum_juso").on("click", ".close_daum_juso", function(e){
                    e.preventDefault();
                    jQuery(this).parent().hide();
                });
            }

            new daum.Postcode({
                oncomplete: function(data) {
                    complete_fn(data);
                    // iframe을 넣은 element를 안보이게 한다.
                    element_layer.style.display = 'none';
                },
                maxSuggestItems : 10,
                width : '100%',
                height : '100%'
            }).embed(element_layer);

            // iframe을 넣은 element를 보이게 한다.
            element_layer.style.display = 'block';
    }
}

