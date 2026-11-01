class HttpError extends Error {
  constructor(status, message, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

function notFound(req, res, next) {
  next(new HttpError(404, `Rota ${req.method} ${req.originalUrl} não encontrada`));
}

function errorHandler(err, req, res, next) {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'JSON inválido' });
  }
  const status = err.status || 500;
  const body = { error: status === 500 ? 'Erro interno do servidor' : err.message };
  if (err.details) body.details = err.details;
  if (status === 500) console.error(err);
  res.status(status).json(body);
}

module.exports = { HttpError, notFound, errorHandler };
