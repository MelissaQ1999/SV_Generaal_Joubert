// ----- In dit JavaScript bestand vindt je de code die voor elke pagina nodig is ----- //

// ----- Lader van de website ----- //
$(window).on("load",function(){
    $("#loaderInner").fadeOut("slow");
    $("#doc-loader").delay(400).fadeOut("slow");
});


// ----- Hamburgermenu (de drie streepjes) ----- //
$(document).ready(function(){
	// menu click event
	$('.menuBtn').click(function() {
		$(this).toggleClass('act');
			if($(this).hasClass('act')) {
                // $('html').css('overflow', 'hidden');
                $('.mainMenu').addClass('act');
                $('header').addClass('act');
            }
			else {
                // $('html').css('overflow', 'auto');
                $('.mainMenu').removeClass('act');
                $('header').removeClass('act');
            }
    });
});