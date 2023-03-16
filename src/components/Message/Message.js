import React from 'react';
import './Message.css';

function Message({ type, text }) {
  return (
    <div className={`Message ${type}`}>
      <p>{text}</p>
    </div>
  );
}

export default Message;
