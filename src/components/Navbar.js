import React, { useState } from 'react';
import './Navbar.css'; // Import the updated CSS file
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserFriends, faEnvelope, faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const [activeItem, setActiveItem] = useState(window.location.pathname);

  return (
    <><nav className="navbar">
      <a href="/" className="logo">
        ConnectNow
      </a>

      <ul>
        <li className={activeItem === '/dashboard' ? 'active' : ''}>
          <Link to="/dashboard" onClick={() => setActiveItem('/dashboard')}>
            <FontAwesomeIcon icon={faHome} />
            <span className="tooltip">Home</span>
          </Link>
        </li>
        <li className={activeItem === '/browse-users' ? 'active' : ''}>
          <Link to="/browse-users" onClick={() => setActiveItem('/browse-users')}>
            <FontAwesomeIcon icon={faUserFriends} />
            <span className="tooltip">Find Connections</span>
          </Link>
        </li>
        <li className={activeItem === '/chat' ? 'active' : ''}>
          <Link to="/chat" onClick={() => setActiveItem('/chat')}>
            <FontAwesomeIcon icon={faEnvelope} />
            <span className="tooltip">Messages</span>
          </Link>
        </li>
        <li className={activeItem === '/received-interests' ? 'active' : ''}>
          <Link to="/received-interests" onClick={() => setActiveItem('/received-interests')}>
            <FontAwesomeIcon icon={faBell} />
            <span className="tooltip">Received Interests</span>
          </Link>
        </li>
        <li>
          <button onClick={() => {
            localStorage.removeItem('access_token');
            window.location.href = '/';
          } }>
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span className="tooltip">Logout</span>
          </button>
        </li>
      </ul>
    </nav><nav className="mobile-navbar">
        <ul>
          <li className={activeItem === '/dashboard' ? 'active' : ''}>
            <Link to="/dashboard" onClick={() => setActiveItem('/dashboard')}>
              <FontAwesomeIcon icon={faHome} />
            </Link>
          </li>
          <li className={activeItem === '/browse-users' ? 'active' : ''}>
            <Link to="/browse-users" onClick={() => setActiveItem('/browse-users')}>
              <FontAwesomeIcon icon={faUserFriends} />
            </Link>
          </li>
          <li className={activeItem === '/chat' ? 'active' : ''}>
            <Link to="/chat" onClick={() => setActiveItem('/chat')}>
              <FontAwesomeIcon icon={faEnvelope} />
            </Link>
          </li>
          <li className={activeItem === '/received-interests' ? 'active' : ''}>
            <Link to="/received-interests" onClick={() => setActiveItem('/received-interests')}>
              <FontAwesomeIcon icon={faBell} />
            </Link>
          </li>
          <li>
            <button onClick={() => {
              localStorage.removeItem('access_token');
              window.location.href = '/';
            } }>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          </li>
        </ul>
      </nav></>
  );
}

export default Navbar;
