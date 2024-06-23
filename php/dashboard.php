<?php
$jsonFile = '../database/contato.json';
$jsonData = file_get_contents($jsonFile);

$contato = json_decode($jsonData, true);

header('Content-Type: application/json');

echo json_encode($contato);
