<?php
$dadosJson = file_get_contents('php://input');

$compra = json_decode($dadosJson);

if ($compra === null) {
    error_log('Dados de compra inválidos ou ausentes.');
    echo "Erro: Dados de compra inválidos ou ausentes.";
    exit;
}

$comprasExistentesJson = file_get_contents('../database/compras.json');
$comprasExistentes = json_decode($comprasExistentesJson, true);

if (!$comprasExistentes) {
    $comprasExistentes = [];
    $novoId = 1;
} else {
    $ultimoId = max(array_column($comprasExistentes, 'id'));
    $novoId = $ultimoId + 1;
}

$compra->id = $novoId;

array_push($comprasExistentes, $compra);

$comprasAtualizadasJson = json_encode($comprasExistentes, JSON_PRETTY_PRINT);

file_put_contents('../database/compras.json', $comprasAtualizadasJson);

echo "Compra registrada com sucesso.";
