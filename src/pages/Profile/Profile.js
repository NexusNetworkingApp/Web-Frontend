import './Profile.css';
import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';

const Profile = () => {
    const [account, setAccount] = useState(null);

    useEffect(() => {
        // Retrieve account information from local storage
        const storedAccount = JSON.parse(localStorage.getItem('account'));
        setAccount(storedAccount);
    }, []);

    if (!account) {
        // Handle the case where account information is not available (perhaps user is not logged in)
        return (
            <div>
                <h1>Profile</h1>
                <p>No account information available. Please log in.</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Profile</h1>
            {account.accountType === 'INDIVIDUAL' ? (
                // Render content for individual account
                <div>
                    <p>Name: {account.individual.firstName} {account.individual.lastName}</p>
                    <p>Email: {account.individual.email}</p>
                    <p>Gender: {account.individual.gender}</p>
                    <p>Receive Notifications: {account.individual.receiveNotifications}</p>
                    <p>Biography: {account.individual.biography}</p>
                    <p>Zip Code: {account.individual.location}</p>
                    {/* Add other individual-specific parameters */}
                </div>
            ) : account.accountType === 'ORGANIZATION' ? (
                // Render content for organization account
                <div>
                    <p>Organization Name: {account.organization.organizationName}</p>
                    <p>Email: {account.organization.email}</p>
                    <p>Found date: {account.organization.foundedDate}</p>
                    <p>Industry: {account.organization.industry}</p>
                    <p>Receive Notifications: {account.organization.receiveNotifications}</p>
                    <p>Biography: {account.organization.biography}</p>
                    <p>verified: {account.organization.verified}</p>
                    <p>Zip Code: {account.organization.location}</p>
                    {/* Add other organization-specific parameters */}
                </div>
            ) : (
                // Handle unknown account type or other cases
                <p>Unsupported account type</p>
            )}
        </div>
    );
};

export default Profile;
