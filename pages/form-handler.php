<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Ontvang formuliergegevens
        $voornaam = $_POST['voornaam'];
        $achternaam = $_POST['achternaam'];
        $geboortedatum = $_POST['geboortedatum'];
        $geboorteplaats = $_POST['geboorteplaats'];
        $straatnaam = $_POST['straatnaam'];
        $huisnummer = $_POST['huisnummer'];
        $postcode = $_POST['postcode'];
        $woonplaats = $_POST['woonplaats'];
        $burgerlijkeStaat = $_POST['burgerlijkeStaat'];
        $nationaliteiten = $_POST['nationaliteit'];
        $visitor_email = $_POST['email'];
        $telefoonnummer = $_POST['telefoonnummer'];
        $opmerkingen = $_POST['opmerkingen'];

        // Validatie tegen pogingen tot e-mailinjectie
        if (IsInjected($visitor_email)) {
            echo "Bad email value!";
            exit;
        }

        // Formatteer de e-mailinhoud
        $email_from = 'melissaqvandijk1999@gmail.com';
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
            <p><strong>Nationaliteit(en):</strong><br>" . implode(', ', array_map('htmlspecialchars', $nationaliteiten)) . "</p>
            <p><strong>E-mailadres:</strong><br>{$visitor_email}</p>
            <p><strong>Telefoonnummer:</strong><br>{$telefoonnummer}</p>
            <p><strong>Opmerkingen:</strong><br>{$opmerkingen}</p>
        </body>
        </html>
        ";

        // E-mail instellingen
        $to = 'melissaqvandijk1999@gmail.com';
        $subject = 'Aanmelding proefschieten';
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= "From: $email_from \r\n";
        $headers .= "Reply-To: $visitor_email \r\n";

        // Verstuur de e-mail
        if (mail($to, $subject, $email_body, $headers)) {
            echo "E-mail succesvol verzonden!";
        } else {
            echo "Er is een fout opgetreden bij het verzenden van de e-mail.";
        }

        // Functie om te valideren tegen pogingen tot e-mailinjectie
        function IsInjected($str) {
            $injections = array('(\n+)',
                        '(\r+)',
                        '(\t+)',
                        '(%0A+)',
                        '(%0D+)',
                        '(%08+)',
                        '(%09+)'
                        );
            $inject = join('|', $injections);
            $inject = "/$inject/i";
            if (preg_match($inject,$str)) {
                return true;
            }
            else {
                return false;
            }
        }
    }