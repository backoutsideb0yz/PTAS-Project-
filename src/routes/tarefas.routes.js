import { Router } from 'express';
import * as tarefasController from '../controllers/tarefas.controller.js';

const rotas = Router();

rotas
  .route('/')
  .get(tarefasController.listar)
  .post(validateTasks, tarefasController.criar);

export default rotas;