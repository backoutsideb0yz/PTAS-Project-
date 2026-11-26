import * as tarefasModel from '../models/tarefas.model.js';

export class ErroDeValidacao extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = 'ErroDeValidacao';
  }
}

function formatar(tarefa) {
  const { _id, ...resto } = tarefa;
  return { id: _id.toString(), ...resto };
}

export async function listar() {
  const tarefas = await tarefasModel.listarTodas();
  return tarefas.map(formatar);
}

export async function criar({ titulo, descricao, concluida } = {}) {
  if (typeof titulo !== 'string' || titulo.trim() === '') {
    throw new ErroDeValidacao('O título é obrigatório.');
  }
  if (titulo.trim().length > 100) {
    throw new ErroDeValidacao('O título deve ter no máximo 100 caracteres.');
  }
  if (concluida !== undefined && typeof concluida !== 'boolean') {
    throw new ErroDeValidacao('O campo "concluida" deve ser true ou false.');
  }

  const id = await tarefasModel.salvar({
    titulo: titulo.trim(),
    descricao: typeof descricao === 'string' ? descricao.trim() : null,
    concluida: concluida ?? false,
  });

  const tarefaCriada = await tarefasModel.encontrarPorId(id);
  return formatar(tarefaCriada);
}