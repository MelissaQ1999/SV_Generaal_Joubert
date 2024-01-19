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
                $('.mainMenu').addClass('act');
                $('header').addClass('act');
                $('a.logo').addClass('act');
            }
			else {
                $('.mainMenu').removeClass('act');
                $('header').removeClass('act');
                $('a.logo').removeClass('act');
            }
    });
});


// ----- Voor het uitvoeren van de animaties door de website heen ----- //
const observerN = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('showN');
         } 
        // else {
        //     entry.target.classList.remove('showN');
        // }
    });
});

const hiddenNElements = document.querySelectorAll('.hiddenN');
hiddenNElements.forEach((el) => observerN.observe(el));


const observerIMG = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('showIMG');
         } 
        // else {
        //     entry.target.classList.remove('showIMG');
        // }
    });
});

const hiddenIMGElements = document.querySelectorAll('.hiddenIMG');
hiddenIMGElements.forEach((el) => observerIMG.observe(el));


const observerSL = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('showSL');
         } 
        else {
            entry.target.classList.remove('showSL');
        }
    });
});

const hiddenSLElements = document.querySelectorAll('.hiddenSL');
hiddenSLElements.forEach((el) => observerSL.observe(el));


const observerSR = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('showSR');
         } 
        else {
            entry.target.classList.remove('showSR');
        }
    });
});

const hiddenSRElements = document.querySelectorAll('.hiddenSR');
hiddenSRElements.forEach((el) => observerSR.observe(el));