import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Standouts.css';
import { API_URL } from '../../util/URL';

const Standouts = () => {
    const [individualAccounts, setIndividualAccounts] = useState([]);

    useEffect(() => {
        const fetchIndividualAccounts = async () => {
            try {
                const response = await axios.get(`${API_URL}/account/standouts`);
                setIndividualAccounts(response.data);
            } catch (error) {
                console.error('Error fetching individual accounts:', error.message);
            }
        };

        fetchIndividualAccounts();
    }, []);

    return (
        <div className="standouts-container">
            <h1 className="standouts-header">Standouts</h1>
            <ul className="standouts-list">
                {individualAccounts.map((account) => (
                    <li key={account.accountId} className="standouts-item">
                        <p className="account-name">{account.individual.firstName} {account.individual.lastName}</p>
                        <p>Biography: {account.individual.biography} </p>
                        {/* Add more details as needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Standouts;
