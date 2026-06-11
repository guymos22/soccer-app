import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  FlatList,
} from 'react-native';
import axios from 'axios';

interface CurrentWeather {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  location: string;
  pressure: number;
  visibility: number;
}

interface ForecastItem {
  date: string;
  time: string;
  temp: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

export default function WeatherScreen() {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [location, setLocation] = useState('New York');
  const [coordinates, setCoordinates] = useState({ lat: 40.7128, lon: -74.006 });

  useEffect(() => {
    fetchWeather();
  }, [coordinates]);

  const getWeatherIcon = (code: number): string => {
    if (code === 0) return '☀️';
    if (code === 1 || code === 2) return '🌤️';
    if (code === 3) return '☁️';
    if (code === 45 || code === 48) return '🌫️';
    if (code === 51 || code === 53 || code === 55) return '🌦️';
    if (code === 61 || code === 63 || code === 65) return '🌧️';
    if (code === 71 || code === 73 || code === 75) return '❄️';
    if (code === 80 || code === 81 || code === 82) return '⛈️';
    if (code === 85 || code === 86) return '🌨️';
    return '🌡️';
  };

  const getWeatherDescription = (code: number): string => {
    const descriptions: { [key: number]: string } = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Slight snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      80: 'Slight rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      85: 'Slight snow showers',
      86: 'Heavy snow showers',
    };
    return descriptions[code] || 'Unknown';
  };

  const fetchWeather = async () => {
    try {
      setLoading(true);

      const response = await axios.get(WEATHER_API_URL, {
        params: {
          latitude: coordinates.lat,
          longitude: coordinates.lon,
          current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,pressure_msl,visibility',
          hourly: 'temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m',
          daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max',
          timezone: 'auto',
          forecast_days: 7,
        },
      });

      const data = response.data;
      const current = data.current;

      // Set current weather
      setCurrentWeather({
        temp: Math.round(current.temperature_2m),
        feelsLike: Math.round(current.apparent_temperature),
        humidity: current.relative_humidity_2m,
        windSpeed: Math.round(current.wind_speed_10m),
        description: getWeatherDescription(current.weather_code),
        icon: getWeatherIcon(current.weather_code),
        location: location,
        pressure: Math.round(current.pressure_msl),
        visibility: Math.round(current.visibility / 1000),
      });

      // Set forecast (next 24 hours from hourly data)
      const forecastData: ForecastItem[] = [];
      const hourly = data.hourly;
      const times = hourly.time;

      for (let i = 0; i < Math.min(8, times.length); i++) {
        const dateTime = new Date(times[i]);
        forecastData.push({
          date: dateTime.toLocaleDateString(),
          time: dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          temp: Math.round(hourly.temperature_2m[i]),
          description: getWeatherDescription(hourly.weather_code[i]),
          icon: getWeatherIcon(hourly.weather_code[i]),
          humidity: hourly.relative_humidity_2m[i],
          windSpeed: Math.round(hourly.wind_speed_10m[i]),
        });
      }

      setForecast(forecastData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather:', error);
      Alert.alert('Error', 'Failed to fetch weather data');
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchInput.trim()) {
      Alert.alert('Error', 'Please enter a location');
      return;
    }

    try {
      setLoading(true);
      // Geocode location
      const geoResponse = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
        params: {
          name: searchInput,
          count: 1,
          language: 'en',
          format: 'json',
        },
      });

      if (geoResponse.data.results && geoResponse.data.results.length > 0) {
        const result = geoResponse.data.results[0];
        const locationName = `${result.name}${result.admin1 ? ', ' + result.admin1 : ''}${result.country ? ', ' + result.country : ''}`;
        setLocation(locationName);
        setCoordinates({
          lat: result.latitude,
          lon: result.longitude,
        });
        setSearchInput('');
      } else {
        Alert.alert('Not Found', 'Location not found. Please try again.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error searching location:', error);
      Alert.alert('Error', 'Failed to search location');
      setLoading(false);
    }
  };

