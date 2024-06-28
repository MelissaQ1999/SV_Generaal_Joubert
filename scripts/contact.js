// ----- In dit JavaScript bestand vindt je de code die nodig is voor de werking van de contactformulieren ----- //

// ----- Voor het swichten naar een ander formulier ----- //
document.addEventListener('DOMContentLoaded', function() {
    const algemeenBtn = document.getElementById('algemeenBtn');
    const introductieBtn = document.getElementById('introductieBtn');
    const algemeenFormContainer = document.getElementById('algemeenFormContainer');
    const introductieFormContainer = document.getElementById('introductieFormContainer');

    // Function to toggle forms
    function toggleForms(formContact) {
        if (formContact.target.closest('#algemeenBtn')) {
            algemeenFormContainer.classList.add('active');
            introductieFormContainer.classList.remove('active');
            algemeenBtn.classList.add('activeFormBtn');
            introductieBtn.classList.remove('activeFormBtn');
        } else if (formContact.target.closest('#introductieBtn')) {
            introductieFormContainer.classList.add('active');
            algemeenFormContainer.classList.remove('active');
            introductieBtn.classList.add('activeFormBtn');
            algemeenBtn.classList.remove('activeFormBtn');
        }
    }

    // Add event listeners to buttons
    algemeenBtn.addEventListener('click', toggleForms);
    introductieBtn.addEventListener('click', toggleForms);

    // Initially show the general form
    algemeenFormContainer.classList.add('active');
    algemeenBtn.classList.add('activeFormBtn');
});


// ----- Voor de validatie van de contactformulieren ----- //
document.addEventListener('DOMContentLoaded', function() {
    // Introductieformulier gerelateerde variabelen en functies
    const introductieForm = document.getElementById('introductieForm');
    const addNationaliteitFieldBtn = document.getElementById('addNationaliteitField');
    const nationaliteitFields = document.getElementById('nationaliteitFields');
    let nationaliteitCount = 1;

    introductieForm.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateFormI()) {
            alert('Formulier is correct ingevuld en wordt verzonden.');
            introductieForm.submit();
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

    function validateFormI() {
        let isValidI = true;

        const fieldsToValidateI = [
            { id: 'voornaam', errorId: 'voornaamError', validation: value => value.trim() !== '', errorMessage: 'Voer uw voornaam(en) in' },
            { id: 'achternaam', errorId: 'achternaamError', validation: value => value.trim() !== '', errorMessage: 'Voer uw achternaam in' },
            { id: 'geboortedatum', errorId: 'geboortedatumError', validation: value => value.trim() !== '', errorMessage: 'Voer uw geboortedatum in (DD/MM/JJJJ)' },
            { id: 'geboorteplaats', errorId: 'geboorteplaatsError', validation: value => value.trim() !== '', errorMessage: 'Voer uw geboorteplaats in' },
            { id: 'straatnaam', errorId: 'straatnaamError', validation: value => value.trim() !== '', errorMessage: 'Voer uw straatnaam in' },
            { id: 'huisnummer', errorId: 'huisnummerError', validation: value => value.trim() !== '', errorMessage: 'Voer uw huisnummer in' },
            { id: 'postcode', errorId: 'postcodeError', validation: value => /^[1-9][0-9]{3}\s?[A-Z]{2}$/.test(value), errorMessage: 'Voer een geldige postcode in (1234 AB)' },
            { id: 'woonplaats', errorId: 'woonplaatsError', validation: value => value.trim() !== '', errorMessage: 'Voer uw woonplaats in' },
            { id: 'burgerlijkeStaat', errorId: 'burgerlijkeStaatError', validation: value => value.trim() !== '', errorMessage: 'Voer uw burgerlijke staat in' },
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
                isValidI = false;
            } else {
                errorElement.textContent = '';
                inputElement.classList.remove('error-border');
                inputElement.classList.add('valid-border');
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
            isValidI = false;
        } else {
            nationaliteitError.textContent = '';
        }

        return isValidI;
    }

    // Algemeen formulier gerelateerde variabelen en functies
    const algemeenForm = document.getElementById('algemeenForm');

    algemeenForm.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateFormA()) {
            alert('Formulier is correct ingevuld en wordt verzonden.');
            algemeenForm.submit();
        }
    });

    function validateFormA() {
        let isValidA = true;

        const fieldsToValidateA = [
            { id: 'naam', errorId: 'naamError', validation: value => value.trim() !== '', errorMessage: 'Voer uw naam in' },
            { id: 'algemeen-email', errorId: 'algemeen-emailError', validation: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), errorMessage: 'Voer een geldig e-mailadres in' },
            { id: 'bericht', errorId: 'berichtError', validation: value => value.trim() !== '', errorMessage: 'Voer uw bericht in' }
        ];

        fieldsToValidateA.forEach(field => {
            const inputElement = document.getElementById(field.id);
            const errorElement = document.getElementById(field.errorId);
            if (!field.validation(inputElement.value)){
                errorElement.textContent = field.errorMessage;
                inputElement.classList.add('error-border');
                inputElement.classList.remove('valid-border');
                isValidA = false;
            } else {
                errorElement.textContent = '';
                inputElement.classList.remove('error-border');
                inputElement.classList.add('valid-border');
            }
        });

        return isValidA;
    }
});