import React from 'react';
import './Message.css';

function Message({ type, text }) {
  return (
    <div className={`Message ${type === 'bot' ? 'bot-message' : 'user-message'}`}>
      <p>{text}</p>
    </div>
  );
}

export default Message;
