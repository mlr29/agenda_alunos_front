# Agenda de Alunos Front-end

Sistema de Agenda onde alunos cadastrados podem registrar o dia-a-dia de suas atividades. Desenvolvido na matéria de Banco de Dados II do curso de Ciência da Computação.  


- [Funcionalidades](#funcionalidades)
- [Bootstrap](#Bootstrap)
- [Consumo de rotas da API](#rotas-da-api)
- [Back-end](#back-end)

## Funcionalidades

- Cadastrar, atualizar e deletar alunos;
- Adicionar, atualizar e deletar agendas de alunos;

## Bootstrap 

Para estilização foram utilizados classes e o modal do Bootstrap. 
## Rotas da API 

### Alunos
#### Recuperar todos os alunos

```https
  GET /api/alunos/list
```

#### Recuperar aluno selecionado

```https
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id do item buscado. |

#### Criar novo aluno

```https
  POST api/alunos/
```

#### Atualizar aluno 

```https
  PUT api/alunos/
```

#### Deletar aluno 

```https
  DELETE api/alunos/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id do item deletado. |

### Agenda 

Basta substituir `/aluno/` por `/agenda/` nas rotas acima.

## Back-end

O back-end do projeto foi feito em Node.js e pode ser acessado [aqui](https://github.com/SAVANOo/agenda_alunos).
