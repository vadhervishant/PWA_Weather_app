/**
 * Integration Test: Adding Cities and Caching Data
 * 
 * This test demonstrates how the application handles adding cities
 * to bookmarks and caching weather data for offline use.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  addBookmark,
  getBookmarks,
  isBookmarked,
  cacheWeatherData,
  getCachedCity,
  isCachedDataValid
} from '../services/storageService';

describe('Integration Test: Adding Cities and Caching Data', () => {
  // Clear localStorage before each test
  beforeEach(() => {
    localStorage.clear();
  });

  it('should add a city to bookmarks and cache its weather data for offline access', () => {
    // Arrange: Mock weather data for London
    const londonWeather = {
      id: 2643743,
      city: 'London',
      country: 'GB',
      temperature: 15,
      feelsLike: 14,
      humidity: 72,
      pressure: 1013,
      description: 'clear sky',
      icon: '01d',
      windSpeed: 3.5,
      clouds: 20,
      timestamp: Date.now()
    };

    // Act 1: Add London to bookmarks
    const bookmarkSuccess = addBookmark(londonWeather);

    // Assert 1: Bookmark was added successfully
    expect(bookmarkSuccess).toBe(true);
    expect(isBookmarked('London')).toBe(true);

    // Verify bookmark is stored in localStorage
    const bookmarks = getBookmarks();
    expect(bookmarks).toHaveLength(1);
    expect(bookmarks[0].city).toBe('London');
    expect(bookmarks[0].temperature).toBe(15);
    expect(bookmarks[0].bookmarkedAt).toBeDefined();

    // Act 2: Cache the weather data
    cacheWeatherData('London', londonWeather);

    // Assert 2: Weather data is cached
    const cachedData = getCachedCity('London');
    expect(cachedData).toBeDefined();
    expect(cachedData.city).toBe('London');
    expect(cachedData.temperature).toBe(15);
    expect(cachedData.cachedAt).toBeDefined();

    // Assert 3: Cached data is valid (fresh, not stale)
    expect(isCachedDataValid(cachedData)).toBe(true);

    // Simulate offline scenario: Data should still be accessible
    const offlineBookmarks = getBookmarks();
    const offlineCache = getCachedCity('London');
    
    expect(offlineBookmarks).toHaveLength(1);
    expect(offlineCache.city).toBe('London');
    
    console.log('✅ Test Passed: City added to bookmarks and weather data cached successfully!');
    console.log('📍 Bookmarked cities:', offlineBookmarks.length);
    console.log('💾 Cached data for:', offlineCache.city);
  });
});

