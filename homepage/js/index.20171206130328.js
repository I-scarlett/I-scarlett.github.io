(function(d){var h=[];d.loadImages=function(a,e){"string"==typeof a&&(a=[a]);for(var f=a.length,g=0,b=0;b<f;b++){var c=document.createElement("img");c.onload=function(){g++;g==f&&d.isFunction(e)&&e()};c.src=a[b];h.push(c)}}})(window.jQuery);
$.fn.hasAttr = function(name) { var attr = $(this).attr(name); return typeof attr !== typeof undefined && attr !== false; };

function em1(){var c="t{iboh35:Ahnbjm/dpn";var addr="mailto:";for(var i=0;i<c.length;i++)addr+=String.fromCharCode(c.charCodeAt(i)-1);window.location.href=addr;}

$(document).ready(function() {
r=function(){dpi=window.devicePixelRatio;$('.js').attr('src', (dpi>1) ? 'images/sj-340.jpeg' : 'images/sj-170.jpeg');
$('.js-2').attr('src', (dpi>1) ? 'images/contact-email-linecon-36.png' : 'images/contact-email-linecon-18.png');
$('.js-3').attr('src', (dpi>1) ? 'images/circle-linkedin-icon-36.png' : 'images/circle-linkedin-icon-18.png');
$('.js-4').attr('src', (dpi>1) ? 'images/github-128-36.png' : 'images/github-128-18.png');
$('.js-5').attr('src', (dpi>1) ? 'images/02-dribbble-128-36.png' : 'images/02-dribbble-128-18.png');};
if(!window.HTMLPictureElement){r();}
(function(){$('a[href^="#"]:not(.allowConsent,.noConsent,.denyConsent,.removeConsent)').each(function(){$(this).click(function(){var t=this.hash.length>1?$('[name="'+this.hash.slice(1)+'"]').offset().top:0;return $("html, body").animate({scrollTop:t},400),!1})})})();

});