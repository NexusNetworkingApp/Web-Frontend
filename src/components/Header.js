import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './Header.css';

const Header = () => {
    const { isLoggedIn, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const account = JSON.parse(localStorage.getItem('account'));

    const handleLogout = () => {
        logout();
    };

    const NavLink = ({ to, children }) => {
        const isActive = location.pathname === to;
        return (
            <Link to={to} className={`nav-link ${isActive ? 'active' : ''}`}>
                {children}
            </Link>
        );
    };

    const handleClick = () => {
        if (isLoggedIn) {
          navigate('/discover');
        } else {
          navigate('/');
        }
      };

    return (
        <header className="header">
            <div className="header-logo" onClick={handleClick}>
                <h1 className="header-title">NEXUS</h1>
            </div>
            <nav>
                {isLoggedIn ? (
                    <>
                        {account && account.accountType === 'INDIVIDUAL' ? (
                            <>
                                <NavLink to="/discover">Discover</NavLink>
                                <NavLink to="/jobs">Jobs</NavLink>
                                <NavLink to="/likes">Likes</NavLink>
                                <NavLink to="/chat">Chat</NavLink>
                                <NavLink to="/profile">Profile</NavLink>
                            </>
                        ) : account && account.accountType === 'ORGANIZATION' ? (
                            <>
                                <NavLink to="/discover">Discover</NavLink>
                                <NavLink to="/standouts">Standouts</NavLink>
                                <NavLink to="/likes">Likes</NavLink>
                                <NavLink to="/chat">Chat</NavLink>
                                <NavLink to="/profile">Profile</NavLink>
                            </>
                        ) : (
                            <p>Unsupported account type</p>
                        )}
                        <button onClick={handleLogout} className="sign-out-btn">Sign Out</button>
                    </>
                ) : (
                    <>
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/signup">Signup</NavLink>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;