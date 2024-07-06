<?php
function validate_input($input) {
    if ($input === null) {
        return ''; // return an empty string if input is null
    }
    if (is_array($input)) {
        foreach ($input as & $value) {
            $value = validate_input($value);
        }
        return $input;
    } else {
        // Apply validation logic to the input string
        $input = trim($input);
        $input = strip_tags($input);
        $input = htmlspecialchars($input);
        return $input;
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Receive form data
    $voornaam = validate_input($_POST['voornaam']);
    $achternaam = validate_input($_POST['achternaam']);
    $geboortedatum = validate_input($_POST['geboortedatum']);
    $geboorteplaats = validate_input($_POST['geboorteplaats']);
    $straatnaam = validate_input($_POST['straatnaam']);
    $huisnummer = validate_input($_POST['huisnummer']);
    $postcode = validate_input($_POST['postcode']);
    $woonplaats = validate_input($_POST['woonplaats']);
    $burgerlijkeStaat = validate_input($_POST['burgerlijkeStaat']);
    $nationaliteiten = validate_input($_POST['nationaliteit']);
    $visitor_email = validate_input($_POST['introductie-email']);
    $telefoonnummer = validate_input($_POST['telefoonnummer']);
    $opmerkingen = $_POST['opmerkingen'];

    // Validate input data
    $errors = array();

    if (empty($voornaam) || !preg_match("/^[a-zA-Z ]+$/", $voornaam)) {
        $errors[] = "Voer uw voornaam(en) in";
    }

    if (empty($achternaam) || !preg_match("/^[a-zA-Z ]+$/", $achternaam)) {
        $errors[] = "Voer uw achternaam in";
    }

    if (empty($geboortedatum) || !DateTime::createFromFormat('Y-m-d', $geboortedatum)) {
        $errors[] = "Voer uw geboortedatum in (DD-MM-YYYY)";
    }

    if (empty($geboorteplaats) || !preg_match("/^[a-zA-Z ]+$/", $geboorteplaats)) {
        $errors[] = "Voer uw geboorteplaats in";
    }

    if (empty($straatnaam) || !preg_match("/^[a-zA-Z ]+$/", $straatnaam)) {
        $errors[] = "Voer uw straatnaam in";
    }

    if (empty($huisnummer) || !preg_match("/^[0-9]+$/", $huisnummer)) {
        $errors[] = "Voer uw huisnummer in";
    }

    if (empty($postcode) || !preg_match("/^[1-9][0-9]{3}\s?[A-Z]{2}$/", $postcode)) {
        $errors[] = "Voer een geldige postcode in (1234 AB)";
    }

    if (empty($woonplaats) || !preg_match("/^[a-zA-Z ]+$/", $woonplaats)) {
        $errors[] = "Voer uw woonplaats in";
    }

    if (empty($burgerlijkeStaat) || !preg_match("/^[a-zA-Z ]+$/", $burgerlijkeStaat)) {
        $errors[] = "Voer uw burgerlijke staat in";
    }

    if (empty($nationaliteiten) || !is_array($nationaliteiten)) {
        $errors[] = "Voer uw nationaliteit(en) in";
    }

    if (empty($visitor_email) || !filter_var($visitor_email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Voer een geldig e-mailadres in";
    }

    if (empty($telefoonnummer) || !preg_match("/^\+?\d+$/", $telefoonnummer)){
        $errors[] = "Voer een geldig telefoonnummer in";
    }

    if (count($errors) > 0) {
        // Display error messages
        foreach ($errors as $error) {
            echo "<p>$error</p>";
        }
    } else {
        $email_from = $visitor_email;
        // Format email content
        $email_body = "
        <html>
        <head>
            <title>Aanmelding proefschieten</title>
        </head>
        <body>
            <h2>Aanmelding proefschieten</h2>
            <p><strong>Voornaam(en):</strong><br>{$voornaam}</p>
            <p><strong>Achternaam:</strong><br>{$achternaam}</p>
            <p><strong>Geboortedatum:</strong><br>{$geboortedatum}</p>
            <p><strong>Geboorteplaats:</strong><br>{$geboorteplaats}</p>
            <p><strong>Straatnaam:</strong><br>{$straatnaam}</p>
            <p><strong>Huisnummer:</strong><br>{$huisnummer}</p>
            <p><strong>Postcode:</strong><br>{$postcode}</p>
            <p><strong>Woonplaats:</strong><br>{$woonplaats}</p>
            <p><strong>Burgerlijke staat:</strong><br>{$burgerlijkeStaat}</p>
            <p><strong>Nationaliteit(en):</strong><br>" . nl2br(implode(', ', array_map('htmlspecialchars', $nationaliteiten))) . "</p>
            <p><strong>E-mailadres:</strong><br>{$visitor_email}</p>
            <p><strong>Telefoonnummer:</strong><br>{$telefoonnummer}</p>
            <p><strong>Opmerkingen:</strong><br>{$opmerkingen}</p>
        </body>
        </html>
        ";

        // Plain-text version of email body
        $email_body_text = "Aanmelding proefschieten:\n\n"
            . "Voornaam(en): $voornaam\n"
            . "Achternaam: $achternaam\n"
            . "Geboortedatum: $geboortedatum\n"
            . "Geboorteplaats: $geboorteplaats\n"
            . "Straatnaam: $straatnaam\n"
            . "Huisnummer: $huisnummer\n"
            . "Postcode: $postcode\n"
            . "Woonplaats: $woonplaats\n"
            . "Burgerlijke staat: $burgerlijkeStaat\n"
            . "Nationaliteit(en): " . implode(', ', array_map('htmlspecialchars', $nationaliteiten)) . "\n"
            . "E-mailadres: $visitor_email\n"
            . "Telefoonnummer: $telefoonnummer\n"
            . "Opmerkingen: $opmerkingen\n";

        // Email settings
        $to = 'melissaqvandijk1999@gmail.com';
        $subject = 'Aanmelding proefschieten';
        $headers = "MIME-Version: 1.0". "\r\n";
        $headers.= "Content-type:text/html;charset=UTF-8". "\r\n";
        $headers.= "From: $email_from \r\n";
        $headers.= "Reply-To: $visitor_email \r\n";

        function send_email($to, $subject, $body, $headers, $email_from) {
            $mail_sent = mail($to, $subject, $body, $headers);
            if ($mail_sent) {
                return 'OK';
            } else {
                return 'Error sending email';
            }
        }
        
        $response = send_email($to, $subject, $email_body, $headers, $email_from);
        
        if ($response === 'OK') {
            echo "E-mail succesvol verzonden!";
        } else {
            echo "Er is een fout opgetreden bij het verzenden van de e-mail.";
        }
        
        // Send confirmation email
        $confirmation_email = "
        <html>
        <head>
            <title>Bevestiging aanmelding proefschieten</title>
        </head>
        <body>
            <p>Bedankt voor uw aanmelding! Wij nemen zo snel mogelijk contact met uw op.</p>
        </body>
        </html>
        ";
        $confirmation_subject = "Bevestiging aanmelding proefschieten";
        $confirmation_headers = "MIME-Version: 1.0". "\r\n";
        $confirmation_headers.= "Content-type:text/html;charset=UTF-8". "\r\n";
        $confirmation_headers.= "From: $email_from \r\n";
        $confirmation_headers.= "Reply-To: $visitor_email \r\n";
        
        $response = send_email($visitor_email, $confirmation_subject, $confirmation_email, $confirmation_headers, $email_from);
        
        if ($response === 'OK') {
            echo "Bevestigingsmail succesvol verzonden!";
        } else {
            echo "Er is een fout opgetreden bij het verzenden van de bevestigingsmail.";
        }
        
        // Redirect naar de contactpagina
        header('Location:../pages/contact.html');
        exit;
    }
}