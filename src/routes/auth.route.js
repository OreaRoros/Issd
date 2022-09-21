const express = require('express');
const router = express.Router();


const LoginController = require('../controllers/LoginControllers');

router.get('/login', LoginController.login);
router.post('/login', LoginController.loginSubmit);
router.get('/register', LoginController.register);
router.post('/register', LoginController.registerSubmit);
router.get('/logout', LoginController.logout);

module.exports = router;