import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Standouts.css';
import { API_URL } from '../../util/URL';

const Standouts = () => {
    const [individualAccounts, setIndividualAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIndividualAccounts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_URL}/account/standouts`);
                setIndividualAccounts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching individual accounts:', error.message);
                setError('Failed to load standouts. Please try again later.');
                setLoading(false);
            }
        };

        fetchIndividualAccounts();
    }, []);

    if (loading) return <div className="standouts-loading">Loading standouts...</div>;
    if (error) return <div className="standouts-error">{error}</div>;

    return (
        <div className="standouts-container">
            <h1 className="standouts-header">Standouts</h1>
            <div className="standouts-grid">
                {individualAccounts.map((account) => (
                    <div key={account.accountId} className="standout-card">
                        <div className="standout-avatar">
                            {account.individual.firstName[0]}
                            {account.individual.lastName[0]}
                        </div>
                        <h2 className="standout-name">
                            {account.individual.firstName} {account.individual.lastName}
                        </h2>
                        <p className="standout-bio">{account.individual.biography}</p>
                        <div className="standout-details">
                            <p><strong>Gender:</strong> {account.individual.gender}</p>
                            <p><strong>Location:</strong> {account.individual.location}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Standouts;