/**
 * Custom hook for weather data management
 */

import { useState, useEffect, useCallback } from 'react';
import { getCurrentWeather, getWeatherForecast } from '../services/weatherService';
import { 
  cacheWeatherData, 
  getCachedCity, 
  isCachedDataValid,
  addRecentSearch 
} from '../services/storageService';

export const useWeather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  /**
   * Fetch weather data for a city
   */
  const fetchWeather = useCallback(async (city) => {
    if (!city || !city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Check cache first
      const cached = getCachedCity(city);
      
      if (isOffline && cached) {
        // Use cached data when offline
        setCurrentWeather(cached);
        setLoading(false);
        return;
      }

      if (cached && isCachedDataValid(cached) && !isOffline) {
        // Use valid cache even when online for better performance
        setCurrentWeather(cached);
        setLoading(false);
        return;
      }

      // Fetch fresh data from API
      const weatherData = await getCurrentWeather(city);
      setCurrentWeather(weatherData);
      
      // Cache the data
      cacheWeatherData(city, weatherData);
      
      // Add to recent searches
      addRecentSearch(city);
      
      setLoading(false);
    } catch (err) {
      // If offline or error, try to use cached data
      const cached = getCachedCity(city);
      if (cached) {
        setCurrentWeather(cached);
        setError('Showing cached data - unable to fetch fresh data');
      } else {
        setError(err.message || 'Failed to fetch weather data');
      }
      setLoading(false);
    }
  }, [isOffline]);

  /**
   * Fetch forecast data for a city
   */
  const fetchForecast = useCallback(async (city) => {
    if (!city || !city.trim()) return;

    try {
      const forecastData = await getWeatherForecast(city);
      setForecast(forecastData);
    } catch (err) {
      console.error('Error fetching forecast:', err);
    }
  }, []);

  /**
   * Clear current weather data
   */
  const clearWeather = useCallback(() => {
    setCurrentWeather(null);
    setForecast(null);
    setError(null);
  }, []);

  return {
    currentWeather,
    forecast,
    loading,
    error,
    isOffline,
    fetchWeather,
    fetchForecast,
    clearWeather
  };
};

