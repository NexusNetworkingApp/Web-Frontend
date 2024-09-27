import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const { login } = useAuth();
    const [accountType, setAccountType] = useState('individual');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const loginSuccessful = await login(accountType, email, password);
            if (loginSuccessful) {
                window.location.href = '/discover';
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
            console.error('Login error:', error.message);
        }
    };

    return (
        <div className="auth-container">
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit} className="auth-form">
                <select
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                    className="auth-input"
                >
                    <option value="individual">Individual</option>
                    <option value="organization">Organization</option>
                </select>
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="auth-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="auth-input"
                />
                {error && <p className="auth-error">{error}</p>}
                <button type="submit" className="auth-button">Sign In</button>
            </form>
            <p className="auth-link">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    );
};

export default Login;