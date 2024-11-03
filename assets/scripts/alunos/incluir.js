import { ENDPOINTS } from "../config.js";
import { buildModal, modalActivate } from "../modalBuild.js";
//-------------------------------------------
//./alunos/incluir.html
//Rota POST /api/alunos - Incluir novo aluno
//-------------------------------------------
const formReference = document.getElementById('aluno-form-incluir')

let titleMessage = '';
let bodyMessage = '';

formReference.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch(ENDPOINTS.ALUNOS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        
        if (result.error) throw new Error(result.error);

        titleMessage = 'Registro inserido com sucesso';
        bodyMessage = `<div>ID: ${result.id}</div>
                        <div>Nome: ${result.nome}</div>
                        <div>Data de Nascimento: ${result.data_nascimento}</div>
                        <div>Email: ${result.email}</div>
                        <div>Telefone: ${result.telefone}</div>
                        <div>Criado em: ${result.criado_em}</div>`;
        
        buildModal(1,titleMessage, bodyMessage);
        modalActivate(null);
        formReference.reset();
    } catch (error) {
        console.error(error.message, error);
        buildModal(1,'Erro ao enviar o formulário', error.message);
        modalActivate(null);
    }
});


