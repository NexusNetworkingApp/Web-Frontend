import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <nav>
                <ul className="nav-list">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/signup">Signup</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
