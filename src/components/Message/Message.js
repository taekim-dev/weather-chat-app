import React from 'react';
import './Message.css';

function Message({ type, text }) {
  const messageType = type === 'bot' ? 'bot-message' : 'user-message';

  return (
    <div className={`Message ${messageType}`}>
      <p>{text}</p>
    </div>
  );
}

export default Message;
