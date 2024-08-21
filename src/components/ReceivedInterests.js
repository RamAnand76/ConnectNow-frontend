// src/pages/ReceivedInterests.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ReceivedInterests() {
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    const fetchInterests = async () => {
      const response = await axios.get('http://localhost:8000/api/auth/interests/received/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      setInterests(response.data);
    };
    fetchInterests();
  }, []);

  const respondToInterest = async (interestId, isAccepted) => {
    try {
        const response = await axios.patch(
            `http://localhost:8000/api/auth/interests/${interestId}/respond/`,
            { 
                is_accepted: isAccepted,  // Use is_accepted or is_rejected as needed
                is_rejected: !isAccepted
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('Interest response:', response.data);
    } catch (error) {
        console.error('Failed to respond to interest:', error.response.data);
    }
};

  return (
    <div>
      <h2>Received Interests</h2>
      <ul>
        {interests.map((interest) => (
          <li key={interest.id}>
            {interest.sender}: {interest.message}
            <button onClick={() => respondToInterest(interest.id, 'accept')}>Accept</button>
            <button onClick={() => respondToInterest(interest.id, 'reject')}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReceivedInterests;
