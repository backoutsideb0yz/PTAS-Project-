const { HttpError } = require('../middlewares/errrorHandler');

const STATUSES = ['pendente', 'em_andamento', 'concluida'];
const PRIORITIES = ['baixa', 'media', 'alta'];

let tasks = [];
let nextId = 1;

function findOrFail(id) {
  const task = tasks.find((t) => t.id === Number(id));
  if (!task) throw new HttpError(404, 'Tarefa não encontrada');
  return task;
}

function list({ status, priority, search } = {}) {
  let result = [...tasks];
  if (status) result = result.filter((t) => t.status === status);
  if (priority) result = result.filter((t) => t.priority === priority);
  if (search) {
    const q = search.toLowerCase();
    result = result.filter((t) => t.title.toLowerCase().includes(q));
  }
  return result;
}

function getById(id) {
  return findOrFail(id);
}

function create(data) {
  const now = new Date().toISOString();
  const status = data.status || 'pendente';
  const task = {
    id: nextId++,
    title: data.title.trim(),
    description: data.description || '',
    status,
    priority: data.priority || 'media',
    dueDate: data.dueDate || null,
    createdAt: now,
    updatedAt: now,
    completedAt: status === 'concluida' ? now : null,
  };
  tasks.push(task);
  return task;
}

function update(id, data) {
  const task = findOrFail(id);

  if (task.status === 'concluida' && (data.status === undefined || data.status === 'concluida')) {
    throw new HttpError(409, 'Tarefa concluída não pode ser editada. Altere o status para reabri-la.');
  }

  const fields = ['title', 'description', 'status', 'priority', 'dueDate'];
  for (const f of fields) {
    if (data[f] !== undefined) task[f] = f === 'title' ? data[f].trim() : data[f];
  }
  if (task.status === 'concluida' && !task.completedAt) task.completedAt = new Date().toISOString();
  if (task.status !== 'concluida') task.completedAt = null;
  task.updatedAt = new Date().toISOString();
  return task;
}

function complete(id) {
  const task = findOrFail(id);
  if (task.status === 'concluida') throw new HttpError(409, 'Tarefa já está concluída');
  const now = new Date().toISOString();
  task.status = 'concluida';
  task.completedAt = now;
  task.updatedAt = now;
  return task;
}

function remove(id) {
  const task = findOrFail(id);
  tasks = tasks.filter((t) => t.id !== task.id);
}

function reset() {
  tasks = [];
  nextId = 1;
}

module.exports = { STATUSES, PRIORITIES, list, getById, create, update, complete, remove, reset };
