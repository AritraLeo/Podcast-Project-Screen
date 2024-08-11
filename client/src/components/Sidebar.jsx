import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link to="/">Home</Link>
            {/* Add more links if needed */}
        </div>
    );
};

export default Sidebar;
