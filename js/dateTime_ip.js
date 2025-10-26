document.addEventListener("DOMContentLoaded", () => {
  // === Data e hora de acesso ===
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

  dataAcesso.textContent = `Acesso em: ${dataFormatada} às ${horaFormatada}`;

  // === IP público ===
  const ipAcesso = document.getElementById("ip-acesso");

  fetch("https://api.ipify.org?format=json")
    .then(response => response.json())
    .then(data => {
      ipAcesso.textContent = `IP de acesso: ${data.ip}`;
    })
    .catch(() => {
      ipAcesso.textContent = "IP de acesso: não encontrado";
    });

  // === Pop-up de logout ===
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