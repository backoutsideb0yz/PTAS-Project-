import * as tarefasService from '../services/tarefas.service.js';
import { ErroDeValidacao } from '../services/tarefas.service.js';

function responderErro(res, erro, mensagemPadrao) {
  if (erro instanceof ErroDeValidacao) {
    return res.status(400).json({ error: erro.message });
  }
  console.error(erro);
  return res.status(500).json({ error: mensagemPadrao });
}

export const listar = async (req, res) => {
  try {
    const tarefas = await tarefasService.listar();
    return res.status(200).json(tarefas);
  } catch (erro) {
    return responderErro(res, erro, 'Erro interno ao listar as tarefas.');
  }
};

export const criar = async (req, res) => {
  try {
    const dados = req.body || {};
    const novaTarefa = await tarefasService.criar(dados);
    return res.status(201).json(novaTarefa);
  } catch (erro) {
    return responderErro(res, erro, 'Erro interno ao criar a tarefa.');
  }
};