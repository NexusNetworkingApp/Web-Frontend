import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Standouts.css';
import {API_URL} from "../../util/URL";

const Standouts = () => {
    // State to store the fetched accounts
    const [individualAccounts, setIndividualAccounts] = useState([]);

    useEffect(() => {
        // Function to fetch individual accounts
        const fetchIndividualAccounts = async () => {
            try {
                // Fetch individual accounts from your API
                const response = await axios.get(`${API_URL}/account/standouts`);
                // Set the fetched accounts to the state
                setIndividualAccounts(response.data);
            } catch (error) {
                console.error('Error fetching individual accounts:', error.message);
            }
        };

        // Call the fetch function when the component mounts
        fetchIndividualAccounts();
    }, []); // Empty dependency array ensures the effect runs once when the component mounts

    return (
        <div>
            <h1>Standouts</h1>
            {/* Render the list of individual accounts */}
            <ul>
                {individualAccounts.map((account) => (
                    <li key={account.accountId}>
                        {/* Display individual account details as needed */}
                        <p>{account.individual.firstName} {account.individual.lastName}</p>
                        {/* Add more details as needed */}
                    </li>
                ))}
            </ul>
            {/* Include other components or UI elements */}
        </div>
    );
};

export default Standouts;
