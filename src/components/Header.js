// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './Header.css';

const Header = () => {
    const { isLoggedIn, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    const account = JSON.parse(localStorage.getItem('account'));

    return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Baloo" />
            <header className="header">
                <Link to="/discover">
                    <h1 className="header-title">NEXUS</h1>
                </Link>
                <nav>
                    {isLoggedIn ? (
                        <>
                            {account && account.accountType === 'INDIVIDUAL' ? (
                                <>
                                    <Link to="/discover">Discover</Link>
                                    <Link to="/jobs">Jobs</Link>
                                    <Link to="/likes">Likes</Link>
                                    <Link to="/chat">Chat</Link>
                                    <Link to="/profile">Profile</Link>
                                </>
                            ) : account && account.accountType === 'ORGANIZATION' ? (
                                <>
                                    <Link to="/discover">Discover</Link>
                                    <Link to="/standouts">Standouts</Link>
                                    <Link to="/likes">Likes</Link>
                                    <Link to="/chat">Chat</Link>
                                    <Link to="/profile">Profile</Link>
                                </>
                            ) : (
                                <p>Unsupported account type</p>
                            )}
                            <button onClick={handleLogout}>Sign Out</button>
                        </>
                    ) : (
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
