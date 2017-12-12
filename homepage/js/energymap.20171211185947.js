(function(d){var h=[];d.loadImages=function(a,e){"string"==typeof a&&(a=[a]);for(var f=a.length,g=0,b=0;b<f;b++){var c=document.createElement("img");c.onload=function(){g++;g==f&&d.isFunction(e)&&e()};c.src=a[b];h.push(c)}}})(window.jQuery);
$.fn.hasAttr = function(name) { var attr = $(this).attr(name); return typeof attr !== typeof undefined && attr !== false; };


$(document).ready(function() {
r=function(){dpi=window.devicePixelRatio;$('.js-19').attr('src', (dpi>1) ? 'images/sj-340.jpeg' : 'images/sj-170.jpeg');
$('.js-20').attr('src', (dpi>1) ? 'images/screen-shot-2017-11-29-at-4.14.01-pm-1598-1.jpg' : 'images/screen-shot-2017-11-29-at-4.14.01-pm-799-1.jpg');};
if(!window.HTMLPictureElement){r();}
(function(){$('a[href^="#"]:not(.allowConsent,.noConsent,.denyConsent,.removeConsent)').each(function(){$(this).click(function(){var t=this.hash.length>1?$('[name="'+this.hash.slice(1)+'"]').offset().top:0;return $("html, body").animate({scrollTop:t},400),!1})})})();
$('.js-21').mouseenter(function() { $.loadImages((window.devicePixelRatio > 1) ? 'images/screen-shot-2017-11-29-at-4.14.01-pm-1600.jpg' : 'images/screen-shot-2017-11-29-at-4.14.01-pm-800.jpg', function() { }) });
$('.js-21').magnificPopup({ type: 'image', closeOnContentClick: true, closeBtnInside: false, mainClass: 'mfp-fade js-21-lightbox mfp-no-margins mfp-with-zoom', image: { verticalFit: true }, zoom: { enabled: true, duration: 300 }, callbacks: { elementParse: function(item) { item.src = (window.devicePixelRatio > 1) ? 'images/screen-shot-2017-11-29-at-4.14.01-pm-1600.jpg' : 'images/screen-shot-2017-11-29-at-4.14.01-pm-800.jpg'; } } });
var wl = new woolite();
wl.init();
wl.addAnimation($('.js-20')[0], "1.00s", "0.00s", 1, 100);
wl.start();

});