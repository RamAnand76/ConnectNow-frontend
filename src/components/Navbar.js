import React from 'react';
import './Navbar.css'; // Import the updated CSS file
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserFriends, faEnvelope, faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  return (
    <nav className="navbar">
      <a href="/" className="logo">
        ConnectNow
      </a>
      
      <ul>
        <li>
          <Link to="/dashboard">
            <FontAwesomeIcon icon={faHome} />
            <span className="tooltip">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/browse-users">
            <FontAwesomeIcon icon={faUserFriends} />
            <span className="tooltip">Find Connections</span>
          </Link>
        </li>
        <li>
          <Link to="/chat">
            <FontAwesomeIcon icon={faEnvelope} />
            <span className="tooltip">Messages</span>
          </Link>
        </li>
        <li>
          <Link to="/received-interests">
            <FontAwesomeIcon icon={faBell} />
            <span className="tooltip">Received Interests</span>
          </Link>
        </li>
        <li>
          <button onClick={() => {
            localStorage.removeItem('access_token');
            window.location.href = '/';
          }}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span className="tooltip">Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
