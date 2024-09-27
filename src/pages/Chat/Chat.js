import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL } from '../../util/URL';
import './Chat.css';

const Chat = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const storedAccount = JSON.parse(localStorage.getItem('account'));
        setAccount(storedAccount);
    }, []);

    useEffect(() => {
        const fetchMatches = async () => {
            if (!account) return;

            setLoading(true);
            try {
                const response = await axios.get(`${API_URL}/match/fetch-matches/${account.accountId}`);
                const uniqueMatches = response.data.reduce((acc, match) => {
                    const otherAccountId = (match.user1.accountId === account.accountId) ? match.user2.accountId : match.user1.accountId;
                    if (!acc.some(m => (m.user1.accountId === otherAccountId || m.user2.accountId === otherAccountId))) {
                        acc.push(match);
                    }
                    return acc;
                }, []);
                setMatches(uniqueMatches);
            } catch (error) {
                console.error('Error fetching matches:', error.message);
                setError('Failed to load matches. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
    }, [account]);

    if (loading) return <div className="chat-loading">Loading matches...</div>;
    if (error) return <div className="chat-error">{error}</div>;

    return (
        <div className="chat-container">
            <h1 className="chat-header">Your Matches</h1>
            {matches.length > 0 ? (
                <div className="matches-grid">
                    {matches.map((match) => {
                        const otherUser = match.user1.accountId === account.accountId ? match.user2 : match.user1;
                        return (
                            <Link key={match.matchId} to={`/message/${account.accountId}/${otherUser.accountId}`} className="match-card">
                                <div className="match-avatar">
                                    {otherUser.accountType === 'INDIVIDUAL'
                                        ? `${otherUser.individual.firstName[0]}${otherUser.individual.lastName[0]}`
                                        : otherUser.organization.organizationName[0]}
                                </div>
                                <div className="match-info">
                                    <h2 className="match-name">
                                        {otherUser.accountType === 'INDIVIDUAL'
                                            ? `${otherUser.individual.firstName} ${otherUser.individual.lastName}`
                                            : otherUser.organization.organizationName}
                                    </h2>
                                    <p className="match-date">Matched on: {new Date(match.matchDate).toLocaleDateString()}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <p className="no-matches-message">No matches found. Start liking profiles to get matches!</p>
            )}
        </div>
    );
};

export default Chat;