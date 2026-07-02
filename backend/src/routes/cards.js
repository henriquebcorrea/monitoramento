const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');
const auth = require('../middleware/auth');

router.post('/', auth, cardController.create);
router.get('/list/:listId', cardController.getByList);
router.get('/board/:boardId', cardController.getByBoard);
router.get('/:id', cardController.getById);
router.put('/:id', auth, cardController.update);
router.delete('/:id', auth, cardController.delete);

module.exports = router;