  const renderForecastItem = ({ item }: { item: ForecastItem }) => (
    <View style={styles.forecastCard}>
      <Text style={styles.forecastTime}>{item.time}</Text>
      <Text style={styles.forecastIcon}>{item.icon}</Text>
      <Text style={styles.forecastTemp}>{item.temp}°C</Text>
      <Text style={styles.forecastDesc}>{item.description}</Text>
      <Text style={styles.forecastDetail}>💧 {item.humidity}%</Text>
      <Text style={styles.forecastDetail}>💨 {item.windSpeed} km/h</Text>
    </View>
  );

  if (loading && !currentWeather) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#1E88E5" />
        <Text style={styles.loadingText}>Fetching weather data...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search location..."
          value={searchInput}
          onChangeText={setSearchInput}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Current Weather */}
      {currentWeather && (
        <View style={styles.currentWeatherCard}>
          <Text style={styles.location}>{currentWeather.location}</Text>
          <Text style={styles.weatherIcon}>{currentWeather.icon}</Text>
          <Text style={styles.temperature}>{currentWeather.temp}°C</Text>
          <Text style={styles.description}>{currentWeather.description}</Text>
          <Text style={styles.feelsLike}>Feels like {currentWeather.feelsLike}°C</Text>

          {/* Weather Details Grid */}
          <View style={styles.detailsGrid}>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Humidity</Text>
              <Text style={styles.detailValue}>{currentWeather.humidity}%</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Wind Speed</Text>
              <Text style={styles.detailValue}>{currentWeather.windSpeed} km/h</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Pressure</Text>
              <Text style={styles.detailValue}>{currentWeather.pressure} mb</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Visibility</Text>
              <Text style={styles.detailValue}>{currentWeather.visibility} km</Text>
            </View>
          </View>
        </View>
      )}

      {/* Forecast Section */}
      <View style={styles.forecastSection}>
        <Text style={styles.forecastTitle}>Hourly Forecast</Text>
        <FlatList
          data={forecast}
          renderItem={renderForecastItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.forecastList}
        />
      </View>

      {/* Info Section */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Weather Information</Text>
        <Text style={styles.infoText}>
          • Temperature: Current and "feels like" temperature{'\n'}
          • Humidity: Percentage of moisture in the air{'\n'}
          • Wind Speed: Speed of wind in km/h{'\n'}
          • Pressure: Atmospheric pressure{'\n'}
          • Visibility: How far you can see{'\n'}
          • Forecast: Next 8 hours of hourly weather
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#1E88E5',
  },
  searchSection: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#1E88E5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  searchButton: {
    backgroundColor: '#1E88E5',
    paddingHorizontal: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: 18,
  },
  currentWeatherCard: {
    backgroundColor: '#1E88E5',
    margin: 15,
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  location: {
    fontSize: 18,
    color: '#E3F2FD',
    marginBottom: 10,
    fontWeight: '600',
  },
  weatherIcon: {
    fontSize: 80,
    marginVertical: 15,
  },
  temperature: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    fontSize: 16,
    color: '#E3F2FD',
    marginTop: 8,
    textTransform: 'capitalize',
  },
  feelsLike: {
    fontSize: 14,
    color: '#B3E5FC',
    marginTop: 5,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    gap: 10,
  },
  detailBox: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#B3E5FC',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  forecastSection: {
    padding: 15,
  },
  forecastTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E88E5',
    marginBottom: 12,
  },
  forecastList: {
    paddingRight: 15,
  },
  forecastCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginRight: 10,
    width: 90,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  forecastTime: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1E88E5',
    marginBottom: 5,
  },
  forecastIcon: {
    fontSize: 30,
    marginVertical: 5,
  },
  forecastTemp: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  forecastDesc: {
    fontSize: 9,
    color: '#666',
    marginTop: 3,
    textAlign: 'center',
  },
  forecastDetail: {
    fontSize: 8,
    color: '#999',
    marginTop: 2,
  },
  infoSection: {
    padding: 15,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E88E5',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
  },
});
