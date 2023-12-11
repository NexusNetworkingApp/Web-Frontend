import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './Header.css';

const Header = () => {
    const { isLoggedIn, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    // Retrieve account information from local storage
    const account = JSON.parse(localStorage.getItem('account'));

    return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Baloo" />
            <header className="header">
                <Link to="/">
                    <h1 className="header-title">NEXUS</h1>
                </Link>
                <nav>
                    {isLoggedIn ? (
                        // If the user is logged in, show a different header based on account type
                        <>
                            {account && account.accountType === 'INDIVIDUAL' ? (
                                // Render links specific to individual accounts
                                <>
                                    <Link to="/discover">Discover</Link>
                                    <Link to="/jobs">Jobs</Link>
                                    <Link to="/likes">Likes</Link>
                                    <Link to="/chat">Chat</Link>
                                    <Link to="/profile">Profile</Link>
                                </>
                            ) : account && account.accountType === 'ORGANIZATION' ? (
                                // Render links specific to organization accounts
                                <>
                                    <Link to="/discover">Discover</Link>
                                    <Link to="/standouts">Standouts</Link>
                                    <Link to="/likes">Likes</Link>
                                    <Link to="/chat">Chat</Link>
                                    <Link to="/profile">Profile</Link>
                                </>
                            ) : (
                                // Handle unknown account type or other cases
                                <p>Unsupported account type</p>
                            )}
                            {/* Add the sign-out button */}
                            <button onClick={handleLogout}>Sign Out</button>
                        </>
                    ) : (
                        // If the user is not logged in, show a different header
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </>
                    )}
                </nav>
            </header>
        </>
    );
};

export default Header;
