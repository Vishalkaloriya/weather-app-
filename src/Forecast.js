import React from 'react';

const Forecast = ({ forecastData, unit, onBackToSearch }) => {
  const groupedData = groupDataByDate(forecastData.list);

  return (
    <div>
      <h2>5-Day Forecast</h2>
      <div className="forecast-container">
        {Object.keys(groupedData).map((date, index) => (
          <div key={index} className="forecast-item">
            <p>Date: {date}</p>
            <p>Avg Temp: {calculateAverageTemperature(groupedData[date], unit).toFixed(2)}{getTemperatureUnitSymbol(unit)}</p>
            <p>Description: {groupedData[date][0].weather[0].description}</p>
            <img src={`http://openweathermap.org/img/w/${groupedData[date][0].weather[0].icon}.png`} alt="weather-icon" />
          </div>
        ))}
      </div>
     
      <button className='btn' onClick={onBackToSearch}>Back to Search</button>
    </div>
  );
};

const groupDataByDate = (dataList) => {
  return dataList.reduce((groupedData, data) => {
    const date = data.dt_txt.split(' ')[0];
    if (!groupedData[date]) {
      groupedData[date] = [];
    }
    groupedData[date].push(data);
    return groupedData;
  }, {});
};

const calculateAverageTemperature = (dataList, unit) => {
  const totalTemperature = dataList.reduce((sum, data) => sum + data.main.temp, 0);
  const averageTemperature = totalTemperature / dataList.length;
  if (unit === 'imperial') {
    return (averageTemperature * 9) / 5 + 32;
  }
  return averageTemperature;
};

const getTemperatureUnitSymbol = (unit) => {
  return unit === 'imperial' ? '°F' : '°C';
};

export default Forecast;
