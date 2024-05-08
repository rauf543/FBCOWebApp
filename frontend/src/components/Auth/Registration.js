import React, { useState } from 'react';
import { register } from '../../services/authService';

const Registration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [store_id, setStoreId] = useState('');
    const [userRole, setUserRole] = useState('')
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(username, password, store_id, userRole);
            // Redirect to the login page on successful registration
            window.location.href = '/';
        } catch (error) {
            setError(error.error);
        }
    };

    return (
        <div>
            <h2>Registration</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Store ID"
                    value={store_id}
                    onChange={(e) => setStoreId(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="User Role"
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};



export default Registration;