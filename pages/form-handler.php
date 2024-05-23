<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Ontvang formuliergegevens
    $voornaam = htmlspecialchars($_POST['voornaam']);
    $achternaam = htmlspecialchars($_POST['achternaam']);
    $geboortedatum = htmlspecialchars($_POST['geboortedatum']);
    $geboorteplaats = htmlspecialchars($_POST['geboorteplaats']);
    $straatnaam = htmlspecialchars($_POST['straatnaam']);
    $huisnummer = htmlspecialchars($_POST['huisnummer']);
    $postcode = htmlspecialchars($_POST['postcode']);
    $woonplaats = htmlspecialchars($_POST['woonplaats']);
    $burgerlijkeStaat = htmlspecialchars($_POST['burgerlijkeStaat']);
    $nationaliteiten = $_POST['nationaliteit'];
    $email = htmlspecialchars($_POST['email']);
    $telefoonnummer = htmlspecialchars($_POST['telefoonnummer']);
    $opmerkingen = htmlspecialchars($_POST['opmerkingen']);

    // Formatteer de e-mailinhoud
    $message = "
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
        <p><strong>E-mailadres:</strong><br>{$email}</p>
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
    $headers .= 'From: <no-reply@uwdomein.com>' . "\r\n";

    // Verstuur de e-mail
    if (mail($to, $subject, $message, $headers)) {
        echo "E-mail succesvol verzonden!";
    } else {
        echo "Er is een fout opgetreden bij het verzenden van de e-mail.";
    }
}
?>