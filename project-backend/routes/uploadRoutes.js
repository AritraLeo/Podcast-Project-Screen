const express = require('express');
const router = express.Router();
const { upload } = require('../services/uploadService');
const { uploadBotIcon, deleteBotIcon } = require('../controllers/uploadController');

// Upload bot icon
router.post('/bot-icon', upload.single('botIcon'), uploadBotIcon);

// Delete bot icon
router.delete('/bot-icon', deleteBotIcon);

module.exports = router; 