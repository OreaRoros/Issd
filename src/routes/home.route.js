const express = require('express');
const router = express.Router();

const HomeController = require('../controllers/HomeController');

router.get('/', HomeController.home);
router.get('/login', HomeController.login);
router.post('/login', HomeController.loginSubmit);
router.get('/register', HomeController.register);
router.post('/register', HomeController.registerSubmit);
router.get('/logout', HomeController.logout);

module.exports = router;