# Soccer App - Now with To-Do List! 📝

A React Native mobile application with **Soccer Management**, **Weather Dashboard**, and **To-Do List** with local storage!

## Features

### ⚽ Soccer Management
- 📅 Create and schedule games
- 👥 Player signup/join functionality
- 🏆 Player profiles with skill levels
- ⚖️ Auto-balancing team assignment (coming soon)

### 🌤️ Weather Dashboard
- 🌡️ Current weather with temperature
- ☔ Detailed weather metrics
- 📊 Hourly forecast
- 🔍 Location search

### 📝 To-Do List (NEW!)
- ✅ Add/delete tasks
- ✓ Mark tasks as complete
- 💾 Local storage persistence
- 📊 Progress tracking
- 🎯 Task statistics

## Tech Stack

- **Frontend**: React Native + Expo
- **Backend**: Node.js + Express
- **Database**: Firebase + AsyncStorage (local)
- **Weather API**: Open-Meteo (free)

## Project Structure

```
soccer-app/
├── frontend/
│   ├── App.tsx
│   ├── src/screens/
│   │   ├── HomeScreen.tsx
│   │   ├── GamesScreen.tsx
│   │   ├── CreateGameScreen.tsx
│   │   ├── PlayersScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── WeatherScreen.tsx
│   │   └── TodoScreen.tsx (NEW!)
│   └── package.json
├── backend/
└── docs/
```

## To-Do List Features

### Core Functionality
- **Add Tasks**: Quick input with button
- **Mark Complete**: Tap checkbox to toggle
- **Delete Tasks**: Swipe or tap delete icon
- **Local Storage**: Automatic saving with AsyncStorage

### Statistics & Progress
- Progress bar showing completion percentage
- Task counter (X of Y completed)
- Statistics footer
- Empty state message

### UI/UX
- Beautiful purple theme
- Smooth animations
- Task timestamps
- Strikethrough for completed items
- Responsive design

## Getting Started

### Installation

```bash
cd frontend
npm install
```

### Running the App

```bash
npm start
```

Options:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Press `w` for web version
- Scan QR code with Expo Go

## How To-Do List Works

### Data Storage
- Tasks stored in **AsyncStorage** (device local storage)
- Automatic save on every change
- Data persists after app closes
- No internet needed

### Task Structure
```javascript
{
  id: "1234567890",           // Unique ID
  title: "Buy groceries",      // Task text
  completed: false,            // Completion status
  createdAt: "6/11/26, 2:30 PM" // Timestamp
}
```

## Screen Navigation

The app now has 6 tabs:

1. **Home** - Dashboard
2. **Games** - Soccer management
3. **Players** - Player list
4. **📝 Todo** - To-do list (NEW!)
5. **🌤️ Weather** - Weather dashboard
6. **Profile** - User profile

## Available Scripts

- `npm start` - Start development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web

## Code Example: Using AsyncStorage

```javascript
// Save tasks
const saveTasks = async () => {
  await AsyncStorage.setItem('@todo_tasks', JSON.stringify(tasks));
};

// Load tasks
const loadTasks = async () => {
  const stored = await AsyncStorage.getItem('@todo_tasks');
  if (stored) {
    setTasks(JSON.parse(stored));
  }
};

// Add task
const addTask = () => {
  const newTask = {
    id: Date.now().toString(),
    title: taskInput,
    completed: false,
    createdAt: new Date().toLocaleString(),
  };
  setTasks([newTask, ...tasks]);
};

// Toggle completion
const toggleTask = (id) => {
  setTasks(tasks.map(t =>
    t.id === id ? { ...t, completed: !t.completed } : t
  ));
};

// Delete task
const deleteTask = (id) => {
  setTasks(tasks.filter(t => t.id !== id));
};
```

## Local Storage Details

### AsyncStorage
- Device's local storage
- Persistent data (survives app restart)
- Key-based access
- Perfect for to-do lists, preferences, caches

### Storage Location
- **iOS**: Documents folder
- **Android**: Internal storage

### Limitations
- ~10MB limit per app
- No backend sync (unless you add it)
- Single device only

## UI Color Scheme

| Component | Color |
|-----------|-------|
| Header | #6C63FF (Purple) |
| Active Tab | #6C63FF |
| Checkbox Active | #6C63FF |
| Progress Bar | #6C63FF |
| Background | #F5F5F5 (Light Gray) |
| Cards | #FFFFFF (White) |

## Future Enhancements

1. **Sync with Backend**
   - Store tasks on server
   - Access from multiple devices

2. **Advanced Features**
   - Due dates
   - Priorities (High/Medium/Low)
   - Categories/tags
   - Recurring tasks
   - Reminders/notifications

3. **UI Improvements**
   - Dark mode
   - Swipe to delete
   - Drag to reorder
   - Search/filter

4. **Data Management**
   - Export tasks (CSV/JSON)
   - Import tasks
   - Backup/restore

5. **Integration**
   - Sync with calendar app
   - Share tasks with others
   - Connect to soccer games

## Troubleshooting

### Tasks not saving
```bash
# Clear app data
npm start -- --clear

# Reinstall dependencies
rm -rf node_modules
npm install
```

### App crashes on launch
```bash
expo doctor
```

### AsyncStorage not working
- Check if AsyncStorage is imported
- Verify device storage permission
- Check device storage space

## Performance Tips

- Tasks load instantly from local storage
- Smooth animations with React Native
- Efficient re-renders with useEffect hooks
- No network latency

## Resources

- [AsyncStorage Documentation](https://react-native-async-storage.github.io/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Native](https://reactnative.dev/)

## Repository

**https://github.com/guymos22/soccer-app**

## What's Next?

1. ✅ Soccer app with game management
2. ✅ Weather dashboard
3. ✅ To-do list with local storage
4. 🔲 Backend sync (optional)
5. 🔲 Due dates and reminders
6. 🔲 Categories/tags

Your app now has 3 major features: Soccer ⚽ + Weather 🌤️ + To-Do 📝!

## License

MIT
