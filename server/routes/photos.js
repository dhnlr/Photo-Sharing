const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');
const commentController = require('../controllers/commentController');
const auth = require('../middlewares/auth');
const author = require('../middlewares/author')
const images = require('../middlewares/images')

/* GET photos listing. */
router.get('/', auth, author, photoController.read);
router.get('/:id/c', auth, photoController.readId);
router.get('/username/:id', auth, photoController.readUserId)
router.post('/', auth, images.multer.single('image'), images.uploadCloudinari, images.imageeffect, photoController.create);
router.post('/:id/comments', auth, commentController.create, photoController.createComment);
router.put('/:id', auth, author, photoController.update);
router.put('/:id/comments/:comment', auth, commentController.update);
router.delete('/:id', auth, author, photoController.destroy);
router.delete('/:id/comments/:comment', auth, commentController.destroy);

module.exports = router;