import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import ProjectCard from '../components/ProjectCard';
import Navbar from '../components/Navbar';
import HomePageImg from '../assets/Home-main-img.png';
import { IoHomeOutline } from "react-icons/io5";
import { FaPlusCircle } from "react-icons/fa";
import CreateProjectModal from '../components/CreateProjectModal';
import { getProjects, removeUser, createOrUpdateUser } from '../utils/storage';

const Home = () => {
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const [email, setEmail] = useState(localStorage.getItem('user_email') || '');
    const [isUserDetailsRequired, setIsUserDetailsRequired] = useState(!username || !email);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
            const userEmail = localStorage.getItem('user_email');
            if (userEmail) {
                const projects = await getProjects(userEmail);
                setProjects(projects);
            }
        };

        fetchProjects();
    }, []);

    useEffect(() => {
        if (!username || !email) {
            setIsUserDetailsRequired(true);
        }
    }, [username, email]);

    const handleUserDetailsSubmit = async (e) => {
        e.preventDefault();

        if (!username || !email) {
            alert('Both username and email are required!');
            return;
        }

        setLoading(true);
        try {
            // Create or update user in database
            await createOrUpdateUser({
                email: email,
                username: username
            });

            // Store in localStorage
            localStorage.setItem('username', username);
            localStorage.setItem('user_email', email);

            setIsUserDetailsRequired(false);
        } catch (error) {
            console.error('Error creating/updating user:', error);
            // Still proceed with localStorage for demo purposes
            localStorage.setItem('username', username);
            localStorage.setItem('user_email', email);
            setIsUserDetailsRequired(false);
        } finally {
            setLoading(false);
        }
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const refreshProjects = async () => {
        const userEmail = localStorage.getItem('user_email');
        if (userEmail) {
            const projects = await getProjects(userEmail);
            setProjects(projects);
        }
    };

    if (isUserDetailsRequired) {
        return (
            <div className={styles.userDetailsFormContainer}>
                <form onSubmit={handleUserDetailsSubmit} className={styles.userDetailsForm}>
                    <div className={styles.userDetailsInputGroup}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    <div className={styles.userDetailsInputGroup}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    <button
                        type="submit"
                        className={styles.userDetailsSubmitButton}
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Save'}
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Navbar />
            <button className={styles.backButton} >
                <IoHomeOutline size={20} onClick={() => removeUser()} /> <span>Back to Home</span>
            </button>

            {projects.length > 0 ? (
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
                                <ProjectCard key={project._id} project={project} />
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <div className={styles.noProjects}>
                    <h1 style={{ color: '#7E22CE' }}>Create a New Project</h1>
                    <img src={HomePageImg} alt="Create Project" className={styles.image} />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus vel dolores nihil ad architecto excepturi tenetur? Expedita, natus quisquam sapiente molestiae impedit, excepturi ipsam labore dignissimos sed adipisci aliquid laborum?</p>
                    <div className={styles.createProjectButtonContainer}>
                        <button className={styles.createProjectButton} onClick={toggleModal}>
                            <FaPlusCircle /> <span>Create New Project</span>
                        </button>
                    </div>
                </div>
            )}

            {isModalOpen && (
                <CreateProjectModal
                    isOpen={isModalOpen}
                    onClose={toggleModal}
                    onProjectCreated={refreshProjects}
                />
            )}
        </div>
    );
};

export default Home;
