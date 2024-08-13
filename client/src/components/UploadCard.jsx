import React, { useState, useEffect } from 'react';
import UploadModal from './UploadModal';
import { FaYoutube, FaSpotify, FaUpload } from 'react-icons/fa';
import styles from '../styles/UploadCard.module.css'; // Make sure you create this CSS file

const UploadCard = ({ platform, onUpload }) => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = (event) => {
        event.stopPropagation();
        setShowModal(true);
    };

    const handleCloseModal = (event) => {
        event?.stopPropagation();
        setShowModal(false);
        // console.log('showModal:', showModal);
    };

    useEffect(() => {
        console.log('Modal state changed:', showModal);
    }, [showModal]);


    return (
        <div className={styles.uploadCard} onClick={handleOpenModal}>
            <div className={styles.iconContainer}>
                {platform === 'YouTube' && <FaYoutube size={40} className={styles.youtubeIcon} />}
                {platform === 'Spotify' && <FaSpotify size={40} className={styles.spotifyIcon} />}
                {platform !== 'Spotify' && platform !== 'YouTube' && <FaUpload size={40} className={styles.uploadIcon} />}
            </div>
            <div className={styles.textContainer}>
                <div className={styles.uploadText}>Upload {platform} {platform !== 'Spotify' && platform !== 'YouTube' ? '' : 'Video'}</div>
                {/* <div className={styles.platformText}> {platform} Video</div> */}
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
