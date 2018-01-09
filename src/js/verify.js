;(function($){
    jQuery.support.cors = true;
    // 验证营业执照
    function isValidBusCode($this,busCode){
        //return true;
        var ret=false;
        if(busCode.length==15){
            var sum=0;
            var s=[];
            var p=[];
            var a=[];
            var m=10;
            p[0]=m;
            for(var i=0;i<busCode.length;i++){
                a[i]=parseInt(busCode.substring(i,i+1),m);
                s[i]=(p[i]%(m+1))+a[i];
                if(0==s[i]%m){
                    p[i+1]=10*2;
                }else{
                    p[i+1]=(s[i]%m)*2;
                }
            }
            if(1==(s[14]%m)){
                //营业执照编号正确!
                ret=true;
                $this.siblings('.hint').fadeOut();
                $(this).removeClass('act');
            }else{
                //营业执照编号错误!
                ret=false;
                $this.siblings('.hint').html('营业执照编号错误!').fadeIn();
                $(this).addClass('act');
                console.log("营业执照编号错误!");
            }
        }//如果营业执照为空
        else if(""==busCode){
            console.log("营业执照为空!");
            $this.siblings('.hint').html('营业执照为空!').fadeIn();
            $(this).addClass('act');
            ret=false;
        }else{
            ret=false;
            $this.siblings('.hint').html('营业执照格式不对，必须是15位数的！').fadeIn();
            $(this).addClass('act');
            console.log("营业执照格式不对，必须是15位数的！");
        }
        return ret;
    }

    $('.business_license').keyup(function() {
        var val = $(this).val();
        isValidBusCode($(this),val);
    });

    // 验证身份证号码
    $('.regIdNo').keyup(function() {
        var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if(!regIdNo.test($(this).val())){
            $(this).siblings('.hint').show();
            $(this).addClass('act');
            return false;
        }else{
            $(this).siblings('.hint').hide();
            $(this).removeClass('act');
        }
    });

    // 验证手机号码
    $('.isMobile').keyup(function() {
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(!myreg.test($(this).val())) {
            $(this).siblings('.hint').show();
            $(this).addClass('act');
            return false;
        }else{
            $(this).siblings('.hint').hide();
            $(this).removeClass('act');
        }
    })

    // 验证邮箱
    $('.isEmail').keyup(function() {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!filter.test($(this).val())) {
            $(this).siblings('.hint').show();
            $(this).addClass('act');
            return false;
        }else{
            $(this).siblings('.hint').hide();
            $(this).removeClass('act');
        }
    })

})(jQuery);
