import React, { useState } from 'react';
import { FaYoutube, FaSpotify, FaUpload } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import styles from '../styles/UploadModal.module.css';

const UploadModal = ({ platform, onClose, onUpload }) => {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    const handleSubmit = (event) => {
        event.stopPropagation();
        if (name && link) {
            onUpload({ name, url: link, createdAt: new Date().toISOString(), platform: platform });
            onClose();
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    {platform === 'YouTube' && <FaYoutube style={{ color: '#DA0000' }} className={styles.modalIcon} />}
                    {platform === 'Spotify' && <FaSpotify style={{ color: '#7BD568' }} className={styles.modalIcon} />}
                    {platform !== 'Spotify' && platform !== 'YouTube' && <FaUpload style={{ color: '#999' }} className={styles.modalIcon} />}
                    {/* <FaYoutube className={styles.modalIcon} /> */}
                    <h2 className={styles.modalTitle}>Upload from {platform}</h2>
                    {/* <div> */}
                    <button className={styles.closeIcon} onClick={onClose}>
                        <IoMdClose size={50} />
                        {/* Close */}
                    </button>
                    {/* </div> */}
                </div>
                <div className={styles.modalForm}>
                    <div>
                        <label className={styles.modalLabel}>Name</label>
                        <input
                            type="text"
                            className={styles.modalInput}
                            // placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className={styles.modalLabel}>Link</label>
                        <input
                            type="text"
                            className={styles.modalInput}
                            // placeholder="Enter link"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                        />
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.uploadButton} onClick={handleSubmit}>
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadModal;
