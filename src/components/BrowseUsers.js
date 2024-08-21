// src/pages/BrowseUsers.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BrowseUsers() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

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

  const sendInterest = async (recipientUsername, message) => {
    try {
        const response = await axios.post(
            'http://localhost:8000/api/auth/interests/send/',
            { 
                receiver: recipientUsername,  // Ensure this matches the backend's expectation
                message: message || "I am interested!"  // Provide a default message if none is provided
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('Interest sent:', response.data);
    } catch (error) {
        console.error('Failed to send interest:', error.response.data);
    }
};




  return (
    <div>
      <h2>Browse Users</h2>
      <input
        type="text"
        placeholder="Interest Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username}
            <button onClick={() => sendInterest(user.username)}>Send Interest</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BrowseUsers;
