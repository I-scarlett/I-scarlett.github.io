(function(d){var h=[];d.loadImages=function(a,e){"string"==typeof a&&(a=[a]);for(var f=a.length,g=0,b=0;b<f;b++){var c=document.createElement("img");c.onload=function(){g++;g==f&&d.isFunction(e)&&e()};c.src=a[b];h.push(c)}}})(window.jQuery);
$.fn.hasAttr = function(name) { var attr = $(this).attr(name); return typeof attr !== typeof undefined && attr !== false; };


$(document).ready(function() {
r=function(){dpi=window.devicePixelRatio;$('.js-6').attr('src', (dpi>1) ? 'images/sj-340.jpeg' : 'images/sj-170.jpeg');
$('.js-7').attr('src', (dpi>1) ? 'images/screen-shot-2017-11-20-at-1.02.35-pm-600.jpg' : 'images/screen-shot-2017-11-20-at-1.02.35-pm-300.jpg');
$('.js-8').attr('src', (dpi>1) ? 'images/frenchnovel-600.jpg' : 'images/frenchnovel-300.jpg');
$('.js-9').attr('src', (dpi>1) ? 'images/screen-shot-2017-11-29-at-4.14.01-pm-600.jpg' : 'images/screen-shot-2017-11-29-at-4.14.01-pm-300.jpg');};
if(!window.HTMLPictureElement){r();}
(function(){$('a[href^="#"]:not(.allowConsent,.noConsent,.denyConsent,.removeConsent)').each(function(){$(this).click(function(){var t=this.hash.length>1?$('[name="'+this.hash.slice(1)+'"]').offset().top:0;return $("html, body").animate({scrollTop:t},400),!1})})})();

});