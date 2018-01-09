(function(){
    // 移动端首页================================
    $('.contact').on('click',function() {
        $('.contact-flag').fadeIn('fast',function() {
            $('.contact-con').stop().animate({'bottom':0},'fast');
        });

    });
    $('.closes-contact,.contact-flag').on('click',function() {
        $('.contact-con').stop().animate({'bottom':'-10rem'},'fast',function() {
            $('.contact-flag').hide();
        });
    });

    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    $('.downloadApp').on('click',function() {
        if(isiOS){
            $(this).attr('href',$(this).attr('ioshref'));
            $('.downCode').show();
        }else if(isAndroid){
            $(this).attr('href',$(this).attr('andhref'));
            $('.downCode').hide();
        }
    })

    $(".downloadApp").on("touchstart", touchStart);
    $(".downloadApp").on("touchend", touchEnd);
    $(".downloadApp").on("mouseover", touchStart);
    $(".downloadApp").on("mouseout", touchEnd);

    function touchStart(event) {
        $(this).addClass("hover");
    }

    function touchEnd(event) {
        $(this).removeClass("hover");
    }
})();