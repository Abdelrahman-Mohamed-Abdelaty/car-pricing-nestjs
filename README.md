# Used Car Pricing API

A NestJS-based backend API for estimating and reporting used car prices with user authentication and admin approval features.

## Features

- User authentication (signup/signin) with email and password
- Car value estimation based on make, model, year, mileage, and location
- User-submitted sales reports
- Admin approval system for reported sales
- Built with NestJS, TypeORM, and TypeScript

## API Endpoints

### Authentication

- `POST /auth/signup`  
  **Body**: `{ email, password }`  
  Create a new user account and sign in

- `POST /auth/signin`  
  **Body**: `{ email, password }`  
  Sign in to an existing account

### Reports

- `GET /reports`  
  **Query Parameters**: `make, model, year, mileage, longitude, latitude`  
  Get an estimated value for a car

- `POST /reports`  
  **Body**: `{ make, model, year, mileage, longitude, latitude, price }`  
  Submit a report of what a vehicle sold for

- `PATCH /reports/:id`  
  **Body**: `{ approved }`  
  Approve or reject a submitted report (admin only)

## Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your environment files:
  - Create `.development.env` for development
  - Create `.test.env` for testing
4. Start the development server: `npm run start:dev`

## Environment Configuration

### Development (`.env.development`)
```env
DB_NAME='db.sqlite'
COOKIE_KEY=your_secret
```

### Testing (`.env.test`)
```env
DB_NAME='db.sqlite'
COOKIE_KEY=your_secret
```

## Testing

Run unit tests:  
`npm run test`

Run e2e tests:  
`npm run test:e2e`

## Technologies Used

- NestJS
- TypeORM
- TypeScript
- SQLite (development/testing)
