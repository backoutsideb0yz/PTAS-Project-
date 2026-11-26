import { MongoClient } from 'mongodb';

const conexao = {
  cliente: null,
  banco: null,
};

export async function iniciarConexao() {
  if (conexao.banco) return conexao.banco;

  const { MONGODB_URI, MONGODB_DB_NAME } = process.env;

  if (!MONGODB_URI || !MONGODB_DB_NAME) {
    throw new Error('Configure MONGODB_URI e MONGODB_DB_NAME no .env');
  }

  const cliente = new MongoClient(MONGODB_URI);

  try {
    await cliente.connect();9
    await cliente.db('admin').command({ ping: 1 });
  } catch (erro) {
    await cliente.close();
    throw new Error(`Não foi possível conectar ao MongoDB: ${erro.message}`);
  }

  conexao.cliente = cliente;
  conexao.banco = cliente.db(MONGODB_DB_NAME);
  return conexao.banco;
}

export function pegarBanco() {
  if (!conexao.banco) {
    throw new Error('Banco não conectado. Chame iniciarConexao() antes.');
  }
  return conexao.banco;
}

export async function fecharConexao() {
  if (conexao.cliente) {
    await conexao.cliente.close();
    conexao.cliente = null;
    conexao.banco = null;
  }
}