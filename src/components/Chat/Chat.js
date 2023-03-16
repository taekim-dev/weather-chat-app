import React, { useState } from 'react';
import Message from '../Message/Message';
import UserInput from '../UserInput/UserInput';
import './Chat.css';

function Chat() {
    const [messages, setMessages] = useState([
        {
          type: 'bot',
          text: 'Welcome to Weather Chat! Type the name of a city to get the weather information.',
        },
      ]);
    
      const handleUserInput = (city) => {
        // Add the user's message to the messages array
        setMessages([...messages, { type: 'user', text: city }]);
      
        // Fetch weather data for the city
        fetchWeatherData(city);
      };
      
      const fetchWeatherData = (city) => {
        console.log(`Fetching weather data for ${city}`);
      };
      

  return (
    <div className="Chat">
      {messages.map((message, index) => (
        <Message key={index} type={message.type} text={message.text} />
        ))}

        <UserInput onSubmit={(input) => handleUserInput(input)} />

    </div>
  );
}

export default Chat;
