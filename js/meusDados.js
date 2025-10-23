document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll(".user-info input");
    const editarBtn = document.getElementById("editar-btn");
    const salvarBtn = document.getElementById("salvar-btn");

    // --- Preenche os campos com valores salvos (exemplo do localStorage)
    inputs.forEach(input => {
        const id = input.id;
        input.value = localStorage.getItem(id) || "";
    });
    
    // --- Quando clicar em "Editar Dados"
    editarBtn.addEventListener("click", () => {
    inputs.forEach(input => {
        input.removeAttribute("readonly");
        input.classList.add("editable"); 
    });

    editarBtn.style.display = "none";
    salvarBtn.style.display = "inline-block";
  });

    // --- Quando clicar em "Salvar"
    salvarBtn.addEventListener("click", () => {
    inputs.forEach(input => {
      input.setAttribute("readonly", true);
      input.classList.remove("editable");

      // Atualiza os dados salvos
      localStorage.setItem(input.id, input.value);
    });

    salvarBtn.style.display = "none";
    editarBtn.style.display = "inline-block";

    alert("Dados atualizados com sucesso!");
  });

   // --- Preenche os campos com o que estiver salvo no localStorage ---
  inputs.forEach(input => {
    const valor = localStorage.getItem(input.id);
    if (valor) input.value = valor;
  });

});