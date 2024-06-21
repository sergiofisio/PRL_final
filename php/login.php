<?php
$jsonFile = '../../database/register.json';
$jsonData = file_get_contents($jsonFile);

$users = json_decode($jsonData, true);

header('Content-Type: application/json');

echo json_encode($users);
