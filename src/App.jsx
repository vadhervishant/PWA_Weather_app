/**
 * Main App Component
 * Weather PWA Application
 */

import React, { useState } from 'react';
import Header from './components/Header';
import WeatherSearch from './components/WeatherSearch';
import WeatherCard from './components/WeatherCard';
import BookmarksList from './components/BookmarksList';
import { useWeather } from './hooks/useWeather';
import { useBookmarks } from './hooks/useBookmarks';
import './App.css';

function App() {
  const {
    currentWeather,
    loading,
    error,
    isOffline,
    fetchWeather,
    // clearWeather
  } = useWeather();

  const {
    bookmarks,
    checkIsBookmarked,
    toggleBookmark
  } = useBookmarks();

  const [showBookmarks, setShowBookmarks] = useState(true);

  const handleSearch = (city) => {
    fetchWeather(city);
    setShowBookmarks(false);
  };

  const handleSelectBookmark = (city) => {
    fetchWeather(city);
    setShowBookmarks(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleBookmark = (weatherData) => {
    const success = toggleBookmark(weatherData);
    if (success) {
      // Force re-render to update bookmark button state
      setShowBookmarks(true);
    }
  };

  const handleRemoveBookmark = (cityName) => {
    toggleBookmark({ city: cityName });
  };

  return (
    <div className="app">
      <Header isOffline={isOffline} />
      
      <main className="main-content">
        <div className="container">
          {/* Search Section */}
          <section className="search-section">
            <WeatherSearch onSearch={handleSearch} loading={loading} />
            
            {error && (
              <div className="error-message">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}
          </section>

          {/* Current Weather Section */}
          {currentWeather && (
            <section className="weather-section">
              <WeatherCard
                weather={currentWeather}
                isBookmarked={checkIsBookmarked(currentWeather.city)}
                onToggleBookmark={handleToggleBookmark}
              />
              <button onClick={() => setShowBookmarks(!showBookmarks)} className="toggle-bookmarks">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                {showBookmarks ? 'Hide' : 'Show'} Saved Locations
              </button>
            </section>
          )}

          {/* Bookmarks Section */}
          {showBookmarks && (
            <section className="bookmarks-section">
              <BookmarksList
                bookmarks={bookmarks}
                onSelectCity={handleSelectBookmark}
                onRemoveBookmark={handleRemoveBookmark}
              />
            </section>
          )}

          {/* Empty State */}
          {!currentWeather && !loading && (
            <div className="empty-state">
              <div className="empty-state-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                </svg>
              </div>
              <h2>Welcome to Weather PWA</h2>
              <p>Search for any city to get current weather information</p>
              <div className="features">
                <div className="feature">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span>Works Offline</span>
                </div>
                <div className="feature">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <span>Save Locations</span>
                </div>
                <div className="feature">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Real-time Data</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>Weather data provided by OpenWeatherMap</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
