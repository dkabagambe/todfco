<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $firstName   = $_POST['firstName'];
    $lastName    = $_POST['lastName'];
    $email       = $_POST['email'];
    $phone       = $_POST['phone'];
    $age         = $_POST['age'];
    $location    = $_POST['location'];
    $opportunity = $_POST['opportunity'];
    $availability= $_POST['availability'];
    $skills      = $_POST['skills'];
    $motivation  = $_POST['motivation'];
    $agreement   = isset($_POST['agreement']) ? "Agreed" : "Not Agreed";

    $to = "volunteer@todfco.org";

    $subject = "New Volunteer Application";

    $body = "
    Volunteer Application Details:

    Name: $firstName $lastName
    Email: $email
    Phone: $phone
    Age: $age
    Location: $location

    Preferred Opportunity: $opportunity
    Availability: $availability

    Skills & Experience:
    $skills

    Motivation:
    $motivation

    Agreement: $agreement
    ";

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    mail($to, $subject, $body, $headers);

    // Redirect back to same page
    header("Location: volunteer.html");
    exit();
}
?>