import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../util/URL';
import './Likes.css';

const Likes = () => {
    const [likes, setLikes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const storedAccount = JSON.parse(localStorage.getItem('account'));
        setAccount(storedAccount);
    }, []);

    useEffect(() => {
        const fetchLikes = async () => {
            if (!account) return;
            
            setLoading(true);
            try {
                const response = await axios.get(`${API_URL}/match/fetch-likes/${account.accountId}`);
                setLikes(response.data);
            } catch (error) {
                console.error('Error fetching likes:', error.message);
                setError('Failed to load likes. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchLikes();
    }, [account]);

    const handleMatch = async (like) => {
        try {
            await axios.post(`${API_URL}/match/create-match`, like);
            console.log('Match created successfully');
            window.location.href = '/chat';
        } catch (error) {
            console.error('Error creating match:', error.message);
            alert('Failed to create match. Please try again.');
        }
    };

    if (loading) return <div className="likes-loading">Loading likes...</div>;
    if (error) return <div className="likes-error">{error}</div>;

    return (
        <div className="likes-container">
            <h1 className="likes-header">Likes</h1>
            {likes.length > 0 ? (
                <div className="likes-grid">
                    {likes.map((like) => (
                        <div key={like.likeId} className="like-card">
                            <div className="like-avatar">
                                {like.sender.accountType === 'INDIVIDUAL'
                                    ? `${like.sender.individual.firstName[0]}${like.sender.individual.lastName[0]}`
                                    : like.sender.organization.organizationName[0]}
                            </div>
                            <div className="like-content">
                                {like.sender.accountType === 'INDIVIDUAL' ? (
                                    <>
                                        <h2 className="like-name">{like.sender.individual.firstName} {like.sender.individual.lastName}</h2>
                                        <p className="like-bio">{like.sender.individual.biography}</p>
                                    </>
                                ) : (
                                    <>
                                        <h2 className="like-name">{like.sender.organization.organizationName}</h2>
                                        <p className="like-bio">{like.sender.organization.biography}</p>
                                    </>
                                )}
                                <p className="like-date">Liked on: {new Date(like.likeDate).toLocaleDateString()}</p>
                                <button className="match-button" onClick={() => handleMatch(like)}>Match</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-likes-message">There are currently no likes.</p>
            )}
        </div>
    );
};

export default Likes;