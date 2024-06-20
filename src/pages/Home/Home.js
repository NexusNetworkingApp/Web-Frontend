import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <p className="home-text">Change the way you network with Nexus.</p>
            <p className="home-subtext">
                Nexus is not just another networking app; it's a revolutionary platform that combines the power of networking with the spontaneity of dating, allowing you to discover people and organizations in your area in a whole new way.
            </p>
            <p className="home-subtext">
                Imagine networking without the traditional biases, where connections are made based on shared interests, skills, and opportunities rather than predetermined criteria. Nexus introduces a refreshing approach to networking by incorporating the thrill of random discovery, similar to the serendipity of meeting a potential romantic partner.
            </p>
            <p className="home-subtext">
                Here's how Nexus works:
            </p>
            <ul className="home-list">
                <li>
                    <strong>Local Connections:</strong> Nexus enables you to discover individuals and organizations in your immediate vicinity. Whether you're a professional seeking career opportunities or an entrepreneur looking for collaborators, Nexus connects you with the right people nearby.
                </li>
                <li>
                    <strong>Random Discovery:</strong> Break free from the confines of traditional networking by embracing the unexpected. Nexus uses a unique algorithm to match you with potential connections, fostering a diverse and dynamic network that goes beyond your usual circles.
                </li>
                <li>
                    <strong>Biases-Free Networking:</strong> By removing predefined criteria, Nexus promotes a more inclusive and open environment for networking. Connections are based on shared interests, skills, and goals, allowing you to build meaningful relationships without preconceived notions.
                </li>
            </ul>
            <p className="home-subtext">
                Are you ready to revolutionize your networking experience? Join Nexus today and discover a world of possibilities. Embrace the excitement of connecting with like-minded individuals and organizations in your area, and let Nexus redefine the way you network.
            </p>
            <Link to="/signup" className="home-btn">Get Started</Link>
        </div>
    );
};

export default Home;
