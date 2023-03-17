import React from 'react';
import './Message.css';

function Message({ type, text, component }) {
  const className = type === 'user' ? 'user-message' : 'bot-message';

  return (
    <div className={`Message ${className}`}>
      {text}
      {component && <div>{component}</div>}
    </div>
  );
}

export default Message;
