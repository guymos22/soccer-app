# Soccer App - Frontend (React Native)

A cross-platform mobile application built with React Native and Expo for organizing weekly neighborhood soccer games and checking weather forecasts.

## Features

- 📱 Cross-platform (iOS & Android)
- 📅 Schedule and manage games
- 👥 Player management with skill levels
- 🎮 Game signup and participation
- 👤 User profiles
- ⚖️ Team auto-balancing (coming soon)
- 🌤️ **NEW:** Weather dashboard with forecasts

## Tech Stack

- **React Native** - Mobile framework
- **Expo** - Development and deployment
- **React Navigation** - App navigation
- **Firebase** - Backend integration
- **Axios** - HTTP client
- **TypeScript** - Type safety

## Project Structure

```
frontend/
├── App.tsx                 # Main app component with navigation
├── app.json               # Expo configuration
├── package.json           # Dependencies
├── src/
│   ├── screens/          # Screen components
│   │   ├── HomeScreen.tsx
│   │   ├── GamesScreen.tsx
│   │   ├── CreateGameScreen.tsx
│   │   ├── PlayersScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── WeatherScreen.tsx     # NEW!
│   ├── services/         # API services (to be added)
│   ├── store/            # State management (to be added)
│   └── types/            # TypeScript types (to be added)
└── assets/               # Images and static assets
```

## Getting Started

### Prerequisites

- Node.js v16 or higher
- npm or yarn
- Expo CLI

### Installation

```bash
# Install Expo CLI globally
npm install -g expo-cli

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

## Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run on web browser
- `npm run eject` - Eject from Expo (not reversible)

## Screen Overview

### Home Screen
- Main dashboard with quick actions
- Statistics overview

### Games Screen
- List of upcoming games
- Create new game form
- Game signup functionality

### Create Game Screen
- Form to schedule a new game
- Date, time, and location input
- Max players selection

### Players Screen
- View all registered players
- Display skill levels
- Player statistics

### Weather Screen (NEW!)
- Current weather conditions
- Temperature and "feels like" info
- Hourly forecast for next 8 hours
- Location search functionality
- Detailed weather metrics

### Profile Screen
- User profile management
- Update personal information
- Skill level selection

## Weather Dashboard Features

### Current Weather
- Temperature display
- Weather condition description
- "Feels like" temperature
- Large weather icon

### Weather Details
- Humidity percentage
- Wind speed (km/h)
- Atmospheric pressure (mb)
- Visibility distance (km)

### Hourly Forecast
- Next 8 hours of predictions
- Temperature for each hour
- Weather condition icons
- Humidity and wind for each forecast

### Location Search
- Search any location worldwide
- Automatic coordinates lookup
- Real-time weather updates

## Project Architecture

### Navigation Structure

```
App.tsx
├── Home Tab
├── Games Tab
│   └── Stack Navigator
│       ├── Games List
│       └── Create Game
├── Players Tab
├── Weather Tab (NEW!)
└── Profile Tab
```

### Component Hierarchy

```
HomeScreen
├── Quick Actions
├── Statistics
└── Help Section

GamesScreen
├── Create Button
└── Game List
    └── Game Cards

WeatherScreen (NEW!)
├── Search Bar
├── Current Weather Card
│   └── Details Grid
└── Hourly Forecast List
```

## API Integration

### Open-Meteo Weather API

No API key required! Free tier includes:

```javascript
// Current weather
GET https://api.open-meteo.com/v1/forecast
  ?latitude=40.7128
  &longitude=-74.006
  &current=temperature_2m,weather_code,humidity_2m

// Hourly forecast
GET https://api.open-meteo.com/v1/forecast
  ?latitude=40.7128
  &longitude=-74.006
  &hourly=temperature_2m,weather_code

// Location search
GET https://geocoding-api.open-meteo.com/v1/search
  ?name=New%20York
  &count=1
  &language=en
```

## Development Notes

- All screens have placeholder data
- Backend integration will be added in next phase
- Firebase configuration needed in `.env`
- Team auto-balancing algorithm to be implemented
- Weather API uses free Open-Meteo service (no authentication needed)

## Next Steps

1. Connect to backend API endpoints
2. Implement Firebase authentication
3. Add real-time data synchronization
4. Implement team auto-balancing algorithm
5. Add notifications/reminders
6. Add location picker/maps integration
7. Add weather alerts
8. Integrate weather with game scheduling
9. Write unit and integration tests

## Environment Variables

Create a `.env` file in the frontend directory:

```
EXPO_PUBLIC_FIREBASE_API_KEY=your_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id

EXPO_PUBLIC_API_URL=http://localhost:5000/api
```

## Troubleshooting

### Port already in use
```bash
expo start -c  # Clear cache
```

### Weather data not loading
- Check internet connection
- Verify Open-Meteo API is accessible
- Check browser console for errors

### Location search not working
- Try different location names
- Use full city names (e.g., "New York" instead of "NY")

### Module not found
```bash
npm install
rm -rf node_modules
npm install
```

### Emulator issues
- Make sure Android emulator or iOS simulator is running before starting the app
- Check Expo doctor: `expo doctor`

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Open-Meteo API](https://open-meteo.com/)
- [Axios Documentation](https://axios-http.com/)

## Performance Tips

- Weather data is fetched only when location changes
- Forecast data is cached after initial fetch
- Search results are limited to first result for performance
- Horizontal scroll is optimized with FlatList

## License

MIT
