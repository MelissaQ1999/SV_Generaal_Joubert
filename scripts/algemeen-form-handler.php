<?php
require "mailer.php";

function validate_input($input) {
    if ($input === null) {
        return ''; // Retourneert een lege string als de invoer nul is
    } else {
        // Past validatielogica toe op de input string
        $input = trim($input);
        $input = strip_tags($input);
        $input = htmlspecialchars($input);
        return $input;
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Formuliergegevens worden hier ontvangen
    $naam = validate_input($_POST['naam']);
    $visitor_email = validate_input($_POST['algemeen-email']);
    $onderwerp = $_POST['onderwerp'];
    $bericht = validate_input($_POST['bericht']);

    // Valideerd de invoergegevens
    $errors = array();

    if (empty($naam) || preg_match("/^[0-9]+$/", $naam)) {
        $errors[] = "Voer uw naam correct in";
    }

    if (empty($visitor_email) || !filter_var($visitor_email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Voer een geldig e-mailadres in";
    }

    if (empty($bericht)) {
        $errors[] = "Voer een bericht in";
    }

    if (count($errors) > 0) {
        // Foutmeldingen weergeven
        foreach ($errors as $error) {
            echo "<p>$error</p>";
        }
    } else {
        $email_from = $visitor_email;
        // E-mailinhoud opmaken
        $email_body = "
        <html>
        <head>
            <title>{$onderwerp}</title>
        </head>
        <body>
            <h2>{$onderwerp}</h2>
            <p><strong>Naam(en):</strong><br>{$naam}</p>
            <p><strong>E-mailadres:</strong><br>{$visitor_email}</p>
            <p><strong>Bericht:</strong><br>{$bericht}</p>
        </body>
        </html>
        ";

        // Plain-text versie van de email body
        $email_body_text = "Onderwerp: $onderwerp\n"
            . "Naam: $naam\n"
            . "E-mailadres: $visitor_email\n"
            . "Bericht: $bericht\n";

        // TODO: set email for the reciever here
        $to = 'melissaqvandijk1999@gmail.com';

        send_email_helper($to, $onderwerp, $email_body, $email_body_text );
        
exit(200);
        // Verstuurd een bevestigingsmail
        $confirmation_email = "
        <html>
        <head>
            <title>Bevestiging van uw bericht</title>
        </head>
        <body>
            <p>Bedankt voor uw bericht!</p>
        </body>
        </html>
        ";
         // Verstuurd een bevestigingsmail
        $confirmation_email_text = "Bedankt voor uw bericht";
        $confirmation_subject = "Bevestiging aanmelding proefschieten";
        send_email_helper($visitor_email, $confirmation_subject, $confirmation_email, $confirmation_email_text );
        
        // Redirect naar de contactpagina
        header('Location:../pages/contact_succes.html');
        exit;
    }
}