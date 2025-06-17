import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdOutlineHome } from 'react-icons/md';
import { IoMdArrowDropdown, IoMdNotificationsOutline } from 'react-icons/io';
import { FiEdit3, FiSave, FiX } from 'react-icons/fi';
import Sidebar from './Sidebar';
import { getProjectDetails, updateLink } from '../utils/storage';
import styles from '../styles/TranscriptEditor.module.css';
import GB from '../assets/GB.png';

const TranscriptEditor = () => {
    const { projectId, linkId } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState({});
    const [link, setLink] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedDescription, setEditedDescription] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProjectAndLink = async () => {
            try {
                const projectData = await getProjectDetails(projectId);
                setProject(projectData);

                const foundLink = projectData?.links?.find(l => l._id === linkId);
                if (foundLink) {
                    setLink(foundLink);
                    setEditedDescription(foundLink.description || '');
                }
            } catch (error) {
                console.error('Error fetching project details:', error);
            }
        };

        fetchProjectAndLink();
    }, [projectId, linkId]);

    const handleEditToggle = () => {
        if (isEditMode) {
            // Cancel edit - reset description
            setEditedDescription(link.description || '');
        }
        setIsEditMode(!isEditMode);
    };

    const handleSaveAndExit = async () => {
        setLoading(true);
        try {
            await updateLink(projectId, linkId, {
                description: editedDescription
            });

            // Navigate back to project detail
            navigate(`/project/${projectId}`);
        } catch (error) {
            console.error('Error updating transcript:', error);
            alert('Error saving transcript. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDiscard = () => {
        setEditedDescription(link.description || '');
        setIsEditMode(false);
    };

    return (
        <div className={styles.transcriptEditor}>
            <Sidebar />
            <div className={styles.mainContent}>
                <div className={styles.breadcrumb}>
                    <MdOutlineHome size={50} className={styles.breadcrumbIcon} />
                    <span style={{ fontSize: 30 }}>
                        / {project?.name || 'Loading...'} / <span style={{ color: '#7E22CE', fontWeight: 500 }}>
                            Transcript
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

                <div className={styles.header}>
                    <h1 className={styles.title}>Edit Transcript</h1>
                    <div className={styles.headerButtons}>
                        {isEditMode ? (
                            <>
                                <button
                                    className={styles.discardButton}
                                    onClick={handleDiscard}
                                    disabled={loading}
                                >
                                    <FiX size={20} />
                                    Discard
                                </button>
                                <button
                                    className={styles.saveExitButton}
                                    onClick={handleSaveAndExit}
                                    disabled={loading}
                                >
                                    <FiSave size={20} />
                                    Save & exit
                                </button>
                            </>
                        ) : (
                            <button
                                className={styles.editButton}
                                onClick={handleEditToggle}
                            >
                                <FiEdit3 size={20} />
                                Edit Mode
                            </button>
                        )}
                    </div>
                </div>

                <div className={styles.transcriptContainer}>
                    <div className={styles.transcriptHeader}>
                        <h3 className={styles.speakerLabel}>Speaker</h3>
                        {isEditMode && (
                            <div className={styles.editModeIndicator}>
                                Edit Mode
                            </div>
                        )}
                    </div>

                    {isEditMode ? (
                        <textarea
                            className={styles.transcriptTextarea}
                            value={editedDescription}
                            onChange={(e) => setEditedDescription(e.target.value)}
                            placeholder="Enter transcript content..."
                            disabled={loading}
                        />
                    ) : (
                        <div className={styles.transcriptText}>
                            {link.description || 'No transcript available. Click Edit Mode to add content.'}
                        </div>
                    )}
                </div>

                {loading && (
                    <div className={styles.loadingOverlay}>
                        <div className={styles.loadingSpinner}>Saving...</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TranscriptEditor; 