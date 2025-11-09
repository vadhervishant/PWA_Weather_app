/**
 * Custom hook for bookmarks management
 */

import { useState, useEffect, useCallback } from 'react';
import {
  getBookmarks,
  addBookmark,
  removeBookmark,
  isBookmarked
} from '../services/storageService';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  // Load bookmarks on mount
  useEffect(() => {
    const loadedBookmarks = getBookmarks();
    setBookmarks(loadedBookmarks);
  }, []);

  /**
   * Add a city to bookmarks
   */
  const addToBookmarks = useCallback((weatherData) => {
    const success = addBookmark(weatherData);
    if (success) {
      const updatedBookmarks = getBookmarks();
      setBookmarks(updatedBookmarks);
      return true;
    }
    return false;
  }, []);

  /**
   * Remove a city from bookmarks
   */
  const removeFromBookmarks = useCallback((cityName) => {
    const success = removeBookmark(cityName);
    if (success) {
      const updatedBookmarks = getBookmarks();
      setBookmarks(updatedBookmarks);
      return true;
    }
    return false;
  }, []);

  /**
   * Check if a city is bookmarked
   */
  const checkIsBookmarked = useCallback((cityName) => {
    return isBookmarked(cityName);
  }, []);

  /**
   * Toggle bookmark status
   */
  const toggleBookmark = useCallback((weatherData) => {
    if (isBookmarked(weatherData.city)) {
      return removeFromBookmarks(weatherData.city);
    } else {
      return addToBookmarks(weatherData);
    }
  }, [addToBookmarks, removeFromBookmarks]);

  return {
    bookmarks,
    addToBookmarks,
    removeFromBookmarks,
    checkIsBookmarked,
    toggleBookmark
  };
};

