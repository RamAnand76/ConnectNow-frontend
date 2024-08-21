import React, { useState, useEffect } from 'react';
import './ChatScreen.css';
import './Message.css';
import axiosInstance from '../axiosInstance';

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
    <div className="chat-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">CH</div>
          <input type="text" placeholder="Search" className="search-bar" />
        </div>
        <div className="chat-list">
          {users.map(user => (
            <ChatItem
              key={user.username}
              name={user.username}
              message="Last message preview"
              time="Just now"
              active={selectedUser === user.username}
              onClick={() => setSelectedUser(user.username)}
            />
          ))}
        </div>
        <div className="sidebar-footer">
          <SidebarIcon icon="settings" />
          <SidebarIcon icon="logout" />
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
                onChange={(e) => setNewMessage(e.target.value)}
              />
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

      <aside className="chat-details">
        <ChatDetails />
      </aside>
    </div>
  );
};

const ChatItem = ({ name, message, time, active, onClick }) => (
  <div className={`chat-item ${active ? 'active' : ''}`} onClick={onClick}>
    <div className="avatar-placeholder" />
    <div className="chat-info">
      <h4>{name}</h4>
      <p>{message}</p>
    </div>
    <div className="chat-time">
      <span>{time}</span>
    </div>
  </div>
);

const SidebarIcon = ({ icon }) => (
  <div className="sidebar-icon">
    <img src={`/icons/${icon}.png`} alt={icon} />
  </div>
);

const ChatHeader = ({ title, members }) => (
  <div className="chat-header">
    <h2>{title}</h2>
    <p>{members}</p>
  </div>
);

const Message = ({ name, time, text, isCurrentUser }) => {
    console.log(isCurrentUser); // This should log true for the current user's messages
    return (
      <div className={`message ${isCurrentUser ? 'other-user' :'current-user' }`}>
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
  
  

const ChatDetails = () => (
  <div className="chat-details-content">
    <h3>Chat Details</h3>
    <div className="section">
      <h4>Photos and Videos</h4>
      <div className="media-thumbnails">
        <img src="/images/pizza.png" alt="Media" />
        <img src="/images/group.png" alt="Media" />
      </div>
      <a href="#">See all</a>
    </div>
    <div className="section">
      <h4>Shared Files</h4>
      <ul>
        <li><a href="#">Contract for the provision of printing services</a></li>
        <li><a href="#">Changes in the department schedule</a></li>
      </ul>
      <a href="#">See all</a>
    </div>
    <div className="section">
      <h4>Shared Links</h4>
      <ul>
        <li><a href="#">Economic Policy</a></li>
        <li><a href="#">Microsoft</a></li>
      </ul>
      <a href="">See all</a>
    </div>
  </div>
);

export default ChatScreen;
