import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import { hasProjects } from '../utils/checkProjects';
import ProjectCard from '../components/ProjectCard';
import Navbar from '../components/Navbar';
import HomePageImg from '../assets/Home-main-img.png';
import { IoHomeOutline } from "react-icons/io5";
import { FaPlusCircle } from "react-icons/fa";
import CreateProjectModal from '../components/CreateProjectModal';
import { getProjects } from '../utils/storage';

const Home = () => {
    const projects = getProjects();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        console.log(!isModalOpen);

        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className={styles.container}>
            <Navbar />
            <button className={styles.backButton}> <IoHomeOutline size={20} /> <span>Back to Home</span></button>

            {hasProjects() ? (
                <>
                    <div className={styles.projsContainer}>
                        <div className={styles.projectsHeader}>
                            <h1 className={styles.ProjectsHeading}>Projects</h1>
                            <button className={styles.createProjectButtonTop} onClick={toggleModal}>
                                <FaPlusCircle /> <span>Create New Project</span>
                            </button>
                        </div>

                        <div className={styles.projectGrid}>
                            {projects?.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <div className={styles.noProjects}>
                    <h1 style={{ color: '#7E22CE' }}>Create a New Project</h1>
                    <img src={HomePageImg} alt="Create Project" className={styles.image} />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus vel dolores nihil ad architecto excepturi tenetur? Expedita, natus quisquam sapiente molestiae impedit, excepturi ipsam labore dignissimos sed adipisci aliquid laborum?</p>
                    {/* <button className={styles.createProjectButton} onClick={toggleModal}>
                        <CiCirclePlus /> <span>Create New Project</span>
                    </button> */}
                    <div className={styles.createProjectButtonContainer}>
                        <button className={styles.createProjectButton} onClick={toggleModal}>
                            <FaPlusCircle /> <span>Create New Project</span>
                        </button>
                    </div>

                </div>
            )}

            {isModalOpen && (
                // <div className={styles.modal}>
                // </div>
                <CreateProjectModal isOpen={isModalOpen} onClose={toggleModal} />
            )}
        </div>
    );
};

export default Home;
