# Soccer App - Updated with Weather Dashboard

A React Native mobile application for organizing weekly neighborhood soccer games AND checking weather forecasts!

## Features

### Soccer Management ⚽
- 📅 Create and schedule games
- 👥 Player signup/join functionality
- 🏆 Player profiles with skill levels
- ⚖️ Auto-balancing team assignment (coming soon)
- 📱 Cross-platform (iOS & Android)

### Weather Dashboard 🌤️ (NEW!)
- 🌡️ Current weather with temperature and "feels like"
- ☔ Detailed weather information (humidity, wind, pressure, visibility)
- 📊 Hourly forecast for next 8 hours
- 🔍 Location search functionality
- 🎨 Beautiful weather visualization with emoji icons
- 🔄 Real-time data from Open-Meteo API (no API key required!)

## Tech Stack

- **Frontend**: React Native + Expo
- **Backend**: Node.js + Express
- **Database**: Firebase Realtime Database
- **Weather API**: Open-Meteo (Free, no key required)
- **HTTP Client**: Axios
- **Authentication**: Firebase Auth

## Project Structure

```
soccer-app/
├── frontend/          # React Native app
│   ├── App.tsx       # Main app with navigation
│   ├── src/
│   │   └── screens/
│   │       ├── HomeScreen.tsx
│   │       ├── GamesScreen.tsx
│   │       ├── CreateGameScreen.tsx
│   │       ├── PlayersScreen.tsx
│   │       ├── ProfileScreen.tsx
│   │       └── WeatherScreen.tsx (NEW!)
│   └── package.json
├── backend/           # Node.js Express server
└── docs/              # Documentation
```

## Weather Dashboard Features

### Current Weather Display
- Location name
- Current temperature
- "Feels like" temperature
- Weather description with icon
- Large weather emoji display

### Detailed Information Cards
- **Humidity**: Percentage of moisture in air
- **Wind Speed**: Speed in km/h
- **Pressure**: Atmospheric pressure in mb
- **Visibility**: How far you can see in km

### Hourly Forecast
- Next 8 hours of weather predictions
- Time for each forecast
- Temperature predictions
- Weather conditions with icons
- Humidity and wind for each hour
- Horizontal scrollable list

### Location Search
- Search for any location worldwide
- Automatic geolocation via coordinates
- Instant weather updates
- Supports cities, regions, countries

## Getting Started

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

### Running the App

```bash
# Start Expo development server
npm start

# Options:
# Press 'i' for iOS simulator
# Press 'a' for Android emulator
# Press 'w' for web version
# Or scan QR code with Expo Go app
```

## Weather API Details

### Open-Meteo API
- **Provider**: Open-Meteo (https://open-meteo.com/)
- **Cost**: FREE - no API key required!
- **Type**: REST API
- **Rate Limit**: Unlimited for development

### API Endpoints

1. **Forecast API**
   ```
   GET https://api.open-meteo.com/v1/forecast
   ?latitude=40.7128
   &longitude=-74.006
   &current=temperature_2m,weather_code,humidity_2m
   &hourly=temperature_2m,weather_code
   &timezone=auto
   ```

2. **Geocoding API**
   ```
   GET https://geocoding-api.open-meteo.com/v1/search
   ?name=New%20York
   &count=1
   &language=en
   ```

## Screen Navigation

The app has 5 main tabs:

1. **Home** - Main dashboard with quick actions
2. **Games** - Create and manage soccer games
3. **Players** - View registered players
4. **Weather** - Check current conditions and forecast (🌤️ emoji in tab bar)
5. **Profile** - Manage user profile

## Weather Icons Used

| Icon | Condition |
|------|-----------|
| ☀️ | Clear sky |
| 🌤️ | Partly cloudy |
| ☁️ | Overcast |
| 🌫️ | Foggy |
| 🌦️ | Drizzle/Light rain |
| 🌧️ | Moderate/Heavy rain |
| ⛈️ | Thunderstorm |
| ❄️ | Snow |
| 🌨️ | Heavy snow |

## Code Examples

### Fetching Current Weather

```javascript
const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
  params: {
    latitude: coordinates.lat,
    longitude: coordinates.lon,
    current: 'temperature_2m,weather_code,humidity_2m',
    timezone: 'auto',
  },
});

const current = response.data.current;
setCurrentWeather({
  temp: Math.round(current.temperature_2m),
  humidity: current.relative_humidity_2m,
  description: getWeatherDescription(current.weather_code),
});
```

### Searching for Location

```javascript
const geoResponse = await axios.get(
  'https://geocoding-api.open-meteo.com/v1/search',
  {
    params: {
      name: searchInput,
      count: 1,
      language: 'en',
    },
  }
);

const result = geoResponse.data.results[0];
setCoordinates({
  lat: result.latitude,
  lon: result.longitude,
});
```

## Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run on web browser

## Data Flow

```
User Input (Location Search)
    ↓
Geocoding API (Get Coordinates)
    ↓
Forecast API (Get Weather Data)
    ↓
Parse & Format Data
    ↓
Display in UI
    ↓
Auto-refresh on coordinate change
```

## Performance Optimizations

- Weather data fetches only when location changes
- Forecast data is cached after initial fetch
- Search limited to first result for performance
- Horizontal scroll optimized with FlatList
- Async/await for non-blocking operations

## Future Enhancements

1. **Save favorite locations**
2. **Weather alerts & notifications**
3. **Historical weather data**
4. **Multi-day forecast (7-14 days)**
5. **Weather maps with overlay**
6. **Air quality index (AQI)**
7. **UV index display**
8. **Pollen count information**
9. **Integration with game scheduling**
   - Warn about bad weather
   - Suggest rescheduling
   - Track weather during games
10. **Precipitation chance**

## Troubleshooting

### Weather data not loading
```
✓ Check internet connection
✓ Verify API is accessible: curl https://api.open-meteo.com/v1/forecast
✓ Check browser console for errors
✓ Verify coordinates are valid
```

### Location search returns nothing
```
✓ Try different spelling
✓ Use full city names (e.g., "London" not "Lond")
✓ Include country if ambiguous (e.g., "London, UK")
```

### Module not found
```bash
npm install
rm -rf node_modules
npm install
```

### Emulator issues
```bash
expo doctor
# Check for SDK and emulator issues
```

## Dependencies Added

```json
{
  "axios": "^1.5.0",
  "expo": "^49.0.0",
  "react": "18.2.0",
  "react-native": "0.72.4",
  "react-navigation": "^6.1.8"
}
```

## Repository

**https://github.com/guymos22/soccer-app**

## Resources

- [Open-Meteo Documentation](https://open-meteo.com/en/docs)
- [Open-Meteo API Features](https://open-meteo.com/en/docs)
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Weather Examples](https://reactnative.dev/)
- [Axios HTTP Client](https://axios-http.com/)

## Weather Code Reference

Weather codes from WMO (World Meteorological Organization):

- **0**: Clear sky
- **1-2**: Mainly clear, Partly cloudy
- **3**: Overcast
- **45, 48**: Foggy
- **51-55**: Drizzle
- **61-65**: Rain
- **71-75**: Snow
- **80-82**: Rain showers
- **85-86**: Snow showers

## Tips for Best Experience

1. **Allow location permission** for automatic location detection
2. **Search for major cities** first to verify functionality
3. **Check internet connection** for real-time updates
4. **Refresh manually** if data seems outdated
5. **Test different locations** to see weather variations

## License

MIT
