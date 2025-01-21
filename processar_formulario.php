<?php
$host = 'localhost';
$dbname = 'empresa_db';
$user = 'root';
$password = '';

// Conecta ao banco de dados
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Verificar se a requisição é do tipo POST (Cadastro de empresa)
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Recebe os dados do formulário
        $nome_loja = $_POST['nome_loja'];
        $cnpj = $_POST['cnpj'];
        $email = $_POST['email'];
        $contato = $_POST['contato'];
        $cep = $_POST['cep'];
        $rua = $_POST['rua'];
        $numero = $_POST['numero'];
        $complemento = $_POST['complemento'];
        $bairro = $_POST['bairro'];
        $cidade = $_POST['cidade'];
        $estado = $_POST['estado'];
        $logomarca = $_FILES['logomarca'];

        // Processa o upload da imagem
        $logomarca_nome = $logomarca['name'];
        $logomarca_tmp = $logomarca['tmp_name'];
        $logomarca_destino = 'uploads/' . $logomarca_nome;
        move_uploaded_file($logomarca_tmp, $logomarca_destino);

        // Insere no banco de dados
        $sql = "INSERT INTO empresas (nome_loja, cnpj, email, contato, cep, rua, numero, complemento, bairro, cidade, estado, logomarca)
                VALUES (:nome_loja, :cnpj, :email, :contato, :cep, :rua, :numero, :complemento, :bairro, :cidade, :estado, :logomarca)";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':nome_loja' => $nome_loja,
            ':cnpj' => $cnpj,
            ':email' => $email,
            ':contato' => $contato,
            ':cep' => $cep,
            ':rua' => $rua,
            ':numero' => $numero,
            ':complemento' => $complemento,
            ':bairro' => $bairro,
            ':cidade' => $cidade,
            ':estado' => $estado,
            ':logomarca' => $logomarca_destino
        ]);

        echo "Empresa cadastrada com sucesso!";
    }

    // Verifica se a requisição é do tipo GET (Obter empresas)
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Busca todas as empresas cadastradas
        $sql = "SELECT nome_loja, logomarca FROM empresas";
        $stmt = $pdo->query($sql);
        $empresas = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Retorna os dados em formato JSON
        echo json_encode($empresas);
    }

} catch (PDOException $e) {
    echo "Erro ao conectar ou processar o formulário: " . $e->getMessage();
}
?>