const service = require('../services/tarefas.service');

const wrap = (fn) => (req, res, next) => {
  try {
    fn(req, res);
  } catch (err) {
    next(err);
  }
};

exports.list = wrap((req, res) => {
  res.json(service.list(req.query));
});

exports.getById = wrap((req, res) => {
  res.json(service.getById(req.params.id));
});

exports.create = wrap((req, res) => {
  res.status(201).json(service.create(req.body));
});

exports.update = wrap((req, res) => {
  res.json(service.update(req.params.id, req.body));
});

exports.complete = wrap((req, res) => {
  res.json(service.complete(req.params.id));
});

exports.remove = wrap((req, res) => {
  service.remove(req.params.id);
  res.status(204).send();
});
