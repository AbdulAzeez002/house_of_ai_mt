# User Management and Todo Application

This project is a User Management System built with Node.js, Express, and TypeScript. It includes authentication and authorization features using JWT, and encrypts passwords using bcrypt. Swagger UI is used for API documentation.

## Table of Contents

- Features
- Getting Started
- Scripts

## Features

- User authentication and authorization
- Password encryption using bcrypt
- JWT-based authentication
- CORS support
- Environment variable management with dotenv
- API documentation with Swagger UI
- Dockerization

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine. You can download them from [here](https://nodejs.org/).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AbdulAzeez002/house_of_ai_mt.git
   cd house_of_ai_mt

   
2. Install the dependencies:

   ```bash
   npm install

3. Create a .env file in the root directory and add your environment variables. Example:

   ```bash
   PORT=3000
   JWT_SECRET=your_jwt_secret
   MONGODB_URL=your_mongodb_uri

4. Running in development mode:

   ```bash
   npm run dev

6. Running in Production

   ```bash
   npm run build
   npm run start
   
7. Testing:

   ```bash
   npm run test


## Scripts

- npm run dev: Run the project in development mode using nodemon
- npm run build: Compile TypeScript files
- npm start: Start the compiled project
- npm test: Run tests using Jest




