<?php
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

    if (empty($naam) || !preg_match("/^[a-zA-Z ]+$/", $naam)) {
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

        // Email instellingen
        $to = 'melissaqvandijk1999@gmail.com';
        $subject = $onderwerp;
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