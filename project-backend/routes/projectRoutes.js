const express = require('express');
const router = express.Router();
const {
    createProject,
    getProjectsByUserEmail,
    addLink,
    getProjectById,
} = require('../controllers/projectController');

// Create a new project
router.post('/create', createProject);

// Get projects by user email
router.get('/:user_email', getProjectsByUserEmail);

// Add a link to a project
router.post('/add-link', addLink);

// Get a project by ID
router.get('/project/:projectId', getProjectById);

module.exports = router;
