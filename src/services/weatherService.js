/**
 * Weather Service
 * Handles all weather API interactions with OpenWeatherMap API
 */

const API_KEY = 'c6061bc69f15067faccf78a1c3067dbc';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';



/**
 * Fetch current weather data for a city
 * @param {string} city - City name
 * @returns {Promise<Object>} Weather data
 */
export const getCurrentWeather = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('City not found. Please check the city name and try again.');
      } else if (response.status === 401) {
        throw new Error('Invalid API key. Please set up your OpenWeatherMap API key.');
      }
      throw new Error('Failed to fetch weather data.');
    }
    
    const data = await response.json();
    return formatWeatherData(data);
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};

/**
 * Fetch weather forecast for a city
 * @param {string} city - City name
 * @returns {Promise<Object>} Forecast data
 */
export const getWeatherForecast = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('City not found. Please check the city name and try again.');
      }
      throw new Error('Failed to fetch forecast data.');
    }
    
    const data = await response.json();
    return formatForecastData(data);
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

/**
 * Format raw weather data from API
 * @param {Object} data - Raw API data
 * @returns {Object} Formatted weather data
 */
const formatWeatherData = (data) => {
  return {
    id: data.id,
    city: data.name,
    country: data.sys.country,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    windSpeed: data.wind.speed,
    clouds: data.clouds.all,
    timestamp: Date.now(),
    coord: data.coord
  };
};

/**
 * Format raw forecast data from API
 * @param {Object} data - Raw API forecast data
 * @returns {Object} Formatted forecast data
 */
const formatForecastData = (data) => {
  const dailyData = {};
  
  data.list.forEach(item => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    
    if (!dailyData[date]) {
      dailyData[date] = {
        date,
        temps: [],
        descriptions: [],
        icons: [],
        humidity: [],
        windSpeed: []
      };
    }
    
    dailyData[date].temps.push(item.main.temp);
    dailyData[date].descriptions.push(item.weather[0].description);
    dailyData[date].icons.push(item.weather[0].icon);
    dailyData[date].humidity.push(item.main.humidity);
    dailyData[date].windSpeed.push(item.wind.speed);
  });
  
  const forecast = Object.values(dailyData).slice(0, 5).map(day => ({
    date: day.date,
    avgTemp: Math.round(day.temps.reduce((a, b) => a + b) / day.temps.length),
    maxTemp: Math.round(Math.max(...day.temps)),
    minTemp: Math.round(Math.min(...day.temps)),
    description: day.descriptions[0],
    icon: day.icons[0],
    humidity: Math.round(day.humidity.reduce((a, b) => a + b) / day.humidity.length),
    windSpeed: (day.windSpeed.reduce((a, b) => a + b) / day.windSpeed.length).toFixed(1)
  }));
  
  return {
    city: data.city.name,
    country: data.city.country,
    forecast,
    timestamp: Date.now()
  };
};

