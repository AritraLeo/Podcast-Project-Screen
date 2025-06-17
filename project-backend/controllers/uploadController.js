const { uploadToR2, deleteFromR2, extractFileNameFromUrl } = require('../services/uploadService');

// Upload bot icon
exports.uploadBotIcon = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                error: 'No file uploaded',
                message: 'Please select an image file to upload'
            });
        }

        // Upload to Cloudflare R2
        const uploadResult = await uploadToR2(req.file);

        res.status(200).json({
            message: 'File uploaded successfully',
            file: uploadResult
        });
    } catch (error) {
        console.error('Error uploading bot icon:', error);
        res.status(500).json({
            error: 'Upload failed',
            message: error.message
        });
    }
};

// Delete bot icon
exports.deleteBotIcon = async (req, res) => {
    try {
        const { fileUrl } = req.body;

        if (!fileUrl) {
            return res.status(400).json({
                error: 'File URL is required'
            });
        }

        // Extract filename from URL
        const fileName = extractFileNameFromUrl(fileUrl);
        if (!fileName) {
            return res.status(400).json({
                error: 'Invalid file URL'
            });
        }

        // Delete from Cloudflare R2
        await deleteFromR2(fileName);

        res.status(200).json({
            message: 'File deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting bot icon:', error);
        res.status(500).json({
            error: 'Delete failed',
            message: error.message
        });
    }
}; 