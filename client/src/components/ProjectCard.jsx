import React from 'react';
import styles from '../styles/ProjectCard.module.css';

const ProjectCard = ({ project }) => {
    // Generate initials
    const getInitials = (name) => {
        const letters = name.split(' ').map(word => word[0]);
        const numbers = letters.filter(char => /\d/.test(char));
        const nonNumbers = letters.filter(char => !/\d/.test(char));

        let initials = '';

        if (nonNumbers.length > 2) {
            // Prefer numbers, but keep at least one non-number character
            initials = (nonNumbers[0] || '') + numbers.slice(0, 2).join('');
        } else {
            // Combine numbers and non-numbers, ensuring it's within 3 characters
            initials = [...nonNumbers, ...numbers].slice(0, 3).join('');
        }

        return initials;
    };

    const initials = getInitials(project.name);



    // Generate random background color for the initials box
    const colors = ['#7E22CE', '#F8A01D', '#6366F1'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    return (
        <a href={`/project/${project._id}`} style={{ textDecoration: 'none' }}>
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
