import express from 'express';
import { login, signup } from '../controller/userController.js';

const router = express.Router();

// Route for logging in
router.post('/login', login);

// Route for signing up
router.post('/signup', signup);

export default router;

