import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import UploadCard from '../components/UploadCard';

const ProjectDetail = () => {
    const { projectId } = useParams();

    return (
        <div className="project-detail">
            <Sidebar />
            <div className="main-content">
                <h1>Project Details for Project {projectId}</h1>
                <UploadCard platform="YouTube" />
                <UploadCard platform="Spotify" />
            </div>
        </div>
    );
};

export default ProjectDetail;
