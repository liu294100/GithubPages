define(function(require, exports, module) {
	window.$ = window.jQuery = require('jquery');
    require('jquery');
    require('bootstrap');
	require('common/bootstrap-modal-hack2');

    require('flexisel');
    


   
	exports.load = function(name) {
		if (window.app.jsPaths[name.split('/', 1)[0]] == undefined) {
			name = window.app.basePath + '/bundles/topxiaweb/js/controller/' + name;
		}

		seajs.use(name, function(module) {
			if ($.isFunction(module.run)) {
				module.run();
			}
		});

	};

	window.app.load = exports.load;


   
   

     jQuery(function(){

        $("#wechatpay").on('click',function(){
            $('#wechatinfo').css('display','block');

        });


        $("#subscribemail").focus(function(){
            var txt_value=$(this).val();
            if(txt_value=="请输入你的邮箱"){
                $(this).val("");
            }
            $(this).addClass("focus");
        });

        $("#subscribemail").blur(function(){
            var txt_value=$(this).val();
            if(txt_value==""){
                $(this).val("请输入你的邮箱");
            }

            $(this).removeClass("focus");
        });

       $("#subscribsubmit").bind("click",function(event){
          
           var email=$("#subscribemail").val();
            
           if(email=="" || email=="请输入你的邮箱"){
           
            $("#subscribmsg").html("<p>邮箱不能为空.</p>");
             event.preventDefault();


           }else{
              $("#subscribmsg").html("");
              $.post("/backend/register.php",{
                email:$("#subscribemail").val(),
                channel:$("#subscribchannel").val()

              },function(data,textStatus){
                $("#subscribmsg").append(data.message);
              });
           }

       });
       

        $("#searchkeyword").blur(function(){

        
        if($("#searchkeyword").val().trim()!=""){
            window.location.href="/search?categoryIds=&q="+ $("#searchkeyword").val();
        }
      
        
        });


      $("#searchkeyword").keyup(function(e){
         var e = e || event,
        keycode = e.which || e.keyCode;
       
       if (keycode==13) {
          if($("#searchkeyword").val().trim()!=""){
            window.location.href="http://www.1ke.co/search?categoryIds=&q="+ $("#searchkeyword").val();
           }
          }
       });

      


      //if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well
            var MqL = 1170;
            //move nav element position according to window width
            moveNavigation();
           $(window).on('resize', function(){
                (!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
           });

           
           //mobile - open lateral menu clicking on the menu icon
        $('.cd-nav-trigger').on('click', function(event){
        event.preventDefault();
        if( $('.cd-main-content').hasClass('nav-is-visible') ) {
            closeNav();
            $('.cd-overlay').removeClass('is-visible');
        } else {
            $(this).addClass('nav-is-visible');
            $('.cd-primary-nav').addClass('nav-is-visible');
            $('.cd-main-header').addClass('nav-is-visible');
            $('.cd-main-content').addClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                $('body').addClass('overflow-hidden');
            });
            toggleSearch('close');
            $('.cd-overlay').addClass('is-visible');
        }
    });

    //open search form
    $('.cd-search-trigger').on('click', function(event){
        event.preventDefault();
        toggleSearch();
        closeNav();
    });




    //close lateral menu on mobile 
    $('.cd-overlay').on('swiperight', function(){
        if($('.cd-primary-nav').hasClass('nav-is-visible')) {
            closeNav();
            $('.cd-overlay').removeClass('is-visible');
        }
    });
    $('.nav-on-left .cd-overlay').on('swipeleft', function(){
        if($('.cd-primary-nav').hasClass('nav-is-visible')) {
            closeNav();
            $('.cd-overlay').removeClass('is-visible');
        }
    });
    $('.cd-overlay').on('click', function(){
        closeNav();
        toggleSearch('close')
        $('.cd-overlay').removeClass('is-visible');
    });


    //prevent default clicking on direct children of .cd-primary-nav 
    $('.cd-primary-nav').children('.has-children').children('a').on('click', function(event){
        event.preventDefault();
    });
    //open submenu
    $('.has-children').children('a').on('click', function(event){
        if( !checkWindowWidth() ) event.preventDefault();
        var selected = $(this);
        if( selected.next('ul').hasClass('is-hidden') ) {
            //desktop version only
            selected.addClass('selected').next('ul').removeClass('is-hidden').end().parent('.has-children').parent('ul').addClass('moves-out');
            selected.parent('.has-children').siblings('.has-children').children('ul').addClass('is-hidden').end().children('a').removeClass('selected');
            $('.cd-overlay').addClass('is-visible');
        } else {
            selected.removeClass('selected').next('ul').addClass('is-hidden').end().parent('.has-children').parent('ul').removeClass('moves-out');
            $('.cd-overlay').removeClass('is-visible');
        }
        toggleSearch('close');
    });

    //submenu items - go back link
    $('.go-back').on('click', function(){
        $(this).parent('ul').addClass('is-hidden').parent('.has-children').parent('ul').removeClass('moves-out');
    });

    function closeNav() {
        $('.cd-nav-trigger').removeClass('nav-is-visible');
        $('.cd-main-header').removeClass('nav-is-visible');
        $('.cd-primary-nav').removeClass('nav-is-visible');
        $('.has-children ul').addClass('is-hidden');
        $('.has-children a').removeClass('selected');
        $('.moves-out').removeClass('moves-out');
        $('.cd-main-content').removeClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
            $('body').removeClass('overflow-hidden');
        });
    }

    function toggleSearch(type) {
        if(type=="close") {
            //close serach 
            $('.cd-search').removeClass('is-visible');
            $('.cd-search-trigger').removeClass('search-is-visible');
        } else {
            //toggle search visibility
            $('.cd-search').toggleClass('is-visible');
            $('.cd-search-trigger').toggleClass('search-is-visible');
            
            if($(window).width() > MqL && $('.cd-search').hasClass('is-visible')) $('.cd-search').find('input[type="search"]').focus();
            if($(window).width() < MqL && $('.cd-search').hasClass('is-visible')) {
                $('html, body').animate({ scrollTop:0 }, 'fast');
                $('.cd-search').find('input[type="search"]').focus();
            }
            
            ($('.cd-search').hasClass('is-visible')) ? $('.cd-overlay').addClass('is-visible') : $('.cd-overlay').removeClass('is-visible') ;
        }
    }

    function checkWindowWidth() {
        //check window width (scrollbar included)
        var e = window, 
            a = 'inner';
        if (!('innerWidth' in window )) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        if ( e[ a+'Width' ] >= MqL ) {
            return true;
        } else {
            return false;
        }
    }

    function moveNavigation(){
        
        var navigation = $('.cd-nav');
        var desktop = checkWindowWidth();
        if ( desktop ) {
            navigation.detach();
            navigation.insertBefore('.cd-header-buttons');
        } else {
            navigation.detach();
            navigation.insertAfter('.cd-main-content');
        }
    }




    if($(".course-dashboard-page .coursewrap  .section iframe")){

     if(screen.width<768 ){
   // alert("这是手机");
    if(document.body.clientWidth>window.screen.width){
    /// alert("屏幕是横着放的");
      
       $(".course-dashboard-page .coursewrap  .section iframe").attr("height",310);
    
    
    }else{
     // alert("屏幕是竖着放的");   
          $(".course-dashboard-page .coursewrap  .section iframe").attr("width", 259);
          $(".course-dashboard-page .coursewrap  .section iframe").attr("height",145);     
   }

  }else{
   $(".course-dashboard-page .coursewrap  .section iframe").attr("width", 730);
   $(".course-dashboard-page .coursewrap  .section iframe").attr("height",411);
  }

   }


    $(".flexiselDemo3").flexisel({
                                        visibleItems: 5,
                                        animationSpeed: 1000,
                                        autoPlay: true,
                                        autoPlaySpeed: 3000,            
                                        pauseOnHover: true,
                                        enableResponsiveBreakpoints: true,
                                        responsiveBreakpoints: { 
                                            portrait: { 
                                                changePoint:480,
                                                visibleItems: 1
                                            }, 
                                            landscape: { 
                                                changePoint:640,
                                                visibleItems: 2
                                            },
                                            tablet: { 
                                                changePoint:768,
                                                visibleItems: 3
                                            }
                                        }
                                    });





    });




	


	




   

	

   

	




	
		

	



  



	






	if (app.themeGlobalScript) {
		exports.load(app.themeGlobalScript);
	}

	if (app.controller) {
		exports.load(app.controller);
	}


	$(document).ajaxError(function(event, jqxhr, settings, exception) {
		var json = jQuery.parseJSON(jqxhr.responseText);
			error = json.error;
		if (!error) {
			return ;
		}

		if (error.name == 'Unlogin') {
			$('.modal').modal('hide');

			$("#login-modal").modal('show');
			$.get($('#login-modal').data('url'), function(html){
				$("#login-modal").html(html);
			});
		}
	});

	if ($('html').hasClass('lt-ie8')) {
		var message = '<div class="alert alert-warning" style="margin-bottom:0;text-align:center;">';
		message += '您的浏览器版本太低，不能正常使用本站，请使用';
		message += '<a href="http://windows.microsoft.com/zh-CN/internet-explorer/downloads/ie" target="_blank">IE8浏览器</a>、';
		message += '<a href="http://www.baidu.com/s?wd=%E8%B0%B7%E6%AD%8C%E6%B5%8F%E8%A7%88%E5%99%A8" target="_blank">谷歌浏览器</a><strong>(推荐)</strong>、';
		message += '<a href="http://firefox.com.cn/download/" target="_blank">Firefox浏览器</a>，访问本站。';
		message += '</div>';

		$('body').prepend(message);
	}

	$( document ).ajaxSend(function(a, b, c) {
		if (c.type == 'POST') {
			b.setRequestHeader('X-CSRF-Token', $('meta[name=csrf-token]').attr('content'));
		}
	});


    floatConsult();

    function floatConsult()
    {
        var $element = $('#float-consult');
        if ($element.length == 0) {
            return ;
        }

        if ($element.data('display') == 'off') {
            return ;
        }

        var marginTop = (0 - $element.height() / 2) + 'px' ;

        var isIE10 = /MSIE\s+10.0/i.test(navigator.userAgent)
	    && (function() {"use strict";return this === undefined;}());

	    var isIE11 = (/Trident\/7\./).test(navigator.userAgent);

    	if (isIE10 || isIE11) {
	        $element.css( {marginTop: marginTop, visibility: 'visible',marginRight:'16px'});
    	} else {
	        $element.css( {marginTop: marginTop, visibility: 'visible'});
    	}

        $element.find('.btn-group-vertical .btn').popover({
            placement: 'left',
            trigger: 'hover',
            html: true,
            content: function() {
                return $($(this).data('contentElement')).html();
            }
        });
    }

    $("i.hover-spin").mouseenter(function() {
    	$(this).addClass("md-spin");
    }).mouseleave(function() {
    	$(this).removeClass("md-spin");
    });

  


});