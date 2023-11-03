<?php 

// $host = "localhost";
// $user = "id19657141_admin";
// $pass = "n{]h{MkUh=43/O+|";
// $db   = "id19657141_cee_db";

$host = "localhost";
$user = "root";
$pass = "";
$db   = "cee_db";

$conn = null;

try {
  $conn = new PDO("mysql:host={$host};dbname={$db};",$user,$pass);
} catch (Exception $e) {
  
}


 ?>