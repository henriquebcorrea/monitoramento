const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');
const auth = require('../middleware/auth');

router.post('/', auth, boardController.create);
router.get('/', boardController.getAll);
router.get('/user', auth, boardController.getByUser);
router.get('/:id', boardController.getById);
router.put('/:id', auth, boardController.update);
router.delete('/:id', auth, boardController.delete);

module.exports = router;
