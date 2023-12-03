import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [accountType, setAccountType] = useState('individual');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleAccountTypeChange = (e) => {
        setAccountType(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`/api/login-${accountType}`, formData);

            console.log('Login successful:', response.data);

            // Reset form after successful login
            setFormData({
                email: '',
                password: '',
            });
        } catch (error) {
            console.error('Login failed:', error.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
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
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
