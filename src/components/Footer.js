import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer>
            <div className="footer-content">
                <p>&copy; 2023 <a href="/" className="nexus-link">NEXUS</a>. All rights reserved.</p>
                <div className="footer-links">
                    <a href="/terms">Terms of Service</a>
                    <a href="/privacy">Privacy Policy</a>
                    <a href="/contact">Contact</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;