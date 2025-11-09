/**
 * WeatherCard Component
 * Displays current weather information with bookmark functionality
 */

import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ weather, isBookmarked, onToggleBookmark }) => {
  if (!weather) return null;

  const weatherIconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

  return (
    <div className="weather-card">
      <div className="weather-card-header">
        <div className="location-info">
          <h2 className="city-name">{weather.city}</h2>
          <p className="country-name">{weather.country}</p>
        </div>
        <button
          onClick={() => onToggleBookmark(weather)}
          className={`bookmark-button ${isBookmarked ? 'bookmarked' : ''}`}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          <svg viewBox="0 0 24 24" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>

      <div className="weather-main">
        <div className="weather-icon-wrapper">
          <img src={weatherIconUrl} alt={weather.description} className="weather-icon-img" />
        </div>
        <div className="temperature-info">
          <div className="temperature">{weather.temperature}°C</div>
          <div className="description">{weather.description}</div>
        </div>
      </div>

      <div className="weather-details">
        <div className="weather-detail-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <div>
            <div className="detail-label">Feels Like</div>
            <div className="detail-value">{weather.feelsLike}°C</div>
          </div>
        </div>

        <div className="weather-detail-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
          <div>
            <div className="detail-label">Humidity</div>
            <div className="detail-value">{weather.humidity}%</div>
          </div>
        </div>

        <div className="weather-detail-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          <div>
            <div className="detail-label">Wind Speed</div>
            <div className="detail-value">{weather.windSpeed} m/s</div>
          </div>
        </div>

        <div className="weather-detail-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <div>
            <div className="detail-label">Pressure</div>
            <div className="detail-value">{weather.pressure} hPa</div>
          </div>
        </div>
      </div>

      {weather.cachedAt && (
        <div className="cached-indicator">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Showing cached data</span>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;

