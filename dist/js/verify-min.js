!function(s){function i(i,t){var n=!1;if(15==t.length){var a=[],h=[],e=[],l=10;h[0]=l;for(var o=0;o<t.length;o++)e[o]=parseInt(t.substring(o,o+1),l),a[o]=h[o]%11+e[o],0==a[o]%l?h[o+1]=20:h[o+1]=a[o]%l*2;1==a[14]%l?(n=!0,i.siblings(".hint").fadeOut(),s(this).removeClass("act")):(n=!1,i.siblings(".hint").html("营业执照编号错误!").fadeIn(),s(this).addClass("act"),console.log("营业执照编号错误!"))}else""==t?(console.log("营业执照为空!"),i.siblings(".hint").html("营业执照为空!").fadeIn(),s(this).addClass("act"),n=!1):(n=!1,i.siblings(".hint").html("营业执照格式不对，必须是15位数的！").fadeIn(),s(this).addClass("act"),console.log("营业执照格式不对，必须是15位数的！"));return n}jQuery.support.cors=!0,s(".business_license").keyup(function(){var t=s(this).val();i(s(this),t)}),s(".regIdNo").keyup(function(){if(!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(s(this).val()))return s(this).siblings(".hint").show(),s(this).addClass("act"),!1;s(this).siblings(".hint").hide(),s(this).removeClass("act")}),s(".isMobile").keyup(function(){if(!/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(s(this).val()))return s(this).siblings(".hint").show(),s(this).addClass("act"),!1;s(this).siblings(".hint").hide(),s(this).removeClass("act")}),s(".isEmail").keyup(function(){if(!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(s(this).val()))return s(this).siblings(".hint").show(),s(this).addClass("act"),!1;s(this).siblings(".hint").hide(),s(this).removeClass("act")})}(jQuery);