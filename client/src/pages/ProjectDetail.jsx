import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MdOutlineHome } from 'react-icons/md';
import { IoMdArrowDropdown, IoMdNotificationsOutline } from 'react-icons/io';
import Sidebar from '../components/Sidebar';
import UploadCard from '../components/UploadCard';
import { getProjects, addLinkToProject } from '../utils/storage';
import styles from '../styles/ProjectDetail.module.css';
import GB from '../assets/GB.png'

const ProjectDetail = () => {
    const { projectId } = useParams();
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState({});
    const [uploads, setUploads] = useState([]);


    useEffect(() => {
        const fetchProjects = async () => {
            const userEmail = localStorage.getItem('user_email');
            const projects = await getProjects(userEmail);
            setProjects(projects);
            // Find the project after projects are fetched
            const foundProject = projects.find(proj => proj._id === projectId);
            setProject(foundProject);
            setUploads(foundProject?.links || []);
        };

        fetchProjects();
    }, [projectId]);


    const handleUpload = async (upload) => {
        console.log({ ...upload, projectId });
        try {
            const updatedProject = await addLinkToProject(projectId, upload);

            setUploads(updatedProject?.links); // Update state with new links
        } catch (error) {
            console.error('Error uploading link:', error);
        }
    };

    return (
        <div className={styles.projectDetail}>
            <Sidebar />
            <div className={styles.mainContent}>
                <div className={styles.breadcrumb}>
                    <MdOutlineHome size={50} className={styles.breadcrumbIcon} /> <span style={{ fontSize: 30 }}>
                        / {project?.name || 'Loading....'} / <span style={{ color: '#7E22CE', fontWeight: 500 }}>
                            Upload
                        </span>
                    </span>
                    <div className={styles.breadcrumbRight}>
                        <IoMdArrowDropdown size={40} className={styles.breadcrumbDropdown} />
                        <span style={{ fontWeight: 500, fontSize: 30 }}>EN</span>
                        <div>
                            <img style={{ padding: '1rem' }} src={GB} alt="" />
                        </div>
                        {/* Replace with actual flag icon */}
                        <span className={styles.breadcrumbNotification}><IoMdNotificationsOutline style={{ strokeWidth: 10 }} size={50} /> </span>
                    </div>
                </div>
                <h1 className={styles.uploadTitle}>Upload</h1>
                <div className={styles.uploadContainer}>
                    <UploadCard platform="YouTube" onUpload={handleUpload} />
                    <UploadCard platform="Spotify" onUpload={handleUpload} />
                    <UploadCard platform="Media or Text File" onUpload={handleUpload} />
                </div>
                {uploads.length > 0 && (
                    <table className={styles.uploadTable}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Created At</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {uploads.map((upload, index) => (
                                <tr key={index}>
                                    <td>{upload.name}</td>
                                    {/* <td><a href={upload.link} target="_blank" rel="noopener noreferrer">{upload.link}</a></td> */}
                                    <td>{upload.createdAt}</td>
                                    <td>Completed</td>
                                    <td>
                                        <div className={styles.actionsContainer}>
                                            <button className={styles.editButton}
                                            // onClick={onEdit}
                                            >Edit</button>
                                            <button className={styles.deleteButton}
                                            // onClick={onDelete}
                                            >Delete</button>
                                        </div>
                                    </td>
                                    {/* <td> <span>Edit </span> <span>Delete</span> </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ProjectDetail;
