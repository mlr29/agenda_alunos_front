import { ENDPOINTS } from '../../scripts/config.js';
import { buildModal, modalActivate } from '../modalBuild.js';

//-------------------------------------------
//./agenda/atualizar.html
//Rota PUT /api/agenda/:id - Atualizar agenda
//-------------------------------------------

const updateFormReference = document.getElementById('agenda-atualizar-form')

const urlParams = new URLSearchParams(window.location.search);
const agenda_id = urlParams.get('agenda_id');

const agendaReq = await fetch(`${ENDPOINTS.AGENDA}/${agenda_id}`);
const agendaResult = await agendaReq.json();

const aluno_id = agendaResult.aluno_id
const alunoReq = await fetch(`${ENDPOINTS.ALUNOS}/${aluno_id}`);
const alunoResult = await alunoReq.json();

updateFormReference.querySelector('input[name="nome"]').value = alunoResult.nome;

updateFormReference.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita o envio padrão do formulário
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch(`http://localhost:3000/api/agenda/${agenda_id}`, {
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
            
            const titleMessage = 'Registro atualizado com sucesso';
            const bodyMessage = `<div>ID: ${result.id}</div>
                        <div>Aluno ID: ${result.aluno_id}</div>
                        <div>Data: ${result.data}</div>
                        <div>Hora: ${result.hora}</div>
                        <div>Descrição: ${result.descricao}</div>
                        <div>Local: ${result.local}</div>`;

            buildModal(1,titleMessage, bodyMessage);
            modalActivate(null);
        } catch (error) {
            switch (error.message) {
                case "Agenda não encontrada":
                    buildModal(1,error.message, "ID da Agenda não existe");
                    modalActivate(null);
                    break;
                default:
                    buildModal(1, "Agenda não atualizada", error.message);
                    modalActivate(null);
                    break;
            }
        }
    })
