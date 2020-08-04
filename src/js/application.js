var selectedOld = "";
var selectedNew = "";

$(document).ready(function() {
	setup_events();	
	$(document).trigger("scroll");
});

function setup_events() {

	$(document).on('scroll', function() {
		var scrollPos = $(document).scrollTop(); 
		var windowHeight = $(window).height();
		var selectedId = undefined;
		
		//if (scrollPos > $('#section-top').outerHeight()) {
		if (scrollPos > 0) {
			$('#nav').addClass('fixed');
		} else {
			$('#nav').removeClass('fixed');
		}
		
		selectedNew = "";
		
		$('section').each(function() {
			var content = $(this).find(".content");
			var top = content.position().top;
			var id  = $(this).attr('id');
			
			if (top <= scrollPos+windowHeight && (top+content.outerHeight()) >= scrollPos + 100) {
				//$('a[href="#'+id+'"]').parent().addClass("selected");
				if (selectedNew == "" || selectedNew.indexOf("section-top") >= 0) {
					selectedNew = id;
				}
			} else {
				//$('a[href="#'+id+'"]').parent().removeClass("selected");	
			}
			
			/*if (top < scrollPosSectionSel && (top+$(this).outerHeight()) > scrollPosSectionSel) {
				$('a[href="#'+id+'"]').parent().addClass("selected");
			} else {
				$('a[href="#'+id+'"]').parent().removeClass("selected");
			}*/
		});
		
		if (selectedNew != "") {
			if (selectedNew != selectedOld) {
				$('a[href="#'+selectedNew+'"]').parent().addClass("selected");
				if (selectedOld != "") {
					$('a[href="#'+selectedOld+'"]').parent().removeClass("selected");	
				}
				selectedOld = selectedNew;
			}
		}
		
		var heightThreshold = windowHeight * 5/6;
		
		$('.card:not(.done)').each(function() {
			if ($(this).position().top < (scrollPos + heightThreshold)) {
				$(this).addClass('done');
			}
		});
	});
	
	$('a[href^="#"]').on('click', function (e) {
		e.preventDefault();
		
		var target = $(this.hash);
		
		$('#nav').removeClass('menu-on');
		$('.hamburger').removeClass('is-active');
		
		$('html, body').stop().animate(
			{'scrollTop': target.offset().top},
			500,
			'swing', 
			function() {
				window.location.hash = '#'+target.attr('id');
			}
		);
	});
	
	$('.hamburger').on('click', function() {
		$('#nav').toggleClass('menu-on');
		$(this).toggleClass('is-active');
	});
	
}