import React, { useState } from 'react';
import styles from '../styles/CreateProjectModal.module.css';
import { getProjects, setProjects } from './../utils/storage';

const CreateProjectModal = ({ isOpen, onClose }) => {
    const [projectName, setProjectName] = useState('');
    const [episodeCount, setEpisodeCount] = useState('');

    const handleSubmit = (e) => {
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

        // Retrieve existing projects from local storage
        const projects = getProjects();

        // Create a new project object
        const newProject = {
            id: Date.now(),
            name: projectName,
            episodes: episodeCount,
            createdAt: new Date().toLocaleDateString(),
        };

        // Add the new project to the list
        projects.push(newProject);

        // Save the updated list back to local storage
        setProjects(projects);

        // Close the modal after creating the project
        onClose();
    };

    return (
        isOpen && (
            <div className={styles.modalBackground}>
                <div className={styles.modalContent}>
                    <button className={styles.closeButton} onClick={onClose}>X</button>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="projectName">Project Name</label>
                        <input
                            type="text"
                            id="projectName"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            required
                        />
                        <label htmlFor="episodeCount">Number of Episodes</label>
                        <input
                            type="number"
                            id="episodeCount"
                            value={episodeCount}
                            onChange={(e) => setEpisodeCount(e.target.value)}
                            required
                        />
                        <button type="submit" className={styles.createButton}>Create</button>
                    </form>
                </div>
            </div>
        )
    );
};

export default CreateProjectModal;
