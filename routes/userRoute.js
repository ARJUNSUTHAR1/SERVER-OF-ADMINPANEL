const express = require('express');
const { registerUser, login } = require('../controllers/userController');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(login);
router.route('/get-current-user').get(authMiddleware, getCurrentUser)

export default router;
