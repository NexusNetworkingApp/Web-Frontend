import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <h1 className="home-title">Nexus</h1>
            <p className="home-text">Change the way you network.</p>

            {/* Links to sign-up and login pages */}
            <Link to="/signup" className="home-link">Sign Up</Link>
            <Link to="/login" className="home-link">Login</Link>
        </div>
    );
};

export default Home;
