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
				$('.mainMenu').addClass('act');
            }
			else {
				$('.mainMenu').removeClass('act');
            }
    });
});

// // Create a media condition that targets viewports at least 768px wide
// const mediaQuery = window.matchMedia('(min-width: 1024px)')

// // Check if the media query is true
// if (mediaQuery.matches) {
//     // Then trigger an alert
//     $('.menuBtn').toggleClass('act');
//         if($('.menuBtn').hasClass('act')) {
//             $('.mainMenu').addClass('act');
//         }
// }


// function myFunction(x) {
//     x.classList.toggle('act');
// }

// function myFunction() {
//     var x = document.getElementById("myTopnav");
//     if (x.className === "topnav") {
//       x.className += " responsive";
//     } else {
//       x.className = "topnav";
//     }
//  }