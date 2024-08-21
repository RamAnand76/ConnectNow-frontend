// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import BrowseUsers from './components/BrowseUsers';
import ReceivedInterests from './components/ReceivedInterests';
import Chat from './components/Chat';
import ChatScreen from './components/ChatScreen';
  // Import Navbar

function App() {
  return (
    <Router>
        
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/browse-users" element={<BrowseUsers />} />
        <Route path="/received-interests" element={<ReceivedInterests />} />
        <Route path="/chat/:username" element={<Chat />} />
        <Route path="/chat/" element={<ChatScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
