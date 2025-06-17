const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

// Configure Cloudflare R2 client (S3-compatible)
const r2Client = new S3Client({
    region: process.env.CLOUDFLARE_R2_REGION || 'auto',
    endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
    },
});

// Configure multer for memory storage (we'll upload directly to R2)
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        // Allow only image files
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed (JPEG, PNG, GIF, WebP)'), false);
        }
    }
});

// Generate unique filename
const generateFileName = (originalName) => {
    const timestamp = Date.now();
    const randomString = crypto.randomBytes(8).toString('hex');
    const extension = path.extname(originalName);
    return `bot-icons/${timestamp}-${randomString}${extension}`;
};

// Upload file to Cloudflare R2
const uploadToR2 = async (file) => {
    try {
        const fileName = generateFileName(file.originalname);

        const uploadParams = {
            Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
            CacheControl: 'max-age=31536000', // 1 year cache
        };

        const command = new PutObjectCommand(uploadParams);
        await r2Client.send(command);

        // Generate public URL
        const publicUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL
            ? `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${fileName}`
            : `${process.env.CLOUDFLARE_R2_ENDPOINT}/${process.env.CLOUDFLARE_R2_BUCKET_NAME}/${fileName}`;

        return {
            fileName,
            url: publicUrl,
            size: file.size,
            mimetype: file.mimetype
        };
    } catch (error) {
        console.error('Error uploading to R2:', error);
        throw new Error('Failed to upload file to storage');
    }
};

// Delete file from Cloudflare R2
const deleteFromR2 = async (fileName) => {
    try {
        const deleteParams = {
            Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
            Key: fileName,
        };

        const command = new DeleteObjectCommand(deleteParams);
        await r2Client.send(command);

        return true;
    } catch (error) {
        console.error('Error deleting from R2:', error);
        throw new Error('Failed to delete file from storage');
    }
};

// Extract filename from URL for deletion
const extractFileNameFromUrl = (url) => {
    try {
        const urlParts = url.split('/');
        const fileName = urlParts.slice(-2).join('/'); // Get "bot-icons/filename.ext"
        return fileName;
    } catch (error) {
        console.error('Error extracting filename from URL:', error);
        return null;
    }
};

module.exports = {
    upload,
    uploadToR2,
    deleteFromR2,
    extractFileNameFromUrl
}; 