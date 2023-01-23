const router = require('express-promise-router')();
const authController = require('../controllers/auth.controller');

router.post('/login', authController.loginAuth);
router.post('/logout', authController.logoutAuth);
router.get('/active', authController.activeAuth);

module.exports = router;