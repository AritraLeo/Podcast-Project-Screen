const express = require('express');
const router = express.Router();
const {
    createProject,
    getProjectsByUserEmail,
    addLink,
    updateLink,
    deleteLink,
    updateWidgetConfig,
    getProjectById,
} = require('../controllers/projectController');

// Create a new project
router.post('/create', createProject);

// Get projects by user email
router.get('/:user_email', getProjectsByUserEmail);

// Add a link to a project
router.post('/add-link', addLink);

// Update a link in a project
router.put('/update-link', updateLink);

// Delete a link from a project
router.delete('/delete-link', deleteLink);

// Update widget configuration
router.put('/widget-config', updateWidgetConfig);

// Get a project by ID
router.get('/project/:projectId', getProjectById);

module.exports = router;
