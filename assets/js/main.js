$(function(){

});
$(window).scroll(function(){
	var wScroll = $(this).scrollTop();
	var viewportHeight = $( window ).height();
	var headerHeight= $('header').height();
	if(wScroll > 0){
		$('header').css({
			'background-color' : 'rgba(0, 0, 0, 0.5)'
		});
	} else {
		$('header').css({
			'background-color' : 'rgba(0, 0, 0, 0)'
		});
	}
});
