/* ============================
   TROCAR ETAPA 1 → ETAPA 2
   ============================ */
document.getElementById("btnEtapa1").addEventListener("click", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome");
    const cpf = document.getElementById("cpf");
    const telefone = document.getElementById("telefone");
    const cep = document.getElementById("cep");
    const endereco = document.getElementById("endereco");
    const bairro = document.getElementById("bairro");
    const complemento = document.getElementById("complemento");

    const cpfNum = cpf.value.replace(/\D/g, "");
    const telNum = telefone.value.replace(/\D/g, "");
    const cepNum = cep.value.replace(/\D/g, "");

    let valido = true;

    if (nome.value.trim() === "") valido = false;
    if (cpfNum.length !== 11) valido = false;
    if (telNum.length < 10 || telNum.length > 11) valido = false;
    if (cepNum.length !== 8) valido = false;

    if (!valido) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    // Salva dados temporários
    localStorage.setItem("nome", nome.value);
    localStorage.setItem("cpf", cpfNum);
    localStorage.setItem("telefone", telefone.value);
    localStorage.setItem("endereco", endereco.value);
    localStorage.setItem("bairro", bairro.value);
    localStorage.setItem("complemento", complemento.value);
    localStorage.setItem("cep", cep.value);

    // Troca de tela
    document.getElementById("etapa1").classList.remove("active");
    document.getElementById("etapa2").classList.add("active");
});

/* ============================
   BOTÃO VOLTAR
   ============================ */
document.getElementById("voltar").addEventListener("click", () => {
    document.getElementById("etapa2").classList.remove("active");
    document.getElementById("etapa1").classList.add("active");
});

/* ============================
   ENVIAR CADASTRO
   ============================ */
document.getElementById("btnCadastrar").addEventListener("click", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const repetir = document.getElementById("repetirSenha").value;

    if (senha !== repetir) {
        alert("As senhas não coincidem.");
        return;
    }

    const dados = {
        nome: localStorage.getItem("nome"),
        cpf: localStorage.getItem("cpf"),
        telefone: localStorage.getItem("telefone"),
        endereco: `${localStorage.getItem("endereco")}, ${localStorage.getItem("bairro")}, ${localStorage.getItem("complemento")}, CEP ${localStorage.getItem("cep")}`,
        email: email,
        senha: senha,
        tipo: "usuario"
    };

    try {
        const resposta = await fetch("http://localhost:3000/cadastro", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(dados)
        });

        const texto = await resposta.text();
        alert(texto);
    } catch (err) {
        alert("Erro ao conectar ao servidor: " + err.message);
    }
});