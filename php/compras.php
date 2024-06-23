<?php
// 1. Receber os dados via POST
$dadosJson = file_get_contents('php://input');

// 2. Decodificar o JSON recebido
$compra = json_decode($dadosJson);

// Verificar se $compra é null
if ($compra === null) {
    // Logar erro ou enviar uma resposta de erro
    error_log('Dados de compra inválidos ou ausentes.');
    echo "Erro: Dados de compra inválidos ou ausentes.";
    exit; // Parar a execução para evitar adicionar null ao arquivo
}

// 3. Ler o arquivo compras.json existente
$comprasExistentesJson = file_get_contents('../database/compras.json');
$comprasExistentes = json_decode($comprasExistentesJson, true);

// Se o arquivo não existir ou estiver vazio, inicialize um novo array
if (!$comprasExistentes) {
    $comprasExistentes = [];
}

// 4. Adicionar os novos dados ao array
array_push($comprasExistentes, $compra);

// 5. Codificar o array atualizado para JSON
$comprasAtualizadasJson = json_encode($comprasExistentes, JSON_PRETTY_PRINT);

// 6. Salvar o JSON atualizado no arquivo compras.json
file_put_contents('../database/compras.json', $comprasAtualizadasJson);

echo "Compra registrada com sucesso.";
