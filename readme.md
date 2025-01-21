# Cadastro de Lojas

Este é um sistema de cadastro de lojas utilizando PHP, HTML, CSS, JavaScript e o XAMPP para execução local.

## Requisitos

Para executar o projeto localmente, você precisará de:

- **PHP** (versão 7.4 ou superior)
- **XAMPP** (ou qualquer servidor web local que suporte PHP e MySQL)
- **Navegador web** (Google Chrome, Firefox, etc.)

## Passos para Executar o Projeto Localmente

### 1. Instalar o XAMPP

Se você ainda não tem o XAMPP instalado, siga os seguintes passos:

- Acesse [https://www.apachefriends.org/index.html](https://www.apachefriends.org/index.html) e faça o download do XAMPP.
- Instale o XAMPP seguindo as instruções para o seu sistema operacional.

### 2. Configurar o Ambiente Local

Após a instalação do XAMPP, siga os passos abaixo:

1. **Iniciar o XAMPP:**
   - Abra o XAMPP e inicie o Apache e o MySQL.
   
2. **Configurar o diretório do projeto:**
   - Copie o código do projeto para a pasta `htdocs` do XAMPP. Normalmente, ela está localizada em `C:\xampp\htdocs` (Windows) ou `/Applications/XAMPP/htdocs` (macOS).
   - O nome da pasta onde você copiou o projeto será a URL para acessá-lo no navegador (por exemplo, `http://localhost/nome-do-projeto`).

3. **Configurar o banco de dados:**
   - Acesse o `phpMyAdmin` clicando no botão "Admin" ao lado de "MySQL" no painel de controle do XAMPP.
   - Crie um banco de dados para o seu projeto (exemplo: `lojas_cadastro`).
   - Importe qualquer estrutura de tabelas necessária para o funcionamento do projeto (dependendo das necessidades, você pode criar tabelas para armazenar dados como lojas, logomarcas, etc).

### 3. Executando o Projeto

1. Abra o navegador e acesse `http://localhost/nome-do-projeto` (substitua `nome-do-projeto` pelo nome da pasta onde você salvou o código).
2. A página inicial exibirá um formulário para cadastrar lojas com as seguintes informações:
   - Nome da loja
   - CNPJ
   - E-mail
   - Contato
   - Endereço (CEP, rua, número, complemento, bairro, cidade, estado)
   - Logomarca (upload de imagem)

3. Ao preencher o formulário e clicar em "Cadastrar Loja", os dados serão enviados para o arquivo `processar_formulario.php`, que pode ser configurado para processar e salvar os dados no banco de dados.

### 4. Máscaras de Formulário

O formulário possui máscaras de entrada para alguns campos:
- **CNPJ:** Formatação automática para CNPJ (XX.XXX.XXX/XXXX-XX).
- **Telefone:** Formatação automática para telefone (XX XXXXX-XXXX).
- **CEP:** Formatação automática para CEP (XXXXX-XXX).
