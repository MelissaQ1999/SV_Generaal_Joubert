// ----- In dit JavaScript bestand vindt je de code die nodig is voor de werking van de contactformulieren ----- //

// ----- Voor het swichten naar een ander formulier ----- //
document.addEventListener('DOMContentLoaded', function() {
    const algemeenBtn = document.getElementById('algemeenBtn');
    const introductieBtn = document.getElementById('introductieBtn');
    const algemeenFormContainer = document.getElementById('algemeenFormContainer');
    const introductieFormContainer = document.getElementById('introductieFormContainer');

    // Toont standaard het algemene formulier
    algemeenFormContainer.style.display = 'block';
    algemeenBtn.classList.add('active');

    // Voegt event listeners toe om tussen formulieren te schakelen
    algemeenBtn.addEventListener('click', () => {
        algemeenFormContainer.style.display = 'block';
        introductieFormContainer.style.display = 'none';
        algemeenBtn.classList.add('active');
        introductieBtn.classList.remove('active');
    });
      
    introductieBtn.addEventListener('click', () => {
        algemeenFormContainer.style.display = 'none';
        introductieFormContainer.style.display = 'block';
        algemeenBtn.classList.remove('active');
        introductieBtn.classList.add('active');
    });
});


// ----- Voor de validatie van de contactformulieren ----- //
document.addEventListener('DOMContentLoaded', function() {

    const popupContainer = document.getElementById('popup-container');
    const popupOverlay = document.getElementById('popup-overlay');
    const closePopupButton = document.getElementById('close-popup');

    function showPopup() {
        popupContainer.style.display = 'block';
        popupOverlay.style.display = 'block';
    }

    // Introductieformulier gerelateerde variabelen en functies
    const introductieForm = document.getElementById('introductieForm');
    const addNationaliteitFieldBtn = document.getElementById('addNationaliteitField');
    const nationaliteitFields = document.getElementById('nationaliteitFields');
    let nationaliteitCount = 1;

    introductieForm.addEventListener('submit', function(event) {
        const geboortedatumInput = document.getElementById('geboortedatum');
        if (isValidDate(geboortedatumInput.value)) {
            const formattedDate = new Date(geboortedatumInput.value).toISOString().split('T')[0];
            geboortedatumInput.value = formattedDate;
        }
        if (validateIntroductieForm()) {
            currentForm = 'introductieForm';
            introductieForm.submit()
            // showPopup(); // <--- Roept de showPopup() functie aan
        }
        else{
            event.preventDefault();
        }
    });
  
    addNationaliteitFieldBtn.addEventListener('click', function() {
        nationaliteitCount++;
        const newField = document.createElement('div');
        newField.className = 'nationaliteitFieldNew';
        newField.innerHTML = `<input type="text" id="nationaliteit${nationaliteitCount}" name="nationaliteit[]" placeholder="Nederlands" required>
                                <button type="button" class="removeNationaliteitField">&times;</button>`;
        nationaliteitFields.appendChild(newField);
    
        // Voeg een event listener toe aan de nieuwe verwijder-knop
        newField.querySelector('.removeNationaliteitField').addEventListener('click', function() {
            newField.remove();
        });
    });

    function isValidDate(dateString) {
        console.log(`Validating date: ${dateString}`);
        const dateParts = dateString.split('-');
        if (dateParts.length !== 3) {
            return false;
        }
        const year = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10);
        const day = parseInt(dateParts[2], 10);
        if (isNaN(day) || isNaN(month) || isNaN(year)) {
            return false;
        }
        if (day < 1 || day > 31) {
            return false;
        }
        if (month < 1 || month > 12) {
            return false;
        }

        const today = new Date();
        const inputDate = new Date(year, month - 1, day);
        const age = today.getFullYear() - year;

        if (age > 110 || inputDate > today) {
            return false;
        }
        
        // Controleerd of de datum geldig is (bijvoorbeeld 30 februari is niet geldig)
        const date = new Date(year, month - 1, day);
        if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
            return false;
        }
        
        return true;
    }
  
    function validateIntroductieForm() {
        let isValid = true;

        const fieldsToValidateI = [
            { id: 'voornaam', errorId: 'voornaamError', validation: value => value.trim()!== '', errorMessage: 'Voer uw voornaam(en) in' },
            { id: 'achternaam', errorId: 'achternaamError', validation: value => value.trim()!== '', errorMessage: 'Voer uw achternaam in' },
            { id: 'geboortedatum', errorId: 'geboortedatumError', validation: isValidDate, errorMessage: 'Voer uw geboortedatum in (DD/MM/JJJJ)' },
            { id: 'geboorteplaats', errorId: 'geboorteplaatsError', validation: value => value.trim()!== '', errorMessage: 'Voer uw geboorteplaats in' },
            { id: 'straatnaam', errorId: 'straatnaamError', validation: value => value.trim()!== '', errorMessage: 'Voer uw straatnaam in' },
            { id: 'huisnummer', errorId: 'huisnummerError', validation: value => value.trim()!== '', errorMessage: 'Voer uw huisnummer in' },
            { id: 'postcode', errorId: 'postcodeError', validation: value => /^[1-9][0-9]{3}\s?[A-Z]{2}$/.test(value.toUpperCase()), errorMessage: 'Voer een geldige postcode in (1234 AB)'},
            { id: 'woonplaats', errorId: 'woonplaatsError', validation: value => value.trim()!== '', errorMessage: 'Voer uw woonplaats in' },
            { id: 'burgerlijkeStaat', errorId: 'burgerlijkeStaatError', validation: value => value.trim()!== '', errorMessage: 'Voer uw burgerlijke staat in' },
            { id: 'introductie-email', errorId: 'introductie-emailError', validation: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), errorMessage: 'Voer een geldig e-mailadres in' },
            { id: 'telefoonnummer', errorId: 'telefoonnummerError', validation: value => /^\+?\d+$/.test(value), errorMessage: 'Voer een geldig telefoonnummer in' }
        ];
    
        fieldsToValidateI.forEach(field => {
            const inputElement = document.getElementById(field.id);
            const errorElement = document.getElementById(field.errorId);
            if (!field.validation(inputElement.value)){
                errorElement.textContent = field.errorMessage;
                inputElement.classList.add('error-border');
                inputElement.classList.remove('valid-border');
                isValid = false;
            } else {
                errorElement.textContent = '';
                inputElement.classList.remove('error-border');
                inputElement.classList.add('valid-border');
            }
        });

        const formElements = document.querySelectorAll('#introductieForm [required]');
        formElements.forEach(element => {
            const field = fieldsToValidateI.find(field => field.id === element.id);
            if (field) {
                const errorElement = document.getElementById(field.errorId);
                if (!field.validation(element.value)) {
                    errorElement.textContent = field.errorMessage;
                    element.classList.add('error-border');
                    isValid = false;
                } else {
                    errorElement.textContent = '';
                    element.classList.remove('error-border');
                }
            }
        });
    
        const nationaliteitFields = document.querySelectorAll('[name="nationaliteit[]"]');
        const nationaliteitError = document.getElementById('nationaliteitError');
        let nationaliteitenValid = true;
        nationaliteitFields.forEach(field => {
            if (!field.value.trim()) {
                nationaliteitenValid = false;
                field.classList.add('error-border');
                field.classList.remove('valid-border');
            } else {
                field.classList.remove('error-border');
                field.classList.add('valid-border');
            }
        });
        if (!nationaliteitenValid) {
            nationaliteitError.textContent = 'Voer uw nationaliteit(en) in';
            isValid = false;
        } else {
            nationaliteitError.textContent = '';
        }

        return isValid;
    }

  
    // Algemeen formulier gerelateerde variabelen en functies
    const algemeenForm = document.getElementById('algemeenForm');

    algemeenForm.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateAlgemeenForm()) {
            currentForm = 'algemeenForm';
            // showPopup(); // <--- Roept de showPopup() functie aan
            algemeenForm.submit()
        }
        else{
            event.preventDefault();
        }
    });
  
    function validateAlgemeenForm() {
        let isValid = true;

        const fieldsToValidateA = [
            { id: 'naam', errorId: 'naamError', validation: value => value.trim()!== '', errorMessage: 'Voer uw naam in' },
            { id: 'algemeen-email', errorId: 'algemeen-emailError', validation: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), errorMessage: 'Voer een geldig e-mailadres in' },
            { id: 'bericht', errorId: 'berichtError', validation: value => value.trim()!== '', errorMessage: 'Voer uw bericht in' }
        ];
    
        fieldsToValidateA.forEach(field => {
            const inputElement = document.getElementById(field.id);
            const errorElement = document.getElementById(field.errorId);
            if (!field.validation(inputElement.value)){
                errorElement.textContent = field.errorMessage;
                inputElement.classList.add('error-border');
                inputElement.classList.remove('valid-border');
                isValid = false;
            } else {
                errorElement.textContent = '';
                inputElement.classList.remove('error-border');
                inputElement.classList.add('valid-border');
            }
        });

        const formElements = document.querySelectorAll('#algemeenForm [required]');
        formElements.forEach(element => {
            const field = fieldsToValidateA.find(field => field.id === element.id);
            if (field) {
                const errorElement = document.getElementById(field.errorId);
                if (!field.validation(element.value)) {
                    errorElement.textContent = field.errorMessage;
                    element.classList.add('error-border');
                    isValid = false;
                } else {
                    errorElement.textContent = '';
                    element.classList.remove('error-border');
                }
            }
        });
    
        return isValid;
    }

    // closePopupButton.addEventListener('click', () => {
    //     popupContainer.style.display = 'none';
    //     popupOverlay.style.display = 'none';
    //     if (currentForm === 'algemeenForm') {
    //         algemeenForm.submit(); // Verzend het formulier nadat de pop-up wordt gesloten
    //     } else if (currentForm === 'introductieForm') {
    //         introductieForm.submit(); // Verzend het formulier nadat de pop-up wordt gesloten
    //     }
    // });
});