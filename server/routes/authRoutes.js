import express from 'express';
import { register, login } from '../controllers/authController.js'; // Assuming your controller is using ES modules
import authMiddleware from '../middleware/authMiddleware.js'; // Using ES modules import

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected route example
router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Access to protected resource granted.' });
});

export default router; // Use default export to export the router
