import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../util/URL';


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
        lastActive: new Date().toISOString(), // Assuming lastActive is a timestamp
        location: 0, // Assuming location is a numerical value
        // Add other individual fields as needed
    });

    const [organizationFormData, setOrganizationFormData] = useState({
        email: '',
        passwordHash: '',
        organizationName: '',
        foundedDate: '',
        industry: '',
        receiveNotifications: false,
        biography: '',
        lastActive: new Date().toISOString(), // Assuming lastActive is a timestamp
        verified: false,
        location: 0, // Assuming location is a numerical value
        // Add other organization fields as needed
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (userType === 'individual') {
            setIndividualFormData((prevData) => ({
                ...prevData,
                [name]: type === 'checkbox' ? checked : value,
            }));
        } else if (userType === 'organization') {
            setOrganizationFormData((prevData) => ({
                ...prevData,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
    };

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = userType === 'individual' ? individualFormData : organizationFormData;

        try {
            let response;
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
        <div>
            <h2>Signup</h2>
            <label>
                Select User Type:
                <select value={userType} onChange={handleUserTypeChange}>
                    <option value="individual">Individual</option>
                    <option value="organization">Organization</option>
                </select>
            </label>

            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={userType === 'individual' ? individualFormData.email : organizationFormData.email}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={userType === 'individual' ? individualFormData.password : organizationFormData.password}
                        onChange={handleChange}
                    />
                </label>
                {/* Individual-specific fields */}
                {userType === 'individual' && (
                    <>
                        <br />
                        <label>
                            First Name:
                            <input
                                type="text"
                                name="firstName"
                                value={individualFormData.firstName}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            Last Name:
                            <input
                                type="text"
                                name="lastName"
                                value={individualFormData.lastName}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            Date of Birth:
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={individualFormData.dateOfBirth}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            Gender:
                            <input
                                type="text"
                                name="gender"
                                value={individualFormData.gender}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            Receive Notifications:
                            <input
                                type="checkbox"
                                name="receiveNotifications"
                                checked={individualFormData.receiveNotifications}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            Biography:
                            <textarea
                                name="biography"
                                value={individualFormData.biography}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
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

                {/* Organization-specific fields */}
                {userType === 'organization' && (
                    <>
                        <br />
                        <label>
                            Organization Name:
                            <input
                                type="text"
                                name="organizationName"
                                value={organizationFormData.organizationName}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            Founded Date:
                            <input
                                type="date"
                                name="foundedDate"
                                value={organizationFormData.foundedDate}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            Industry:
                            <input
                                type="text"
                                name="industry"
                                value={organizationFormData.industry}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            Receive Notifications:
                            <input
                                type="checkbox"
                                name="receiveNotifications"
                                checked={organizationFormData.receiveNotifications}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            Biography:
                            <textarea
                                name="biography"
                                value={organizationFormData.biography}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            Verified:
                            <input
                                type="checkbox"
                                name="verified"
                                checked={organizationFormData.verified}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
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

                <br />
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
