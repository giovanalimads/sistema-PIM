// Lista fictícia de funcionários
    const funcionarios = [
        { nome: "Giovana Lima Oliveira", email: "giovana@empresa.com", categoria: "Administradora" },
        { nome: "Carlos Mendes", email: "carlos@empresa.com", categoria: "Técnico" },
        { nome: "Fernanda Souza", email: "fernanda@empresa.com", categoria: "Técnica" },
        { nome: "Rafael Silva", email: "rafael@empresa.com", categoria: "Administrador" },
        { nome: "Joana Torres", email: "joana@empresa.com", categoria: "Técnica" },
    ];

    const tabela = document.querySelector("#tabelaFuncionarios tbody");
    const pesquisa = document.getElementById("pesquisa");

    // Função para renderizar tabela
    function renderizarTabela(lista) {
        tabela.innerHTML = "";
        lista.forEach(f => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${f.nome}</td>
                <td>${f.email}</td>
                <td>${f.categoria}</td>
                <td><button class="btn-ver" onclick="verDados('${f.nome}', '${f.email}', '${f.categoria}')">Ver Dados</button></td>
            `;
            tabela.appendChild(tr);
        });

        if (lista.length === 0) {
            tabela.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#999;">Nenhum funcionário encontrado.</td></tr>`;
        }
    }

    // Função de pesquisa
    pesquisa.addEventListener("input", () => {
        const termo = pesquisa.value.toLowerCase();
        const filtrados = funcionarios.filter(f =>
            f.nome.toLowerCase().includes(termo) ||
            f.email.toLowerCase().includes(termo)
        );
        renderizarTabela(filtrados);
    });

    // Função de ação "Ver Dados"
    function verDados(nome, email, categoria) {
        alert(`👤 Nome: ${nome}\n📧 E-mail: ${email}\n🏷️ Categoria: ${categoria}`);
    }

    // Renderiza ao carregar
    renderizarTabela(funcionarios);