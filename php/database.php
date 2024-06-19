<?php
// Carregar o conteúdo do arquivo JSON
$jsonFile = '../database/products.json';
$jsonData = file_get_contents($jsonFile);

// Decodificar o JSON para um array associativo
$products = json_decode($jsonData, true);

// Configurar o cabeçalho para a resposta ser do tipo JSON
header('Content-Type: application/json');

// Enviar os produtos como JSON
echo json_encode($products);
