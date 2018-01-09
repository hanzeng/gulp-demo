/**
 * Created by Administrator on 2017/6/20.
 */
(function (doc, win) {
  //console.log("dpr:"+win.devicePixelRatio);
  var docEle = doc.documentElement,  //获取文档对象
    isIos = navigator.userAgent.match(/iphone|ipod|ipad/gi),
    dpr=Math.min(win.devicePixelRatio, 3);
  scale = 1 / dpr,

    resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
  docEle.dataset.dpr = dpr;  //设置html data-dpr

  var metaEle = doc.createElement('meta');
  metaEle.name = 'viewport';
  metaEle.content = 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale;
  docEle.firstElementChild.appendChild(metaEle);

  var recalCulate = function (){
    var width = docEle.clientWidth;
    if (width / dpr > 640) {
      width = 640 * dpr;
    }
    docEle.style.fontSize = 100 * (width / 750) + 'px';
  };

  recalCulate();
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvent, recalCulate, false);
})(document, window);
<!--解决移动端点击事件延迟300ms-->
// if ('addEventListener' in document) {
//   document.addEventListener('DOMContentLoaded', function() {
//     FastClick.attach(document.body);
//   }, false);
// }