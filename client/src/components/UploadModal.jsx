import React, { useState } from 'react';

const UploadModal = ({ platform, onClose, onUpload }) => {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    const handleSubmit = () => {
        if (name && link) {
            onUpload({ name, link, createdAt: new Date().toISOString() });
            onClose();
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Upload to {platform}</h2>
                <input
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
                <button onClick={handleSubmit}>Upload</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default UploadModal;
