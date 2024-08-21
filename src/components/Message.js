import React from 'react';
import './Message.css';

const Message = ({ name, time, text, isCurrentUser }) => {
  return (
    <div className={`message ${isCurrentUser ? 'current-user' : 'other-user'}`}>
      <div className={`message-content ${isCurrentUser ? 'current-user-content' : 'other-user-content'}`}>
        <div className="message-header">
          <h4>{name}</h4>
          <span>{time}</span>
        </div>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Message;
