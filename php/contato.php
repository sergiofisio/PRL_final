<?php
$arquivoJson = '../database/contato.json';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST['nome'] ?? '';
    $email = $_POST['email'] ?? '';
    $assunto = $_POST['assunto'] ?? '';
    $mensagem = $_POST['mensagem'] ?? '';

    $dadosJson = json_decode(file_get_contents($arquivoJson), true);

    $novaEntrada = ["nome" => $nome, "email" => $email, "mensagem" => $mensagem];

    $ultimoId = 0;
    foreach ($dadosJson[0][$assunto] as $item) {
        if ($item['id'] > $ultimoId) {
            $ultimoId = $item['id'];
        }
    }
    $novaEntrada['id'] = $ultimoId + 1;

    switch ($assunto) {
        case 'duvida':
            $dadosJson[0]['duvida'][] = $novaEntrada;
            break;
        case 'sugestao':
            $dadosJson[0]['sugestao'][] = $novaEntrada;
            break;
        case 'elogio':
            $dadosJson[0]['elogio'][] = $novaEntrada;
            break;
        default:
            echo "Assunto não reconhecido.";
            exit;
    }

    if (file_put_contents($arquivoJson, json_encode($dadosJson, JSON_PRETTY_PRINT))) {
        echo "Contato salvo com sucesso.";
    } else {
        echo "Erro ao salvar o contato.";
    }
} else {
    echo "Método de requisição não permitido.";
}
