// src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './Dashboard.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../components/Loading';
import ConnectionsList from './ConnectionsList';
import  defaultProfile from '../constants/default-profile.png';

function Dashboard() {
  const [user, setUser] = useState({});
  const [profilePic, setProfilePic] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/auth/profile/', {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        });
        setUser(response.data);
        setProfilePic(response.data.profile_picture);
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
        setEmail(response.data.email);
      } catch (error) {
        console.error('Failed to fetch user profile:', error.response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleProfilePicChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    formData.append('profile_picture', file);
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);

    try {
      await axios.patch('http://localhost:8000/api/auth/profile/', formData, {
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setProfilePic(URL.createObjectURL(file));
      toast.success('Profile updated successfully');
    } catch (error) {
      if (error.response && error.response.data.username) {
        toast.error('Username already exists');
      } else {
        toast.error('Failed to update profile');
      }
      console.error('Failed to update profile:', error.response.data);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard">
        <div className="card profile-card">
          <h2>Your Profile</h2>
          <div className="profile-details">
            <div className="profile-picture-upload">
              <img 
                src={profilePic || defaultProfile} 
                alt="Profile" 
                className="profile-picture"
              />
              <input 
                type="file" 
                accept="image/*"
                onChange={handleProfilePicChange} 
              />
            </div>
            <label>First Name</label>
            <input 
              type="text" 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
              placeholder="First Name" 
            />
            <label>Last Name</label>
            <input 
              type="text" 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
              placeholder="Last Name" 
            />
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Email" 
            />
            <button onClick={handleUpdateProfile}>Save Updates</button>
          </div>
        </div>
        <div className="card connections-card">
          <ConnectionsList loggedInUser={user} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Dashboard;
