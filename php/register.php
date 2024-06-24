<?php
$data = json_decode(file_get_contents('php://input'), true);

$nome = $data['nome'];
$email = $data['email'];
$phone = $data['phone'];
$endereco = $data['endereco'];
$senha = $data['senha'];

$file = '../database/register.json';
$current_data = json_decode(file_get_contents($file), true);

$ultimoId = 0;
foreach ($current_data as $item) {
    if (isset($item['id']) && $item['id'] > $ultimoId) {
        $ultimoId = $item['id'];
    }
}
$proximoId = $ultimoId + 1;

$current_data[] = [
    'id' => $proximoId,
    'nome' => $nome,
    'email' => $email,
    'phone' => $phone,
    'endereco' => $endereco,
    'senha' => $senha,
    "admin" => false
];

file_put_contents($file, json_encode($current_data, JSON_UNESCAPED_UNICODE));

echo json_encode(['success' => true]);
