import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/CreateProjectModal.module.css';
import { createProject } from './../utils/storage';

const CreateProjectModal = ({ isOpen, onClose, onProjectCreated }) => {
    const [projectName, setProjectName] = useState('');
    const [episodeCount, setEpisodeCount] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const projectName = e.target.elements.projectName.value.trim();
        const episodeCount = parseInt(e.target.elements.episodeCount.value.trim());

        if (!projectName) {
            alert("Project Name is required!");
            return;
        }

        if (isNaN(episodeCount) || episodeCount < 0) {
            alert("Please enter a valid number of episodes.");
            return;
        }

        try {
            const userEmail = localStorage.getItem('user_email');

            if (!userEmail) {
                alert("User email not found. Please refresh and try again.");
                return;
            }

            const projectData = {
                user_email: userEmail,
                name: projectName,
                episodes: episodeCount
            };

            await createProject(projectData);

            // Reset form fields
            setProjectName('');
            setEpisodeCount('');

            // Close modal
            onClose();

            // Trigger parent component to refresh projects
            if (onProjectCreated) {
                onProjectCreated();
            }

        } catch (error) {
            console.error('Error creating project:', error);
            alert('Failed to create project. Please try again.');
        }
    };

    return (
        isOpen && (
            <div className={styles.modalBackground}>
                <div className={styles.modalContent}>
                    <button className={styles.closeButton} onClick={onClose}>X</button>
                    <form onSubmit={handleSubmit} className={styles.modalForm}>
                        <label htmlFor="projectName" className={styles.modalLabel}>Project Name</label>
                        <input
                            type="text"
                            id="projectName"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            required
                            className={styles.modalInput}
                        />
                        <label htmlFor="episodeCount" className={styles.modalLabel}>Number of Episodes</label>
                        <input
                            type="number"
                            id="episodeCount"
                            value={episodeCount}
                            onChange={(e) => setEpisodeCount(e.target.value)}
                            required
                            className={styles.modalInput}
                        />
                        <button type="submit" className={styles.createButton}>Create</button>
                    </form>
                </div>
            </div>
        )
    );
};

export default CreateProjectModal;

CreateProjectModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onProjectCreated: PropTypes.func,
};
