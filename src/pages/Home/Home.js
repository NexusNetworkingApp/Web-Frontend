import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <section className="hero">
                <h1 className="hero-title">Change the way you network with Nexus</h1>
                <p className="hero-subtitle">Discover a revolutionary platform that combines networking with spontaneity</p>
                <Link to="/signup" className="cta-button">Get Started</Link>
            </section>

            <section className="features">
                <h2>How Nexus Works</h2>
                <div className="feature-grid">
                    <div className="feature-item">
                        <h3>Local Connections</h3>
                        <p>Discover individuals and organizations in your immediate vicinity, whether you're seeking career opportunities or collaborators.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Random Discovery</h3>
                        <p>Break free from traditional networking. Our unique algorithm matches you with diverse potential connections.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Biases-Free Networking</h3>
                        <p>Build meaningful relationships based on shared interests, skills, and goals, without preconceived notions.</p>
                    </div>
                </div>
            </section>

            <section className="about">
                <h2>About Nexus</h2>
                <p>Nexus is not just another networking app; it's a revolutionary platform that combines the power of networking with the spontaneity of dating. We allow you to discover people and organizations in your area in a whole new way, promoting connections based on shared interests and opportunities rather than predetermined criteria.</p>
            </section>

            <section className="cta">
                <h2>Ready to revolutionize your networking experience?</h2>
                <p>Join Nexus today and discover a world of possibilities.</p>
                <Link to="/signup" className="cta-button">Get Started Now</Link>
            </section>
        </div>
    );
};

export default Home;