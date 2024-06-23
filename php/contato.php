<?php
// Caminho para o arquivo JSON
$arquivoJson = '../database/contato.json';

// Verifica se os dados foram enviados via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST['nome'] ?? '';
    $email = $_POST['email'] ?? '';
    $assunto = $_POST['assunto'] ?? '';
    $mensagem = $_POST['mensagem'] ?? '';

    // Lê o arquivo JSON atual
    $dadosJson = json_decode(file_get_contents($arquivoJson), true);

    // Prepara a nova entrada
    $novaEntrada = ["nome" => $nome, "email" => $email, "mensagem" => $mensagem];

    // Adiciona a nova entrada no array correto, baseado no assunto
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
            // Trata casos não esperados
            echo "Assunto não reconhecido.";
            exit;
    }

    // Salva o arquivo JSON atualizado
    if (file_put_contents($arquivoJson, json_encode($dadosJson, JSON_PRETTY_PRINT))) {
        echo "Contato salvo com sucesso.";
    } else {
        echo "Erro ao salvar o contato.";
    }
} else {
    // Método não permitido
    echo "Método de requisição não permitido.";
}
