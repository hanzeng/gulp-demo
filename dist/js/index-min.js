!function(){function a(a){var t=$(".navLine");switch(a){case 4:t.stop().animate({left:"230px"},"fast");break;case 3:t.stop().animate({left:"342px"},"fast");break;case 2:t.stop().animate({left:"474px"},"fast");break;case 1:t.stop().animate({left:"606px"},"fast");break;case 0:t.stop().animate({left:"740px"},"fast")}}function t(){$.each($(".navli li"),function(t){$(this).hasClass("act")&&a(t)})}function s(a){$(".rightBtn").click(function(){if(a>=8)return a=0,$(".slide-con ul").stop().animate({left:0},"fast"),void p.removeClass("act").eq(a).addClass("act");var t=-100*++a;$(".slide-con ul").stop().animate({left:t+"%"},"fast"),p.removeClass("act").eq(a).addClass("act")}),$(".leftBtn").click(function(){if(a<=0)return a=8,$(".slide-con ul").stop().animate({left:"-800%"},"fast"),void p.removeClass("act").eq(a).addClass("act");var t=-100*--a;$(".slide-con ul").stop().animate({left:t+"%"},"fast"),p.removeClass("act").eq(a).addClass("act")})}function i(a){var t=new RegExp("(^|&)"+a+"=([^&]*)(&|$)"),s=window.location.search.substr(1).match(t);return null!=s?unescape(s[2]):null}function n(a){a?$.ajax({url:f+"/api/cust/getCustDetail",type:"GET",dataType:"JSON",data:{custId:a.custId},success:function(t){if(1==t.code){$(".personal-con").find(".Mobile").val(t.result.custMobile),$(".personal-con").find(".Email").val(t.result.custEmail);var s=t.result.custType,i="";i+='<div class="on">',i+='   <a href="javascript:;">',i+='       <div class="user-mess clearfix">',i+='           <div class="user-pic">',i+='               <span class="iconfont">&#xe603;</span>',i+='               <img src="" alt="">',i+="           </div>",i+='           <div class="user-name">',i+="               <p>"+a.custName+"</p>",i+=0==s?"               <span>未认证</span>":'               <span class="act">已认证</span>',i+="           </div>",i+="       </div>",i+='       <div class="user-flag">',i+="           <ul>",i+="               <li>",i+="                   <object>",i+='                       <a href="personal.html">',i+='                           <span class="iconfont">&#xe603;</span>',i+="                           <span>个人资料</span>",i+="                       </a>",i+="                   </object>",i+="               </li>",i+="               <li>",i+="                   <object>",i+='                       <a class="AuTypeBtn">',i+='                           <span class="iconfont">&#xe63d;</span>',i+="                           <span>帐号认证</span>",i+="                       </a>",i+="                   </object>",i+="               </li>",i+="               <li>",i+="                   <object>",i+='                       <a class="Logout" href="javascript:;">',i+='                           <span class="iconfont">&#xe600;</span>',i+="                           <span>退出登录</span>",i+="                       </a>",i+="                   </object>",i+="               </li>",i+="           </ul>",i+="       </div>",i+="   </a>",i+="</div>",$(".personal").html(i)}},error:function(){alert("请求超时")}}):$(".personal").html('<div class="off">\n                <a id="signUp">登录</a>\n                <a id="signIn">注册</a>\n            </div>')}function e(){var a="";a+='<div class="black-overlay">',a+='<div id="login_frame">',a+='<div class="close"><i></i></div>',a+='   <div class="signUp">',a+='       <img class="signLogo" src="images/login_logo.png" alt="">',a+='       <input class="inName" type="text" placeholder="请输入用户名" />',a+='       <input class="inPass" type="password" placeholder="请输入密码" />',a+='       <a class="btn loginBtn" href="javascript:;">登录</a>',a+='       <a class="signUpA" href="javascript:;">还没有账号？<i>点击注册>></i></a>',a+="   </div>",a+='   <div class="signIn">',a+='       <img class="signLogo" src="images/login_logo.png" alt="">',a+='       <input class="inName" type="text" maxlength="18" placeholder="最长18个英文或9个汉字"/>',a+='       <input class="inPass" type="password" placeholder="请输入密码" />',a+='       <a class="btn addCustomer" href="javascript:;">注册</a>',a+='       <a class="signInA" href="javascript:;">已有帐号？<i>登录到擎锋科技</i></a>',a+="   </div>",a+="<div>",a+="<div>",$("body").append(a)}function c(a){"signIn"==a?($(".signIn").show(),$(".signUp").hide()):($(".signUp").show(),$(".signIn").hide()),$(".mask").show()}function o(a,t){$.ajax({url:f+"/api/cust/login",type:"POST",dataType:"JSON",data:{custName:a,custPassword:t},success:function(a){1==a.code&&($(".black-overlay").fadeOut().remove(),n(a.result),localStorage.setItem("result",JSON.stringify(a.result)),h=a.result)},error:function(){alert("请求超时")}})}function l(a,t){$.ajax({url:f+"/api/cust/addCustomer",type:"POST",dataType:"JSON",data:{custName:a,custPassword:t},success:function(a){console.log(a)},error:function(){alert("请求超时")}})}function u(a,t,s){var i=a.split(",")[1],n="http://upload-z2.qiniu.com/putb64/"+s,e=new XMLHttpRequest;e.onreadystatechange=function(){if(4==e.readyState){var a=JSON.parse(e.responseText);y=a.key}},e.open("POST",n,!0),e.setRequestHeader("Content-Type","application/octet-stream"),e.setRequestHeader("Authorization","UpToken "+t),e.send(i)}function d(a){var t=a;if(t.indexOf("http://oqfrrk27o.bkt.clouddn.com/")>=0)return t=t.split("http://oqfrrk27o.bkt.clouddn.com/").join("")}function r(a,t){var s=$(".authentication").find(".name").val(),i=$(".authentication").find(".regIdNo").val(),n=$(".authentication").find(".isEmail").val(),e=$(".authentication").find(".isMobile").val(),c=$(".authentication").find(".companyName").val(),o=($(".authentication").find("#province").val(),$(".authentication").find("#city").val(),$(".authentication").find(".detailedAdd").val()),l=$("#myPhoto").attr("src");return 2!=a||c?s?e?void(t?$.ajax({url:f+"/api/auth/editAdmin",type:"POST",dataType:"JSON",data:{id:void 0,custId:h.custId,authName:s,authCompanyName:c,authMobile:e,authCode:i,authPic1:y||d(l),authType:a,authEmail:n,authAddress:o,authStatus:0,mark:void 0},success:function(t){1==t.code&&($("body").remove(".loading"),window.location.href="uploadInfo-success.html?type="+a)},error:function(){alert("请求超时")}}):$.ajax({url:f+"/api/auth/addAuth",type:"POST",dataType:"JSON",data:{custId:h.custId,authName:s,authCompanyName:c,authMobile:e,authCode:i,authPic1:y,authType:a,authEmail:n,authAddress:o},success:function(t){1==t.code&&($("body").remove(".loading"),window.location.href="uploadInfo-success.html?type="+a)},error:function(){alert("请求超时")}})):(alert("请填写联系方式"),!1):(alert("请填写姓名"),!1):(alert("请填写公司全称"),!1)}jQuery.support.cors=!0,t(),$(".navli li").mouseenter(function(){a($(this).index()),$(this).find(".subhead").stop().slideDown("fast")}).mouseleave(function(){t(),$(this).find(".subhead").stop().slideUp("fast")}),$(".personal .on").mouseenter(function(){$(this).find(".user-flag").stop().slideDown("fast")}).mouseleave(function(){$(this).find(".user-flag").stop().slideUp("fast")});var p=$(".application-con .nav span");s(0),p.click(function(){p.removeClass("act").eq($(this).index()).addClass("act"),$(".slide-con ul").stop().animate({left:-100*$(this).index()+"%"},"fast"),s($(this).index())}),$(".smallPic li").hover(function(){$(".bigPic").hide(),$(this).parents(".smallPic").siblings(".bigPic").show();var a=$(this).find("img").attr("src").replace(/.png/g,"_pre.png");$(".bigPic img").attr("src",a)}),$(".allPic").mouseleave(function(){$(".bigPic").hide()}),$(".personal-ul li").click(function(){$(this).addClass("act").siblings().removeClass("act"),$(".success-con").hide().eq($(this).index()).fadeIn()}).eq(0).click();var f="http://web.72change.net",h=localStorage.getItem("result");h&&(h=JSON.parse(h)),n(h),$(".personal").on("click",".AuTypeBtn",function(){$.ajax({url:f+"/api/auth/getAuthDetail",type:"GET",dataType:"JSON",data:{custId:h.custId},success:function(a){if(1==a.code){var t=a.result.authStatus;window.location.href=0==t?"uploadInfo-success.html?type="+a.result.authType:1==t?"authentication-success.html?authStatus="+a.result.authType:-1==t?"authentication-fail.html?authStatus="+a.result.authType:"AuType.html"}},error:function(){alert("请求超时")}})}),$(".personal").on("click","#signUp",function(){e(),c("signUp")}),$(".personal").on("click","#signIn",function(){e(),c("signIn")}),$("body").on("click",".signUpA",function(){$("#login_frame").addClass("switching"),setTimeout(function(){$(".signIn").show(),$(".signUp").hide()},400),setTimeout(function(){$("#login_frame").removeClass("switching")},800)}),$("body").on("click",".signInA",function(){$("#login_frame").addClass("switching"),setTimeout(function(){$(".signUp").show(),$(".signIn").hide()},400),setTimeout(function(){$("#login_frame").removeClass("switching")},800)}),$("body").on("click",".close",function(){$(".black-overlay").fadeOut().remove()}),$("body").on("click",".loginBtn",function(){o($(this).siblings(".inName").val(),$(this).siblings(".inPass").val())}),$("body").on("click",".addCustomer",function(){l($(this).siblings(".inName").val(),$(this).siblings(".inPass").val())}),$("body").on("click",".Logout",function(){$.ajax({url:f+"/api/cust/cancelCustomer",type:"POST",dataType:"JSON",data:{custId:h.custId},success:function(a){1==a.code&&(localStorage.removeItem("result"),n(),window.location.href="index.html")},error:function(){alert("请求超时")}})}),$(".authentication-user").find(".opt").on("click","label",function(){$(this).find("input").is(":checked")?($(this).addClass("on").siblings().removeClass("on"),$(this).find("input").prop("checked",!0)):($(this).removeClass("on"),$(this).find("input").prop("checked",!1))});var v=i("authStatus");$(".AuType-con").on("click","li",function(){var a=$(this).index();$.ajax({url:f+"/api/auth/getAuthDetail",type:"GET",dataType:"JSON",data:{custId:h.custId},success:function(t){if(1==t.code){var s=t.result;0==a?1==s.authStatus&&1==s.authType?window.location.href="authentication-success.html?authStatus="+s.authType:window.location.href="authentication-user.html":1==s.authStatus&&2==s.authType?window.location.href="authentication-success.html?authStatus="+s.authType:window.location.href="authentication-group.html"}},error:function(){alert("请求超时")}})});var m,g,b=document.getElementById("filee"),y="";if(b&&(b.onchange=function(){var a=new FileReader;if(b.files.length>0){if(a.readAsDataURL(b.files[0]),m=b.files[0].size,!(b.files[0].size/1024/1024<2))return alert("上传图片大小不能超过 2MB!"),!1;a.onload=function(a){$("#myPhoto").attr("src",a.target.result).siblings("span").addClass("act"),g=a.target.result,$.ajax({url:f+"/api/cust/getQiniuToken",type:"GET",dataType:"JSON",success:function(a){if(1==a.code){var t=a.result;u(g,t,m)}},error:function(){alert("请求超时")}})}}}),v?($.ajax({url:f+"/api/auth/getAuthDetail",type:"GET",dataType:"JSON",data:{custId:h.custId},success:function(a){if(1==a.code){var t=a.result;$(".authentication").find(".name").val(t.authName),$(".authentication").find(".regIdNo").val(t.authCode),$(".authentication").find(".isEmail").val(t.authEmail),$(".authentication").find(".isMobile").val(t.authMobile),$(".authentication").find(".companyName").val(t.authCompanyName),$(".authentication").find(".detailedAdd").val(t.authAddress),$(".authentication").find("#myPhoto").attr("src",t.authPic1),$("#myPhoto").siblings("span").addClass("act")}},error:function(){alert("请求超时")}}),$(".authentication-user").find(".sub-btn").click(function(){r(1,v)}),$(".authentication-group").find(".sub-btn").click(function(){r(2,v)})):($(".authentication-user").find(".sub-btn").click(function(){r(1)}),$(".authentication-group").find(".sub-btn").click(function(){r(2)})),i("type")?($(".succeed-h").text("账号认证资料提交成功"),$(".succeed-p").text("认证审核过程为1-3个工作日，审核结果会有客服联系您！")):($(".succeed-h").text("项目资料上传成功"),$(".succeed-p").text("项目将会在1-3个工作日之后完成报价，并与您取得联系！")),v){switch($(".authentication-success-con,.authentication-fail-con").find(".name").text(h.custName),v){case"1":$(".upgrade").show();break;case"2":$(".upgrade").hide()}$(".revise").click(function(){switch(v){case"1":window.location.href="authentication-user.html?authStatus=1";break;case"2":window.location.href="authentication-group.html?authStatus=2"}}),$(".upgrade").click(function(){window.location.href="authentication-group.html?authStatus=2"})}h&&$(".personal-con").find(".userName").html(h.custName),$(".personal-con").find(".revampBtn").click(function(){var a=$(".personal-con").find(".Mobile").val(),t=$(".personal-con").find(".Email").val(),s=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;return/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(a)?s.test(t)?void $.ajax({url:f+"/api/cust/editCustomer",type:"POST",dataType:"JSON",data:{custId:h.custId,custMobile:a,custEmail:t,custWeixin:void 0,custQq:void 0,custStatus:void 0,mark:void 0},success:function(a){1==a.code&&alert("修改成功")},error:function(){alert("请求超时")}}):(alert("电子邮箱填写错误！"),!1):(alert("手机号码填写错误！"),!1)}),$(".personal-con").on("click",".btnPass",function(){var a=$(".success-pass").find(".oldPass").val(),t=$(".success-pass").find(".newPass").val(),s=$(".success-pass").find(".repeatPass").val();return/^\w{6,16}$/.test(t)?($(".success-pass").find(".newPass").siblings(".hint").hide(),t!==s?($(".success-pass").find(".repeatPass").siblings(".hint").show(),!1):($(".success-pass").find(".repeatPass").siblings(".hint").hide(),void $.ajax({url:f+"/api/cust/editCustomerPassword",type:"POST",dataType:"JSON",data:{custName:h.custName,custOldPassword:a,custNewPassword:s},success:function(a){console.log(a),1==a.code?alert("修改成功"):3001==a.code&&$(".success-pass").find(".oldPass").siblings(".hint").show()},error:function(){alert("请求超时")}}))):($(".success-pass").find(".newPass").siblings(".hint").show(),!1)}),$("body").append($(' <div class="contact-our">\n        <div class="list li02">\n            <a href="javascript:;">\n                <div class="flag">\n                    <i></i>\n                    <img src="images/wechat.jpg" alt="">\n                    <p>扫一扫关注微信公众号</p>\n                </div>\n            </a>\n        </div>\n        <div class="list li03">\n            <a href="javascript:;">\n                <div class="flag">\n                    <i></i>\n                    <p>3512401426</p>\n                </div>\n            </a>\n        </div>\n        <div class="list li01">\n            <a href="javascript:;">\n                <div class="flag">\n                    <i></i>\n                    <p>0755-23055305</p>\n                </div>\n            </a>\n        </div>\n        <div class="list li04">\n            <a href="javascript:;">\n                <div class="flag">\n                    <i></i>\n                    <p>sd@hibaby.mobi</p>\n                </div>\n            </a>\n        </div>\n    </div>\n    <div class="backTop">\n        <a href="javascript:;"></a>\n    </div>')),$(window).scroll(function(){$(window).scrollTop()>=800?$(".backTop").show():$(".backTop").hide()}),$(".backTop").click(function(){return $("body,html").animate({scrollTop:0},"fast"),!1}),$(".back-btn").click(function(){window.history.back()})}();