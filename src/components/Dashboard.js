// src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import '../styles/Dashboard.css';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../components/Loading';
import ConnectionsList from './ConnectionsList';
import  defaultProfile from '../constants/default-profile.png';
import CustomPopup from './CustomPopup';

function Dashboard() {
  const [user, setUser] = useState({});
  const [profilePic, setProfilePic] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState({ show: false, message: '', type: '' });

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

    if (file) { // Only append the profile picture if a new one is selected
        formData.append('profile_picture', file);
    }

    if (firstName !== user.first_name) {
        formData.append('first_name', firstName);
    }

    if (lastName !== user.last_name) {
        formData.append('last_name', lastName);
    }

    if (email !== user.email) {
        formData.append('email', email);
    }

    try {
        const response = await axios.patch('http://localhost:8000/api/auth/profile/', formData, {
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        if (file) { // Only update profile picture if a new one was uploaded
            setProfilePic(URL.createObjectURL(file));
        }

        setUser({
            ...user,
            first_name: firstName,
            last_name: lastName,
            email: email,
            profile_picture: response.data.profile_picture || user.profile_picture,
        });

        setPopup({ show: true, message: 'Profile Updated successfully!', type: 'success' });
    } catch (error) {
        if (error.response && error.response.data.email) {
            setPopup({ show: true, message: 'Email already used!', type: 'error' });
        } else {
            setPopup({ show: true, message: 'Failed to Update!', type: 'error' });
        }
    } finally {
        setTimeout(() => setPopup({ show: false }), 1000);
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
      {popup.show && <CustomPopup message={popup.message} type={popup.type} />}
    </div>
  );
}

export default Dashboard;
