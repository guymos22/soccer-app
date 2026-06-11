import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import GamesScreen from './src/screens/GamesScreen';
import PlayersScreen from './src/screens/PlayersScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import CreateGameScreen from './src/screens/CreateGameScreen';
import WeatherScreen from './src/screens/WeatherScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function GamesStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#2E7D32',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="GamesList"
        component={GamesScreen}
        options={{ title: 'Upcoming Games' }}
      />
      <Stack.Screen
        name="CreateGame"
        component={CreateGameScreen}
        options={{ title: 'Schedule Game' }}
      />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2E7D32',
        tabBarInactiveTintColor: '#999',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Games"
        component={GamesStackNavigator}
        options={{
          title: 'Games',
          tabBarLabel: 'Games',
        }}
      />
      <Tab.Screen
        name="Players"
        component={PlayersScreen}
        options={{
          title: 'Players',
          tabBarLabel: 'Players',
        }}
      />
      <Tab.Screen
        name="Weather"
        component={WeatherScreen}
        options={{
          title: 'Weather',
          tabBarLabel: '🌤️',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
      <StatusBar style="light" />
    </>
  );
}
