import React, { useState, useEffect } from 'react';
import { getUser, setUser, getProjects, setProjects } from '../utils/storage';
import CreateProjectModal from '../components/CreateProjectModal';
import UserDetailsModal from '../components/UserDetailsModal';

const Home = () => {
    const [user, setUserState] = useState(null);
    const [projects, setProjectsState] = useState([]);
    const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        const storedUser = getUser();
        if (!storedUser) {
            setShowUserDetailsModal(true);
        } else {
            setUserState(storedUser);
        }

        const storedProjects = getProjects();
        setProjectsState(storedProjects);
    }, []);

    const handleSaveUser = (newUser) => {
        setUser(newUser);
        setUserState(newUser);
        setShowUserDetailsModal(false);
    };

    const handleCreateProject = (project) => {
        const updatedProjects = [...projects, project];
        setProjectsState(updatedProjects);
        setProjects(updatedProjects);
        setShowCreateModal(false);
    };

    return (
        <div>
            {projects.length === 0 ? (
                <button onClick={() => setShowCreateModal(true)}>Create Project</button>
            ) : (
                <div>
                    <button className="top-right-button" onClick={() => setShowCreateModal(true)}>Create Project</button>
                    <div className="project-list">
                        {projects.map((project, index) => (
                            <div key={index}>
                                <a href="">
                                    <div>
                                        {project.name}
                                    </div>
                                    <div>
                                        {project.episodes}
                                    </div>
                                    <div>
                                        {project.createdAt}
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {showUserDetailsModal && <UserDetailsModal onSaveUser={handleSaveUser} />}
            {showCreateModal && <CreateProjectModal onCreateProject={handleCreateProject} />}
        </div>
    );
};

export default Home;
