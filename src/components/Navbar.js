import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li>
          <a href="https://fuzzy-hose-356.notion.site/1ee34212ee2d42bdbb3c4a258a672612" target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </li>
        <li><Link to="/portfolio">Portfolio</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
