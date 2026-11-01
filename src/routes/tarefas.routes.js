const { Router } = require('express');
const controller = require('../controllers/tarefas.controller');
const { validateTask } = require('../middlewares/validateTasks');

const router = Router();

router.get('/', controller.list);
router.get('/:id', controller.getById);
router.post('/', validateTask({ partial: false }), controller.create);
router.put('/:id', validateTask({ partial: false }), controller.update);
router.patch('/:id', validateTask({ partial: true }), controller.update);
router.patch('/:id/complete', controller.complete);
router.delete('/:id', controller.remove);

module.exports = router;
