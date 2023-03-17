import React, { useState } from 'react';
import './UserInput.css';

function UserInput({ onSubmit }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input);
      setInput('');
    }
  };

  return (
    <form className="UserInput" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type the name of a city"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default UserInput;
