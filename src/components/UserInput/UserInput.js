import React, { useState } from 'react';
import './UserInput.css';

function UserInput({ onSubmit }) {
  const [input, setInput] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!input.trim()) {
      return;
    }

    onSubmit(input);
    setInput('');
  };

  return (
    <form className="user-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="user-input"
        placeholder="Enter city name"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <button type="submit" className="submit-btn">
        Get Weather
      </button>
    </form>
  );
}

export default UserInput;
