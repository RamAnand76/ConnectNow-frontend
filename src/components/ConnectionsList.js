import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ConnectionsList.css';

function ConnectionsList({ loggedInUser }) {
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/auth/interests/accepted/', {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        });
        const filteredConnections = response.data.filter(user => user.id !== loggedInUser.id);
        setConnections(filteredConnections);
      } catch (error) {
        console.error('Failed to fetch connections:', error.response.data);
      }
    };

    fetchConnections();
  }, [loggedInUser]);

  return (
    <div>
      <h3>Your Connections</h3>
      <ul className="connections-list">
        {connections.map((connection) => (
          <li key={connection.id} className="connection-item">
            <img 
              src={connection.profile_picture || 'https://via.placeholder.com/50'} 
              alt={connection.first_name} 
              className="connection-picture"
            />
            <div>
              <p>{connection.first_name} {connection.last_name}</p>
              <button className="send-message-btn">Connection</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConnectionsList;
