import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import { API_URL } from '../../util/URL';
import './Likes.css';
import Footer from '../../components/Footer';

const Likes = () => {
    const [likes, setLikes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [account, setAccount] = useState(null);

    useEffect(() => {
        // Retrieve account information from local storage
        const storedAccount = JSON.parse(localStorage.getItem('account'));
        setAccount(storedAccount);
    }, []);

    useEffect(() => {
        const fetchLikes = async () => {
            setLoading(true);

            try {
                // Ensure that 'account' is not null before making the request
                if (account) {
                    const response = await axios.get(`${API_URL}/match/fetch-likes/${account.accountId}`);
                    setLikes(response.data);
                }
            } catch (error) {
                console.error('Error fetching likes:', error.message);
                setError('Error fetching likes. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        // Call the fetchLikes function
        fetchLikes();
    }, [account]); // Include 'account' in the dependency array to run the effect when 'account' changes

    const handleMatch = async (like) => {
        try {
            // Send a request to create a match
            await axios.post(`${API_URL}/match/create-match`, like);

            console.log('Match created successfully');

            window.location.href = '/chat';

        } catch (error) {
            console.error('Error creating match:', error.message);
            console.error('Server response:', error.response?.data); // Safely access response data
            // Handle error scenarios
        }
    };

    return (
        <div className="likes-container">
            <h1>Likes</h1>

            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}

            {/* Render the list of likes */}
            {likes.length > 0 ? (
                <ul className="likes-list">
                    {likes.map((like) => (
                        <li key={like.likeId} className="like-item">
                            {/* Display other information about the like */}
                            {/* For example: like.likeMessage, like.likeDate, etc. */}
                            {/* Extract specific properties from like.sender */}
                            {like.sender && (
                                <>
                                    {/* Further subdivide based on accountType */}
                                    {like.sender.accountType === 'INDIVIDUAL' && (
                                        <>
                                            <p>Sender Name: {like.sender.individual.firstName} {like.sender.individual.lastName}</p>
                                            <p>Biography: {like.sender.individual.biography}</p>
                                            {/* Add more fields specific to INDIVIDUAL account type */}
                                        </>
                                    )}
                                    {like.sender.accountType === 'ORGANIZATION' && (
                                        <>
                                            <p>Organization Name: {like.sender.organization.organizationName}</p>
                                            <p>Biography: {like.sender.organization.biography}</p>
                                            {/* Add more fields specific to ORGANIZATION account type */}
                                        </>
                                    )}
                                </>
                            )}
                            {/* Add the Match button */}
                            <button onClick={() => handleMatch(like)}>Match</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>There are currently no likes.</p>
            )}

            {/* ... (rest of the component, if any) */}

        </div>
    );
};

export default Likes;
