// Função que faz a busca na tabela
    document.addEventListener('DOMContentLoaded', () => {
        const inputPesquisa = document.getElementById('pesquisa');
        const tabela = document.getElementById('tabela-funcionarios');
        const linhas = tabela.getElementsByTagName('tr');

        inputPesquisa.addEventListener('keyup', function () {
            const termo = inputPesquisa.value.toLowerCase();

            for (let i = 0; i < linhas.length; i++) {
                const colunas = linhas[i].getElementsByTagName('td');
                if (colunas.length > 0) {
                    const nome = colunas[1].textContent.toLowerCase();
                    const email = colunas[2].textContent.toLowerCase();

                    if (nome.includes(termo) || email.includes(termo)) {
                        linhas[i].style.display = ''; // mostra a linha
                    } else {
                        linhas[i].style.display = 'none'; // oculta
                    }
                }
            }
        });

        // vizualizar dados do funcionário 
    
        // excluir funcionário

        // botões + e x
        const toggleBtn = document.getElementById("toggle-btn");
        const opcoes = document.querySelector(".opcoes");

        toggleBtn.addEventListener("click", () => {
            toggleBtn.classList.toggle("ativo");
            opcoes.classList.toggle("mostrar");
        });
    });