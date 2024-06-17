<?php
// Lê o arquivo JSON
$json = file_get_contents('products.json');

// Converte o JSON em um objeto PHP
$products = json_decode($json);

// Agora você pode acessar os dados no objeto PHP
foreach ($products as $category => $details) {
    echo "Categoria: " . $details->nome . "\n";
    foreach ($details as $subCategory => $subDetails) {
        if (is_object($subDetails)) {
            echo "Subcategoria: " . $subDetails->Tipo . "\n";
            foreach ($subDetails->Produtos as $product) {
                echo "Nome do Produto: " . $product->nome . "\n";
                echo "Descrição: " . $product->descrição . "\n";
                echo "Categoria: " . $product->categoria . "\n";
                echo "Valor: " . $product->valor . "\n";
                echo "-----------------\n";
            }
        } elseif (is_array($subDetails)) {
            foreach ($subDetails as $product) {
                echo "Nome do Produto: " . $product->nome . "\n";
                echo "Descrição: " . $product->descrição . "\n";
                echo "Categoria: " . $product->categoria . "\n";
                echo "Valor: " . $product->valor . "\n";
                echo "-----------------\n";
            }
        }
    }
}
