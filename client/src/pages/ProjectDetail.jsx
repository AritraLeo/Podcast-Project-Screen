import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import UploadCard from '../components/UploadCard';
import { getProjects } from '../utils/storage';

const ProjectDetail = () => {
    const { projectId } = useParams();
    const project = getProjects()[projectId];
    const [uploads, setUploads] = useState([]);

    const handleUpload = (upload) => {
        setUploads([...uploads, upload]);
    };

    return (
        <div className="project-detail">
            <Sidebar />
            <div className="main-content">
                <div className="breadcrumb">
                    <Link to="/">Home</Link> / {project.name} / Upload
                </div>
                <h1>Project Details for Project {project.name}</h1>
                <UploadCard platform="YouTube" onUpload={handleUpload} />
                <UploadCard platform="Spotify" onUpload={handleUpload} />
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Link</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {uploads.map((upload, index) => (
                            <tr key={index}>
                                <td>{upload.name}</td>
                                <td><a href={upload.link} target="_blank" rel="noopener noreferrer">{upload.link}</a></td>
                                <td>{upload.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProjectDetail;
