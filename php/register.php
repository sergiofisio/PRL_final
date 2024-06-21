<?php
$data = json_decode(file_get_contents('php://input'), true);

$nome = $data['nome'];
$email = $data['email'];
$phone = $data['phone'];
$endereco = $data['endereço'];
$senha = $data['senha'];

$file = '../database/register.json';
$current_data = json_decode(file_get_contents($file), true);

$current_data[] = $data;

file_put_contents($file, json_encode($current_data));

echo json_encode(['success' => true]);
