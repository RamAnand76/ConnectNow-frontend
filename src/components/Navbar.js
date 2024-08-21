// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/browse-users">Browse Users</Link>
        </li>
        <li>
          <Link to="/received-interests">Received Interests</Link>
        </li>
        <li>
          <button onClick={() => {
            localStorage.removeItem('access_token');
            window.location.href = '/';
          }}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
