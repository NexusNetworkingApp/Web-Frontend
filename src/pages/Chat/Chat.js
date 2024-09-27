import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL } from '../../util/URL';
import './Chat.css'; // Import the CSS file

const Chat = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [account, setAccount] = useState(null);

    useEffect(() => {
        // Retrieve account information from local storage
        const storedAccount = JSON.parse(localStorage.getItem('account'));
        setAccount(storedAccount);
    }, []);

    useEffect(() => {
        const fetchMatches = async () => {
            setLoading(true);

            try {
                // Ensure that 'account' is not null before making the request
                if (account) {
                    const response = await axios.get(`${API_URL}/match/fetch-matches/${account.accountId}`);
                    const uniqueMatches = response.data.reduce((acc, match) => {
                        const otherAccountId = (match.user1.accountId === account.accountId) ? match.user2.accountId : match.user1.accountId;
                        if (!acc.some(m => (m.user1.accountId === otherAccountId || m.user2.accountId === otherAccountId))) {
                            acc.push(match);
                        }
                        return acc;
                    }, []);
                    setMatches(uniqueMatches);
                }
            } catch (error) {
                console.error('Error fetching matches:', error.message);
                setError('Error fetching matches. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        // Call the fetchMatches function
        fetchMatches();
    }, [account]); // Include 'account' in the dependency array to run the effect when 'account' changes

    return (
        <div className="chat-container">
            <h1>Chat</h1>

            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}

            {/* Render the list of matches */}
            {matches.length > 0 ? (
                <ul className="matches-list">
                    {matches.map((match) => (
                        <Link key={match.matchId} to={`/message/${account.accountId}/${(match.user1.accountId === account.accountId) ? match.user2.accountId : match.user1.accountId}`} className="match-link">
                            <li className="match-item">
                                {/* Display details of the other user involved in the match */}
                                {(match.user1.accountId === account.accountId) ? (
                                    <>
                                        {match.user2.accountType === 'INDIVIDUAL' ? (
                                            <p className="user-name">{match.user2.individual.firstName} {match.user2.individual.lastName}</p>
                                        ) : (
                                            <p className="organization-name">Organization: {match.user2.organization.organizationName}</p>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {match.user1.accountType === 'INDIVIDUAL' ? (
                                            <p className="user-name">{match.user1.individual.firstName} {match.user1.individual.lastName}</p>
                                        ) : (
                                            <p className="organization-name">Organization: {match.user1.organization.organizationName}</p>
                                        )}
                                    </>
                                )}
                                <p className="match-date">Match date: {new Date(match.matchDate).toLocaleDateString()}</p>
                            </li>
                        </Link>
                    ))}
                </ul>
            ) : (
                <p>No matches found.</p>
            )}
        </div>
    );
};

export default Chat;
