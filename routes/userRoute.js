import express from 'express';
import { registerUser, login, getCurrentUser } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js'; // Import the middleware

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(login);
// Apply authMiddleware to the '/get-current-user' route
router.route('/get-current-user').get(authMiddleware, getCurrentUser);

export default router;
