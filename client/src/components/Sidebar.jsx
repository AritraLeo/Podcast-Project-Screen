import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GoGear } from 'react-icons/go';
import styles from '../styles/Sidebar.module.css';
import DirectRight from '../assets/directright.png';


const Sidebar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname.includes(path);

    return (
        <div className={styles.sidebar}>
            {/* <div className={styles.logoContainer}> */}
            <div className={styles.leftSection}>
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


            <Link to="/project" className={`${styles.navButton} ${isActive('/project') ? styles.navButtonActive : ''}`}>
                <span className={styles.circle}>1</span> Projects
            </Link>
            <Link to="/web-configuration" className={`${styles.navButton} ${isActive('/web-configuration') ? styles.navButtonActive : ''}`}>
                <span className={styles.circle}>2</span> Web Configuration
            </Link>
            <Link to="/deployment" className={`${styles.navButton} ${isActive('/deployment') ? styles.navButtonActive : ''}`}>
                <span className={styles.circle}>3</span> Deployment
            </Link>


            <hr className={styles.hr} />
            <div className={styles.settings}>
                <GoGear size={20} className={styles.settingsIcon} />
                Settings
            </div>
        </div>
    );
};

export default Sidebar;
