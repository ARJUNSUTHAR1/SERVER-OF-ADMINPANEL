const express = require('express');
const { registerUser, login, getCurrentUser } = require('../controllers/userController');
const authMiddleware = require("../middlewares/authMiddleware")
const router = express.Router();


router.route('/register').post(registerUser);
router.route('/login').post(login);
router.route('/get-current-user').get(authMiddleware, getCurrentUser)

module.exports = router;