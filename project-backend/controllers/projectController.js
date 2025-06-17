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
    const { user_email, projectId, name, platform, url, description = '' } = req.body;

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

        project.links.push({ name, platform, url, description });
        await project.save();

        res.status(200).json(project);
    } catch (err) {
        console.error('Error adding link to project:', err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};

// Update a link in a project
exports.updateLink = async (req, res) => {
    const { user_email, projectId, linkId, name, platform, url, description } = req.body;

    try {
        if (!user_email || !projectId || !linkId) {
            return res.status(400).json({
                error: 'Missing required fields',
                required: ['user_email', 'projectId', 'linkId']
            });
        }

        const project = await Project.findOne({ _id: projectId, user_email });

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const linkIndex = project.links.findIndex(link => link._id.toString() === linkId);

        if (linkIndex === -1) {
            return res.status(404).json({ error: 'Link not found' });
        }

        // Update link fields
        if (name) project.links[linkIndex].name = name;
        if (platform) project.links[linkIndex].platform = platform;
        if (url) project.links[linkIndex].url = url;
        if (description !== undefined) project.links[linkIndex].description = description;

        await project.save();
        res.status(200).json(project);
    } catch (err) {
        console.error('Error updating link:', err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};

// Delete a link from a project
exports.deleteLink = async (req, res) => {
    const { user_email, projectId, linkId } = req.body;

    try {
        if (!user_email || !projectId || !linkId) {
            return res.status(400).json({
                error: 'Missing required fields',
                required: ['user_email', 'projectId', 'linkId']
            });
        }

        const project = await Project.findOne({ _id: projectId, user_email });

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        project.links = project.links.filter(link => link._id.toString() !== linkId);
        await project.save();

        res.status(200).json(project);
    } catch (err) {
        console.error('Error deleting link:', err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};

// Update widget configuration
exports.updateWidgetConfig = async (req, res) => {
    const { user_email, projectId, widgetConfig } = req.body;

    try {
        if (!user_email || !projectId || !widgetConfig) {
            return res.status(400).json({
                error: 'Missing required fields',
                required: ['user_email', 'projectId', 'widgetConfig']
            });
        }

        const project = await Project.findOne({ _id: projectId, user_email });

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Merge the widget configuration
        project.widgetConfig = { ...project.widgetConfig, ...widgetConfig };
        await project.save();

        res.status(200).json(project);
    } catch (err) {
        console.error('Error updating widget config:', err);
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
