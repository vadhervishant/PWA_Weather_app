/**
 * Storage Service
 * Manages localStorage operations for offline data persistence
 */

const STORAGE_KEYS = {
  BOOKMARKS: 'weather_bookmarks',
  RECENT_SEARCHES: 'weather_recent_searches',
  CACHED_WEATHER: 'weather_cached_data',
  USER_PREFERENCES: 'weather_user_preferences'
};

/**
 * Save bookmarked cities
 * @param {Array} bookmarks - Array of bookmarked weather data
 */
export const saveBookmarks = (bookmarks) => {
  try {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
  } catch (error) {
    console.error('Error saving bookmarks:', error);
  }
};

/**
 * Get all bookmarked cities
 * @returns {Array} Array of bookmarked weather data
 */
export const getBookmarks = () => {
  try {
    const bookmarks = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return bookmarks ? JSON.parse(bookmarks) : [];
  } catch (error) {
    console.error('Error loading bookmarks:', error);
    return [];
  }
};

/**
 * Add a city to bookmarks
 * @param {Object} weatherData - Weather data to bookmark
 * @returns {boolean} Success status
 */
export const addBookmark = (weatherData) => {
  try {
    const bookmarks = getBookmarks();
    
    // Check if already bookmarked
    const exists = bookmarks.some(item => item.city === weatherData.city);
    if (exists) {
      return false;
    }
    
    bookmarks.push({
      ...weatherData,
      bookmarkedAt: Date.now()
    });
    
    saveBookmarks(bookmarks);
    return true;
  } catch (error) {
    console.error('Error adding bookmark:', error);
    return false;
  }
};

/**
 * Remove a city from bookmarks
 * @param {string} cityName - Name of city to remove
 * @returns {boolean} Success status
 */
export const removeBookmark = (cityName) => {
  try {
    const bookmarks = getBookmarks();
    const filtered = bookmarks.filter(item => item.city !== cityName);
    saveBookmarks(filtered);
    return true;
  } catch (error) {
    console.error('Error removing bookmark:', error);
    return false;
  }
};

/**
 * Check if a city is bookmarked
 * @param {string} cityName - Name of city to check
 * @returns {boolean} Bookmark status
 */
export const isBookmarked = (cityName) => {
  const bookmarks = getBookmarks();
  return bookmarks.some(item => item.city === cityName);
};

/**
 * Save recent searches
 * @param {string} cityName - City name to add to recent searches
 */
export const addRecentSearch = (cityName) => {
  try {
    const searches = getRecentSearches();
    
    // Remove if already exists
    const filtered = searches.filter(city => city !== cityName);
    
    // Add to beginning and limit to 10 recent searches
    filtered.unshift(cityName);
    const limited = filtered.slice(0, 10);
    
    localStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(limited));
  } catch (error) {
    console.error('Error saving recent search:', error);
  }
};

/**
 * Get recent searches
 * @returns {Array} Array of recent city searches
 */
export const getRecentSearches = () => {
  try {
    const searches = localStorage.getItem(STORAGE_KEYS.RECENT_SEARCHES);
    return searches ? JSON.parse(searches) : [];
  } catch (error) {
    console.error('Error loading recent searches:', error);
    return [];
  }
};

/**
 * Clear recent searches
 */
export const clearRecentSearches = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.RECENT_SEARCHES);
  } catch (error) {
    console.error('Error clearing recent searches:', error);
  }
};

/**
 * Cache weather data for offline use
 * @param {string} cityName - City name
 * @param {Object} data - Weather data to cache
 */
export const cacheWeatherData = (cityName, data) => {
  try {
    const cached = getCachedWeatherData();
    cached[cityName] = {
      ...data,
      cachedAt: Date.now()
    };
    localStorage.setItem(STORAGE_KEYS.CACHED_WEATHER, JSON.stringify(cached));
  } catch (error) {
    console.error('Error caching weather data:', error);
  }
};

/**
 * Get all cached weather data
 * @returns {Object} Cached weather data object
 */
export const getCachedWeatherData = () => {
  try {
    const cached = localStorage.getItem(STORAGE_KEYS.CACHED_WEATHER);
    return cached ? JSON.parse(cached) : {};
  } catch (error) {
    console.error('Error loading cached weather data:', error);
    return {};
  }
};

/**
 * Get cached data for a specific city
 * @param {string} cityName - City name
 * @returns {Object|null} Cached weather data or null
 */
export const getCachedCity = (cityName) => {
  const cached = getCachedWeatherData();
  return cached[cityName] || null;
};

/**
 * Check if cached data is still valid (within 1 hour)
 * @param {Object} cachedData - Cached weather data
 * @returns {boolean} Validity status
 */
export const isCachedDataValid = (cachedData) => {
  if (!cachedData || !cachedData.cachedAt) return false;
  const oneHour = 60 * 60 * 1000;
  return Date.now() - cachedData.cachedAt < oneHour;
};

/**
 * Save user preferences
 * @param {Object} preferences - User preferences object
 */
export const savePreferences = (preferences) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
  } catch (error) {
    console.error('Error saving preferences:', error);
  }
};

/**
 * Get user preferences
 * @returns {Object} User preferences
 */
export const getPreferences = () => {
  try {
    const preferences = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
    return preferences ? JSON.parse(preferences) : {
      theme: 'light',
      unit: 'metric'
    };
  } catch (error) {
    console.error('Error loading preferences:', error);
    return {
      theme: 'light',
      unit: 'metric'
    };
  }
};

