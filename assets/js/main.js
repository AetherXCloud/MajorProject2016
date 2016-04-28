var bound = false;
$(function(){
	if($( window ).width() < 800){
		bindApprenticeships();
	} else {
		$('section#apprenticeship-section .inner .column .title').next().css('display', 'block');
		$('section#apprenticeship-section .inner .column .title').each(function(){
			$(this).children('p').children('strong').text($(this).text().slice(0,-2));
		});
	}
});
$( window ).resize(function() {
	if($( window ).width() < 800) {
		bindApprenticeships(true);
	} else {
		unbindApprenticeships();
	}
});

// $(window).scroll(function(){
// 	var wScroll = $(this).scrollTop();
// 	var viewportHeight = $( window ).height();
// 	var headerHeight= $('header').height();
// });


function bindApprenticeships(addDropdown = false) {
	if(!bound){
		bound = true;
		if (addDropdown) {
			$('section#apprenticeship-section .inner .column .title').each(function(){
				$(this).children('p').children('strong').text($(this).text() + " ▼");
			});
		}

		$('section#apprenticeship-section .inner .column .title').on("click", function(){
			var oldtext = $(this).children('p').children('strong').text();
			var newtext;
			if (oldtext.indexOf("▼") >= 0) {
				newtext = oldtext.slice(0,-1) + "▲";
			} else {
				newtext = oldtext.slice(0,-1) + "▼";
			}
			$(this).children('p').children('strong').text(newtext);
			$(this).next().slideToggle("normal");
		});

		$('section#apprenticeship-section .inner .column .title').next().css('display', 'none');
	}
}

function unbindApprenticeships() {
	if (bound){
		bound = false;
		$('section#apprenticeship-section .inner .column .title').off();
		$('section#apprenticeship-section .inner .column .title').next().css('display', 'block');
		$('section#apprenticeship-section .inner .column .title').each(function(){
			$(this).children('p').children('strong').text($(this).text().slice(0,-2));
		});
	}
}
