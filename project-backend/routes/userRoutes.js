const express = require('express');
const router = express.Router();
const {
    createOrUpdateUser,
    getUserByEmail,
    updateUsername
} = require('../controllers/userController');

// Create or update user
router.post('/create-or-update', createOrUpdateUser);

// Get user by email
router.get('/:email', getUserByEmail);

// Update username
router.put('/update-username', updateUsername);

module.exports = router; 