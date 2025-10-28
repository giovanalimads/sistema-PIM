// === Gerar protocolo e data automaticamente === 
document.addEventListener('DOMContentLoaded', () => { 
  const protocoloElemento = document.getElementById('protocolo'); 
  const dataElemento = document.getElementById('data'); 
  
  if (protocoloElemento && dataElemento) { 
    const protocolo = 'PRT' + Math.floor(Math.random() * 1000000); 
    const hoje = new Date(); 
    const data = hoje.toLocaleDateString('pt-BR'); 
    
    protocoloElemento.textContent = protocolo; dataElemento.textContent = data; 
  } 
  
  // === Atualizar nível de urgência conforme categoria === 
  const categoria = document.getElementById("categoria"); 
  const urgencia = document.getElementById("urgencia"); 
  
  if (categoria && urgencia) { 
    categoria.addEventListener("change", () => { 
      const valor = categoria.value; 
      let nivel = ""; switch (valor) { 
        case "Equipamentos": 
        case "Servidores": 
          nivel = "Alta"; 
          break; 
        case "Redes e Internet": 
        case "Sistemas e Maquininhas": 
        nivel = "Média"; 
        break; 
        case "Impressoras e Periféricos": 
        case "Instalação/Atualização": 
        nivel = "Baixa"; 
        break; 
        default: 
        nivel = ""; 
      } 
      
      urgencia.value = nivel; 
    }); 
  } 
  
  // === Drag and Drop de arquivos (estrutura base) === 
  
  // Trocar de tela sem enviar o registro
  const btnLogout = document.getElementById("btnLogout");
  const popup = document.getElementById("popup-logout");
  const confirmar = document.getElementById("confirmarLogout");
  const cancelar = document.getElementById("cancelarLogout");

  // abre o pop-up
  btnLogout.addEventListener("click", () => {
    popup.style.display = "flex";
  });

  // confirma logout
  confirmar.addEventListener("click", () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "../html/TeladeLogin.html";
  });

  // cancela logout
  cancelar.addEventListener("click", () => {
    popup.style.display = "none";
  });
});