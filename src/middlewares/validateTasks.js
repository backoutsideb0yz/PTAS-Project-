const { HttpError } = require('./errrorHandler');
const { STATUSES, PRIORITIES } = require('../services/tarefas.service');

function validateTask({ partial }) {
  return (req, res, next) => {
    const body = req.body || {};
    const errors = [];
    const { title, description, status, priority, dueDate } = body;

    if (!partial || title !== undefined) {
      if (typeof title !== 'string' || title.trim().length < 3) {
        errors.push('title é obrigatório e deve ter ao menos 3 caracteres');
      }
    }
    if (description !== undefined && typeof description !== 'string') {
      errors.push('description deve ser texto');
    }
    if (status !== undefined && !STATUSES.includes(status)) {
      errors.push(`status deve ser um de: ${STATUSES.join(', ')}`);
    }
    if (priority !== undefined && !PRIORITIES.includes(priority)) {
      errors.push(`priority deve ser um de: ${PRIORITIES.join(', ')}`);
    }
    if (dueDate !== undefined && dueDate !== null && Number.isNaN(Date.parse(dueDate))) {
      errors.push('dueDate deve ser uma data válida (ex: 2026-12-31)');
    }
    if (partial && Object.keys(body).length === 0) {
      errors.push('envie ao menos um campo para atualizar');
    }

    if (errors.length) return next(new HttpError(400, 'Dados inválidos', errors));
    next();
  };
}

module.exports = { validateTask };
