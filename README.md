# Weather PWA - Progressive Web Application

A modern, offline-capable Progressive Web App (PWA) for browsing and saving weather information. Built with React and Vite, featuring comprehensive offline support, local data persistence, and a beautiful responsive UI.

![Weather PWA](https://img.shields.io/badge/PWA-Enabled-blue)
![React](https://img.shields.io/badge/React-19.1-61dafb)
![Vite](https://img.shields.io/badge/Vite-7.1-646cff)

## 🌟 Features

- **🌐 Offline Support**: Full functionality even without internet connection
- **📱 Installable**: Install as a native-like app on any device
- **💾 Local Persistence**: Save favorite cities using localStorage
- **🔄 Smart Caching**: Intelligent cache-first strategy for optimal performance
- **📍 Bookmark Cities**: Save and access weather data for multiple locations
- **🎨 Modern UI**: Beautiful, responsive design with smooth animations
- **⚡ Fast Performance**: Optimized loading and caching strategies
- **🔍 Recent Searches**: Quick access to previously searched cities
- **📊 Detailed Weather**: Temperature, humidity, wind speed, and pressure data

## 🏗️ Architecture

### Technology Stack

- **Frontend Framework**: React 19.1
- **Build Tool**: Vite 7.1
- **PWA Plugin**: vite-plugin-pwa
- **Service Worker**: Workbox
- **API**: OpenWeatherMap API
- **Storage**: localStorage for data persistence

## Project Submission Details 

- How long you spent on the assignment?
   Took around 8 hours
- What you like about your implementation.
   Implementating whole system end to end using the pure functions of react and storing that in cache.
- What you would change or improve with more time.
   I will implement sharing the weather data, would love to integrate maps, 
   also we can integrate push notification system
- Why you chose your framework/libraries (React, Vue, Svelte, etc.).
   **React**: Industry-standard framework with excellent hooks support for state management and side effects. Perfect for building interactive UIs with reusable components.

   **Vite**: Modern build tool with lightning-fast HMR and optimized production builds. Better DX compared to Create React App, and excellent PWA plugin support.

   **Workbox**: Google's production-ready service worker library. Handles complex caching strategies, offline scenarios, and cache management automatically.

   **No UI Framework**: Custom CSS for full control over design, smaller bundle size, and better performance. Responsive design implemented with modern CSS features.



## 🎯 Core PWA Features

### 1. Service Worker Implementation

The app uses **Workbox** (via vite-plugin-pwa) for advanced service worker management:

```javascript
// Configured in vite.config.js
VitePWA({
  registerType: 'autoUpdate',
  workbox: {
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/api\.openweathermap\.org\/.*/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'weather-api-cache',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 3600 // 1 hour
          }
        }
      }
    ]
  }
})
```

**Service Worker Features:**
- Auto-updates when new versions are available
- Caches all static assets (JS, CSS, HTML, images)
- Network-first strategy for API calls
- Graceful degradation to cached data when offline

### 2. Web App Manifest

Complete manifest configuration for native-like installation:

```json
{
  "name": "Weather PWA App",
  "short_name": "WeatherPWA",
  "description": "A Progressive Web App for browsing and saving weather information offline",
  "theme_color": "#1e40af",
  "background_color": "#ffffff",
  "display": "standalone",
  "icons": [
    { "src": "pwa-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "pwa-512x512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

### 3. Offline Storage Strategy

**localStorage Implementation:**
- **Bookmarks**: Persistent storage of favorite cities
- **Recent Searches**: Quick access to search history (max 10)
- **Cached Weather**: Offline weather data with timestamps
- **User Preferences**: Theme and unit settings

**Data Validation:**
- Cache validity check (1-hour expiration)
- Automatic fallback to cached data when offline
- Visual indicators for cached/stale data

## 🔄 Caching Strategy

### Multi-Layer Caching Approach

1. **Service Worker Cache**
   - Strategy: NetworkFirst for API calls
   - Fallback: CacheFirst for static assets
   - Expiration: 1 hour for weather data
   - Max entries: 100 API responses

2. **localStorage Cache**
   - Primary: Bookmarked cities (persistent)
   - Secondary: Recent searches (volatile)
   - Tertiary: API response cache (1-hour TTL)

3. **Cache Invalidation**
   - Time-based: Auto-expire after 1 hour
   - Manual: User-initiated refresh
   - Smart: Only fetch when cache is stale


## 📚 Library Choices & Rationale

### Core Libraries

| Library | Version | Purpose | Why Chosen |
|---------|---------|---------|------------|
| **React** | 19.1.1 | UI Framework | Component-based architecture, excellent ecosystem |
| **Vite** | 7.1.7 | Build Tool | Fast HMR, optimized builds, modern dev experience |
| **vite-plugin-pwa** | 1.1.0 | PWA Support | Seamless PWA setup with Workbox integration |
| **workbox-window** | 7.3.0 | SW Management | Production-ready service worker utilities |

## 🧪 Testing

### Testing Framework

The project includes an integration test using:
- **Vitest**: Fast, Vite-native test runner
- **Happy-DOM**: Lightweight DOM implementation

### Test Coverage

```
✅ Test File:    1 passed
✅ Test:         1 passed (integration test)
✅ Duration:     ~270ms

Test: Adding Cities and Caching Data
- Adds city to bookmarks
- Caches weather data
- Validates data persistence
- Tests offline functionality
```

### Running Tests

```bash
# Run test once
npm run test:run

# Run in watch mode
npm test

# Open test UI in browser
npm run test:ui
```

### What the Test Demonstrates

The integration test validates:
1. **Adding cities to bookmarks** - `addBookmark()` function
2. **Caching weather data** - `cacheWeatherData()` function
3. **Data retrieval** - Accessing bookmarks and cached data
4. **Offline support** - Data persists in localStorage
5. **Cache validation** - Checking data freshness

### Testing extension

We can implement unit testing for each of the units which are mentioned in the services



## 🚀 Getting Started

### Prerequisites

- Node.js 20.19.0 or higher (or Node.js 22.12.0+)
- npm 10.8.3 or higher
- OpenWeatherMap API key (free)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PWA_Weather_app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get your API key**
   - Visit [OpenWeatherMap API](https://openweathermap.org/api)
   - Sign up for a free account
   - Copy your API key

4. **Configure API key**
   - Open `src/services/weatherService.js`
   - Replace `'demo'` with your API key:
   ```javascript
   const API_KEY = 'your_api_key_here';
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

7. **Preview production build**
   ```bash
   npm run preview
   ```

## 📱 Installation as PWA

### Desktop (Chrome/Edge)

1. Visit the app in your browser
2. Click the install icon in the address bar (⊕)
3. Click "Install" in the prompt
4. App will open in standalone window

### Mobile (iOS)

1. Open in Safari
2. Tap the Share button
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add"

### Mobile (Android)

1. Open in Chrome
2. Tap the menu (⋮)
3. Tap "Install app" or "Add to Home screen"
4. Confirm installation

## 🎨 Design Principles

### UI/UX Features

- **Responsive Design**: Mobile-first approach, works on all screen sizes
- **Modern Aesthetics**: Gradient backgrounds, smooth shadows, rounded corners
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
- **Performance**: Lazy loading, optimized images, minimal re-renders
- **Feedback**: Loading states, error messages, success indicators

### Color Palette

- Primary: #667eea → #764ba2 (Gradient)
- Background: #f0f9ff → #e0f2fe (Sky gradient)
- Text: #1f2937 (Dark gray)
- Secondary: #6b7280 (Medium gray)
- Accent: #d97706 (Amber for bookmarks)
- Error: #dc2626 (Red)

## 🔧 Configuration

### Vite Configuration

Key PWA settings in `vite.config.js`:

- **registerType**: `autoUpdate` - Automatically updates service worker
- **includeAssets**: Icons and static files to cache
- **manifest**: Full PWA manifest configuration
- **workbox.globPatterns**: Files to precache
- **workbox.runtimeCaching**: API caching strategies
- **devOptions.enabled**: Service worker in development mode

### Environment Variables

For production, consider using environment variables:

```env
VITE_WEATHER_API_KEY=your_api_key_here
VITE_API_BASE_URL=https://api.openweathermap.org/data/2.5
```

## 🧪 Testing Offline Mode

1. **Open DevTools** (F12)
2. Navigate to **Application** tab
3. Click **Service Workers** in sidebar
4. Check **Offline** checkbox
5. Refresh the page
6. Try searching for cached cities


## 📄 License

This project is open source and available under the MIT License.
