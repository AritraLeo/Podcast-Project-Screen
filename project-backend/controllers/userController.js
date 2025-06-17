const User = require('../models/User');

// Create or update user
exports.createOrUpdateUser = async (req, res) => {
    const { email, username } = req.body;

    try {
        if (!email || !username) {
            return res.status(400).json({
                error: 'Missing required fields',
                required: ['email', 'username']
            });
        }

        // Check if user exists
        let user = await User.findOne({ email });

        if (user) {
            // Update existing user
            user.username = username;
            await user.save();
        } else {
            // Create new user
            user = new User({ email, username });
            await user.save();
        }

        res.status(200).json(user);
    } catch (err) {
        console.error('Error creating/updating user:', err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};

// Get user by email
exports.getUserByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        if (!email || email === 'undefined') {
            return res.status(400).json({
                error: 'Email is required and cannot be undefined'
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};

// Update username
exports.updateUsername = async (req, res) => {
    const { email, username } = req.body;

    try {
        if (!email || !username) {
            return res.status(400).json({
                error: 'Missing required fields',
                required: ['email', 'username']
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.username = username;
        await user.save();

        res.status(200).json(user);
    } catch (err) {
        console.error('Error updating username:', err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
}; 