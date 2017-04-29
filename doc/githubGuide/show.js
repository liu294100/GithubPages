define(function(require, exports, module) {

    exports.run = function() {
         require('./timeleft').run();
        $('#teacher-carousel').carousel({interval: 0});
        $('#teacher-carousel').on('slide.bs.carousel', function (e) {
            var teacherId = $(e.relatedTarget).data('id');

            $('#teacher-detail').find('.teacher-item').removeClass('teacher-item-active');
            $('#teacher-detail').find('.teacher-item-' + teacherId).addClass('teacher-item-active');
        });
        var Share=require('../../util/share');
        Share.create({
                selector: '.share',
                icons: 'itemsAll',
                display: 'dropdownWithIcon'
            });

        var reviewTabInited = false;

        if (!reviewTabInited) {
            var $reviewTab = $("#course-review-pane-show");

            $.get($reviewTab.data('url'), function(html) {
                $reviewTab.html(html);
                reviewTabInited =  true;
            });

            $reviewTab.on('click', '.pagination a', function(e) {
                e.preventDefault();
                $.get($(this).attr('href'), function(html){
                    $reviewTab.html(html);
                });
            });
        }

        var $body = $(document.body);

        $body.scrollspy({
            target: '.course-nav-tabs',
            offset: 120
        });

        $(window).on('load', function () {
            $body.scrollspy('refresh');
        });

        $('#course-nav-tabs').affix({
            offset: {
                top: 300
            }
        });

        $(window).bind("scroll",function(){ 
            var vtop=$(document).scrollTop();
            if (vtop>300){
                $('li.pull-right').css("display","inline");
            }else{
                $('li.pull-right').css("display","none");
            }

        });


         if($('[data-toggle="tooltip"]')){
              $('[data-toggle="tooltip"]').tooltip();
         }



        $('#course-nav-tabs').on('click', '.btn-index', function(event) {
            event.preventDefault();
            var position = $($(this).data('anchor')).offset();
            var top = position.top - 50;
            $(document).scrollTop(top);
        });

         $("#favorite-btn").on('click', function() {
            var $btn = $(this);
            $.post($btn.data('url'), function(){
                $btn.hide();
                $("#favorite-btn-2").hide();
                $("#favorite-btn-3").hide();
                $("#unfavorite-btn").show();
                $("#unfavorite-btn-2").show();
                $("#unfavorite-btn-3").show();
              
            });
        });

        $("#unfavorite-btn").on('click', function() {
            var $btn = $(this);
            $.post($btn.data('url'), function(){
                $btn.hide();
                $("#unfavorite-btn-2").hide();
                $("#unfavorite-btn-3").hide();
                $("#favorite-btn").show();
                $("#favorite-btn-2").show();
                $("#favorite-btn-3").show();
            });
        });

         $("#favorite-btn-2").on('click', function() {
            var $btn = $(this);
            $.post($btn.data('url'), function(){
                $btn.hide();
                $("#favorite-btn").hide();
                $("#favorite-btn-3").hide();
                $("#unfavorite-btn").show();
                $("#unfavorite-btn-2").show();
                $("#unfavorite-btn-3").show();
            });
        });

        $("#unfavorite-btn-2").on('click', function() {
            var $btn = $(this);
            $.post($btn.data('url'), function(){
                $btn.hide();
                $("#unfavorite-btn").hide();
                $("#unfavorite-btn-3").hide();
                $("#favorite-btn").show();
                $("#favorite-btn-2").show();
                $("#favorite-btn-3").show();
            });
        });

           $("#favorite-btn-3").on('click', function() {
            var $btn = $(this);
            $.post($btn.data('url'), function(){
                $btn.hide();
                $("#favorite-btn").hide();
                $("#favorite-btn-2").hide();
                $("#unfavorite-btn").show();
                $("#unfavorite-btn-2").show();
                $("#unfavorite-btn-3").show();
            });
        });

        $("#unfavorite-btn-3").on('click', function() {
            var $btn = $(this);
            $.post($btn.data('url'), function(){
                $btn.hide();
                $("#unfavorite-btn").hide();
                $("#unfavorite-btn-2").hide();
                $("#favorite-btn").show();
                $("#favorite-btn-2").show();
                $("#favorite-btn-3").show();
            });
        });

        $(".cancel-refund").on('click', function(){
            if (!confirm('真的要取消退款吗？')) {
                return false;
            }

            $.post($(this).data('url'), function(){
                window.location.reload();
            });
        });

        $('.become-use-member-btn').on('click', function() {
            $.post($(this).data('url'), function(result) {
                if (result == true) {
                    window.location.reload();
                } else {
                    alert('加入学习失败，请联系管理员！');
                }
            }, 'json').error(function(){
                alert('加入学习失败，请联系管理员！');
            });
        });

        $('.announcement-list').on('click', '[data-role=delete]', function(){
            if (confirm('真的要删除该公告吗？')) {
                $.post($(this).data('url'), function(){
                    window.location.reload();
                });
            }
            return false;
        });

        // fix for youku iframe player in firefox.
        $('#modal').on('shown.bs.modal', function () {
            $('#modal').removeClass('in');
        });

         $('.follow-btn').on('click', function() {
            var $this = $(this);
            $.post($this.data('url'), function() {
                $this.hide();
                $('.unfollow-btn').show();
            });
        });


        $('.unfollow-btn').on('click', function() {
            var $this = $(this);
            $.post($this.data('url'), function() {
                $this.hide();
                $('.follow-btn').show();
            });
        });




       

       




        

    };

});