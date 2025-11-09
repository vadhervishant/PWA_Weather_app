/**
 * BookmarksList Component
 * Displays saved/bookmarked weather locations
 */

import React from 'react';
import './BookmarksList.css';

const BookmarksList = ({ bookmarks, onSelectCity, onRemoveBookmark }) => {
  if (!bookmarks || bookmarks.length === 0) {
    return (
      <div className="bookmarks-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        <p>No bookmarked cities yet</p>
        <span>Search for a city and bookmark it for offline access</span>
      </div>
    );
  }

  return (
    <div className="bookmarks-list">
      <h2 className="bookmarks-title">
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        Saved Locations
      </h2>
      <div className="bookmarks-grid">
        {bookmarks.map((bookmark, index) => (
          <div key={index} className="bookmark-card" onClick={() => onSelectCity(bookmark.city)}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveBookmark(bookmark.city);
              }}
              className="bookmark-remove"
              aria-label="Remove bookmark"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="bookmark-header">
              <div className="bookmark-location">
                <h3 className="bookmark-city">{bookmark.city}</h3>
                <p className="bookmark-country">{bookmark.country}</p>
              </div>
              <div className="bookmark-icon">
                <img 
                  src={`https://openweathermap.org/img/wn/${bookmark.icon}.png`}
                  alt={bookmark.description}
                />
              </div>
            </div>
            
            <div className="bookmark-temp">{bookmark.temperature}°C</div>
            <div className="bookmark-description">{bookmark.description}</div>
            
            <div className="bookmark-details">
              <div className="bookmark-detail">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
                <span>{bookmark.humidity}%</span>
              </div>
              <div className="bookmark-detail">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <span>{bookmark.windSpeed} m/s</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookmarksList;

