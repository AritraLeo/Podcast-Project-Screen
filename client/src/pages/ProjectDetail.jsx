import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MdOutlineHome } from 'react-icons/md';
import { IoMdArrowDropdown, IoMdNotificationsOutline } from 'react-icons/io';
import Sidebar from '../components/Sidebar';
import UploadCard from '../components/UploadCard';
import { getProjects, addLinkToProject, deleteLink } from '../utils/storage';
import styles from '../styles/ProjectDetail.module.css';
import GB from '../assets/GB.png'

const ProjectDetail = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState({});
    const [uploads, setUploads] = useState([]);
    const [loading, setLoading] = useState(false);

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
        setLoading(true);
        try {
            const updatedProject = await addLinkToProject(projectId, upload);
            setUploads(updatedProject?.links); // Update state with new links
        } catch (error) {
            console.error('Error uploading link:', error);
            alert('Error uploading file. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (upload) => {
        // Navigate to transcript editor
        navigate(`/project/${projectId}/transcript/${upload._id}`);
    };

    const handleDelete = async (uploadId) => {
        if (window.confirm('Are you sure you want to delete this file?')) {
            setLoading(true);
            try {
                const updatedProject = await deleteLink(projectId, uploadId);
                setUploads(updatedProject?.links);
            } catch (error) {
                console.error('Error deleting link:', error);
                alert('Error deleting file. Please try again.');
            } finally {
                setLoading(false);
            }
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className={styles.projectDetail}>
            <Sidebar />
            <div className={styles.mainContent}>
                <div className={styles.breadcrumb}>
                    <MdOutlineHome size={50} className={styles.breadcrumbIcon} />
                    <span style={{ fontSize: 30 }}>
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
                        <span className={styles.breadcrumbNotification}>
                            <IoMdNotificationsOutline style={{ strokeWidth: 10 }} size={50} />
                        </span>
                    </div>
                </div>
                <h1 className={styles.uploadTitle}>Upload</h1>
                <div className={styles.uploadContainer}>
                    <UploadCard platform="YouTube" onUpload={handleUpload} />
                    <UploadCard platform="Spotify" onUpload={handleUpload} />
                    <UploadCard platform="RSS Feed" onUpload={handleUpload} />
                </div>
                {uploads.length > 0 && (
                    <div className={styles.tableContainer}>
                        <table className={styles.uploadTable}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Upload Date & Time</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {uploads.map((upload) => (
                                    <tr key={upload._id}>
                                        <td>{upload.name}</td>
                                        <td>{formatDate(upload.createdAt)}</td>
                                        <td>
                                            <span className={styles.statusCompleted}>Done</span>
                                        </td>
                                        <td>
                                            <div className={styles.actionsContainer}>
                                                <button
                                                    className={styles.editButton}
                                                    onClick={() => handleEdit(upload)}
                                                    disabled={loading}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className={styles.deleteButton}
                                                    onClick={() => handleDelete(upload._id)}
                                                    disabled={loading}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {loading && (
                    <div className={styles.loadingOverlay}>
                        <div className={styles.loadingSpinner}>Processing...</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectDetail;
