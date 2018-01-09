(function() {
    jQuery.support.cors = true;
    // nav效果
    function reference(i){
        var ele = $('.navLine');
        switch (i) {
            case 4:
                ele.stop().animate({left: '230px'}, 'fast');
                break;
            case 3:
                ele.stop().animate({left: '342px'}, 'fast');
                break;
            case 2:
                ele.stop().animate({left: '474px'}, 'fast');
                break;
            case 1:
                ele.stop().animate({left: '606px'}, 'fast');
                break;
            case 0:
                ele.stop().animate({left: '740px'}, 'fast');
                break;
        }
    }

    function refresh () {
        $.each($('.navli li'),function(i) {
            if($(this).hasClass('act')){
                reference(i);
            }
        });
    }
    refresh ();

    $('.navli li').mouseenter(function () {
        var idx = $(this).index();
        reference(idx);
        $(this).find('.subhead').stop().slideDown('fast');
    }).mouseleave(function(){
        refresh ();
        $(this).find('.subhead').stop().slideUp('fast');
    });

    $('.personal .on').mouseenter(function () {
        $(this).find('.user-flag').stop().slideDown('fast');
    }).mouseleave(function(){
        $(this).find('.user-flag').stop().slideUp('fast');
    });


    // 应用场景=========================================
    var page = 0;
    var navlist = $('.application-con .nav span');
    function check(page){
        $('.rightBtn').click(function() {
            if(page >= 8){
                page = 0;
                $('.slide-con ul').stop().animate({left: 0}, 'fast');
                navlist.removeClass('act').eq(page).addClass('act');
                return;
            }else{
                page++;
                var num = page * -100;
                $('.slide-con ul').stop().animate({left: num + '%'}, 'fast');
                navlist.removeClass('act').eq(page).addClass('act');
            }
        });
        $('.leftBtn').click(function() {
            if(page <= 0){
                page = 8;
                $('.slide-con ul').stop().animate({left: -800+'%'}, 'fast');
                navlist.removeClass('act').eq(page).addClass('act');
                return;
            }else{
                page--;
                var num = page * -100;
                $('.slide-con ul').stop().animate({left: num + '%'}, 'fast');
                navlist.removeClass('act').eq(page).addClass('act');
            }
        });
    }
    check(page);

    navlist.click(function(){
        navlist.removeClass('act').eq($(this).index()).addClass('act');
        $('.slide-con ul').stop().animate({left: $(this).index()*-100 + '%'}, 'fast');
        check($(this).index());
    });


    // 产品中心=======================================
    $('.smallPic li').hover(function() {
        $('.bigPic').hide();
        $(this).parents('.smallPic').siblings('.bigPic').show();
        var e = $(this).find('img').attr('src');
        var pic = e.replace(/.png/g, "_pre.png");
        $('.bigPic img').attr('src',pic);
    });

    $('.allPic').mouseleave(function(){
        $('.bigPic').hide();
    });
    // 个人中心======================
    $('.personal-ul li').click(function() {
        $(this).addClass('act').siblings().removeClass('act');
        $('.success-con').hide().eq($(this).index()).fadeIn();
    }).eq(0).click();

    // api===========================================
    var Houst = 'http://web.72change.net';
    var result = localStorage.getItem('result');
    if(result){
        result = JSON.parse(result);
    }
    isLogin(result);

    function GetQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }

    //验证登录注册
    function isLogin(b) {
        if(b){

            //获取个人信息
            $.ajax({
                url : Houst + '/api/cust/getCustDetail',
                type: 'GET',
                dataType: 'JSON',
                data: {
                    custId: b.custId
                },
                success : function(de){
                    if(de.code==1){
                        $('.personal-con').find('.Mobile').val(de.result.custMobile);
                        $('.personal-con').find('.Email').val(de.result.custEmail);
                        var custType = de.result.custType;
                        var html = '';
                        html += '<div class="on">';
                        html += '   <a href="javascript:;">';
                        html += '       <div class="user-mess clearfix">';
                        html += '           <div class="user-pic">';
                        html += '               <span class="iconfont">&#xe603;</span>';
                        html += '               <img src="" alt="">';
                        html += '           </div>';
                        html += '           <div class="user-name">';
                        html += '               <p>'+ b.custName +'</p>';
                        //0未认证 1个人认证  2公司认证
                        if(custType == 0){
                            html += '               <span>未认证</span>';
                        }else{
                            html += '               <span class="act">已认证</span>';
                        }
                        html += '           </div>';
                        html += '       </div>';
                        html += '       <div class="user-flag">';
                        html += '           <ul>';
                        html += '               <li>';
                        html += '                   <object>';
                        html += '                       <a href="personal.html">';
                        html += '                           <span class="iconfont">&#xe603;</span>';
                        html += '                           <span>个人资料</span>';
                        html += '                       </a>';
                        html += '                   </object>';
                        html += '               </li>';
                        html += '               <li>';
                        html += '                   <object>';
                        html += '                       <a class="AuTypeBtn">';
                        html += '                           <span class="iconfont">&#xe63d;</span>';
                        html += '                           <span>帐号认证</span>';
                        html += '                       </a>';
                        html += '                   </object>';
                        html += '               </li>';
                        html += '               <li>';
                        html += '                   <object>';
                        html += '                       <a class="Logout" href="javascript:;">';
                        html += '                           <span class="iconfont">&#xe600;</span>';
                        html += '                           <span>退出登录</span>';
                        html += '                       </a>';
                        html += '                   </object>';
                        html += '               </li>';
                        html += '           </ul>';
                        html += '       </div>';
                        html += '   </a>';
                        html += '</div>';
                        $('.personal').html(html);
                    }
                },
                error:function(){
                    alert('请求超时')
                }
            });
        }else{
            $('.personal').html('<div class="off">\n' +
                '                <a id="signUp">登录</a>\n' +
                '                <a id="signIn">注册</a>\n' +
                '            </div>');
        }
    }

    $('.personal').on('click','.AuTypeBtn',function() {
        $.ajax({
            url : Houst + '/api/auth/getAuthDetail',
            type: 'GET',
            dataType: 'JSON',
            data: {
                custId: result.custId
            },
            success : function(de){
                if(de.code==1){
                    var authStatus = de.result.authStatus;
                    if(authStatus == 0){
                        window.location.href="uploadInfo-success.html?type=" + de.result.authType;
                    }else if(authStatus == 1){
                        window.location.href="authentication-success.html?authStatus=" + de.result.authType;
                    }else if(authStatus == -1){
                        window.location.href="authentication-fail.html?authStatus=" + de.result.authType;
                    }else{
                        window.location.href="AuType.html";
                    }
                }
            },
            error:function(){
                alert('请求超时')
            }
        });
    });


    // 登录
    function login_add(){
        var html = '';
        html += '<div class="black-overlay">';
        html += '<div id="login_frame">';
        html += '<div class="close"><i></i></div>';
        html += '   <div class="signUp">';
        html += '       <img class="signLogo" src="images/login_logo.png" alt="">';
        html += '       <input class="inName" type="text" placeholder="请输入用户名" />';
        html += '       <input class="inPass" type="password" placeholder="请输入密码" />';
        html += '       <a class="btn loginBtn" href="javascript:;">登录</a>';
        html += '       <a class="signUpA" href="javascript:;">还没有账号？<i>点击注册>></i></a>';
        // html += '    <p>';
        // html += '        <em></em>';
        // html += '        <span>使用第三方账号登录</span>';
        // html += '    </p>';
        // html += '    <div class="other">';
        // html += '        <a class="iconfont a01" href="">&#xe604;</a>';
        // html += '        <a class="iconfont a02" href="">&#xe63f;</a>';
        // html += '    </div>';
        html += '   </div>';
        html += '   <div class="signIn">';
        html += '       <img class="signLogo" src="images/login_logo.png" alt="">';
        html += '       <input class="inName" type="text" maxlength="18" placeholder="最长18个英文或9个汉字"/>';
        html += '       <input class="inPass" type="password" placeholder="请输入密码" />';
        // html += '       <p class="clearfix">';
        // html += '           <input type="text" placeholder="请输入验证码" />';
        // html += '           <img src="" alt="">';
        // html += '       </p>';
        html += '       <a class="btn addCustomer" href="javascript:;">注册</a>';
        html += '       <a class="signInA" href="javascript:;">已有帐号？<i>登录到擎锋科技</i></a>';
        html += '   </div>';
        html += '<div>';
        html += '<div>';
        $('body').append(html);
    }
    function login_frame(type) {
        if(type == 'signIn'){
            $('.signIn').show();
            $('.signUp').hide();
        }else{
            $('.signUp').show();
            $('.signIn').hide();
        }
        $('.mask').show();
    }
    $('.personal').on('click','#signUp',function() {
        login_add();
        login_frame('signUp');
    });
    $('.personal').on('click','#signIn',function() {
        login_add();
        login_frame('signIn');
    });
    $('body').on('click','.signUpA',function() {
        $('#login_frame').addClass('switching');
        setTimeout(function() {
            $('.signIn').show();
            $('.signUp').hide();
        },400);
        setTimeout(function() {
            $('#login_frame').removeClass('switching');
        },800);
    });
    $('body').on('click','.signInA',function() {
        $('#login_frame').addClass('switching');
        setTimeout(function() {
            $('.signUp').show();
            $('.signIn').hide();
        },400);
        setTimeout(function() {
            $('#login_frame').removeClass('switching');
        },800)
    });
    $('body').on('click','.close',function() {
        $('.black-overlay').fadeOut().remove();
    });


    function login(name, pass) {
        $.ajax({
            url : Houst + '/api/cust/login',
            type: 'POST',
            dataType: 'JSON',
            data: {
                custName: name,
                custPassword: pass
            },
            success : function(de){
                if(de.code == 1){
                    $('.black-overlay').fadeOut().remove();
                    isLogin(de.result);
                    localStorage.setItem('result', JSON.stringify(de.result));
                    result = de.result;
                }
            },
            error:function(){
                alert('请求超时')
            }
        })
    }
    $('body').on('click','.loginBtn',function() {
        var name = $(this).siblings('.inName').val();
        var pass = $(this).siblings('.inPass').val();
        login(name, pass);
    });

    function addCustomer(name, pass) {
        $.ajax({
            url : Houst + '/api/cust/addCustomer',
            type: 'POST',
            dataType: 'JSON',
            data: {
                custName: name,
                custPassword: pass
            },
            success : function(de){
                console.log(de);
            },
            error:function(){
                alert('请求超时')
            }
        })
    }
    $('body').on('click','.addCustomer',function() {
        var name = $(this).siblings('.inName').val();
        var pass = $(this).siblings('.inPass').val();
        addCustomer(name, pass);
    });


    //退出登录
    $('body').on('click','.Logout',function() {
        $.ajax({
            url : Houst + '/api/cust/cancelCustomer',
            type: 'POST',
            dataType: 'JSON',
            data: {
                custId: result.custId
            },
            success : function(de){
                if(de.code == 1){
                    localStorage.removeItem('result');
                    isLogin();
                    window.location.href="index.html";
                }
            },
            error:function(){
                alert('请求超时')
            }
        })
    });


    //个人认证 公司认证=================================
    $('.authentication-user').find('.opt').on('click','label',function() {
        if ($(this).find('input').is(":checked")) {
            $(this).addClass('on').siblings().removeClass('on');
            $(this).find('input').prop("checked", true);
        }else{
            $(this).removeClass('on');
            $(this).find('input').prop("checked", false);
        }
    });
    var authStatus = GetQueryString('authStatus');
    //获取认证信息
    $('.AuType-con').on('click','li',function() {
        var idx = $(this).index();
        $.ajax({
            url : Houst + '/api/auth/getAuthDetail',
            type: 'GET',
            dataType: 'JSON',
            data: {
                custId: result.custId
            },
            success : function(de){
                if(de.code==1){
                    var getDetail = de.result;
                    if(idx == 0){
                        if(getDetail.authStatus == 1 && getDetail.authType == 1){
                            window.location.href="authentication-success.html?authStatus=" + getDetail.authType;
                        }else{
                            window.location.href="authentication-user.html";
                        }

                    }else{
                        if(getDetail.authStatus == 1 && getDetail.authType == 2){
                            window.location.href="authentication-success.html?authStatus=" + getDetail.authType;
                        }else{
                            window.location.href="authentication-group.html";
                        }
                    }
                }else{

                }
            },
            error:function(){
                alert('请求超时')
            }
        });
    });


    var file = document.getElementById('filee');
    var size;
    //新头像的本地路径
    var newImgURLFromFile;
    var KeyImg = '';

    //从相册获取头像并上传
    if(file){
        file.onchange = function () {
            var fr = new FileReader();
            if (file.files.length > 0) {
                fr.readAsDataURL(file.files[0]);
                size = file.files[0].size;
                var isLt2M = file.files[0].size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    alert('上传图片大小不能超过 2MB!');
                    return false;
                }
                fr.onload = function (e) {
                    $('#myPhoto').attr('src', e.target.result).siblings('span').addClass('act');
                    newImgURLFromFile = e.target.result;

                    //获取七牛token
                    $.ajax({
                        url : Houst + '/api/cust/getQiniuToken',
                        type: 'GET',
                        dataType: 'JSON',
                        success : function(de){
                            if(de.code==1){
                                var qnToken = de.result;
                                putb64(newImgURLFromFile, qnToken, size);
                            }
                        },
                        error:function(){
                            alert('请求超时')
                        }
                    });
                };
            }
        };
    }

    function putb64(picture, token, size) {
        var pic = picture.split(',')[1];
        var url = "http://upload-z2.qiniu.com/putb64/" + size; //非华南空间需要根据注意事项 1 修改上传域名
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var obj = JSON.parse(xhr.responseText);
                KeyImg = obj.key;
            }
        };
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/octet-stream");
        xhr.setRequestHeader("Authorization", "UpToken " + token);
        xhr.send(pic);
    }

    function dateIndexOf(val) {
        var varsrc = val;
        if(varsrc.indexOf("http://oqfrrk27o.bkt.clouddn.com/") >= 0) {
            varsrc = varsrc.split("http://oqfrrk27o.bkt.clouddn.com/").join("");
            return varsrc;
        }
    }

    function authenticationSnb(type, status) {
        var name = $('.authentication').find('.name').val();
        var regIdNo = $('.authentication').find('.regIdNo').val();
        var Email = $('.authentication').find('.isEmail').val();
        var Mobile = $('.authentication').find('.isMobile').val();
        var companyName = $('.authentication').find('.companyName').val();
        var province = $('.authentication').find('#province').val();
        var city = $('.authentication').find('#city').val();
        var detailedAdd = $('.authentication').find('.detailedAdd').val();
        var imgSrc = $('#myPhoto').attr('src');
        var addArr = [province,city,detailedAdd];

        if(type==2){
            if(!companyName) {
                alert('请填写公司全称');
                return false;
            }
        }
        if(!name){
            alert('请填写姓名');
            return false;
        }else if(!Mobile) {
            alert('请填写联系方式');
            return false;
        }

        if(status){
            $.ajax({
                url : Houst + '/api/auth/editAdmin',
                type: 'POST',
                dataType: 'JSON',
                data: {
                    id: undefined,
                    custId: result.custId,
                    authName: name,
                    authCompanyName: companyName,
                    authMobile: Mobile,
                    authCode: regIdNo,
                    authPic1: KeyImg || dateIndexOf(imgSrc),
                    authType: type,
                    authEmail: Email,
                    authAddress: detailedAdd,
                    authStatus: 0,
                    mark: undefined
                },
                success : function(de){
                    if(de.code == 1){
                        $('body').remove('.loading');
                        window.location.href="uploadInfo-success.html?type=" + type;
                    }
                },
                error:function(){
                    alert('请求超时')
                }
            })
        }else{
            $.ajax({
                url : Houst + '/api/auth/addAuth',
                type: 'POST',
                dataType: 'JSON',
                data: {
                    custId: result.custId,
                    authName: name,
                    authCompanyName: companyName,
                    authMobile: Mobile,
                    authCode: regIdNo,
                    authPic1: KeyImg,
                    authType: type,
                    authEmail: Email,
                    authAddress: detailedAdd
                },
                success : function(de){
                    if(de.code == 1){
                        $('body').remove('.loading');
                        window.location.href="uploadInfo-success.html?type=" + type;
                    }
                },
                error:function(){
                    alert('请求超时')
                }
            })
        }
    }

    //认证信息回显
    if(authStatus){
        $.ajax({
            url : Houst + '/api/auth/getAuthDetail',
            type: 'GET',
            dataType: 'JSON',
            data: {
                custId: result.custId
            },
            success : function(de){
                if(de.code==1){
                    var getDetail = de.result;
                    $('.authentication').find('.name').val(getDetail.authName);
                    $('.authentication').find('.regIdNo').val(getDetail.authCode);
                    $('.authentication').find('.isEmail').val(getDetail.authEmail);
                    $('.authentication').find('.isMobile').val(getDetail.authMobile);
                    $('.authentication').find('.companyName').val(getDetail.authCompanyName);
                    $('.authentication').find('.detailedAdd').val(getDetail.authAddress);
                    $('.authentication').find('#myPhoto').attr('src',getDetail.authPic1);
                    $('#myPhoto').siblings('span').addClass('act');
                }
            },
            error:function(){
                alert('请求超时')
            }
        });

        $('.authentication-user').find('.sub-btn').click(function() {
            authenticationSnb(1, authStatus);
        });
        $('.authentication-group').find('.sub-btn').click(function() {
            authenticationSnb(2, authStatus);
        });
    }else{
        $('.authentication-user').find('.sub-btn').click(function() {
            authenticationSnb(1);
        });
        $('.authentication-group').find('.sub-btn').click(function() {
            authenticationSnb(2);
        });
    }


    //认证提交成功页
    var authenticationType = GetQueryString('type');
    if(authenticationType){
        $('.succeed-h').text('账号认证资料提交成功');
        $('.succeed-p').text('认证审核过程为1-3个工作日，审核结果会有客服联系您！');
    }else{
        $('.succeed-h').text('项目资料上传成功');
        $('.succeed-p').text('项目将会在1-3个工作日之后完成报价，并与您取得联系！');
    }

    //认证审核通过页
    if(authStatus){
        $('.authentication-success-con,.authentication-fail-con').find('.name').text(result.custName);
        switch (authStatus){
            case '1':
                $('.upgrade').show();
                break;
            case '2':
                $('.upgrade').hide();
                break;
        }
        $('.revise').click(function() {
            switch (authStatus){
                case '1':
                    window.location.href="authentication-user.html?authStatus=1";
                    break;
                case '2':
                    window.location.href="authentication-group.html?authStatus=2";
                    break;
            }
        });
        $('.upgrade').click(function() {
            window.location.href="authentication-group.html?authStatus=2";
        })

    }


    // 个人资料=============================
    if(result){
        $('.personal-con').find('.userName').html(result.custName);
    }
    //修改个人信息
    $('.personal-con').find('.revampBtn').click(function() {
        var Mobile = $('.personal-con').find('.Mobile').val();
        var Email = $('.personal-con').find('.Email').val();
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!myreg.test(Mobile)) {
            alert('手机号码填写错误！');
            return false;
        }
        if(!filter.test(Email)) {
            alert('电子邮箱填写错误！');
            return false;
        }
        $.ajax({
            url : Houst + '/api/cust/editCustomer',
            type: 'POST',
            dataType: 'JSON',
            data: {
                custId: result.custId,
                custMobile: Mobile,
                custEmail: Email,
                custWeixin: undefined,
                custQq: undefined,
                custStatus: undefined,
                mark: undefined
            },
            success : function(de){
                if(de.code==1){
                    alert('修改成功');
                }
            },
            error:function(){
                alert('请求超时')
            }
        });
    });


    //修改密码
    $('.personal-con').on('click','.btnPass',function() {
        var oldPass = $('.success-pass').find('.oldPass').val();
        var newPass = $('.success-pass').find('.newPass').val();
        var repeatPass = $('.success-pass').find('.repeatPass').val();
        if( /^\w{6,16}$/.test( newPass ) ) {
            $('.success-pass').find('.newPass').siblings('.hint').hide();
        }else{
            $('.success-pass').find('.newPass').siblings('.hint').show();
            return false;
        }
        if(newPass !== repeatPass){
            $('.success-pass').find('.repeatPass').siblings('.hint').show();
            return false;
        }else{
            $('.success-pass').find('.repeatPass').siblings('.hint').hide();
        }
        $.ajax({
            url : Houst + '/api/cust/editCustomerPassword',
            type: 'POST',
            dataType: 'JSON',
            data: {
                custName: result.custName,
                custOldPassword: oldPass,
                custNewPassword: repeatPass
            },
            success : function(de){
                console.log(de);
                if(de.code == 1){
                    alert('修改成功');
                }else if(de.code == 3001){
                    $('.success-pass').find('.oldPass').siblings('.hint').show();
                }
            },
            error:function(){
                alert('请求超时')
            }
        })

    });


    // 浮动窗口
    $('body').append($(' <div class="contact-our">\n' +
        '        <div class="list li02">\n' +
        '            <a href="javascript:;">\n' +
        '                <div class="flag">\n' +
        '                    <i></i>\n' +
        '                    <img src="images/wechat.jpg" alt="">\n' +
        '                    <p>扫一扫关注微信公众号</p>\n' +
        '                </div>\n' +
        '            </a>\n' +
        '        </div>\n' +
        '        <div class="list li03">\n' +
        '            <a href="javascript:;">\n' +
        '                <div class="flag">\n' +
        '                    <i></i>\n' +
        '                    <p>3512401426</p>\n' +
        '                </div>\n' +
        '            </a>\n' +
        '        </div>\n' +
        '        <div class="list li01">\n' +
        '            <a href="javascript:;">\n' +
        '                <div class="flag">\n' +
        '                    <i></i>\n' +
        '                    <p>0755-23055305</p>\n' +
        '                </div>\n' +
        '            </a>\n' +
        '        </div>\n' +
        '        <div class="list li04">\n' +
        '            <a href="javascript:;">\n' +
        '                <div class="flag">\n' +
        '                    <i></i>\n' +
        '                    <p>sd@hibaby.mobi</p>\n' +
        '                </div>\n' +
        '            </a>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="backTop">\n' +
        '        <a href="javascript:;"></a>\n' +
        '    </div>'));

    // 回到顶部
    $(window).scroll(function(){
        if($(window).scrollTop() >= 800){
            $('.backTop').show();
        }else{
            $('.backTop').hide();
        }
    });
    $('.backTop').click(function() {
        $('body,html').animate({scrollTop:0}, 'fast');
        return false;
    });

    // 返回上一页
    $('.back-btn').click(function() {
        window.history.back();  //返回上一页
    });


})();
