// src/pages/BrowseUsers.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './BrowseUsers.css'; // Import the CSS file for styling
import CustomPopup from './CustomPopup'; // Import the custom popup component

function BrowseUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [popup, setPopup] = useState({ show: false, message: '', type: '' }); // For showing the custom popup

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:8000/api/auth/users/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers([]);
    } else {
      const results = users.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(results);
    }
  }, [searchQuery, users]);

  const handleInputChange = (e, userId) => {
    setMessages({ ...messages, [userId]: e.target.value });
  };

  const sendInterest = async (recipientUsername, userId) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/auth/interests/send/',
        {
          receiver: recipientUsername,
          message: messages[userId] || "I am interested!"
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setPopup({ show: true, message: 'Interest sent successfully!', type: 'success' });
      setTimeout(() => setPopup({ show: false }), 3000); // Hide popup after 3 seconds
      console.log('Interest sent:', response.data);
    } catch (error) {
      setPopup({ show: true, message: 'Failed to send interest!', type: 'error' });
      setTimeout(() => setPopup({ show: false }), 3000); // Hide popup after 3 seconds
      console.error('Failed to send interest:', error.response.data);
    }
  };

  return (
    <>
      <Navbar />
      <div className="browse-users">
        <h2>Find Connections</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </div>
        <div className="user-results">
          {filteredUsers.length > 0 ? (
            <ul>
              {filteredUsers.map((user) => (
                <li key={user.id} className="user-card">
                  <div className="user-info">
                    <img
                      src={user.profile_picture || 'https://via.placeholder.com/50'}
                      alt={user.username}
                      className="user-avatar"
                    />
                    <div className="user-details">
                      <span className="username">{user.username}</span>
                      <input
                        type="text"
                        placeholder="Interest Message"
                        value={messages[user.id] || ''}
                        onChange={(e) => handleInputChange(e, user.id)}
                        className="interest-message-input"
                      />
                    </div>
                  </div>
                  <button
                    className="send-interest-btn"
                    onClick={() => sendInterest(user.username, user.id)}
                  >
                    Send Interest
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            searchQuery && <p className="no-results">No users found</p>
          )}
        </div>
      </div>
      {popup.show && <CustomPopup message={popup.message} type={popup.type} />}
    </>
  );
}

export default BrowseUsers;
