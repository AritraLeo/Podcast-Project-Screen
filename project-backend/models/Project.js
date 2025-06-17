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
            description: {
                type: String,
                default: ''
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    // Widget configuration settings
    widgetConfig: {
        general: {
            chatbotName: {
                type: String,
                default: 'Chatbot'
            },
            welcomeMessage: {
                type: String,
                default: 'Hello! How can I help you today?'
            },
            inputPlaceholder: {
                type: String,
                default: 'Type your message...'
            }
        },
        display: {
            primaryColor: {
                type: String,
                default: '#7BD568'
            },
            fontColor: {
                type: String,
                default: '#3C3C3C'
            },
            fontSize: {
                type: Number,
                default: 25
            },
            chatHeight: {
                type: String,
                default: 'Lorem ipsum'
            },
            showSources: {
                type: Boolean,
                default: true
            }
        },
        advanced: {
            chatIcon: {
                size: {
                    type: String,
                    default: 'Small (48x48 px)'
                },
                position: {
                    type: String,
                    default: 'Bottom Right'
                },
                distanceFromBottom: {
                    type: Number,
                    default: 20
                },
                horizontalDistance: {
                    type: Number,
                    default: 20
                }
            },
            botIcon: {
                type: String,
                default: '' // URL to uploaded icon
            }
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Project', ProjectSchema);
