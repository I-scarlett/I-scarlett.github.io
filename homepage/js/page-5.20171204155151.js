(function(d){var h=[];d.loadImages=function(a,e){"string"==typeof a&&(a=[a]);for(var f=a.length,g=0,b=0;b<f;b++){var c=document.createElement("img");c.onload=function(){g++;g==f&&d.isFunction(e)&&e()};c.src=a[b];h.push(c)}}})(window.jQuery);
$.fn.hasAttr = function(name) { var attr = $(this).attr(name); return typeof attr !== typeof undefined && attr !== false; };


$(document).ready(function() {
r=function(){dpi=window.devicePixelRatio;$('.js-13').attr('src', (dpi>1) ? 'images/sj-340.jpeg' : 'images/sj-170.jpeg');
$('.js-14').attr('src', (dpi>1) ? 'images/screen-shot-2017-11-27-at-11.55.41-am-1600-2.jpg' : 'images/screen-shot-2017-11-27-at-11.55.41-am-800-2.jpg');};
if(!window.HTMLPictureElement){r();}
(function(){$('a[href^="#"]:not(.allowConsent,.noConsent,.denyConsent,.removeConsent)').each(function(){$(this).click(function(){var t=this.hash.length>1?$('[name="'+this.hash.slice(1)+'"]').offset().top:0;return $("html, body").animate({scrollTop:t},400),!1})})})();
$('.js-15').mouseenter(function() { $.loadImages((window.devicePixelRatio > 1) ? 'images/screen-shot-2017-11-27-at-11.55.41-am-1600-1.jpg' : 'images/screen-shot-2017-11-27-at-11.55.41-am-800-1.jpg', function() { }) });
$('.js-15').magnificPopup({ type: 'image', closeOnContentClick: true, closeBtnInside: false, mainClass: 'mfp-fade js-15-lightbox mfp-no-margins mfp-with-zoom', image: { verticalFit: true }, zoom: { enabled: true, duration: 300 }, callbacks: { elementParse: function(item) { item.src = (window.devicePixelRatio > 1) ? 'images/screen-shot-2017-11-27-at-11.55.41-am-1600-1.jpg' : 'images/screen-shot-2017-11-27-at-11.55.41-am-800-1.jpg'; } } });
var wl = new woolite();
wl.init();
wl.addAnimation($('.js-14')[0], "1.00s", "0.00s", 1, 100);
wl.start();

});