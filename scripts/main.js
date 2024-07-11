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
                toggleBodyScrolling(); // Schakel scrollen van de achtergrond uit
            }
			else {
                $('.mainMenu').removeClass('act');
                $('header').removeClass('act');
                $('a.logo').removeClass('act');
                toggleBodyScrolling(); // Schakel scrollen van de achtergrond in
            }
    });

    function toggleBodyScrolling() {
        document.body.style.overflow = (document.body.style.overflow === "hidden") ? "auto" : "hidden";
    }
});


// ----- Dit zorgt ervoor dat de link kleur veranderd wanneer die geklikt is ----- //
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.link');

    links.forEach(function(link) {
        link.addEventListener('click', function(event) {
            this.classList.add('clicked');
        });
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


const observerSP = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('showSP');
         } 
        else {
            entry.target.classList.remove('showSP');
        }
    });
});

const hiddenSPElements = document.querySelectorAll('.hiddenSP');
hiddenSPElements.forEach((el) => observerSP.observe(el));


const observerPT = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('showPT');
         } 
        // else {
        //     entry.target.classList.remove('showPT');
        // }
    });
});

const hiddenPTElements = document.querySelectorAll('.hiddenPT');
hiddenPTElements.forEach((el) => observerPT.observe(el));


function setReferrer() {
    var referrer = window.location.href;
    var formLink = document.getElementById('form-link');
    formLink.href += '?referrer=' + encodeURIComponent(referrer);
}

window.onload = setReferrer;