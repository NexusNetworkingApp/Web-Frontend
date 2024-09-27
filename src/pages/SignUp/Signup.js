import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../util/URL';
import './Signup.css';

const Signup = () => {
    const [userType, setUserType] = useState('individual');
    const [formData, setFormData] = useState({
        email: '',
        passwordHash: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        receiveNotifications: false,
        biography: '',
        organizationName: '',
        foundedDate: '',
        industry: '',
        verified: false,
        location: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const endpoint = userType === 'individual' 
                ? `${API_URL}/account/create-individual`
                : `${API_URL}/account/create-organization`;
            
            const response = await axios.post(endpoint, formData);
            console.log('Signup successful:', response.data);
            // Redirect to login or show success message
        } catch (error) {
            setError('Signup failed. Please try again.');
            console.error('Signup error:', error.message);
        }
    };

    return (
        <div className="auth-container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} className="auth-form">
                <select
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    className="auth-input"
                >
                    <option value="individual">Individual</option>
                    <option value="organization">Organization</option>
                </select>
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="auth-input"
                />
                <input
                    type="password"
                    name="passwordHash"
                    placeholder="Password"
                    value={formData.passwordHash}
                    onChange={handleChange}
                    required
                    className="auth-input"
                />
                {userType === 'individual' ? (
                    <>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="auth-input"
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="auth-input"
                        />
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            required
                            className="auth-input"
                        />
                        <input
                            type="text"
                            name="gender"
                            placeholder="Gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="auth-input"
                        />
                    </>
                ) : (
                    <>
                        <input
                            type="text"
                            name="organizationName"
                            placeholder="Organization Name"
                            value={formData.organizationName}
                            onChange={handleChange}
                            required
                            className="auth-input"
                        />
                        <input
                            type="date"
                            name="foundedDate"
                            value={formData.foundedDate}
                            onChange={handleChange}
                            required
                            className="auth-input"
                        />
                        <input
                            type="text"
                            name="industry"
                            placeholder="Industry"
                            value={formData.industry}
                            onChange={handleChange}
                            className="auth-input"
                        />
                    </>
                )}
                <textarea
                    name="biography"
                    placeholder="Biography"
                    value={formData.biography}
                    onChange={handleChange}
                    className="auth-input"
                    rows="4"
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="auth-input"
                />
                <label className="auth-checkbox">
                    <input
                        type="checkbox"
                        name="receiveNotifications"
                        checked={formData.receiveNotifications}
                        onChange={handleChange}
                    />
                    Receive Notifications
                </label>
                {error && <p className="auth-error">{error}</p>}
                <button type="submit" className="auth-button">Sign Up</button>
            </form>
            <p className="auth-link">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </div>
    );
};

export default Signup;