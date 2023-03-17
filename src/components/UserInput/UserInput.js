import React, { useState } from 'react';

const UserInput = ({ onSubmit }) => {
  const [city, setCity] = useState('');

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(city);
    setCity('');
  };

  return (
    <div className="user-input">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleChange}
          placeholder="Enter a city name"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserInput;
