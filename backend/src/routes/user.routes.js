const router = require('express-promise-router')();
const userController = require('../controllers/user.controller');

const auth = require('../middlewares/auth.middleware');

router.post('/users', userController.createUser);
router.get('/users', auth, userController.fetchAllUsers);
router.delete('/users/:id', auth, userController.deleteUser);
router.put('/users/:id', auth, userController.editUser);
router.get('/users/:id', auth, userController.fetchUserById);

module.exports = router;