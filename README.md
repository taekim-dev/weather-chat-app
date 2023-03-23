# Weather Chat

Weather Chat is a friendly and easy-to-use web application that allows users to retrieve current weather and 5-day forecasts for cities around the world. By simply typing the name of a city, the application provides detailed weather information, including temperature, humidity, and a brief description of the weather conditions. The app also displays relevant images based on the temperature category, giving users a visual cue about the current weather.

## Features

- Current weather information for any city worldwide
- 5-day weather forecasts with daily summaries
- Temperature-based images for a more engaging user experience
- Color-coded temperature categories for quick reference
- Clean and intuitive user interface
- Responsive design that works well on various devices
- Auto-complete functionality for city name input
- Skeleton loading for improved user experience during data fetching

## Live Version

A live version of the application is available at [https://weather-chat.netlify.app/](https://weather-chat.netlify.app/).

## Getting Started

These instructions will help you set up the project on your local machine for development and testing purposes.

### Prerequisites

Before you begin, make sure you have the following software installed on your computer:

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

    git clone https://github.com/yourusername/weather-chat.git

2. Change your working directory to the project folder:

    cd weather-chat

3. Install the required dependencies:

    npm install

4. Create a `.env` file in the root folder of the project and add your OpenWeatherMap API key:

    REACT_APP_OPENWEATHERMAP_API_KEY=your_api_key_here

    Replace `your_api_key_here` with your actual API key. If you don't have one, you can obtain it by signing up for a free account on the [OpenWeatherMap website](https://openweathermap.org/).

5. Start the development server:

    npm start

This will launch the application in your default web browser. By default, the app will be accessible at `http://localhost:3000`.

## Built With

- [React](https://reactjs.org/) - A popular JavaScript library for building user interfaces
- [axios](https://axios-http.com/) - A promise-based HTTP client for the browser and Node.js
- [OpenWeatherMap API](https://openweathermap.org/api) - A weather data API providing current weather and forecast data

## Contributing

We appreciate any contributions to the Weather Chat project! Feel free to submit pull requests, report bugs, or suggest new features by creating an issue.

## License

This project is licensed under the MIT License.

## Acknowledgments

- OpenWeatherMap for providing the weather data
- Unsplash for the beautiful weather-related images

---

Developed by Tae Kim. Thank you for your interest in Weather Chat! We hope you enjoy using the application and find it helpful in your daily life.
