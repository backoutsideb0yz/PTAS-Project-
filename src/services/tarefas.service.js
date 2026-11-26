import { pool } from '../config/database.js';

export class ErroDeValidacao extends Error {
  constructor(message) {
    super(message);
    this.name = 'ErroDeValidacao';
  }
}

export async function listar() {
  const { rows } = await pool.query('SELECT * FROM tarefas ORDER BY id');
  return rows;
}

export async function criar({ titulo, descricao, concluida }) {
  if (typeof titulo !== 'string' || titulo.trim() === '') {
    throw new ErroDeValidacao('O título é obrigatório.');
  }
  if (titulo.trim().length > 100) {
    throw new ErroDeValidacao('O título deve ter no máximo 100 caracteres.');
  }
  if (concluida !== undefined && typeof concluida !== 'boolean') {
    throw new ErroDeValidacao('O campo "concluida" deve ser true ou false.');
  }

  const { rows } = await pool.query(
    `INSERT INTO tarefas (titulo, descricao, concluida)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [titulo.trim(), descricao?.trim() ?? null, concluida ?? false]
  );
  return rows[0];
}