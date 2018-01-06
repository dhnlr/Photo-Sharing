const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../middlewares/auth');
const author = require('../middlewares/author')

/* GET comments listing. */
router.get('/', auth, author, commentController.read);
router.get('/:id', auth, author, commentController.readId);
router.post('/add', auth, commentController.create);
router.put('/:id', auth, author, commentController.update);
router.delete('/:id', auth, author, commentController.destroy);

module.exports = router;