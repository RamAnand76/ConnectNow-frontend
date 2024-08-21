// src/pages/Dashboard.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.post('http://localhost:8000/api/auth/logout/', null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      navigate('/login');
    } catch (error) {
      alert('Error during logout');
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
