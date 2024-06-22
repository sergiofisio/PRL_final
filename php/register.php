<?php
$data = json_decode(file_get_contents('php://input'), true);

$nome = $data['nome'];
$email = $data['email'];
$phone = $data['phone'];
$endereco = $data['endereco'];
$senha = $data['senha'];

$file = '../database/register.json';
$current_data = json_decode(file_get_contents($file), true);

$current_data[] = [
    'nome' => $nome,
    'email' => $email,
    'phone' => $phone,
    'endereco' => $endereco,
    'senha' => $senha
];

file_put_contents($file, json_encode($current_data, JSON_UNESCAPED_UNICODE));

echo json_encode(['success' => true]);
