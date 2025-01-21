document.addEventListener("DOMContentLoaded", function() {
    // Máscaras de campo
    const cnpjMask = document.getElementById('cnpj');
    const telefoneMask = document.getElementById('contato');
    const cepMask = document.getElementById('cep');

    // Máscara para CNPJ
    cnpjMask.addEventListener('input', function() {
        let value = cnpjMask.value.replace(/\D/g, ''); // Remove qualquer não-número
        if (value.length <= 14) {
            value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5'); // Formata o CNPJ
        }
        cnpjMask.value = value;
    });

    // Máscara para telefone
    telefoneMask.addEventListener('input', function() {
        let value = telefoneMask.value.replace(/\D/g, '');
        if (value.length <= 11) {
            value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        }
        telefoneMask.value = value;
    });

    // Máscara para CEP
    cepMask.addEventListener('input', function() {
        let value = cepMask.value.replace(/\D/g, '');
        if (value.length <= 8) {
            value = value.replace(/(\d{5})(\d{3})/, '$1-$2');
        }
        cepMask.value = value;
    });

    // Validar formulário antes de enviar
    // Validar e enviar formulário via AJAX
    document.getElementById('form-cadastro').addEventListener('submit', function(e) {
        e.preventDefault(); 

        const cnpjValue = cnpjMask.value;
        const emailValue = document.getElementById('email').value;
        const contatoValue = telefoneMask.value;
        const cepValue = cepMask.value;

        // Validação do CNPJ
        const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
        if (!cnpjRegex.test(cnpjValue)) {
            alert("CNPJ inválido! Verifique o formato.");
            return;
        }

        // Validação do e-mail
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(emailValue)) {
            alert("E-mail inválido.");
            return;
        }

        // Validação do telefone
        const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
        if (!telefoneRegex.test(contatoValue)) {
            alert("Telefone inválido.");
            return;
        }

        // Validação do CEP
        const cepRegex = /^\d{5}-\d{3}$/;
        if (!cepRegex.test(cepValue)) {
            alert("CEP inválido.");
            return;
        }

        // Envio do formulário via fetch
        const formData = new FormData(this);

        fetch('processar_formulario.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.text()) 
        .then(data => {
            alert(data); 
            carregarEmpresas();
        })
        .catch(error => console.error('Erro ao cadastrar empresa:', error));
    });



    function carregarEmpresas() {
        fetch('processar_formulario.php', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(empresas => {
            const lojasGrid = document.getElementById('lojas-grid');
            lojasGrid.innerHTML = ''; 
    
            empresas.forEach(empresa => {
                const div = document.createElement('div');
                div.classList.add('loja-item');
                div.innerHTML = `
                    <img src="${empresa.logomarca}" alt="${empresa.nome_loja}" class="loja-logo">
                    <p class="nome-loja">${empresa.nome_loja}</p>
                `;
                lojasGrid.appendChild(div);
            });
        })
        .catch(error => console.error('Erro ao carregar empresas:', error));
    }

    // Carregar as empresas ao carregar a página
    carregarEmpresas();
});

