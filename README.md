# Anonymizer: Authentication Web Service

Anonymizer is a secure and efficient authentication web service developed using **Express.js** on **Node.js 22.12.0** and **PostgreSQL** as the database. The service provides robust authentication features, including email PIN verification and JWT token authentication, making it ideal for modern applications.

## Features

### 1. **Sign-Up**
- Allows new users to register with their email and password.
- Ensures secure storage of user credentials using industry-standard hashing techniques.

### 2. **Sign-In**
- Enables registered users to log in by providing their email and password.
- Returns a one-time PIN for additional security if the user requests it.

### 3. **Email PIN Authentication**
- Sends a 6-digit one-time PIN to the user’s email for authentication.
- Validates the PIN with a time constraint to ensure security.
- Resend a new PIN on request if the previous one expires.

### 4. **JWT Authentication Token**
- Issues a JSON Web Token (JWT) upon successful authentication.
- Provides secure access to protected routes using the token.
- Includes token validation to handle expiration and unauthorized access.

## Technology Stack

- **Backend Framework**: Express.js
- **Runtime**: Node.js 22.12.0
- **Database**: PostgreSQL
- **Deployment**: Docker

## Prerequisites

Ensure you have the following installed on your machine:

1. **Node.js**: Version 22.12.0
2. **Docker**: Version 20.x or higher
3. **Docker Compose**: Version 2.x or higher

## Installation and Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/anonymizer.git
cd anonymizer
```

### Step 2: Use Default or Custom Configuration
The project includes a `.env` file pre-configured for Docker deployment with the following keys:

```env
PORT=5000
DB_HOST=postgres
DB_PORT=5432
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=anonymizer
EMAIL_USER=sandratra2468@gmail.com
EMAIL_PASS=nmjt pxsf yrwg zlbu
JWT_SECRET=your_jwt_secret
PIN_EXPIRY=15m
```

If you prefer to use your own resources, update the `.env` file with custom values:
- Change `DB_HOST` to point to your database.
- Adjust the `PORT` and other settings as needed.

### Step 3: Run the Application with Docker Compose

Use Docker Compose to build and start the application along with its PostgreSQL database instance.

```bash
docker-compose up --build
```

This will:
- Start the web service on `http://localhost:5000`.
- Set up a PostgreSQL database accessible via the service.

## API Endpoints

### **Authentication Routes**

#### 1. **Sign-Up**
- **Endpoint**: `POST /api/auth/signup`
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "email": "email@example.com",
    "password": "your_password"
  }
  ```

#### 2. **Sign-In**
- **Endpoint**: `POST /api/auth/signin`
- **Description**: Authenticate an existing user.
- **Request Body**:
  ```json
  {
    "email": "email@example.com",
    "pin": "111111" // Optional, provided after PIN generation
  }
  ```

#### 3. **Validate Token**
- **Endpoint**: `GET /api/auth/validate-token`
- **Description**: Validate a JWT token.
- **Headers**:
  ```http
  Authorization: Bearer <your_jwt_token>
  ```

## Development

### Install Dependencies
If you're running the service locally without Docker:

```bash
npm install
```

### Run the Server
```bash
npm start
```

## Deployment
To deploy the application to a production environment:
1. Set up the `.env` file with production values.
2. Use Docker Compose to build and run the service.
3. Ensure proper security configurations for the database and JWT secret.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add feature-name'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

Start securing your applications with Anonymizer today!