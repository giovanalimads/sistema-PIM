/* ETAPA 1 – Avançar para etapa 2 com validação */
document.getElementById("btnAvancar").addEventListener("click", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const id = document.getElementById("id").value.trim();
    const cpf = document.getElementById("cpf").value.replace(/\D/g,"");
    const telefone = document.getElementById("telefone").value.replace(/\D/g,"");
    const area = document.getElementById("areaEspecializacao").value;
    const nivel = document.getElementById("nivelExperiencia").value;

    let valido = true;
    document.getElementById("erroNome").textContent="";
    document.getElementById("erroCpf").textContent="";
    document.getElementById("erroTelefone").textContent="";
    document.getElementById("erroArea").textContent="";
    document.getElementById("erroNivel").textContent="";

    if(!nome) { document.getElementById("erroNome").textContent="Digite o nome"; valido=false; }
    if(cpf.length!==11) { document.getElementById("erroCpf").textContent="CPF inválido"; valido=false; }
    if(telefone.length<10 || telefone.length>11) { document.getElementById("erroTelefone").textContent="Telefone inválido"; valido=false; }
    if(!area) { document.getElementById("erroArea").textContent="Selecione a área"; valido=false; }
    if(!nivel) { document.getElementById("erroNivel").textContent="Selecione o nível"; valido=false; }
    if(!valido) return;

    // salvar no localStorage
    localStorage.setItem("nomeTec", nome);
    localStorage.setItem("cpfTec", cpf);
    localStorage.setItem("telefoneTec", telefone);
    localStorage.setItem("areaTec", area);
    localStorage.setItem("nivelTec", nivel);
    localStorage.setItem("idTec", id);

    document.getElementById("cadastro-tec").classList.remove("active");
    document.getElementById("cadastro-tec2").classList.add("active");
});

/* ETAPA 2 – Validação e envio */
document.getElementById("btnCadastrar").addEventListener("click", async (e)=>{
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const repetir = document.getElementById("repetirSenha").value;

    document.getElementById("erroEmail").textContent="";
    document.getElementById("erroSenha").textContent="";
    document.getElementById("erroRepetirSenha").textContent="";

    let valido = true;
    if(!email.includes("@")) { document.getElementById("erroEmail").textContent="Email inválido"; valido=false; }
    if(senha.length<8) { document.getElementById("erroSenha").textContent="Senha deve ter 8+ caracteres"; valido=false; }
    if(senha!==repetir) { document.getElementById("erroRepetirSenha").textContent="Senhas diferentes"; valido=false; }
    if(!valido) return;

    const dados = {
        nome: localStorage.getItem("nomeTec"),
        cpf: localStorage.getItem("cpfTec"),
        telefone: localStorage.getItem("telefoneTec"),
        areaEspecializacao: localStorage.getItem("areaTec"),
        nivelExperiencia: localStorage.getItem("nivelTec"),
        id: localStorage.getItem("idTec"),
        email: email,
        senha: senha,
        tipo: "tecnico"
    };

    console.log("Dados a enviar:", dados);

    try {
        const resposta = await fetch("http://localhost:5030/api/usuarios", {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(dados)
        });
        const r = await resposta.text();
        alert("Resposta API: "+r);
    } catch(err){
        alert("Erro ao enviar: "+err.message);
    }
});

/* VOLTAR */
document.getElementById("voltar").addEventListener("click", ()=>{
    document.getElementById("cadastro-tec2").classList.remove("active");
    document.getElementById("cadastro-tec").classList.add("active");
});