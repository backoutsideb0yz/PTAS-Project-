# API de Tarefas

API simples para gerenciar tarefas, feita com Node.js e Express. Os dados ficam em memória.

## Como rodar

```
npm install
npm start
```

Acessa em http://localhost:3000

## Rotas

- GET /tarefas
- GET /tarefas/:id
- POST /tarefas
- PUT /tarefas/:id
- PATCH /tarefas/:id
- PATCH /tarefas/:id/complete
- DELETE /tarefas/:id

## Exemplo

```
POST /tarefas
{
  "title": "Estudar Express",
  "priority": "alta"
}
```

## Regras

- title é obrigatório (mínimo 3 letras)
- status: pendente, em_andamento ou concluida
- priority: baixa, media ou alta
- tarefa concluída não pode ser editada