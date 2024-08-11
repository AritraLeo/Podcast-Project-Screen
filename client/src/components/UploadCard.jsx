import React, { useState } from 'react';
import UploadModal from './UploadModal';

const UploadCard = ({ platform, onUpload }) => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <div className="upload-card" onClick={handleOpenModal}>
                <img src={`/assets/${platform.toLowerCase()}.svg`} alt={platform} />
                <span>Upload to {platform}</span>
            </div>
            {showModal && (
                <UploadModal
                    platform={platform}
                    onClose={handleCloseModal}
                    onUpload={onUpload}
                />
            )}
        </div>
    );
};

export default UploadCard;
