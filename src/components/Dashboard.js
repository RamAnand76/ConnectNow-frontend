// src/pages/Dashboard.js

import React, {useEffect, useState} from 'react';
import {  Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import axiosInstance from '../axiosInstance';

function Dashboard() {
  //const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch accepted interests
    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get('api/auth/interests/accepted/', {
                headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Failed to fetch users:', error.response.data);
        }
    };

    fetchUsers();
}, []);



  return (
    
    <div>
      <Navbar />
      <h2>Welcome to Your Dashboard</h2>
      <div className="dashboard">
            <h2>Accepted Interest Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user.username}>
                        <Link to={`/chat/${user.username}`}>{user.username}</Link>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  );
}

export default Dashboard;
