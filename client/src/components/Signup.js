import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (!regex.test(password)) {
            setError(
                'A valid password should be at least 6 characters long and contain at least one uppercase, one numeric character and one lowercase character.'
            );
            return;
        }
        // Prepare login request payload
        const payload = {
            username,
            password,
        };

        try {
            const response = await fetch('http://localhost:8000/api/v1/user/create', {
                method: 'POST',

                headers: {
                    'Access-Control-Allow-Origin': "*",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                // Successful login
                navigate('/login');
            } else {
                // Error handling for unsuccessful login
                console.error('Login failed');
            }
        } catch (error) {
            console.error('An error occurred during login:', error);
        }

    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Signup</button>
            </form>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default Signup;
