import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Prepare login request payload
        const payload = {
            username,
            password,
        };

        try {
            const response = await fetch('http://localhost:8000/api/v1/user/login', {
                method: 'POST',

                headers: {
                    'Access-Control-Allow-Origin': "*",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
            const data = await response.json();
            console.log(data)
            setError(data.error)
            // Store the user ID in the local storage
            localStorage.setItem('userId', data.user._id);
            navigate(`/taskscreen?userId=${data.user._id}`);


        } catch (error) {
            console.error('An error occurred during login:', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
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
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            {error && <p className="error">{error}</p>}
            <p>
                Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
        </div>
    );
};

export default Login;
