import express from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from '../controllers/userController.js';

const router = express.Router();

// Home route
router.get('/', (req, res) => {
  res.render('index', { title: 'My Express App' });
});

// User CRUD routes
router.get('/users', getUsers);            // Read all users
router.post('/users', createUser);         // Create a new user
router.get('/users/:id', getUserById);     // Read a user by ID
router.put('/users/:id', updateUserById);  // Update a user by ID
router.delete('/users/:id', deleteUserById); // Delete a user by ID

export default router;