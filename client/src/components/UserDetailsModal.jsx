// src/components/UserDetailsModal.jsx
import React, { useState } from 'react';

const UserDetailsModal = ({ onSaveUser }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        onSaveUser({ username, email });
    };

    return (
        <div className="modal">
            <h2>Enter Your Details</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSubmit}>Save</button>
        </div>
    );
};

export default UserDetailsModal;
