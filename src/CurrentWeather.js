// CurrentWeather.js
import React from 'react';

const CurrentWeather = ({ weatherData, unit }) => {
  const { main, wind, weather } = weatherData;

  return (
    <div>
      <h2>{weatherData.name}</h2>
      <p>Current Temperature: {convertTemperature(main.temp, unit).toFixed(2)}{getTemperatureUnitSymbol(unit)}</p>
      <p>Min Temperature: {convertTemperature(main.temp_min, unit).toFixed(2)}{getTemperatureUnitSymbol(unit)}</p>
      <p>Max Temperature: {convertTemperature(main.temp_max, unit).toFixed(2)}{getTemperatureUnitSymbol(unit)}</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Wind Speed: {wind.speed} m/s, Direction: {wind.deg}°</p>
      <p>Description: {weather[0].description}</p>
      <img src={`http://openweathermap.org/img/w/${weather[0].icon}.png`} alt="weather-icon" />
    </div>
  );
};


const convertTemperature = (temp, unit) => {
  if (unit === 'imperial') {
    
    return (temp * 9) / 5 + 32;
  }
  
  return temp;
};


const getTemperatureUnitSymbol = (unit) => {
  return unit === 'imperial' ? '°F' : '°C';
};

export default CurrentWeather;
