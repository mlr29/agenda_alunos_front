import { ENDPOINTS } from '../../scripts/config.js';
import { buildModal, modalActivate } from '../modalBuild.js';

//-------------------------------------------
//./agenda/incluir.html
//Rota POST /api/agenda - Incluir nova agenda
//-------------------------------------------

const saveFormReference = document.getElementById('agenda-form-incluir')

const urlParams = new URLSearchParams(window.location.search);
const aluno_id = urlParams.get('aluno_id');

const alunoReq = await fetch(`${ENDPOINTS.ALUNOS}/${aluno_id}`);
const alunoResult = await alunoReq.json();

// Atribui o valor ao campo de input
saveFormReference.querySelector('input[name="nome"]').value = alunoResult.nome;
saveFormReference.querySelector('input[name="aluno_id"]').value = aluno_id;

saveFormReference.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    let titleMessage = "";
    let bodyMessage = "";

    try {
        const response = await fetch(`${ENDPOINTS.AGENDA}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log(result);
        if (result.error) throw new Error(result.error)

        titleMessage = 'Registro inserido com sucesso';
        bodyMessage = `<div>ID: ${result.id}</div>
                        <div>Aluno ID: ${result.aluno_id}</div>
                        <div>Data: ${result.data}</div>
                        <div>Hora: ${result.hora}</div>
                        <div>Descrição: ${result.descricao}</div>
                        <div>Local: ${result.local}</div>`;
        buildModal(1,titleMessage, bodyMessage)
        modalActivate(null);
    } catch (error) {
        console.error('Erro ao enviar o formulário:', error);
        buildModal(1,titleMessage, bodyMessage);
        modalActivate(null);
    } 
});