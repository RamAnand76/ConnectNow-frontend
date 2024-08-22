import React from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserFriends, faEnvelope, faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import your custom CSS

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    window.location.href = '/';
  };

  return (
    <div className="navbar-container">
      <Sidebar collapsed className="custom-sidebar"> {/* Set collapsed to true */}
        <Menu>
          <MenuItem>
            <Link to="/dashboard" className="sidebar-link">
              <FontAwesomeIcon icon={faHome} />
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/browse-users" className="sidebar-link">
              <FontAwesomeIcon icon={faUserFriends} />
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/chat" className="sidebar-link">
              <FontAwesomeIcon icon={faEnvelope} />
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/received-interests" className="sidebar-link">
              <FontAwesomeIcon icon={faBell} />
            </Link>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}

export default Navbar;
