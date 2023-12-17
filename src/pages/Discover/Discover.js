import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import { API_URL } from '../../util/URL';

const Discover = () => {
    const [account, setAccount] = useState(null);
    const [discoverProfile, setDiscoverProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Retrieve account information from local storage
        const storedAccount = JSON.parse(localStorage.getItem('account'));
        setAccount(storedAccount);
    }, []);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            if (account && account.accountType === 'INDIVIDUAL') {
                const response = await axios.get(`${API_URL}/account/individual-discover/${account.accountId}`);
                const returnedAccount = response.data;
                setDiscoverProfile(returnedAccount);

            } else if (account && account.accountType === 'ORGANIZATION') {
                const response = await axios.get(`${API_URL}/account/organization-discover`);
                const returnedAccount = response.data;
                setDiscoverProfile(returnedAccount);
            }
        } catch (error) {
            console.error('Error fetching discover profile:', error.message);
            setError('Error fetching discover profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (account) {
            fetchData();
        }
    }, [account]);

    const handleNext = () => {
        fetchData();
    };

    const handleLike = async () => {
        try {
            const likeData = {
                sender: account,
                receiver: discoverProfile,
                likeDate: new Date(),
                likeMessage: '',
                prompt: 'BIOGRAPHY',

            };

            console.log("Sending like:", likeData);

            await axios.post(`${API_URL}/account/create-like`, likeData);

            console.log('Like created successfully');
            alert("Like sent!");
            // You can perform additional actions after a successful like creation
        } catch (error) {
            console.error('Error creating like:', error.message);
            console.error('Server response:', error.response?.data); // Safely access response data
            // Handle error scenarios
        }
    };




    return (
        <div>
            <h1>Discover</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {discoverProfile && discoverProfile.accountType === "INDIVIDUAL" && (
                <div>
                    <p>Name: {discoverProfile.individual.firstName} {discoverProfile.individual.lastName}</p>
                    <p>Gender: {discoverProfile.individual.gender} </p>
                    <p>Biography: {discoverProfile.individual.biography} </p>
                    <p>Location: {discoverProfile.individual.location} </p>
                </div>
            )}
            {discoverProfile && discoverProfile.accountType === "ORGANIZATION" && (
                <div>
                    <p>Organization Name: {discoverProfile.organization.organizationName}</p>
                    <p>Founded Date: {discoverProfile.organization.foundedDate}</p>
                    <p>Industry: {discoverProfile.organization.industry}</p>
                    <p>Biography: {discoverProfile.organization.biography}</p>
                    <p>Verified: {discoverProfile.organization.verified}</p>
                    <p>Location: {discoverProfile.organization.location}</p>
                </div>
            )}
            <button onClick={handleNext} disabled={loading}>Next</button>
            <button onClick={handleLike} disabled={loading}>Like</button>
        </div>
    );
};

export default Discover;
