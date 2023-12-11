// Signup.js

import React, { useState } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import { API_URL } from '../../util/URL';
import './Signup.css'; // Import the CSS file

const Signup = () => {
    const [userType, setUserType] = useState('individual');

    const [individualFormData, setIndividualFormData] = useState({
        email: '',
        passwordHash: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        receiveNotifications: false,
        biography: '',
        lastActive: new Date().toISOString(),
        location: 0,
    });

    const [organizationFormData, setOrganizationFormData] = useState({
        email: '',
        passwordHash: '',
        organizationName: '',
        foundedDate: '',
        industry: '',
        receiveNotifications: false,
        biography: '',
        lastActive: new Date().toISOString(),
        verified: false,
        location: 0,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const formData = userType === 'individual' ? setIndividualFormData : setOrganizationFormData;

        formData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = userType === 'individual' ? individualFormData : organizationFormData;

        try {
            let response;
            console.log(userData);
            if (userType === 'individual') {
                response = await axios.post(`${API_URL}/account/create-individual`, userData);
            } else if (userType === 'organization') {
                response = await axios.post(`${API_URL}/account/create-organization`, userData);
            }

            console.log('API Response:', response.data);
        } catch (error) {
            console.error('API Error:', error.message);
        }
    };

    return (
        <div className={classnames('signup-container', { 'organization-mode': userType === 'organization' })}>
            <h2>Sign Up</h2>
            <label>
                Account Type:
                <select value={userType} onChange={handleUserTypeChange}>
                    <option value="individual">Individual</option>
                    <option value="organization">Organization</option>
                </select>
            </label>

            <form onSubmit={handleSubmit} className="signup-form">
                <label>
                    Email Address:
                    <input
                        type="email"
                        name="email"
                        value={userType === 'individual' ? individualFormData.email : organizationFormData.email}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Password:
                    <input
                        type="password"
                        name="passwordHash"
                        value={userType === 'individual' ? individualFormData.passwordHash : organizationFormData.passwordHash}
                        onChange={handleChange}
                        minLength="8"
                        required
                    />
                </label>

                {userType === 'individual' && (
                    <>
                        <label>
                            First Name:
                            <input
                                type="text"
                                name="firstName"
                                value={individualFormData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        <label>
                            Last Name:
                            <input
                                type="text"
                                name="lastName"
                                value={individualFormData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        <label>
                            Date of Birth:
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={individualFormData.dateOfBirth}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        <label>
                            Gender:
                            <input
                                type="text"
                                name="gender"
                                value={individualFormData.gender}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Receive Notifications:
                            <input
                                type="checkbox"
                                name="receiveNotifications"
                                checked={individualFormData.receiveNotifications}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Biography:
                            <textarea
                                name="biography"
                                value={individualFormData.biography}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Location:
                            <input
                                type="text"
                                name="location"
                                value={individualFormData.location}
                                onChange={handleChange}
                            />
                        </label>
                    </>
                )}

                {userType === 'organization' && (
                    <>
                        <label>
                            Organization Name:
                            <input
                                type="text"
                                name="organizationName"
                                value={organizationFormData.organizationName}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        <label>
                            Founded Date:
                            <input
                                type="date"
                                name="foundedDate"
                                value={organizationFormData.foundedDate}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        <label>
                            Industry:
                            <input
                                type="text"
                                name="industry"
                                value={organizationFormData.industry}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Receive Notifications:
                            <input
                                type="checkbox"
                                name="receiveNotifications"
                                checked={organizationFormData.receiveNotifications}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Biography:
                            <textarea
                                name="biography"
                                value={organizationFormData.biography}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Verified:
                            <input
                                type="checkbox"
                                name="verified"
                                checked={organizationFormData.verified}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Location:
                            <input
                                type="text"
                                name="location"
                                value={organizationFormData.location}
                                onChange={handleChange}
                            />
                        </label>
                    </>
                )}

                <button type="submit">Create Account</button>
            </form>
        </div>
    );
};

export default Signup;
