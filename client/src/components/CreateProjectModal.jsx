import React, { useState } from 'react';

const CreateProjectModal = ({ onCreateProject }) => {
    const [projectName, setProjectName] = useState('');
    const [numEpisodes, setNumEpisodes] = useState(0);

    const handleSubmit = () => {
        const project = {
            name: projectName,
            episodes: numEpisodes,
            createdAt: new Date().toISOString(),
        };
        onCreateProject(project);
    };

    return (
        <div className="modal">
            <h2>Create Project</h2>
            <input
                type="text"
                placeholder="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Number of Episodes"
                value={numEpisodes}
                onChange={(e) => setNumEpisodes(e.target.value)}
            />
            <button onClick={handleSubmit}>Create</button>
        </div>
    );
};

export default CreateProjectModal;
