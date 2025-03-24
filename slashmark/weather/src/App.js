import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Import custom CSS

const WeatherApp = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      });
    }
  }, []);

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await axios.get(`http://localhost:5000/weather?lat=${lat}&lon=${lon}`);
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  const handleSearch = async () => {
    if (!location) return;
    try {
      const response = await axios.get(`http://localhost:5000/weather?city=${location}`);
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mt-4">🌤️ Weather Forecast</h1>
      <div className="search-box">
        <input 
          type="text" 
          placeholder="Enter city" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          className="form-control"
        />
        <button onClick={handleSearch} className="btn btn-primary">Search</button>
      </div>

      {weather ? (
        <div className="weather-info">
          <h2>📍 {weather.city}</h2>
          <div className="forecast">
            {weather.forecast.map((day, index) => (
              <div key={index} className="forecast-card">
                <p><strong>{day.dt_txt}</strong></p>
                <p>🌡️ {day.main.temp}°C</p>
                <p>{day.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="loading-text">Fetching weather data...</p>
      )}
    </div>
  );
};

export default WeatherApp;
