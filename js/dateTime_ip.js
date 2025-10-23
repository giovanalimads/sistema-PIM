// retorna data e horário de acesso
        document.addEventListener("DOMContentLoaded", () => {
            const dataAcesso = document.getElementById("data-acesso");

            const agora = new Date();
            const dataFormatada = agora.toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
            });

            const horaFormatada = agora.toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
            });

            // mostra na tela
            dataAcesso.textContent = `Acesso em: ${dataFormatada} às ${horaFormatada}`;
        });

        // busca IP do usuário
        fetch("https://api.ipify.org?format=json")
        .then(reponse => response.json())
        .then(data => {
            const ipAcesso = document.getElementById("ip-acesso");
            ipAcesso.textContent = `IP de acesso: ${data.ip}`;
        })
        .catch(() => {
            const ipAcesso = document.getElementById("ip-acesso");
            ipAcesso.textContent = "IP de acesso: não encontrado"
        });

        // desloga do sistema e volta para a tela de login
