const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const feedController = require('../controllers/feedController')
const auth = require('../middlewares/auth.js');

/* GET users listing. */
/*router.get('/', auth, userController.getUser);
router.get('/:id', auth, userController.getUserId);
router.post('/add', auth, userController.createUser);
router.put('/:id', auth, userController.updateUser);
router.delete('/:id', auth, userController.deleteUser);*/

router.get('/', auth, feedController.feed);
router.get('/:username', auth, userController.getUserUsename)
router.put('/:id/follow', auth, userController.followUser);

module.exports = router;