# Soccer App - Backend (Node.js + Express)

Backend API for the Soccer App built with Express.js and Firebase.

## Features

- RESTful API for managing games and players
- Firebase Realtime Database for data storage
- Firebase Authentication support
- TypeScript for type safety
- Error handling and validation
- CORS enabled

## Tech Stack

- **Node.js** - Runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Firebase** - Database and authentication
- **Helmet** - Security headers
- **CORS** - Cross-origin support

## Project Structure

```
backend/
├── src/
│   ├── index.ts              # Main server file
│   ├── firebase/
│   │   └── config.ts         # Firebase configuration
│   ├── routes/
│   │   ├── games.ts          # Game endpoints
│   │   └── users.ts          # User endpoints
│   ├── services/
│   │   ├── gameService.ts    # Game business logic
│   │   └── userService.ts    # User business logic
│   └── types/
│       └── index.ts          # TypeScript types
├── dist/                      # Compiled JavaScript
├── .env.example              # Environment variables template
├── tsconfig.json             # TypeScript configuration
└── package.json
```

## Getting Started

### Prerequisites

- Node.js v16 or higher
- npm or yarn
- Firebase project with Realtime Database

### Installation

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your Firebase credentials
nano .env
```

### Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com
2. Create a Realtime Database
3. Generate a service account key:
   - Go to Project Settings → Service Accounts
   - Click "Generate New Private Key"
4. Copy the values into your `.env` file

### Running the Server

#### Development

```bash
npm run dev
```

The server will start with auto-reload on file changes.

#### Production

```bash
npm run build
npm start
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server
- `npm run build` - Build TypeScript to JavaScript
- `npm run test` - Run tests
- `npm run lint` - Lint code

## API Endpoints

### Games

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/games` | Get all upcoming games |
| GET | `/api/games/:gameId` | Get specific game |
| POST | `/api/games` | Create new game |
| PUT | `/api/games/:gameId` | Update game |
| DELETE | `/api/games/:gameId` | Delete game |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:userId` | Get specific user |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/:userId` | Update user |
| DELETE | `/api/users/:userId` | Delete user |

### Example Requests

#### Create a Game

```bash
curl -X POST http://localhost:5000/api/games \
  -H "Content-Type: application/json" \
  -d '{
    "organizerId": "user123",
    "date": "2024-01-15",
    "time": "6:00 PM",
    "location": "Central Park",
    "maxPlayers": 10,
    "description": "Friendly neighborhood game"
  }'
```

#### Create a User

```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "+1234567890",
    "skillLevel": "Intermediate"
  }'
```

## Database Schema

### Games Collection

```json
{
  "id": "uuid",
  "date": "2024-01-15",
  "time": "6:00 PM",
  "location": "Central Park",
  "description": "Game description",
  "organizerId": "user123",
  "maxPlayers": 10,
  "players": [],
  "teams": [],
  "status": "scheduled",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Users Collection

```json
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "phoneNumber": "+1234567890",
  "skillLevel": "Intermediate",
  "gamesPlayed": 5,
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

## Development Notes

- All database operations use Firebase Realtime Database
- Services contain business logic
- Routes handle HTTP requests
- Error handling with try-catch blocks
- Type safety with TypeScript

## Next Steps

1. Implement authentication middleware
2. Add team auto-balancing algorithm
3. Implement player signup/cancellation
4. Add game result tracking
5. Implement notifications
6. Add validation middleware
7. Write comprehensive tests
8. Deploy to production

## Environment Variables

Required `.env` file variables:

```
PORT=5000
NODE_ENV=development

FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY_ID=your_key_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_email
FIREBASE_CLIENT_ID=your_client_id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=your_cert_url
FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
```

## Troubleshooting

### Firebase Connection Error

```
Error: Failed to initialize Firebase Admin SDK
```

Solution: Check your `.env` file Firebase credentials

### Port Already in Use

```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Module Not Found

```bash
npm install
rm -rf node_modules dist
npm install
```

## Testing

```bash
npm run test
```

## Linting

```bash
npm run lint
```

## Resources

- [Express Documentation](https://expressjs.com/)
- [Firebase Realtime Database](https://firebase.google.com/docs/database)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## License

MIT
