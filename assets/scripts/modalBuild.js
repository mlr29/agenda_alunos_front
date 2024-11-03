export function buildModal(modalId, title, bodyContent) {
    // Cria o botão que abre o modal
    const modalCurrent = document.querySelector("div[class='modal fade']") ?? 0;

    if(modalCurrent){
      modalCurrent.id = modalId;
      modalCurrent.setAttribute("aria-labelledby", `${modalId}Label`);

      const modalTitle = document.querySelector("h1[class='modal-title fs-5']");
      console.log(modalTitle)
      modalTitle.textContent = title;

      const modalBody = document.querySelector("div[class='modal-body']");
      modalBody.innerHTML = bodyContent;

      return;
    }

    
  
    // Cria a estrutura do modal
    const modal = document.createElement("div");
    modal.className = "modal fade";
    modal.id = modalId;
    modal.setAttribute("tabindex", "-1");
    modal.setAttribute("aria-labelledby", `${modalId}Label`);
    modal.setAttribute("aria-hidden", "true");
  
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="${modalId}Label">${title}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Ok"></button>
          </div>
          <div class="modal-body">
            ${bodyContent}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="btnOk" data-bs-dismiss="modal">Ok</button>
          </div>
        </div>
      </div>
    `;
  
    // Adiciona o botão e o modal ao body do documento
    document.body.appendChild(modal);
  }

  export function modalActivate(elementID) {
    // Referência ao modal usando Bootstrap API
    const meuModal = new bootstrap.Modal(document.getElementById('1'));
    
    // Exibe o modal
    meuModal.show();

    if(elementID){
      const btnOk = document.getElementById('btnOk');
      console.log(btnOk);
      btnOk.addEventListener("click", () => {window.location.reload()})
      return;
    }
    // Ativa o botão dentro do modal
    const botao = document.querySelector("button[type='submit']");
    console.log(botao)
    botao.disabled = false;
  }