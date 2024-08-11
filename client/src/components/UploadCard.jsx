import React from 'react';

const UploadCard = ({ platform }) => {
    const handleClick = () => {
        // Show upload modal
    };

    return (
        <div className="upload-card" onClick={handleClick}>
            <img src={`/assets/${platform.toLowerCase()}.svg`} alt={platform} />
            <span>Upload to {platform}</span>
        </div>
    );
};

export default UploadCard;
