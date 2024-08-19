import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <ul>
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/">Main</Link>
        </li>
        <li className={location.pathname === '/portfolio' ? 'active' : ''}>
          <Link to="/portfolio">Portfolio</Link>
        </li>
        <li>
          <a href="https://fuzzy-hose-356.notion.site/1ee34212ee2d42bdbb3c4a258a672612" target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
