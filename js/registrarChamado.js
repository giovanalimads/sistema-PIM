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
  const dropArea = document.getElementById("drop-area"); 
  if (dropArea) { 
    dropArea.addEventListener("dragover", (e) => { 
      e.preventDefault(); 
      
      dropArea.classList.add("ativo"); 
    }); 
    
    dropArea.addEventListener("dragleave", () => { 
      dropArea.classList.remove("ativo"); 
    }); 
    
    dropArea.addEventListener("drop", (e) => { 
      e.preventDefault(); 
      
      dropArea.classList.remove("ativo"); 
      
      const arquivos = e.dataTransfer.files; 
      
      console.log("Arquivos enviados:", arquivos); // Aqui você pode enviar os arquivos para o servidor futuramente 
    }); 
  } 
});