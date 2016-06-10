var bound = false;
var currentpost = -1;
var currentevent = -1;
var menuon = false;
var fadeTime = 600;
var galleryindex = 0;

$(function(){
	incrementPost("#trade-blog");
	incrementEvent("#event-posts");

	//if window bigger than 880px ensure 2 rows
	if($( window ).width() > 880){
		$("#landing .post .display").css("max-width", ($('#landing .panels .inner').width() - 45) / 2);
	} else {
		$("#landing .post .display").css("max-width", "");
	}

	if($( window ).width() < 800){
		bindApprenticeships();
	} else {
		$('section.dropdown-section .inner .column .title').next().css('display', 'block');
		$('section.dropdown-section .inner .column .title').each(function(){
			$(this).children('p').children('strong').text($(this).text().slice(0,-2));
		});
	}
	$(".hamburger").on("click", function(){
		$("header ul").slideToggle("normal", function(){
			updateHeader();
		});
		$(".hamburger").toggleClass("is-active");
		if (menuon == true){
			menuon = false;
		} else {
			menuon = true;
		}
	});

	$( ".image-grid-section .image-grid .image" ).each(function( index ) {
		$(this).css("background-image", "url('" + $(this).attr("data-src") + "')");
	});

	//gallery
	$('section.gallery-section .grid .gallery .display img').attr('src', $('section.gallery-section .grid .gallery .images img:eq('+ galleryindex + ')').attr("src"));
	$('section.gallery-section .grid .gallery .display .description').text($('section.gallery-section .grid .gallery .images img:eq('+ galleryindex + ')').attr("data-description"));

	$('section.gallery-section .grid .gallery .right-nav').click(function(){
		$('section.gallery-section .grid .gallery .display img').fadeOut(fadeTime, function(){
			if (galleryindex < $('section.gallery-section .grid .gallery .images img').length - 1) {
				galleryindex += 1;
				updateGallery(galleryindex);
			} else {
				galleryindex = 0;
				updateGallery(galleryindex);
			}
			$('section.gallery-section .grid .gallery .display img').fadeIn(fadeTime);
		});

	});

	$('section.gallery-section .grid .gallery .left-nav').click(function(){
		$('section.gallery-section .grid .gallery .display img').fadeOut(fadeTime, function(){
			if (galleryindex > 0) {
				galleryindex -= 1;
				updateGallery(galleryindex);
			} else {
				galleryindex = $('section.gallery-section .grid .gallery .images img').length - 1;
				updateGallery(galleryindex);
			}
			$('section.gallery-section .grid .gallery .display img').fadeIn(fadeTime);
		});
	});

});
$( window ).resize(function() {
	//if window bigger than 880px ensure 2 rows
	if($( window ).width() > 880){
		$("#landing .post .display").css("max-width", ($('#landing .panels .inner').width() - 45) / 2);
	} else {
		$("#landing .post .display").css("max-width", "");
	}
	if($( window ).width() < 800) {
		bindApprenticeships(true);
	} else {
		unbindApprenticeships();
	}
	//show menu if hidden on resizr
	if($( window ).width() > 600){
		if(menuon == true){
			$(".hamburger").removeClass("is-active");
			menuon = false;
		}
		if (menuon == false) {
			$("header ul").css("display", "block");
		}
	}
	if($( window ).width() < 600){
		if(menuon == false){
			$("header ul").css("display", "none");
		}
	}
});

function updateGallery(image) {
	$('section.gallery-section .grid .gallery .display img').attr('src', $('section.gallery-section .grid .gallery .images img:eq('+ image + ')').attr("src"));
	$('section.gallery-section .grid .gallery .display .description').text($('section.gallery-section .grid .gallery .images img:eq('+ image + ')').attr("data-description"));
}

function bindApprenticeships(addDropdown = false) {
	if(!bound){
		bound = true;
		if (addDropdown) {
			$('section.dropdown-section .inner .column .title').each(function(){
				$(this).children('p').children('strong').text($(this).text() + " ▼");
			});
		}

		$('section.dropdown-section .inner .column .title').on("click", function(){
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

		$('section.dropdown-section .inner .column .title').next().css('display', 'none');
	}
}

function unbindApprenticeships() {
	if (bound){
		bound = false;
		$('section.dropdown-section .inner .column .title').off();
		$('section.dropdown-section .inner .column .title').next().css('display', 'block');
		$('section.dropdown-section .inner .column .title').each(function(){
			$(this).children('p').children('strong').text($(this).text().slice(0,-2));
		});
	}
}

function incrementPost(post) {
	var max = $(post).children(".posts").children().length - 1;
	var html = '<a href="{0}"><img src="{1}" alt="" /><h3>{2}</h3><p>{3}</p></a>';
	var code ="";

	$(post).animate({ opacity: 0 }, 500, "swing", function(){
		if(currentpost != max){
			currentpost++;
			var postObject = $(post).children(".posts").children('a:eq('+ currentpost + ")");
			code = String.format(html, postObject.attr("data-link"), postObject.attr("data-src"), postObject.attr("data-heading"), postObject.attr("data-copy"));
		} else {
			currentpost = 0;
			var postObject = $(post).children(".posts").children('a:eq('+ currentpost + ")");
			code = String.format(html, postObject.attr("data-link"), postObject.attr("data-src"), postObject.attr("data-heading"), postObject.attr("data-copy"));
		}
		$(post).children(".display").html(code);
	});

	$(post).animate({ opacity: 1 }, 1000, "swing")
	setTimeout(function(){ incrementPost(post) }, 5000);
}

function incrementEvent(eventclass) {
	var max = $(eventclass).children(".posts").children().length - 1;
	var html = '<a href="{0}"><img src="{1}" alt="" /><h3>{2}</h3><p>{3}</p><p>{4}</p></a>';
	var code ="";
	$(eventclass).animate({ opacity: 0 }, 500, "swing", function(){
		if(currentevent != max){
			currentevent++;
			var postObject = $(eventclass).children(".posts").children('a:eq('+ currentevent + ")");
			code = String.format(html, postObject.attr("data-link"), postObject.attr("data-src"), postObject.attr("data-heading"), postObject.attr("data-date"), postObject.attr("data-copy"));
		} else {
			currentevent = 0;
			var postObject = $(eventclass).children(".posts").children('a:eq('+ currentevent + ")");
			code = String.format(html, postObject.attr("data-link"), postObject.attr("data-src"), postObject.attr("data-heading"), postObject.attr("data-date"), postObject.attr("data-copy"));
		}
		$(eventclass).children(".display").html(code);
	});

	$(eventclass).animate({ opacity: 1 }, 1000, "swing")
	setTimeout(function(){ incrementEvent(eventclass) }, 5000);
}
if (!String.format) {
  String.format = function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

function nonLandingPage() {
	updateHeader();
	$( window ).resize(function() {
		updateHeader();
	});
}
function updateHeader() {
	$("section:eq(0)").css("padding-top", $("header").height() + 40);
}
