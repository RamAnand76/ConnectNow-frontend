// src/pages/Chat.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

const Chat = () => {
    const { username } = useParams(); // Get the username from URL parameters
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        // Fetch chat messages
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/auth/chat/${username}/`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
                });
                setMessages(response.data);
            } catch (error) {
                console.error('Failed to fetch messages:', error.response.data);
            }
        };

        fetchMessages();
    }, [username]);

    const handleSend = async () => {
        try {
            await axios.post(`http://localhost:8000/api/auth/chat/${username}/`, {
                content: newMessage
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
            });
            setNewMessage('');
            // Fetch messages again to update UI
            const response = await axios.get(`http://localhost:8000/api/auth/messages/${username}/`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
            });
            setMessages(response.data);
        } catch (error) {
            console.error('Failed to send message:', error.response.data);
        }
    };

    return (
        <><Navbar />
        
        <div className="chat">
            <h2>Chat with {username}</h2>
            <div className="message-list">
                {messages.map(message => (
                    <div key={message.id} className={`message ${message.sender === localStorage.getItem('username') ? 'sent' : 'received'}`}>
                        <strong>{message.sender}:</strong> {message.content}
                    </div>
                ))}
            </div>
            <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..." />
            <button onClick={handleSend}>Send</button>
        </div></>
    );
};

export default Chat;
