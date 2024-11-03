import { ENDPOINTS, VIEW_PATHS } from '../../scripts/config.js';
import {eventDelete} from './excluir.js'
//-------------------------------------------
//./agenda/listar.html
//Rota GET /api/agenda/list - Listar agendas
//-------------------------------------------

document.addEventListener('DOMContentLoaded', async () => {
    await carregarAgenda();
});

document.getElementById('pesquisa-button').addEventListener('click', async () => {
    const key = document.getElementById('chave-input').value;

    await carregarAgendaPorChave(key);
});


//retorna true se determinada sequência de caracteres aparece no array
function substringExists(array, substring) {
    for (const element of array) {
        console.log(String(element))
        if (String(element).includes(substring)) {
            return true;
        }
    }
    return false;
}

function criaRegistroAgenda(table, id, aluno_id, data, hora, descricao, local) {
    const tr = document.createElement('tr');

    const tdId = document.createElement('td');
    tdId.textContent = id;
    tr.appendChild(tdId);

    const tdAlunoId = document.createElement('td');
    tdAlunoId.textContent = aluno_id;
    tr.appendChild(tdAlunoId);

    const tdData = document.createElement('td');
    tdData.textContent = data;
    tr.appendChild(tdData);

    const tdHora = document.createElement('td');
    tdHora.textContent = hora;
    tr.appendChild(tdHora);

    const tdDescricao = document.createElement('td');
    tdDescricao.textContent = descricao;
    tr.appendChild(tdDescricao);

    const tdLocal = document.createElement('td');
    tdLocal.textContent = local;
    tr.appendChild(tdLocal);

    
    
    const tdAcoes = document.createElement('td');

    const divAcoes = document.createElement('div');
    divAcoes.classList.value = 'btn-group';

    const buttonDeletar = document.createElement('button');
    let nomeId = `deletar-button-${id}`;
    buttonDeletar.setAttribute('id', nomeId);
    buttonDeletar.classList.add("deletar-button");
    buttonDeletar.textContent = 'Deletar Agenda';
    buttonDeletar.addEventListener('click', () => eventDelete(buttonDeletar));
    buttonDeletar.classList.value +=' btn btn-sm btn-danger'; //Estilo bootstrap
    divAcoes.appendChild(buttonDeletar);
    
    
    const buttonAtualizar = document.createElement('button');
    nomeId = `atualizar-button-${id}`;  
    buttonAtualizar.setAttribute('id', nomeId);
    buttonAtualizar.addEventListener('click', () => {window.location.href=`${VIEW_PATHS.AGENDA.ATUALIZAR}?agenda_id=${id}`});
    buttonAtualizar.classList.add("atualizar-button");
    buttonAtualizar.target = '_blank';
    buttonAtualizar.textContent = 'Atualizar Agenda';
    buttonAtualizar.classList.value += ' btn btn-sm btn-primary';
    divAcoes.appendChild(buttonAtualizar);
    
    tdAcoes.appendChild(divAcoes);

    tr.appendChild(tdAcoes);
    
    const tbodyElement = table.querySelector('tbody');
    tbodyElement.appendChild(tr);
}

async function carregarAgenda() {
try {
    const response = await fetch(`${ENDPOINTS.AGENDA}/list`);
    if (!response.ok) {
        throw new Error(`Erro ao buscar dados: ${response.statusText}`);
    }

    const result = await response.json();
    const table = document.getElementById('tabela-agenda');

    for (const agenda of result) {
        criaRegistroAgenda(table, agenda.id, agenda.aluno_id, agenda.data, agenda.hora, agenda.descricao, agenda.local);
    }

} catch (error) {
    console.error('Erro ao enviar a requisição:', error);
}
}

async function carregarAgendaPorChave(key) {
try {
    const response = await fetch(`${ENDPOINTS.AGENDA}/list`);
    if (!response.ok) {
        throw new Error(`Erro ao buscar dados: ${response.statusText}`);
    }

    const result = await response.json();
    const table = document.getElementById('tabela-agenda');
    while (table.rows.length > 1) { // Mantém o cabeçalho (primeira linha)
        table.deleteRow(1); // Remove a primeira linha após o cabeçalho
    }

    for (const agenda of result) {

        if (key !== null && key !== undefined) {
            const lineArray = [agenda.id, agenda.aluno_id, agenda.data, agenda.hora, agenda.descricao, agenda.local]
            
            if (substringExists(lineArray, key)) {
                criaRegistroAgenda(table, agenda.id, agenda.aluno_id, agenda.data, agenda.hora, agenda.descricao, agenda.local);
            }
        }
    }
} catch (error) {
    console.error('Erro ao enviar a requisição:', error);
}
}

