/**
 * Header Component
 * Displays app title and offline indicator
 */

import React from 'react';
import './Header.css';

const Header = ({ isOffline }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title">
          <svg className="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
          <h1>Weather PWA</h1>
        </div>
        {isOffline && (
          <div className="offline-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m-12.728 0a9 9 0 010-12.728m14.142 2.121a5 5 0 010 7.072m-14.142 0a5 5 0 010-7.072M12 12h.01" />
              <line x1="3" y1="3" x2="21" y2="21" strokeWidth={2} />
            </svg>
            <span>Offline Mode</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

