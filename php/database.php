<?php
// Carregar o conteúdo do arquivo JSON
$jsonFile = '../database/products.json';
$jsonData = file_get_contents($jsonFile);

// Decodificar o JSON para um array associativo
$products = json_decode($jsonData, true);

// Função para exibir os produtos
function exibirProdutos($products)
{
    foreach ($products as $categoria) {
        echo "<h2>Categoria: " . htmlspecialchars($categoria['categoria']) . "</h2>";
        if (isset($categoria['tipo'])) {
            echo "<h3>Tipo: " . htmlspecialchars($categoria['tipo']) . "</h3>";
        }
        foreach ($categoria['produtos'] as $produto) {
            echo "<div>";
            echo "<strong>Nome:</strong> " . htmlspecialchars($produto['nome']) . "<br>";
            echo "<strong>Descrição:</strong> " . htmlspecialchars($produto['descrição']) . "<br>";
            echo "<strong>Categoria:</strong> " . htmlspecialchars($produto['categoria']) . "<br>";
            echo "<strong>Imagem:</strong> <img src='" . htmlspecialchars($produto['img']) . "' alt='" . htmlspecialchars($produto['nome']) . "'><br>";
            echo "<strong>Valor:</strong> " . htmlspecialchars($produto['valor']) . "€<br>";
            echo "</div><br>";
        }
    }
}

// Exibir os produtos
exibirProdutos($products);
