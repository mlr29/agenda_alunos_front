import { ENDPOINTS } from "../config.js";
import { buildModal, modalActivate } from "../modalBuild.js";

//-------------------------------------------
//./agenda_aluno/excluirAluno.html
//Rota DELETE /api/agenda/:id - Excluir agenda
//-------------------------------------------
export async function eventDelete(element){
    const id = element.id.replace('deletar-button-','');

    try {
        const response = await fetch(`${ENDPOINTS.AGENDA}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if(!(response.status === 204)) return new Error([response])

        buildModal(1,'Registro deletado com sucesso','');
        modalActivate(element.id);

    } catch (error) {
        buildModal(element.id, 'Erro ao deletar formulário:', error.message);
        modalActivate(element.id);
    }
}

