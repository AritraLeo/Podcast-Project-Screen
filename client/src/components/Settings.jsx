import { useState, useEffect } from 'react';
import { MdOutlineHome } from 'react-icons/md';
import { IoMdArrowDropdown, IoMdNotificationsOutline } from 'react-icons/io';
import Sidebar from './Sidebar';
import { getUserByEmail, updateUsername } from '../utils/storage';
import styles from '../styles/Settings.module.css';
import GB from '../assets/GB.png';

const Settings = () => {
    const [user, setUser] = useState({});
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const email = localStorage.getItem('user_email');
            if (email) {
                try {
                    const userData = await getUserByEmail(email);
                    if (userData) {
                        setUser(userData);
                        setUsername(userData.username || '');
                    } else {
                        // Fallback to localStorage if API fails
                        setUser({
                            email: email,
                            username: localStorage.getItem('username') || ''
                        });
                        setUsername(localStorage.getItem('username') || '');
                    }
                } catch (error) {
                    console.error('Error fetching user:', error);
                    // Fallback to localStorage
                    setUser({
                        email: email,
                        username: localStorage.getItem('username') || ''
                    });
                    setUsername(localStorage.getItem('username') || '');
                }
            }
        };

        fetchUser();
    }, []);

    const handleUsernameUpdate = async () => {
        if (!username.trim()) {
            alert('Username cannot be empty');
            return;
        }

        setLoading(true);
        try {
            const email = localStorage.getItem('user_email');
            await updateUsername(email, username);

            // Update localStorage
            localStorage.setItem('username', username);

            // Update user state
            setUser(prevUser => ({
                ...prevUser,
                username: username
            }));

            alert('Username updated successfully!');
        } catch (error) {
            console.error('Error updating username:', error);
            alert('Error updating username. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.settings}>
            <Sidebar />
            <div className={styles.mainContent}>
                <div className={styles.breadcrumb}>
                    <MdOutlineHome size={50} className={styles.breadcrumbIcon} />
                    <span style={{ fontSize: 30 }}>
                        / <span style={{ color: '#7E22CE', fontWeight: 500 }}>
                            Account Settings
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

                <h1 className={styles.title}>Account Settings</h1>

                <div className={styles.settingsContainer}>
                    <div className={styles.userInfo}>
                        <div className={styles.profileSection}>
                            <div className={styles.avatarContainer}>
                                <div className={styles.avatar}>
                                    {user.username?.charAt(0)?.toUpperCase() || 'U'}
                                </div>
                            </div>
                            <div className={styles.userDetails}>
                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>User Name</label>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            disabled={loading}
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Email</label>
                                        <input
                                            type="email"
                                            className={styles.inputDisabled}
                                            value={user.email || ''}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <button
                                    className={styles.updateButton}
                                    onClick={handleUsernameUpdate}
                                    disabled={loading || username === user.username}
                                >
                                    {loading ? 'Updating...' : 'Update'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.subscriptionSection}>
                        <h2 className={styles.sectionTitle}>Subscriptions</h2>
                        <div className={styles.planCard}>
                            <div className={styles.planInfo}>
                                <span className={styles.planText}>
                                    You are currently on the <strong>Ques AI Basic Plan!</strong>
                                </span>
                                <button className={styles.upgradeButton}>
                                    Upgrade
                                </button>
                            </div>
                        </div>
                        <button className={styles.cancelButton}>
                            Cancel Subscription
                        </button>
                    </div>
                </div>

                {loading && (
                    <div className={styles.loadingOverlay}>
                        <div className={styles.loadingSpinner}>Updating username...</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Settings; 