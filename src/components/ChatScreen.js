import React, { useState, useEffect } from 'react';
import './ChatScreen.css';
import './Message.css';
import axiosInstance from '../axiosInstance';
import Navbar from './Navbar';
import axios from 'axios';
import defaultProfile from "../constants/default-profile.png";

const ChatScreen = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('api/auth/interests/accepted/');
        setUsers(response.data);
      } catch (error) {
        if (error.response) {
          console.error('Failed to fetch users:', error.response.data);
        } else {
          console.error('Failed to fetch users:', error.message);
        }
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      const fetchMessages = async () => {
        try {
          const response = await axiosInstance.get(`api/auth/chat/${selectedUser}/`);
          const sortedMessages = response.data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
          setMessages(sortedMessages);
        } catch (error) {
          if (error.response) {
            console.error('Failed to fetch messages:', error.response.data);
          } else {
            console.error('Failed to fetch messages:', error.message);
          }
        }
      };

      fetchMessages();
    }
  }, [selectedUser]);

  const handleSend = async () => {
    if (!newMessage.trim() || !selectedUser) return;
    setLoading(true);
    try {
      await axiosInstance.post(`api/auth/chat/${selectedUser}/`, {
        content: newMessage
      });
      setNewMessage('');
      const response = await axiosInstance.get(`api/auth/chat/${selectedUser}/`);
      const sortedMessages = response.data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      setMessages(sortedMessages);
    } catch (error) {
      if (error.response) {
        console.error('Failed to send message:', error.response.data);
      } else {
        console.error('Failed to send message:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-screen">
      <Navbar />
      <div className="chat-container">
        <aside className="sidebar">
          <div className="sidebar-header">
            <div className="logo">Messages</div>
          </div>
          <div className="chat-list">
            {users.map(user => (
              <ChatItem
                key={user.username}
                name={user.username}
                message="Last message preview"
                time="Just now"
                active={selectedUser === user.username}
                onClick={() => setSelectedUser(user.username)} />
            ))}
          </div>
        </aside>

        <main className="chat-main">
          {selectedUser ? (
            <>
              <ChatHeader title={selectedUser} members="Online" />
              <div className="messages">
                {messages.map(message => (
                  <Message
                    key={message.id}
                    name={message.sender}
                    time={new Date(message.timestamp).toLocaleTimeString()}
                    text={message.content}
                    isCurrentUser={message.sender === selectedUser} // Replace with actual current username
                  />
                ))}
              </div>
              <div className="message-input-area">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="message-input"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)} />
                <button
                  className="send-button"
                  onClick={handleSend}
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send'}
                </button>
              </div>
            </>
          ) : (
            <p>Select a user to start chatting</p>
          )}
        </main>
      </div>
    </div>
  );
};

const ChatItem = ({ name, message, time, active, profilePic, onClick }) => (
  <div className={`chat-item ${active ? 'active' : ''}`} onClick={onClick}>
    <img
      src={profilePic || defaultProfile}
      alt={`${name}'s profile`}
      className="avatar"
    />
    <div className="chat-info">
      <h4>{name}</h4>
      <p>{message}</p>
    </div>
    <div className="chat-time">
      <span>{time}</span>
    </div>
  </div>
);

const ChatHeader = ({ title, members }) => (
  <div className="chat-header">
    <h2>{title}</h2>
    <p>{members}</p>
  </div>
);

const Message = ({ name, time, text, isCurrentUser }) => {
  return (
    <div className={`message ${isCurrentUser ? 'other-user' :'current-user'}`}>
      <div className={`message-content ${isCurrentUser ? 'current-user-content' : 'other-user-content'}`}>
        <div className="message-header">
          <h4>{isCurrentUser ?  name :'You'}</h4>
          <span>{time}</span>
        </div>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default ChatScreen;
