/**
 * WeatherSearch Component
 * Search input with recent searches dropdown
 */

import React, { useState, useEffect } from 'react';
import { getRecentSearches } from '../services/storageService';
import './WeatherSearch.css';

const WeatherSearch = ({ onSearch, loading }) => {
  const [city, setCity] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [showRecent, setShowRecent] = useState(false);

  useEffect(() => {
    const recent = getRecentSearches();
    setRecentSearches(recent);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setShowRecent(false);
      setTimeout(() => {
        const recent = getRecentSearches();
        setRecentSearches(recent);
      }, 100);
    }
  };

  const handleRecentClick = (recentCity) => {
    setCity(recentCity);
    onSearch(recentCity);
    setShowRecent(false);
  };

  const handleFocus = () => {
    if (recentSearches.length > 0) {
      setShowRecent(true);
    }
  };

  const handleBlur = () => {
    // Delay to allow click on recent items
    setTimeout(() => setShowRecent(false), 200);
  };

  return (
    <div className="weather-search">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Search for a city..."
            className="search-input"
            disabled={loading}
          />
          {city && (
            <button
              type="button"
              onClick={() => setCity('')}
              className="clear-button"
              aria-label="Clear search"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <button 
          type="submit" 
          className="search-button"
          disabled={loading || !city.trim()}
        >
          {loading ? (
            <span className="spinner"></span>
          ) : (
            'Search'
          )}
        </button>
      </form>

      {showRecent && recentSearches.length > 0 && (
        <div className="recent-searches">
          <div className="recent-header">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Recent Searches</span>
          </div>
          <ul className="recent-list">
            {recentSearches.map((recentCity, index) => (
              <li
                key={index}
                onClick={() => handleRecentClick(recentCity)}
                className="recent-item"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {recentCity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WeatherSearch;

