// App.js
import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import './App.css'; 

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [showForecast, setShowForecast] = useState(false);
  const [showPreviousDays, setShowPreviousDays] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric'); 

  const apiKey = '5962e1da07367508f7510b009b1a1060';

  const fetchWeatherData = async (city) => {
    try {
      const currentWeatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`
      );

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`
      );

      setWeatherData(currentWeatherResponse.data);
      setForecastData(forecastResponse.data);
      setShowForecast(true);
      setError(null); 
    } catch (error) {
      console.error('Error fetching data:', error);
      setShowForecast(false);
      setWeatherData(null);
      setForecastData(null);
      setError('Invalid city. Please enter a valid city name.'); 
    }
  };
  const handleBackToSearch = () => {
    setShowForecast(false);
    setShowPreviousDays(false);
  };
  const handleShowPreviousDays = () => {
    setShowPreviousDays(true);
  };
  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };
  
  
  return (
    <div className="container">
    <h1 className="title">Weather Forecast Dashboard</h1>
    <SearchBar onSearch={fetchWeatherData} />

    <div className="unit-toggle">
      <button onClick={toggleUnit} className={unit === 'metric' ? 'active' : ''}>
        Fahrenheit (°F)
      </button>
      <button onClick={toggleUnit} className={unit === 'imperial' ? 'active' : ''}>
        Celsius (°C)
      </button>
    </div>

    {error && <div className="error-message">{error}</div>}

    {weatherData && <CurrentWeather weatherData={weatherData} unit={unit} />}

    {showForecast && forecastData && (
       <div>
       <button onClick={handleShowPreviousDays}>
       Show 5 Next Days
       </button>
       {showPreviousDays ? <Forecast forecastData={forecastData} unit={unit} onBackToSearch={handleBackToSearch} /> : null}
     </div>
    )}
  </div>
  );
};

export default App;
