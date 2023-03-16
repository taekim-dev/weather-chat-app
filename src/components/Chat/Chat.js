import React, { useState } from 'react';
import axios from 'axios';
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
      
      const fetchWeatherData = async (city) => {
        try {
          const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
          console.log(url)
      
          const response = await axios.get(url);
          const data = response.data;
      
          const weatherInfo = {
            description: data.weather[0].description,
            temperature: data.main.temp.toFixed(1),
            feelsLike: data.main.feels_like.toFixed(1),
            humidity: data.main.humidity,
          };
      
          const weatherMessage = `Current weather in ${city}:
            - Description: ${weatherInfo.description}
            - Temperature: ${weatherInfo.temperature}°C
            - Feels like: ${weatherInfo.feelsLike}°C
            - Humidity: ${weatherInfo.humidity}%`;
      
          setMessages([...messages, { type: 'bot', text: weatherMessage }]);
        } catch (error) {
          console.error(error);
          setMessages([
            ...messages,
            { type: 'bot', text: `An error occurred while fetching the weather data for ${city}. Please try again.` },
          ]);
        }
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
