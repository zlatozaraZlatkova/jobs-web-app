# Dev Job full-stack MERN application

# 1. Project Overview

## Brief description

The application is job board platform with features for both employees and employers, including authentication, job postings, user profiles, and GitHub integration that fetches public GitHub profile information. 

## Main Features/Functionalities

### User Management

- User registration and authentication (Employee/Employer roles)
- Profile creation and management (Employee/Employer)
- GitHub profile integration for developers
- Avatar/profile picture support using Gravatar (Employee/Employer)

### Employees Features

- Create, Read, Update, and Delete professional profiles
- Browse job listings
- GitHub portfolio integration
  
### Employer Features

-  Create, Read, Update, and Delete company profile
-  Create, Read, Update, and Delete job listings
-  Browse employee profiles

### Core Platform Features

- Secure authentication using JWT
- Role-based access control
- RESTful API architecture

## Technical Stack (MERN)

- MongoDB: NoSQL database for flexible data storage
- Express.js: Backend web application framework
- React: Frontend user interface library
- Node.js: Runtime environment for server-side code

# 2. Project Architecture

This Node.js backend application follows a modular architecture with clear separation of concerns:

- config/ - Contains configuration files for database and routes
- controllers/ - Handles HTTP requests and response logic
- middlewares/ - Contains middleware functions for authentication, session 
- management, and request preprocessing
- models/ - Defines data models and schema
- services/ - Contains business logic and external service integrations
- util/ - Utility functions and helpers

### Directory Structure

```
Devjobs web app/
└── Rest-api/
├── server/
│   ├── config/
│   │   ├── database.js
│   │   └── routes.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── defaultController.js
│   │   ├── employeeProfileController.js
│   │   ├── employerProfileController.js
│   │   ├── jobsController.js
│   │   ├── postsController.js
│   │   └── usersController.js
│   │
│   ├── middlewares/
│   │   ├── guards.js
│   │   ├── preload.js
│   │   └── session.js
│   │
│   ├── models/
│   │   ├── Company.js
│   │   ├── EmployeeProfile.js
│   │   ├── EmployerProfile.js
│   │   ├── Job.js
│   │   ├── Post.js
│   │   └── User.js
│   │
│   ├── services/
│   │   ├── authService.js
│   │   ├── employeeProfileService.js
│   │   ├── employerProfileService.js
│   │   ├── githubService.js
│   │   ├── jobsService.js
│   │   └── postService.js
│   │
│   └── util/
│       └── errorParser.js
│
├── .gitignore
├── package-lock.json
├── package.json
└── server.js

```
# 3. Environment Setup

## Prerequisites

- Node.js (v18 or higher)
- MongoDB installed and running locally, or a MongoDB Atlas account

## Installation Steps

1. Clone the repository 
   `git clone <repository-url>`
   `cd devjobs-web-app`

2. Install dependencies   
   `npm install`

3. Create Environment Variables
   
Create a .env file in the root directory and add the following variables:   
**Server Configuration**
PORT=5001
NODE_ENV=development

**MongoDB Connection**
MONGODB_URI=mongodb://localhost:27017/devjobs
**or**
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/devjobs

**JWT Configuration**
JWT_SECRET=your_jwt_secret_key

**Optional: GitHub Integration**
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

## Available Scripts

Start the server in production mode:
   `npm start`

**or**

Start the server in development mode with nodemon:
   `npm run server`   

## Dependencies Overview

### Main Dependencies

`express`: Web framework for Node.js
`mongoose`: MongoDB object modeling tool
`jsonwebtoken`: JWT implementation for authentication
`bcryptjs`: Password hashing
`dotenv`: Environment variables management
`express-validator`: Input validation middleware
`axios`: HTTP client for API requests
`gravatar`: Profile picture integration
`cookie-parser`: Cookie parsing middleware

### Development Dependencies

`nodemon`: Development server with auto-reload

## Next Steps

1. Ensure MongoDB is running
2. Configure your `.env` file with appropriate values
3. Start the development server with `npm run server`
4. The API will be available at `http://localhost:5001` (or your configured PORT)

