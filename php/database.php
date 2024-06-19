<?php
$jsonFile = '../database/products.json';
$jsonData = file_get_contents($jsonFile);

$products = json_decode($jsonData, true);

header('Content-Type: application/json');

echo json_encode($products);
