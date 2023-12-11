// Login.js
import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import './Login.css';

const Login = () => {
    const { isLoggedIn, login } = useAuth();
    const [accountType, setAccountType] = useState('individual');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleAccountTypeChange = (e) => {
        setAccountType(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const loginSuccessful = await login(accountType, email, password);
            console.log(isLoggedIn);

            if (loginSuccessful) {
                console.log('Login successful');
                // Reset form after successful login
                setEmail('');
                setPassword('');
                window.location.href = '/discover';
            } else {
                console.log('Login failed');
                // Handle unsuccessful login (e.g., show an error message)
            }
        } catch (error) {
            console.error('Login failed:', error.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {isLoggedIn ? (
                <p>You are already logged in. Redirect to the home page or show logged-in content.</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label>
                        Account Type:
                        <select value={accountType} onChange={handleAccountTypeChange}>
                            <option value="individual">Individual</option>
                            <option value="organization">Organization</option>
                        </select>
                    </label>
                    <br />
                    <label>
                        Email:
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <br />
                    <button type="submit">Login</button>
                </form>
            )}
        </div>
    );
};

export default Login;