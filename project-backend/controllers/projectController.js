const Project = require('../models/Project');

// Create a new project
exports.createProject = async (req, res) => {
    const { user_email, name, episodes } = req.body;

    try {
        const newProject = new Project({
            user_email,
            name,
            episodes
        });

        const project = await newProject.save();
        res.status(201).json(project);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get projects by user_email
exports.getProjectsByUserEmail = async (req, res) => {
    const { user_email } = req.params;

    try {
        const projects = await Project.find({ user_email });
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Add a link to a project
exports.addLink = async (req, res) => {
    const { user_email, projectId, name, platform, url } = req.body;

    try {
        const project = await Project.findOne({ _id: projectId, user_email });

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        project.links.push({ name, platform, url });
        await project.save();

        res.status(200).json(project);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get a single project by ID
exports.getProjectById = async (req, res) => {
    const { projectId } = req.params;

    try {
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.status(200).json(project);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
