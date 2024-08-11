import React from 'react';
import { FiSettings, FiBell } from 'react-icons/fi';
import styles from '../styles/Navbar.module.css';
import DirectRight from '../assets/directright.png';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.leftSection}>
                <img src={DirectRight} alt="Logo" className={styles.logo} />
                <span className={styles.logoText}>LAMA.</span>
            </div>
            <div className={styles.rightSection}>
                <FiSettings className={styles.icon} />
                <FiBell className={styles.icon} />
            </div>
        </nav>
    );
};

export default Navbar;
