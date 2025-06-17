import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { MdOutlineHome } from 'react-icons/md';
import { IoMdArrowDropdown, IoMdNotificationsOutline } from 'react-icons/io';
import { FiUpload, FiTrash2 } from 'react-icons/fi';
import Sidebar from './Sidebar';
import { getProjectDetails, updateWidgetConfig, uploadBotIcon, deleteBotIcon } from '../utils/storage';
import styles from '../styles/WidgetConfiguration.module.css';
import GB from '../assets/GB.png';

const WidgetConfiguration = () => {
    const { projectId } = useParams();
    const fileInputRef = useRef(null);
    const [project, setProject] = useState({});
    const [activeTab, setActiveTab] = useState('general');
    const [loading, setLoading] = useState(false);
    const [uploadingIcon, setUploadingIcon] = useState(false);
    const [config, setConfig] = useState({
        general: {
            chatbotName: 'Chatbot',
            welcomeMessage: 'Hello! How can I help you today?',
            inputPlaceholder: 'Type your message...'
        },
        display: {
            primaryColor: '#7BD568',
            fontColor: '#3C3C3C',
            fontSize: 25,
            chatHeight: 'Lorem ipsum',
            showSources: true
        },
        advanced: {
            chatIcon: {
                size: 'Small (48x48 px)',
                position: 'Bottom Right',
                distanceFromBottom: 20,
                horizontalDistance: 20
            },
            botIcon: ''
        }
    });

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const projectData = await getProjectDetails(projectId);
                setProject(projectData);

                if (projectData?.widgetConfig) {
                    setConfig(prevConfig => ({
                        ...prevConfig,
                        ...projectData.widgetConfig
                    }));
                }
            } catch (error) {
                console.error('Error fetching project:', error);
            }
        };

        fetchProject();
    }, [projectId]);

    const handleConfigChange = (section, field, value) => {
        setConfig(prevConfig => ({
            ...prevConfig,
            [section]: {
                ...prevConfig[section],
                [field]: value
            }
        }));
    };

    const handleNestedConfigChange = (section, parentField, field, value) => {
        setConfig(prevConfig => ({
            ...prevConfig,
            [section]: {
                ...prevConfig[section],
                [parentField]: {
                    ...prevConfig[section][parentField],
                    [field]: value
                }
            }
        }));
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await updateWidgetConfig(projectId, config);
            alert('Configuration saved successfully!');
        } catch (error) {
            console.error('Error saving config:', error);
            alert('Error saving configuration. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            return;
        }

        setUploadingIcon(true);
        try {
            const uploadResult = await uploadBotIcon(file);

            // Update config with new bot icon URL
            setConfig(prevConfig => ({
                ...prevConfig,
                advanced: {
                    ...prevConfig.advanced,
                    botIcon: uploadResult.file.url
                }
            }));

            alert('Bot icon uploaded successfully!');
        } catch (error) {
            console.error('Error uploading bot icon:', error);
            alert('Error uploading icon. Please try again.');
        } finally {
            setUploadingIcon(false);
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleDeleteIcon = async () => {
        if (!config.advanced.botIcon) return;

        if (!window.confirm('Are you sure you want to delete this bot icon?')) {
            return;
        }

        setUploadingIcon(true);
        try {
            await deleteBotIcon(config.advanced.botIcon);

            // Remove icon from config
            setConfig(prevConfig => ({
                ...prevConfig,
                advanced: {
                    ...prevConfig.advanced,
                    botIcon: ''
                }
            }));

            alert('Bot icon deleted successfully!');
        } catch (error) {
            console.error('Error deleting bot icon:', error);
            alert('Error deleting icon. Please try again.');
        } finally {
            setUploadingIcon(false);
        }
    };

    const triggerFileUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const renderGeneralTab = () => (
        <div className={styles.tabContent}>
            <div className={styles.formGroup}>
                <label className={styles.label}>Chatbot Name</label>
                <input
                    type="text"
                    className={styles.input}
                    value={config.general.chatbotName}
                    onChange={(e) => handleConfigChange('general', 'chatbotName', e.target.value)}
                />
                <span className={styles.hint}>Lorem ipsum dolor sit amet consectetur</span>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Welcome Message</label>
                <input
                    type="text"
                    className={styles.input}
                    value={config.general.welcomeMessage}
                    onChange={(e) => handleConfigChange('general', 'welcomeMessage', e.target.value)}
                />
                <span className={styles.hint}>Lorem ipsum dolor sit amet consectetur</span>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Input Placeholder</label>
                <input
                    type="text"
                    className={styles.input}
                    value={config.general.inputPlaceholder}
                    onChange={(e) => handleConfigChange('general', 'inputPlaceholder', e.target.value)}
                />
                <span className={styles.hint}>Lorem ipsum dolor sit amet consectetur</span>
            </div>
        </div>
    );

    const renderDisplayTab = () => (
        <div className={styles.tabContent}>
            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Primary Color</label>
                    <div className={styles.colorInputGroup}>
                        <input
                            type="text"
                            className={styles.input}
                            value={config.display.primaryColor}
                            onChange={(e) => handleConfigChange('display', 'primaryColor', e.target.value)}
                        />
                        <div
                            className={styles.colorPreview}
                            style={{ backgroundColor: config.display.primaryColor }}
                        ></div>
                    </div>
                    <span className={styles.hint}>Lorem ipsum dolor sit amet consectetur</span>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Font Color</label>
                    <div className={styles.colorInputGroup}>
                        <input
                            type="text"
                            className={styles.input}
                            value={config.display.fontColor}
                            onChange={(e) => handleConfigChange('display', 'fontColor', e.target.value)}
                        />
                        <div
                            className={styles.colorPreview}
                            style={{ backgroundColor: config.display.fontColor }}
                        ></div>
                    </div>
                    <span className={styles.hint}>Lorem ipsum dolor sit amet consectetur</span>
                </div>
            </div>

            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Font Size (in px)</label>
                    <input
                        type="number"
                        className={styles.input}
                        value={config.display.fontSize}
                        onChange={(e) => handleConfigChange('display', 'fontSize', parseInt(e.target.value))}
                    />
                    <span className={styles.hint}>Lorem ipsum dolor sit amet consectetur</span>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Chat Height (in % of total screen)</label>
                    <input
                        type="text"
                        className={styles.input}
                        value={config.display.chatHeight}
                        onChange={(e) => handleConfigChange('display', 'chatHeight', e.target.value)}
                    />
                    <span className={styles.hint}>Lorem ipsum dolor sit amet consectetur</span>
                </div>
            </div>

            <div className={styles.formGroup}>
                <div className={styles.toggleGroup}>
                    <label className={styles.label}>Show Sources</label>
                    <div className={styles.toggle}>
                        <input
                            type="checkbox"
                            checked={config.display.showSources}
                            onChange={(e) => handleConfigChange('display', 'showSources', e.target.checked)}
                        />
                        <span className={styles.toggleSlider}></span>
                    </div>
                </div>
                <span className={styles.hint}>Lorem ipsum dolor sit amet consectetur</span>
            </div>
        </div>
    );

    const renderAdvancedTab = () => (
        <div className={styles.tabContent}>
            <div className={styles.sectionTitle}>Chat Icon</div>

            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Chat Icon Size</label>
                    <select
                        className={styles.select}
                        value={config.advanced.chatIcon.size}
                        onChange={(e) => handleNestedConfigChange('advanced', 'chatIcon', 'size', e.target.value)}
                    >
                        <option value="Small (48x48 px)">Small (48x48 px)</option>
                        <option value="Medium (64x64 px)">Medium (64x64 px)</option>
                        <option value="Large (80x80 px)">Large (80x80 px)</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Position on Screen</label>
                    <select
                        className={styles.select}
                        value={config.advanced.chatIcon.position}
                        onChange={(e) => handleNestedConfigChange('advanced', 'chatIcon', 'position', e.target.value)}
                    >
                        <option value="Bottom Right">Bottom Right</option>
                        <option value="Bottom Left">Bottom Left</option>
                        <option value="Top Right">Top Right</option>
                        <option value="Top Left">Top Left</option>
                    </select>
                </div>
            </div>

            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Distance from Bottom (in px)</label>
                    <input
                        type="number"
                        className={styles.input}
                        value={config.advanced.chatIcon.distanceFromBottom}
                        onChange={(e) => handleNestedConfigChange('advanced', 'chatIcon', 'distanceFromBottom', parseInt(e.target.value))}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Horizontal Distance (in px)</label>
                    <input
                        type="number"
                        className={styles.input}
                        value={config.advanced.chatIcon.horizontalDistance}
                        onChange={(e) => handleNestedConfigChange('advanced', 'chatIcon', 'horizontalDistance', parseInt(e.target.value))}
                    />
                </div>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Bot Icon</label>
                <div className={styles.fileUploadContainer}>
                    <div className={styles.fileUploadPreview}>
                        {config.advanced.botIcon ? (
                            <img src={config.advanced.botIcon} alt="Bot Icon" className={styles.iconPreview} />
                        ) : (
                            <div className={styles.iconPlaceholder}></div>
                        )}
                    </div>
                    <div className={styles.uploadActions}>
                        <button
                            className={styles.uploadButton}
                            type="button"
                            onClick={triggerFileUpload}
                            disabled={uploadingIcon}
                        >
                            <FiUpload size={16} />
                            {uploadingIcon ? 'Uploading...' : 'Upload Image'}
                        </button>
                        {config.advanced.botIcon && (
                            <button
                                className={styles.deleteIconButton}
                                type="button"
                                onClick={handleDeleteIcon}
                                disabled={uploadingIcon}
                            >
                                <FiTrash2 size={16} />
                                Delete
                            </button>
                        )}
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        style={{ display: 'none' }}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div className={styles.widgetConfiguration}>
            <Sidebar />
            <div className={styles.mainContent}>
                <div className={styles.breadcrumb}>
                    <MdOutlineHome size={50} className={styles.breadcrumbIcon} />
                    <span style={{ fontSize: 30 }}>
                        / {project?.name || 'Loading...'} / <span style={{ color: '#7E22CE', fontWeight: 500 }}>
                            Widget Configuration
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

                <h1 className={styles.title}>Configuration</h1>

                <div className={styles.tabContainer}>
                    <div className={styles.tabNav}>
                        <button
                            className={`${styles.tabButton} ${activeTab === 'general' ? styles.tabButtonActive : ''}`}
                            onClick={() => setActiveTab('general')}
                        >
                            General
                        </button>
                        <button
                            className={`${styles.tabButton} ${activeTab === 'display' ? styles.tabButtonActive : ''}`}
                            onClick={() => setActiveTab('display')}
                        >
                            Display
                        </button>
                        <button
                            className={`${styles.tabButton} ${activeTab === 'advanced' ? styles.tabButtonActive : ''}`}
                            onClick={() => setActiveTab('advanced')}
                        >
                            Advanced
                        </button>
                    </div>

                    <div className={styles.tabContentContainer}>
                        {activeTab === 'general' && renderGeneralTab()}
                        {activeTab === 'display' && renderDisplayTab()}
                        {activeTab === 'advanced' && renderAdvancedTab()}
                    </div>

                    <div className={styles.saveButtonContainer}>
                        <button
                            className={styles.saveButton}
                            onClick={handleSave}
                            disabled={loading || uploadingIcon}
                        >
                            {loading ? 'Saving...' : 'Save Configuration'}
                        </button>
                    </div>
                </div>

                {(loading || uploadingIcon) && (
                    <div className={styles.loadingOverlay}>
                        <div className={styles.loadingSpinner}>
                            {uploadingIcon ? 'Uploading icon...' : 'Saving configuration...'}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WidgetConfiguration; 