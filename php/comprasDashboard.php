<?php
$jsonFile = '../database/compras.json';
$jsonData = file_get_contents($jsonFile);

$compras = json_decode($jsonData, true);

header('Content-Type: application/json');

echo json_encode($compras);
