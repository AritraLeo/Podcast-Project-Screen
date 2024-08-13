import React from 'react';
import styles from '../styles/ProjectCard.module.css';

const ProjectCard = ({ project }) => {
    // Generate initials
    const initials = project.name.split(' ').map(word => word[0]).join('');

    // Generate random background color for the initials box
    const colors = ['#7E22CE', '#F8A01D', '#6366F1'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    return (
        <a href={`/project/${project.id}`} style={{ textDecoration: 'none' }}>
            <div className={styles.card}>
                <div className={styles.initials} style={{ backgroundColor: randomColor }}>
                    {initials}
                </div>
                <div className={styles.details}>
                    <h3 className={styles.projectName}>{project.name}</h3>
                    <p className={styles.projectEpisodes}>{project.episodes} Episodes</p>
                    <p className={styles.projectCreatedAt}>Last edited {new Date(project.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        </a>
    );
};

export default ProjectCard;
