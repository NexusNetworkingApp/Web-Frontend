import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import { API_URL } from '../../util/URL';
import './Discover.css'; // Import the CSS file

const Discover = () => {
    const [account, setAccount] = useState(null);
    const [discoverProfile, setDiscoverProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [distance, setDistance] = useState(5); // Default distance in miles

    useEffect(() => {
        // Retrieve account information from local storage
        const storedAccount = JSON.parse(localStorage.getItem('account'));
        setAccount(storedAccount);
        console.log('Account retrieved from local storage:', storedAccount);
    }, []);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        setDiscoverProfile(null);
    
        try {
            let location = null;
            if (account) {
                if (account.accountType === 'INDIVIDUAL' && account.individual) {
                    location = account.individual.location;
                } else if (account.accountType === 'ORGANIZATION' && account.organization) {
                    location = account.organization.location;
                }
    
                // If location is not valid, set a fallback zip code
                if (!location || location === 0) {
                    location = '10001'; // Example fallback zip code
                    console.warn('Location is invalid, using fallback location:', location);
                }
    
                console.log('Fetching data with location:', location, 'and distance:', distance);
                const response = await axios.get(`${API_URL}/account/discover`, {
                    params: {
                        zipCode: location,
                        distance: distance,
                        loggedInAccountId: account.accountId
                    }
                });
    
                setDiscoverProfile(response.data);
            }
        } catch (error) {
            console.error('Error fetching discover profile:', error.message);
            // setError('Error fetching discover profile. Please try again.');
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
                likeMessage: 'Hi. Thank you for matching!',
                prompt: 'BIOGRAPHY',
            };
    
            console.log("Sending like:", JSON.stringify(likeData, null, 2)); // Pretty print the JSON data
    
            const response = await axios.post(`${API_URL}/match/create-like`, likeData);
    
            console.log('Like created successfully', response.data);
    
            fetchData();
        } catch (error) {
            console.error('Error creating like:', error.message);
            console.error('Server response:', error.response?.data); // Safely access response data
        }
    };
    

    return (
        <div className="discover-container">
            <h1>Discover</h1>
            <div className="slider-container">
                <label htmlFor="distance-slider">Distance: {distance} miles</label>
                <input
                    type="range"
                    id="distance-slider"
                    min="1"
                    max="50"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                />
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            {discoverProfile ? (
                <div className="profile-details">
                    {discoverProfile.accountType === "INDIVIDUAL" && (
                        <div>
                            <p className="profile-info">Name: {discoverProfile.individual.firstName} {discoverProfile.individual.lastName}</p>
                            <p className="profile-info">Gender: {discoverProfile.individual.gender} </p>
                            <p className="profile-info">Biography: {discoverProfile.individual.biography} </p>
                            <p className="profile-info">Location: {discoverProfile.individual.location} </p>
                        </div>
                    )}
                    {discoverProfile.accountType === "ORGANIZATION" && (
                        <div>
                            <p className="profile-info">Organization Name: {discoverProfile.organization.organizationName}</p>
                            <p className="profile-info">Founded Date: {discoverProfile.organization.foundedDate}</p>
                            <p className="profile-info">Industry: {discoverProfile.organization.industry}</p>
                            <p className="profile-info">Biography: {discoverProfile.organization.biography}</p>
                            <p className="profile-info">Verified: {discoverProfile.organization.verified}</p>
                            <p className="profile-info">Location: {discoverProfile.organization.location}</p>
                        </div>
                    )}
                </div>
            ) : (
                !loading && <p>No matching candidates found. Please try adjusting the range.</p>
            )}
            <button className="action-button" onClick={handleNext} disabled={loading}>Next</button>
            <button className="action-button" onClick={handleLike} disabled={loading || !discoverProfile}>Like</button>
        </div>
    );
};

export default Discover;
