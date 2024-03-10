// ----- In dit JavaScript bestand vindt je de code die voor de Accommodatie pagina nodig is ----- //

// ----- Voor de foto carousel op de accommodatie pagina ----- //
document.addEventListener('DOMContentLoaded', function () {
    const carouselContainer = document.querySelector('.carousel-container');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let itemWidth = carouselContainer.querySelector('.carousel-item').offsetWidth + 16; // Breedte van een item

    // Functie om te controleren of er verder kan worden gescrolld naar links
    function canScrollLeft() {
        return carouselContainer.scrollLeft > 0;
    }

    // Functie om te controleren of er verder kan worden gescrolld naar rechts
    function canScrollRight() {
        return carouselContainer.scrollLeft + carouselContainer.offsetWidth < carouselContainer.scrollWidth;
    }

    // Event listener voor het klikken op de pijltjes
    prevButton.addEventListener('click', function () {
        if (canScrollLeft()) {
            carouselContainer.scrollBy({
                left: -itemWidth,
                behavior: 'smooth'
            });
        } else {
            carouselContainer.scrollTo({
                left: carouselContainer.scrollWidth,
                behavior: 'smooth'
            });
        }
    });

    nextButton.addEventListener('click', function () {
        if (canScrollRight()) {
            carouselContainer.scrollBy({
                left: itemWidth,
                behavior: 'smooth'
            });
        } else {
            carouselContainer.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        }
    });

    // Event listener voor het aanpassen van het vensterformaat
    window.addEventListener('resize', function () {
        // Update de item breedte
        itemWidth = carouselContainer.querySelector('.carousel-item').offsetWidth + 16;
    });
});


// ----- Voor de overlay van de foto carousel ----- //

// Voeg de JavaScript-code toe voor de overlay-functionaliteit
document.addEventListener('DOMContentLoaded', function () {
    const overlayContainer = document.getElementById('overlayContainer');
    const overlay = overlayContainer.querySelector('.overlay');
    const closeButton = overlay.querySelector('.close-btn');
    const overlayImage = overlay.querySelector('.overlay-image');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevButton = overlay.querySelector('.prev');
    const nextButton = overlay.querySelector('.next');

    // Functie om de index van de huidige afbeelding te vinden
    function getCurrentIndex() {
        const src = overlayImage.getAttribute('src');
        let currentIndex = 0;
        carouselItems.forEach((item, index) => {
            if (item.querySelector('img').getAttribute('src') === src) {
                currentIndex = index;
            }
        });
        return currentIndex;
    }

    // Event listener voor het klikken op een afbeelding
    carouselItems.forEach(item => {
        item.addEventListener('click', function () {
            const src = this.querySelector('img').getAttribute('src');
            overlayImage.setAttribute('src', src);
            overlayContainer.style.display = 'flex';
            toggleBodyScrolling(); // Schakel scrollen van de achtergrond uit
        });
    });

    // Event listener voor het sluiten van de overlay wanneer er buiten de afbeelding wordt geklikt
    overlayContainer.addEventListener('click', function (event) {
        if (!overlay.contains(event.target)) {
            overlayContainer.style.display = 'none';
            toggleBodyScrolling(); // Schakel scrollen van de achtergrond in
        }
    });

    // Event listener voor het sluiten van de overlay wanneer op het sluitknopje wordt geklikt
    closeButton.addEventListener('click', function () {
        overlayContainer.style.display = 'none';
        toggleBodyScrolling(); // Schakel scrollen van de achtergrond in
    });

    // Event listeners voor het indrukken van de pijltjestoetsen op het toetsenbord
    document.addEventListener('keydown', function (event) {
        if (overlayContainer.style.display === 'flex') {
            const currentIndex = getCurrentIndex();
            if (event.key === 'ArrowLeft' && currentIndex > 0) {
                const prevImageSrc = carouselItems[currentIndex - 1].querySelector('img').getAttribute('src');
                overlayImage.setAttribute('src', prevImageSrc);
            } else if (event.key === 'ArrowRight' && currentIndex < carouselItems.length - 1) {
                const nextImageSrc = carouselItems[currentIndex + 1].querySelector('img').getAttribute('src');
                overlayImage.setAttribute('src', nextImageSrc);
            }
        }
    });

    // Voeg event listeners toe voor het klikken op de pijltjes
    const prevButtonOverlay = overlay.querySelector('.prevOverlay');
    const nextButtonOverlay = overlay.querySelector('.nextOverlay');

    prevButtonOverlay.addEventListener('click', function () {
        const currentIndex = getCurrentIndex();
        if (currentIndex > 0) {
            const prevImageSrc = carouselItems[currentIndex - 1].querySelector('img').getAttribute('src');
            overlayImage.setAttribute('src', prevImageSrc);
        }
    });

    nextButtonOverlay.addEventListener('click', function () {
        const currentIndex = getCurrentIndex();
        if (currentIndex < carouselItems.length - 1) {
            const nextImageSrc = carouselItems[currentIndex + 1].querySelector('img').getAttribute('src');
            overlayImage.setAttribute('src', nextImageSrc);
        }
    });

    // Functie om de scrollbaarheid van de achtergrond in of uit te schakelen
    function toggleBodyScrolling() {
        document.body.style.overflow = (document.body.style.overflow === "hidden") ? "auto" : "hidden";
    }
});