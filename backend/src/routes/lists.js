const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');
const auth = require('../middleware/auth');

router.post('/', auth, listController.create);
router.get('/board/:boardId', listController.getByBoard);
router.get('/:id', listController.getById);
router.put('/:id', auth, listController.update);
router.delete('/:id', auth, listController.delete);

module.exports = router;
