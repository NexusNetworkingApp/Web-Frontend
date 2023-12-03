import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const sections = [
        { title: 'Discover', link: '/discover' },
        { title: 'Standouts', link: '/standouts' },
        { title: 'Likes', link: '/likes' },
        { title: 'Chat', link: '/chat' },
        { title: 'Profile', link: '/profile' },
    ];

    return (
        <footer>
            {sections.map((section, index) => (
                <div key={index}>
                    <Link to={section.link}>{section.title}</Link>
                </div>
            ))}
        </footer>
    );
};

export default Footer;
