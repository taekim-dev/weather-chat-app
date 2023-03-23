import React, { useState } from 'react';
import axios from 'axios';
import UserInput from '../UserInput/UserInput';
import SkeletonLoader from '../SkeletonLoader/SkeletonLoader';
import './Chat.css';

function Chat() {
  
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);

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
      const country = currentWeatherData.sys.country;
      const forecastWeatherData = forecastWeatherResponse.data;

      const cleanedCity = city.replace(/[^a-zA-Z\s]/g, "").trim();
      const capitalizedCity = cleanedCity.toUpperCase();

      // Process current weather data
      const weatherInfo = {
        description: currentWeatherData.weather[0].description,
        temperature: currentWeatherData.main.temp.toFixed(1),
        feelsLike: currentWeatherData.main.feels_like.toFixed(1),
        humidity: currentWeatherData.main.humidity,
      };

      const weatherMessage = `Current weather in ${capitalizedCity}, ${country}:
      - Weather: ${weatherInfo.description}
      - Temperature: ${weatherInfo.temperature}°C
      - Feels like: ${weatherInfo.feelsLike}°C
      - Humidity: ${weatherInfo.humidity}%`;
  
      // Process forecast weather data
    const forecastData = forecastWeatherData.list
        .filter((item, index) => index % 8 === 0) // Pick one forecast for each day (every 8th item, assuming 3-hour intervals)
        .slice(0, 5) // Take only the first 5 days
        .map((item) => ({
        date: new Date(item.dt * 1000).toLocaleDateString(),
        description: item.weather[0].description,
        temperature: item.main.temp.toFixed(1),
    }));

        const currentWeatherLines = weatherMessage.split('\n');
        const feelsLikeLine = currentWeatherLines[3];
        const feelsLikeTemperature = parseFloat(feelsLikeLine.match(/-?\d+(\.\d+)?/)[0]);

        const temperatureCategory = determineTemperatureCategory(feelsLikeTemperature);
        
      // Set messages
      setMessages([
        ...messages,
        { type: 'bot', text: weatherMessage },
        {
          type: 'bot',
          text: '5-Day Forecast:',
          forecastData: forecastData,
          temperatureCategory: temperatureCategory,
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

  const determineTemperatureCategory = (temperature) => {
    if (temperature > 40) return 'extremely-hot';
    if (temperature >= 30) return 'hot';
    if (temperature >= 20) return 'warm';
    if (temperature >= 10) return 'cool';
    if (temperature >= 0) return 'cold';
    return 'freezing';
  };

  const renderForecastTable = () => {
    const forecastData = messages[messages.length - 1]?.forecastData;

    if (!forecastData) {
      return null;
    }

    return (
      <table className={`forecast-table table-text-color`}>
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
                <td key={day.date}>
                {day.description}
                <div style={{ marginTop: '8px' }}>{day.temperature}°C</div>
                </td>
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
  
    const currentWeatherLines = latestCurrentWeather.split('\n');
    const cityName = currentWeatherLines[0].replace('Current weather in ', '').trim();
    const weatherInfo = currentWeatherLines.slice(1);

    const temperatureCategory = messages[messages.length - 1]?.temperatureCategory?.toUpperCase();
  
    return (
      <div className="latest-result">
        <h2>{cityName} <span className={`temperature-category ${temperatureCategory?.toLowerCase()}`}>{temperatureCategory}</span></h2>
        <table className={`current-weather-table table-text-color`}>
          <thead>
            <tr>
              <th>Weather</th>
              <th>Temperature</th>
              <th>Feels Like</th>
              <th>Humidity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {weatherInfo.map((info, index) => (
                <td key={index}>{info.replace(/.*?:\s*/, '')}</td>
              ))}
            </tr>
          </tbody>
        </table>
        <div className="latest-forecast-weather">{latestForecastWeather}</div>
        {renderForecastTable()}
        {renderImages()}
      </div>
    );
  };

  const renderImages = () => {
    const latestCurrentWeather = messages[messages.length - 2]?.text;
  
    if (!latestCurrentWeather) {
      return null;
    }
  
    const currentWeatherLines = latestCurrentWeather.split('\n');
    
    const feelsLikeLine = currentWeatherLines[3];
    
    if (!feelsLikeLine) {
      return null;
    }
  
    // Use a regular expression to extract the temperature value
    const temperatureMatch = feelsLikeLine.match(/-?\d+(\.\d+)?/);
    const feelsLikeTemperature = temperatureMatch ? parseFloat(temperatureMatch[0]) : null;
  
    if (isNaN(feelsLikeTemperature)) {
      return null;
    }
  
    const getRandomInt = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    
  
    const temperatureCategory = determineTemperatureCategory(feelsLikeTemperature);  
    const randomIndex = getRandomInt(1, 3);
    const temperatureImage = `temp-${temperatureCategory}${randomIndex}.jpg`;

  
    return (
      <div className="weather-images" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '90%', margin: '0 auto' }}>
        <img
          src={`/assets/${temperatureImage}`}
          alt={temperatureCategory}
          style={{ maxWidth: '100%', maxHeight: 'auto', margin: '2.5%' }}
        />
      </div>
    );
  };
  
  return (
    <div className="Chat">
      <div className="welcome-message">Welcome to Weather Chat!</div>
      <div className="instructions">Type the name of a city to get the weather information.</div>
      <UserInput onSubmit={(input) => handleUserInput(input)} />
      {isLoading ? <SkeletonLoader /> : null}
      {!isLoading ? renderLatestResult() : null}
      <div className="source-link">
        <a href="https://openweathermap.org" target="_blank" rel="noopener noreferrer">
          Powered by OpenWeather
        </a>
      </div>
    </div>
  );
  
}

export default Chat;