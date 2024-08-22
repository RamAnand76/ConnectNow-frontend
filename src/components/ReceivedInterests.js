// src/pages/ReceivedInterests.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './ReceivedInterests.css';

function ReceivedInterests() {
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    const fetchInterests = async () => {
      const response = await axios.get('http://localhost:8000/api/auth/interests/received/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      setInterests(response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    };
    fetchInterests();
  }, []);

  const respondToInterest = async (interestId, isAccepted) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/auth/interests/${interestId}/respond/`,
        { 
          is_accepted: isAccepted,
          is_rejected: !isAccepted
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      setInterests((prevInterests) => 
        prevInterests.map((interest) =>
          interest.id === interestId
            ? { ...interest, status: isAccepted ? 'accepted' : 'rejected' }
            : interest
        ).filter((interest) => interest.status !== 'rejected')
      );

    } catch (error) {
      console.error('Failed to respond to interest:', error.response.data);
    }
  };

  return (
    <>
      <Navbar />
      <div className="interests-container">
        <h2>Received Interests</h2>
        {interests.length > 0 ? (
          <ul className="interests-list">
            {interests.map((interest) => (
              <li key={interest.id} className="interest-card">
                <div className="interest-info">
                  <h3>{interest.sender}</h3>
                  <p>{interest.message}</p>
                </div>
                {interest.status === 'accepted' ? (
                  <div className="status accepted">Interest Accepted</div>
                ) : (
                  <div className="actions">
                    <button 
                      className="accept-btn" 
                      onClick={() => respondToInterest(interest.id, true)}
                    >
                      Accept
                    </button>
                    <button 
                      className="reject-btn" 
                      onClick={() => respondToInterest(interest.id, false)}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No received interests.</p>
        )}
      </div>
    </>
  );
}

export default ReceivedInterests;
