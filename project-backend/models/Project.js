const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    user_email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    episodes: {
        type: Number,
        required: true
    },
    links: [
        {
            name: {
                type: String,
                required: true
            },
            platform: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Project', ProjectSchema);
