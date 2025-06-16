const Project = require('../models/Project');

// Create a new project
exports.createProject = async (req, res) => {
    const { user_email, name, episodes } = req.body;

    try {
        // Validate required fields
        if (!user_email || !name || episodes === undefined) {
            return res.status(400).json({
                error: 'Missing required fields',
                required: ['user_email', 'name', 'episodes'],
                received: { user_email, name, episodes }
            });
        }

        const newProject = new Project({
            user_email,
            name,
            episodes
        });

        const project = await newProject.save();
        res.status(201).json(project);
    } catch (err) {
        console.error('Error creating project:', err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};

// Get projects by user_email
exports.getProjectsByUserEmail = async (req, res) => {
    const { user_email } = req.params;

    try {
        // Validate user_email parameter
        if (!user_email || user_email === 'undefined') {
            return res.status(400).json({
                error: 'User email is required and cannot be undefined'
            });
        }

        const projects = await Project.find({ user_email });
        res.status(200).json(projects);
    } catch (err) {
        console.error('Error fetching projects:', err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};

// Add a link to a project
exports.addLink = async (req, res) => {
    const { user_email, projectId, name, platform, url } = req.body;

    try {
        // Validate required fields
        if (!user_email || !projectId || !name || !platform || !url) {
            return res.status(400).json({
                error: 'Missing required fields',
                required: ['user_email', 'projectId', 'name', 'platform', 'url']
            });
        }

        const project = await Project.findOne({ _id: projectId, user_email });

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        project.links.push({ name, platform, url });
        await project.save();

        res.status(200).json(project);
    } catch (err) {
        console.error('Error adding link to project:', err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};

// Get a single project by ID
exports.getProjectById = async (req, res) => {
    const { projectId } = req.params;

    try {
        // Validate projectId parameter
        if (!projectId || projectId === 'undefined') {
            return res.status(400).json({
                error: 'Project ID is required and cannot be undefined'
            });
        }

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.status(200).json(project);
    } catch (err) {
        console.error('Error fetching project by ID:', err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};
