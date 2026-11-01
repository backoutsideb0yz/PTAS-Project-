const express = require('express');
const routes = require('./routes/tarefas.routes');
const { notFound, errorHandler } = require('./middlewares/errrorHandler');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/tarefas', routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
