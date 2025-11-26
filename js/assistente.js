// Banco de dados de soluções (Baseado nas categorias do PDF - Pg 62)
const solucoesDB = {
    'sistemas': "<strong>1.</strong> Limpe o cache do navegador (Ctrl + Shift + Del).<br><strong>2.</strong> Verifique se o login está correto.<br><strong>3.</strong> Tente acessar por uma aba anônima.",
    'equipamentos': "<strong>1.</strong> Verifique se o cabo de energia está bem conectado.<br><strong>2.</strong> Tente ligar em outra tomada.<br><strong>3.</strong> Mantenha o botão Power pressionado por 10s para reiniciar.",
    'redes': "<strong>1.</strong> Verifique se o cabo de rede está conectado.<br><strong>2.</strong> Reinicie o modem/roteador (aguarde 30s desligado).<br><strong>3.</strong> Verifique se o 'Modo Avião' está desligado.",
    'impressoras': "<strong>1.</strong> Confira se há papel na bandeja.<br><strong>2.</strong> Verifique se há luzes piscando (erro/atolamento).<br><strong>3.</strong> Reinicie a impressora e o computador.",
    'instalacao': "<strong>1.</strong> Verifique se há espaço livre em disco.<br><strong>2.</strong> Execute o instalador como 'Administrador'.<br><strong>3.</strong> Desative temporariamente o antivírus durante a instalação.",
    'servidores': "<strong>1.</strong> Verifique sua conexão VPN.<br><strong>2.</strong> Confirme suas credenciais de acesso.<br><strong>3.</strong> Aguarde 5 minutos e tente reconectar."
};

// Funções de Controle do Modal
function abrirAssistente() {
    const modal = document.getElementById('modal-assistente');
    modal.style.display = 'flex';
    voltarCategorias(); // Garante que sempre abre na tela inicial
}

function fecharAssistente() {
    document.getElementById('modal-assistente').style.display = 'none';
}

// Lógica de Navegação e Injeção de Conteúdo
function verSolucao(categoria) {
    const solucao = solucoesDB[categoria];
    // Formata o título (ex: 'redes' vira 'Redes') - Capitaliza a 1ª letra
    const titulo = categoria.charAt(0).toUpperCase() + categoria.slice(1);

    // Injeta o conteúdo nos elementos HTML
    document.getElementById('titulo-categoria').innerText = "Solução: " + titulo;
    document.getElementById('texto-solucao').innerHTML = solucao;

    // Troca de tela (Esconde Categorias -> Mostra Solução)
    document.getElementById('tela-categorias').style.display = 'none';
    const telaSolucao = document.getElementById('tela-solucao');
    telaSolucao.style.display = 'block';

    // Reinicia a animação da tela de solução
    telaSolucao.style.animation = 'none';
    telaSolucao.offsetHeight; /* trigger reflow */
    telaSolucao.style.animation = "fadeIn 0.5s";
}

function voltarCategorias() {
    // Troca de tela (Esconde Solução -> Mostra Categorias)
    document.getElementById('tela-solucao').style.display = 'none';
    const telaCategorias = document.getElementById('tela-categorias');
    telaCategorias.style.display = 'block';

    // Reinicia a animação
    telaCategorias.style.animation = 'none';
    telaCategorias.offsetHeight; /* trigger reflow */
    telaCategorias.style.animation = "fadeIn 0.5s";
}

// Fechar modal ao clicar fora dele (UX)
window.onclick = function (event) {
    const modal = document.getElementById('modal-assistente');
    if (event.target == modal) {
        fecharAssistente();
    }
}