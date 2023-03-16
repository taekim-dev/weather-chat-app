import React, { useState } from 'react';
import './UserInput.css';

function UserInput({ onSubmit }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(input);
    setInput('');
  };

  return (
    <form className="UserInput" onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a city name..."
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default UserInput;
