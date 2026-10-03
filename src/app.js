const express = require('express');
const authRoutes = require('./routes/auth.routes');
const projectRoutes = require('./routes/project.routes');
const taskRoutes = require('./routes/task.routes');
const {notFound, errorHandler} = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;