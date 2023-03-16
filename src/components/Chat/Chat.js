import React, { useState } from 'react';
import Message from '../Message/Message';
import UserInput from '../UserInput/UserInput';
import './Chat.css';

function Chat() {
  const [messages, setMessages] = useState([]);

  return (
    <div className="Chat">
      {/* Render messages here */}
      <UserInput />
    </div>
  );
}

export default Chat;
