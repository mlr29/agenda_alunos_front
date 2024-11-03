import { ENDPOINTS } from "../config.js";
import { buildModal, modalActivate } from "../modalBuild.js";

//-------------------------------------------
//./alunos/atualizar.html
//Rota PUT /api/alunos/:id - Atualizar aluno
//-------------------------------------------
const urlParams = new URLSearchParams(window.location.search);
const aluno_id = urlParams.get('aluno_id');

const updateFormReference = document.getElementById('aluno-atualizar-form')

updateFormReference.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita o envio padrão do formulário

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch(`${ENDPOINTS.ALUNOS}/${aluno_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Erro desconhecido");
        }

        const result = await response.json();
       
        const titleMessage = 'Registro atualizado com sucesso.';
        const bodyMessage = ` <div>ID: ${result.id}\n</div>
                        <div>Nome: ${result.nome}</div>
                        <div>Data de Nascimento: ${result.data_nascimento}</div>
                        <div>Email: ${result.email}</div>
                        <div>Telefone: ${result.telefone}</div>
                        <div>Criado em: ${result.criado_em}</div>`;
    
        buildModal(1,titleMessage, bodyMessage);
        modalActivate(null);
    } catch (error) {
        switch (error.message) {
            case "Aluno não encontrado":
                console.error(error.message);
                buildModal(1,error.message, 'ID do aluno não existe.');
                break;
            default:
                console.error(error);
                buildModal(1,"Registro não atualizado", error.message);
                break;
        }

        modalActivate(null);
    }
})

