import React, { useState } from 'react';
import axios from 'axios';
import Message from '../Message/Message';
import UserInput from '../UserInput/UserInput';
import './Chat.css';

function Chat() {
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);

    try {
      const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

      const [currentWeatherResponse, forecastWeatherResponse] = await Promise.all([
        axios.get(currentWeatherUrl),
        axios.get(forecastWeatherUrl),
      ]);

      const currentWeatherData = currentWeatherResponse.data;
      const forecastWeatherData = forecastWeatherResponse.data;

      // Process current weather data
      const weatherInfo = {
        description: currentWeatherData.weather[0].description,
        temperature: currentWeatherData.main.temp.toFixed(1),
        feelsLike: currentWeatherData.main.feels_like.toFixed(1),
        humidity: currentWeatherData.main.humidity,
      };

      const weatherMessage = `Current weather in ${city}:
        - Description: ${weatherInfo.description}
        - Temperature: ${weatherInfo.temperature}°C
        - Feels like: ${weatherInfo.feelsLike}°C
        - Humidity: ${weatherInfo.humidity}%`;

      // Process forecast weather data
      const forecastData = forecastWeatherData.list.slice(0, 5).map((item) => ({
        date: new Date(item.dt * 1000).toLocaleDateString(),
        description: item.weather[0].description,
        temperature: item.main.temp.toFixed(1),
      }));

      const forecastMessage = forecastData
        .map(
          (item) =>
            `Date: ${item.date}\n- Description: ${item.description}\n- Temperature: ${item.temperature}°C`
        )
        .join('\n\n');

      // Set messages
      setMessages([
        ...messages,
        { type: 'bot', text: weatherMessage },
        {
          type: 'bot',
          text: '5-Day Forecast:',
          forecastData: forecastData,
        },
      ]);
    } catch (error) {
      console.error(error);

      // Check if the error is due to an invalid city name (status code 404)
      if (error.response && error.response.status === 404) {
        setMessages([
          ...messages,
          { type: 'bot', text: `The city "${city}" was not found. Please check the spelling and try again.` },
        ]);
      } else {
        setMessages([
          ...messages,
          { type: 'bot', text: `An error occurred while fetching the weather data for ${city}. Please try again.` },
        ]);
      }
    }

    setIsLoading(false);
  };

  const renderForecastTable = () => {
    const forecastData = messages[messages.length - 1]?.forecastData;

    if (!forecastData) {
      return null;
    }

    return (
      <table className="forecast-table">
        <thead>
          <tr>
            {forecastData.map((day) => (
              <th key={day.date}>{day.date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {forecastData.map((day) => (
              <td key={day.date}>{day.weather}</td>
            ))}
          </tr>
          <tr>
            {forecastData.map((day) => (
              <td key={day.date}>{day.temperature}°C</td>
            ))}
          </tr>
        </tbody>
      </table>
    );
  };

  const renderLatestResult = () => {
    const latestCurrentWeather = messages[messages.length - 2]?.text;
    const latestForecastWeather = messages[messages.length - 1]?.text;

    if (!latestCurrentWeather || !latestForecastWeather) {
      return null;
    }

    return (
      <div className="latest-result">
        <div className="latest-current-weather">
          <strong>{latestCurrentWeather.split('\n')[0]}</strong>
          {latestCurrentWeather
            .split('\n')
            .slice(1)
            .join('\n')}
        </div>
        <div className="latest-forecast-weather">{latestForecastWeather}</div>
        {renderForecastTable()}
      </div>
    );
  };
  const renderHistory = () => {
    const historyMessages = messages.slice(0, -2);

    if (historyMessages.length === 0) {
      return null;
    }

    return (
      <div className="history">
        <h3>History</h3>
        {historyMessages.map((message, index) => (
          <Message key={index} type={message.type} text={message.text} />
        ))}
      </div>
    );
  };

  return (
    <div className="Chat">
      <div className="welcome-message">Welcome to Weather Chat!</div>
      <div className="instructions">Type the name of a city to get the weather information.</div>
      {isLoading && <div className="loading-message">Loading weather data...</div>}
      <UserInput onSubmit={(input) => handleUserInput(input)} />
      {renderLatestResult()}
      {renderHistory()}
    </div>
  );
}

export default Chat;