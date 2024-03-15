// ----- In dit JavaScript bestand vindt je de code die voor de Accommodatie pagina nodig is ----- //

// ----- Voor de foto carousel op de accommodatie pagina ----- //
document.addEventListener('DOMContentLoaded', function () {
    const carouselContainer = document.querySelector('.carousel-container');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

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
        const itemWidth = calculateItemWidth();
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
        const itemWidth = calculateItemWidth();
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
        const itemWidth = calculateItemWidth();
    });

    // Functie om de item breedte inclusief margin-right te berekenen
    function calculateItemWidth() {
        const carouselItem = carouselContainer.querySelector('.carousel-item');
        const itemStyles = getComputedStyle(carouselItem);
        const itemWidth = carouselItem.clientWidth + parseFloat(itemStyles.marginRight);
        return itemWidth;
    }
});

// ----- Voor de overlay van de foto carousel ----- //

// Voeg de JavaScript-code toe voor de overlay-functionaliteit
document.addEventListener('DOMContentLoaded', function () {
    const overlayContainer = document.getElementById('overlayContainer');
    const overlay = overlayContainer.querySelector('.overlay');
    const closeButton = overlayContainer.querySelector('.close-btn');
    const overlayImage = overlay.querySelector('.overlay-image');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevButtonOverlay = overlayContainer.querySelector('.prevOverlay');
    const nextButtonOverlay = overlayContainer.querySelector('.nextOverlay');
    const carouselIndicators = overlay.querySelector('.carousel-indicators');

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
    carouselItems.forEach((item, index) => {
        item.addEventListener('click', function () {
            const src = this.querySelector('img').getAttribute('src');
            overlayImage.setAttribute('src', src);
            overlayContainer.style.display = 'flex';
            toggleBodyScrolling(); // Schakel scrollen van de achtergrond uit
            
            // Verberg of toon de pijltjes op basis van de huidige index
            if (index === 0) {
                prevButtonOverlay.style.display = 'none'; // Verberg linkerpijl
                nextButtonOverlay.style.display = 'block'; // Toon rechterpijl
            } else if (index === carouselItems.length - 1) {
                prevButtonOverlay.style.display = 'block'; // Toon linkerpijl
                nextButtonOverlay.style.display = 'none'; // Verberg rechterpijl
            } else {
                prevButtonOverlay.style.display = 'block'; // Toon linkerpijl
                nextButtonOverlay.style.display = 'block'; // Toon rechterpijl
            }

            // Update actieve indicator
            const indicators = overlay.querySelectorAll('.carousel-indicator');
            indicators.forEach((indicator, i) => {
                if (i === index) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        });
    });
    
    // Event listener voor het klikken op een bolletje
    carouselIndicators.addEventListener('click', function(event) {
        const targetIndex = parseInt(event.target.getAttribute('data-slide-to'));
        const targetImageSrc = carouselItems[targetIndex].querySelector('img').getAttribute('src');
        overlayImage.setAttribute('src', targetImageSrc);

        // Update actieve indicator
        const indicators = overlay.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, i) => {
            if (i === targetIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });

        // Toon of verberg pijltjes op basis van het doelbeeld
        if (targetIndex === 0) {
            prevButtonOverlay.style.display = 'none'; // Verberg linkerpijl
            nextButtonOverlay.style.display = 'block'; // Toon rechterpijl
        } else if (targetIndex === carouselItems.length - 1) {
            prevButtonOverlay.style.display = 'block'; // Toon linkerpijl
            nextButtonOverlay.style.display = 'none'; // Verberg rechterpijl
        } else {
            prevButtonOverlay.style.display = 'block'; // Toon linkerpijl
            nextButtonOverlay.style.display = 'block'; // Toon rechterpijl
        }
    });

    // // Event listener voor het sluiten van de overlay wanneer er buiten de afbeelding wordt geklikt
    // overlayContainer.addEventListener('click', function (event) {
    //     if (!overlay.contains(event.target)) {
    //         overlayContainer.style.display = 'none';
    //         toggleBodyScrolling(); // Schakel scrollen van de achtergrond in
    //     }
    // });

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
                updateIndicators(currentIndex - 1); // Bijwerken van de actieve indicator
                updateArrowsVisibility(currentIndex - 1); // Bijwerken van de pijltjes
            } else if (event.key === 'ArrowRight' && currentIndex < carouselItems.length - 1) {
                const nextImageSrc = carouselItems[currentIndex + 1].querySelector('img').getAttribute('src');
                overlayImage.setAttribute('src', nextImageSrc);
                updateIndicators(currentIndex + 1); // Bijwerken van de actieve indicator
                updateArrowsVisibility(currentIndex + 1); // Bijwerken van de pijltjes
            }
        }
    });

    // Functie om de zichtbaarheid van de pijltjes bij te werken op basis van de huidige index
    function updateArrowsVisibility(index) {
        if (index === 0) {
            prevButtonOverlay.style.display = 'none'; // Verberg linkerpijl
            nextButtonOverlay.style.display = 'block'; // Toon rechterpijl
        } else if (index === carouselItems.length - 1) {
            prevButtonOverlay.style.display = 'block'; // Toon linkerpijl
            nextButtonOverlay.style.display = 'none'; // Verberg rechterpijl
        } else {
            prevButtonOverlay.style.display = 'block'; // Toon linkerpijl
            nextButtonOverlay.style.display = 'block'; // Toon rechterpijl
        }
    }

    // Event listener voor het klikken op de pijltjes
    prevButtonOverlay.addEventListener('click', function () {
        const currentIndex = getCurrentIndex();
        if (currentIndex > 0) {
            const prevImageSrc = carouselItems[currentIndex - 1].querySelector('img').getAttribute('src');
            overlayImage.setAttribute('src', prevImageSrc);
            updateIndicators(currentIndex - 1); // Bijwerken van de actieve indicator
            nextButtonOverlay.style.display = 'block'; // Toon rechterpijl
            if (currentIndex - 1 === 0) {
                prevButtonOverlay.style.display = 'none'; // Verberg linkerpijl bij eerste foto
            }
        }
    });

    nextButtonOverlay.addEventListener('click', function () {
        const currentIndex = getCurrentIndex();
        if (currentIndex < carouselItems.length - 1) {
            const nextImageSrc = carouselItems[currentIndex + 1].querySelector('img').getAttribute('src');
            overlayImage.setAttribute('src', nextImageSrc);
            updateIndicators(currentIndex + 1); // Bijwerken van de actieve indicator
            prevButtonOverlay.style.display = 'block'; // Toon linkerpijl
            if (currentIndex + 1 === carouselItems.length - 1) {
                nextButtonOverlay.style.display = 'none'; // Verberg rechterpijl bij laatste foto
            }
        }
    });

    // Functie om de actieve indicator bij te werken
    function updateIndicators(index) {
        const indicators = overlay.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    } 

    // Functie om de scrollbaarheid van de achtergrond in of uit te schakelen
    function toggleBodyScrolling() {
        document.body.style.overflow = (document.body.style.overflow === "hidden") ? "auto" : "hidden";
    }
});