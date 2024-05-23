document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const addNationaliteitFieldBtn = document.getElementById('addNationaliteitField');
    const nationaliteitFields = document.getElementById('nationaliteitFields');
    let nationaliteitCount = 1;

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
            alert('Formulier is correct ingevuld en wordt verzonden.');
            form.submit();
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

    function validateForm() {
        let isValid = true;

        const fieldsToValidate = [
            { id: 'voornaam', errorId: 'voornaamError', validation: value => value.trim() !== '', errorMessage: 'Voer uw voornaam(en) in' },
            { id: 'achternaam', errorId: 'achternaamError', validation: value => value.trim() !== '', errorMessage: 'Voer uw achternaam in' },
            { id: 'geboortedatum', errorId: 'geboortedatumError', validation: value => value.trim() !== '', errorMessage: 'Voer uw geboortedatum in (DD/MM/JJJJ)' },
            { id: 'geboorteplaats', errorId: 'geboorteplaatsError', validation: value => value.trim() !== '', errorMessage: 'Voer uw geboorteplaats in' },
            { id: 'straatnaam', errorId: 'straatnaamError', validation: value => value.trim() !== '', errorMessage: 'Voer uw straatnaam in' },
            { id: 'huisnummer', errorId: 'huisnummerError', validation: value => value.trim() !== '', errorMessage: 'Voer uw huisnummer in' },
            { id: 'postcode', errorId: 'postcodeError', validation: value => /^[1-9][0-9]{3}\s[A-Z]{2}$/.test(value), errorMessage: 'Voer een geldige postcode in (1234 AB)' },
            { id: 'woonplaats', errorId: 'woonplaatsError', validation: value => value.trim() !== '', errorMessage: 'Voer uw woonplaats in' },
            { id: 'burgerlijkeStaat', errorId: 'burgerlijkeStaatError', validation: value => value.trim() !== '', errorMessage: 'Voer uw burgerlijke staat in' },
            { id: 'email', errorId: 'emailError', validation: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), errorMessage: 'Voer een geldig e-mailadres in' },
            { id: 'telefoonnummer', errorId: 'telefoonnummerError', validation: value => /^\+?\d+$/.test(value), errorMessage: 'Voer een geldig telefoonnummer in' }
        ];

        fieldsToValidate.forEach(field => {
            const inputElement = document.getElementById(field.id);
            const errorElement = document.getElementById(field.errorId);
            if (!field.validation(inputElement.value)) {
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
});