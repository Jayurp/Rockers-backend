# Backend API

A small Node.js + Express backend with an MVC-style structure for user authentication and profile updates.

This project uses:

- Express for the HTTP server
- Mongoose for MongoDB access
- Joi for request validation
- bcrypt for password hashing
- JSON Web Tokens (JWT) for authentication
- express-rate-limit for basic rate limiting
- CORS configured for local frontend development

## Features

- Health check endpoint
- User registration
- User login with JWT access token
- Refresh token stored on the user record
- User logout
- Auth-protected user update endpoint
- Request body validation with Joi

## Project Structure

```text
backend/
|- src/
|  |- app.js
|  |- server.js
|  |- index.js
|  |- controllers/
|  |- services/
|  |- routes/
|  |- models/
|  |- middleware/
|  |- inputValidations/
|- package.json
|- package-lock.json
|- .gitignore
```

## Requirements

Before running the project, make sure you have:

- Node.js 18 or newer
- npm
- Internet access to reach MongoDB Atlas

## Installation

Clone the repository and install dependencies:

```bash
git clone <your-repository-url>
cd backend
npm install
```

## Run The Project

Start in development mode:

```bash
npm run dev
```

Start in normal mode:

```bash
npm start
```

By default, the server runs on:

```text
http://localhost:3000
```

You can override the port with:

```bash
PORT=4000 npm start
```

On Windows PowerShell:

```powershell
$env:PORT=4000
npm start
```

## Current Configuration Notes

This repository currently uses hardcoded configuration in source files.

- MongoDB connection string is defined in `src/app.js`
- JWT secret is defined in `src/services/auth.service.js` and `src/middleware/verifyToken.js`
- Allowed CORS origins are limited to `http://localhost:3000` and `http://localhost:5173`

That means a fresh clone can run without creating a `.env` file, but changing database, secret, or frontend origin currently requires code changes.

## API Base URL

All routes are mounted under:

```text
/api
```

Base URL example:

```text
http://localhost:3000/api
```

## API Endpoints

### 1. Health Check

`GET /api/health`

Response:

```json
{
  "success": true,
  "message": "Backend is running"
}
```

### 2. Register User

`POST /api/auth/register`

Request body:

```json
{
  "userName": "john_doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

Validation rules:

- `userName`: required, 3 to 30 characters
- `email`: required, valid email
- `password`: required, minimum 6 characters

Successful response:

```json
{
  "message": "User registered successfully",
  "success": true
}
```

### 3. Login User

`POST /api/auth/login`

Request body:

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

Successful response:

```json
{
  "accessToken": "<jwt-token>",
  "message": "Login successful",
  "user": {
    "_id": "...",
    "userName": "john_doe",
    "email": "john@example.com",
    "password": "<hashed-password>",
    "refreshToken": "...",
    "createdAt": "...",
    "updatedAt": "...",
    "__v": 0
  },
  "success": true
}
```

Notes:

- The response includes an `accessToken` for authenticated requests
- A `refreshToken` cookie is also set on login
- The returned `user` object currently includes stored fields from MongoDB

### 4. Logout User

`POST /api/auth/logout`

Headers:

```text
Authorization: Bearer <accessToken>
```

Request body:

```json
{
  "id": "<user-id>"
}
```

Successful response:

```json
{
  "message": "Logout successful",
  "success": true
}
```

### 5. Update User

`PUT /api/user/update-user`

Headers:

```text
Authorization: Bearer <accessToken>
```

Request body:

```json
{
  "id": "<user-id>",
  "userName": "updated_name",
  "email": "updated@example.com",
  "password": "newsecret123"
}
```

All fields except `id` are optional.

Successful response:

```json
{
  "message": "User updated successfully",
  "success": true
}
```

## Authentication Flow

1. Register a user
2. Login to receive an access token
3. Send the access token in the `Authorization` header for protected routes
4. Logout using the authenticated route and user id

Header format:

```text
Authorization: Bearer <token>
```

## Example cURL Requests

Health check:

```bash
curl http://localhost:3000/api/health
```

Register:

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"userName":"john_doe","email":"john@example.com","password":"secret123"}'
```

Login:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"secret123"}'
```

Update user:

```bash
curl -X PUT http://localhost:3000/api/user/update-user \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"id":"<user-id>","userName":"new_name"}'
```

## Middleware In Use

- `cors` with a local allowlist
- `express-rate-limit` with a limit of 100 requests per 15 minutes per IP
- `express.json()` and `express.urlencoded()`
- Joi body validation middleware
- JWT verification middleware for protected routes

## Useful Scripts

```bash
npm start
npm run dev
```

## Known Limitations

These are useful to know if you are cloning the project for further development:

- No environment-variable based configuration yet
- JWT secret is hardcoded in more than one file
- MongoDB URI is hardcoded
- Login response currently returns the full user document, including hashed password and refresh token
- Logout requires both a valid bearer token and a user id in the request body
- CORS only allows `localhost:3000` and `localhost:5173`

## Tech Stack

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Joi
- bcrypt
- jsonwebtoken

## License

This project currently uses the `ISC` license as declared in `package.json`.
