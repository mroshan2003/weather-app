import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "a861c0d833c292af247d03d1366d92e5"; // Replace with your OpenWeather API key

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError("");
    } catch {
      setError("City not found!");
      setWeather(null);
    }
  };

  const clearWeather = () => {
    setCity("");
    setWeather(null);
    setError("");
  };

  return (
    <div className="weather-container">
      <h1 className="title">🌦 Weather App</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Search</button>
        <button className="clear-btn" onClick={clearWeather}>
          Clear
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="temp">{Math.round(weather.main.temp)}°C</p>
          <p>{weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather-icon"
          />
          <div className="extra-info">
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>🌬 Wind: {Math.round(weather.wind.speed)} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
