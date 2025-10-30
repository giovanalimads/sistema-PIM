document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastroTecForm');
    const nome = document.getElementById("nome");
    const cpf = document.getElementById("cpf");
    const telefone = document.getElementById("telefone");
    const areaEspecializacao = document.getElementById("areaEspecializacao");
    const nivelExperiencia = document.getElementById("nivelExperiencia");

    const erroNome = document.getElementById("erroNome");
    const erroCpf = document.getElementById("erroCpf");
    const erroTelefone = document.getElementById("erroTelefone");
    const erroArea = document.getElementById("erroArea");
    const erroNivel = document.getElementById("erroNivel");

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // reseta mensagens de erro
        erroNome.textContent = "";
        erroCpf.textContent = "";
        erroTelefone.textContent = "";
        erroArea.textContent = "";
        erroNivel.textContent = "";

        let valido = true;

        // Validação do nome (apenas letras)
        const regexNome = /^[A-Za-zÀ-ÿ\s]+$/;
        if (nome.value.trim() === "") {
          erroNome.textContent = "Digite um nome.";
          valido = false;
        } else if (!regexNome.test(nome.value)) {
          erroNome.textContent = "Este campo deve conter apenas letras.";
          valido = false;
        }

        // Remove caracteres que não são números
        const cpfNumeros = cpf.value.replace(/\D/g, '');
        const telefoneNumeros = telefone.value.replace(/\D/g, '');

        // Validação do CPF (11 números)
        if (cpfNumeros === "") {
          erroCpf.textContent = "Digite seu CPF.";
          valido = false;
        } else if (cpfNumeros.length !== 11) {
          erroCpf.textContent = "CPF inválido. Deve conter 11 números.";
          valido = false;
        }

        // Validação do telefone (11 dígitos)
        if (telefoneNumeros === "") {
          erroTelefone.textContent = "Digite seu telefone.";
          valido = false;
        } else if (telefoneNumeros.length < 10 || telefoneNumeros.length > 11) {
          erroTelefone.textContent = "Telefone inválido. Deve conter 11 dígitos.";
          valido = false;
        }

        if (valido) {
          // Aqui você pode enviar o formulário ou redirecionar

          // --- Salva os dados no localStorage
          localStorage.setItem('nome', nome.value);
          localStorage.setItem('cpf', cpf.value);
          localStorage.setItem('telefone', telefone.value);
          localStorage.setItem('areaEspecializacao', areaEspecializacao.value);
          localStorage.setItem('nivelExperiencia', nivelExperiencia.value);

          window.location.href = ""; 
        }
      });
});