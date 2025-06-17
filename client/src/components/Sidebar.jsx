
import { Link, useLocation, useParams } from 'react-router-dom';
import { GoGear } from 'react-icons/go';
import styles from '../styles/Sidebar.module.css';
import DirectRight from '../assets/directright.png';

const Sidebar = () => {
    const location = useLocation();
    const { projectId } = useParams();
    const isActive = (path) => location.pathname.includes(path);

    return (
        <div className={styles.sidebar}>
            {/* <div className={styles.logoContainer}> */}
            <div className={styles.leftSection} onClick={() => window.location.href = '/'} style={{ cursor: 'pointer' }}>
                <img src={DirectRight} alt="Logo" className={styles.logo} />
                <span className={styles.logoText}>LAMA.</span>
            </div>
            {/* </div> */}
            <div className={styles.sidebarTitle}>Podcast Upload Flow</div>
            {/* <Link to="/project" className={`${styles.navButton} ${isActive('/project') ? styles.navButtonActive : ''}`}>
                Projects
            </Link>
            <Link to="/web-configuration" className={`${styles.navButton} ${isActive('/web-configuration') ? styles.navButtonActive : ''}`}>
                Web Configuration
            </Link>
            <Link to="/deployment" className={`${styles.navButton} ${isActive('/deployment') ? styles.navButtonActive : ''}`}>
                Deployment
            </Link> */}

            {projectId ? (
                <>
                    <Link
                        to={`/project/${projectId}`}
                        className={`${styles.navButton} ${isActive('/project') && !isActive('widget-configuration') && !isActive('transcript') ? styles.navButtonActive : ''}`}
                    >
                        <span className={styles.circle}>1</span> Projects
                    </Link>
                    <Link
                        to={`/project/${projectId}/widget-configuration`}
                        className={`${styles.navButton} ${isActive('widget-configuration') ? styles.navButtonActive : ''}`}
                    >
                        <span className={styles.circle}>2</span> Widget Configurations
                    </Link>
                    <div className={`${styles.navButton} ${styles.navButtonDisabled}`}>
                        <span className={styles.circle}>3</span> Deployment
                    </div>
                </>
            ) : (
                <>
                    <div className={`${styles.navButton} ${styles.navButtonDisabled}`}>
                        <span className={styles.circle}>1</span> Projects
                    </div>
                    <div className={`${styles.navButton} ${styles.navButtonDisabled}`}>
                        <span className={styles.circle}>2</span> Widget Configuration
                    </div>
                    <div className={`${styles.navButton} ${styles.navButtonDisabled}`}>
                        <span className={styles.circle}>3</span> Deployment
                    </div>
                </>
            )}

            <hr className={styles.hr} />
            <Link to="/settings" className={`${styles.settings} ${isActive('/settings') ? styles.settingsActive : ''}`}>
                <GoGear size={20} className={styles.settingsIcon} />
                Settings
            </Link>
        </div>
    );
};

export default Sidebar;
