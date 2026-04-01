<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name       = $_POST['name'];
    $email      = $_POST['email'];
    $phone      = $_POST['phone'];
    $subject    = $_POST['subject'];
    $message    = $_POST['message'];
    $newsletter = isset($_POST['newsletter']) ? "Yes" : "No";

    $to = "info@todfco.org";

    $email_subject = "Contact Form: " . $subject;

    $body = "
    Name: $name
    Email: $email
    Phone: $phone
    Newsletter: $newsletter

    Message:
    $message
    ";

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    mail($to, $email_subject, $body, $headers);

    header("Location: contact.html");
}
?>