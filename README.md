# MERN Job Board Platform


<details open>

<summary><p>Note: Click to expand / collapse Documentation section</p></summary>

</details>


<details open>
<summary><h3>1. Project Overview</h3></summary>

  <details open>
  <summary><h4>1.1. Brief Description</h4></summary>

This application is a modern job board platform designed to seamlessly connect employers with job seekers. Built with scalability and ease of use in mind, it streamlines the hiring process while providing valuable insights into candidates' technical expertise.

**Key Features:**

- **User Authentication** - Secure sign-up and login for both employers and job seekers.
- **Job Postings** - Employers can create, manage, and update job listings.
- **User Profiles** - Job seekers can build and maintain professional profiles.
- **Job Bookmarking** – Users can mark or remove job listings they are interested in, making job searching more organized.
- **Search** - Easily find job listings or candidates using various search criteria.
- **GitHub Integration** - Automatically fetches and displays public GitHub profile information to highlight candidates' coding contributions and activity.

Developed as part of a university final project, this platform enhances the recruitment experience by offering a user-friendly interface and powerful tools that make job searching and hiring more efficient.

Demo site is here: [Link](https://shrouded-ocean-76495-526ebbd06de6.herokuapp.com/)
  </details>

<details open>
<summary><h4>1.2. Main Features/Functionalities</h4></summary>

<details>
<summary><h5>1.2.1. User Management</h5></summary>

- User registration and authentication (Employee/Employer roles)
- Profile creation and management (Employee/Employer)
- GitHub profile integration for developers (Employee role)
- Avatar/profile picture support using Gravatar (Employee/Employer)
</details>

<details>
<summary><h5>1.2.2. Employees Features</h5></summary>

- Create, Read, Update, and Delete professional profiles
- Browse job listings
- Pin and Unpin jobs
- Search and filter jobs by various criteria
- GitHub portfolio integration
</details>

<details>
<summary><h5>1.2.3. Employer Features<h5></summary>

- Create, Read, Update company profile
- Create, Read, Update, and Delete job listings
- Browse employee profiles
</details>

<details open>
<summary><h5>1.2.4. Core Platform Features</h5></summary>

- Secure authentication using JWT
  -  Authentication 
     - Secure session-based authentication using cookie-parser middleware 
   - Authorization
     - Role-based access control (RBAC) for Employee and Employer users   
- Rate Limiting with maximum of 100 requests per 15 minuets per IP
- Role-based access control
  

  | Role | Description |
  |------|-------------|
  | Common Features (Employeе) | • Pin and unpin job postings |
  | Employee | • Access to view and apply to job postings<br> • CRUD operations on their profile and view company information<br> • Cannot post jobs|
  | Employer | • Full access to CRUD operations for job postings<br> • View applicant profiles<br> • CRUD operations on their profile<br> • Cannot apply to jobs or create employee profiles |

- RESTful API architecture
  
  | Component | Description |
  |-----------|-------------|
  | API Base URL | `http://localhost:5001/api/` |
  | Authentication | Cookie-based authentication using cookie-parser middleware |
  | Request Format | JSON |
  | Response Format | JSON |
  | HTTP Methods | • GET: Retrieve resources<br>• POST: Create new resources<br>• PUT: Update existing resources<br>• DELETE: Remove resources |
  | Status Codes | • 200: Success<br>• 201: Created<br>• 400: Bad Request<br>• 401: Unauthorized<br>• 403: Forbidden<br>• 404: Not Found<br>• 409: Duplicate field<br>• 500: Internal Server Error |
  | Rate Limiting | • 100 requests per 15 minutes per IP<br>• Standard rate limit headers enabled<br>• Response with message: 'Too many requests from this IP, please try again later' |
  | Documentation | API endpoints documented and tested in Postman |
  

- Pagination:
  - **Request Parameters:**
    - `page` (optional): Page number, defaults to 1
    - `limit` (optional): Items per page, defaults to 3 
  
- The Search provides flexible search capabilities across the platform with support for single and multiple field searches, along with pagination for result sets.  
    - **Common Search Fields**
    
      - **Job Search Parameters** 
        | Parameter | Type   | Description                | Example                    |
        | --------- | ------ | -------------------------- | -------------------------- |
        | title     | string | Job title or position name | `?title=Software Engineer` |
        | type      | string | Employment type            | `?type=Full-time`          |
        | location  | string | Job location               | `?location=New York`       |


</details>
</details>

<details open>
<summary><h4>1.3. Technical Stack (MERN)</h4></summary>

- MongoDB: NoSQL database for flexible data storage
- Express.js: Backend web application framework
- React: Frontend user interface library
- Node.js: Runtime environment for server-side code
</details>
</details>

<details open>
<summary><h3>2. Project Architecture</h3></summary>

<details open>
<summary><h4>2.1. Structure Overview</h4></summary>

2.1.1. This React frontend application follows a modular structure for maintainability and scalability:
- **components/** – Reusable UI components such as forms, and navigation bars.
- **pages/** – Contains different views/pages of the application (e.g., Home, Dashboard, Profile).
- **hooks/** – Custom React hooks for state management and API interactions
- **services/** – Handles API requests and external service integrations.
- **contexts/** – Manages global state using React Context API.
- **guards/** – Implements route protection and access control mechanisms to restrict unauthorized access to specific routes based on user authentication status and permissions.
- **utils/** - Utility functions and helpers.

2.1.2. This Node.js backend application follows a modular architecture with clear separation of concerns:

- **config**/ - Contains configuration files for database and routes.
- **controllers/** - Handles HTTP requests and response logic.
- **middlewares/** - Contains middleware functions for authentication, session management, and request preprocessing.
- **models/** - Defines data models and schema.
- **services/** - Contains business logic and external service integrations.
- **utils/** - Utility functions and helpers.
</details>

<details>
<summary><h4>2.2. Directory Structure</h4></summary>
  
```
Devjobs web app/
├── README
├── assets/
│    images/
│       └── relationship-models-dev-jobs.png
├── client/ 
│   ├── public/
│   ├── src/
│   │    ├── components/
│   │    │   ├── mainLayout/
│   │    │   │    └── MainLayout.jsx 
│   │    │   ├── pages/
│   │    │   │   ├── CreateProfilePage.jsx 
│   │    │   │   ├── CVPage.jsx 
│   │    │   │   ├── EmployeesPage.jsx 
│   │    │   │   ├── HomePage.jsx 
│   │    │   │   ├── JobDetailsPage.jsx 
│   │    │   │   ├── JobsPage.jsx 
│   │    │   │   ├── LoginPage.jsx 
│   │    │   │   ├── RegisterPage.jsx 
│   │    │   │   └── NotFoundPage.jsx 
│   │    │   ├── auth/
│   │    │   │    ├── Login.jsx
│   │    │   │    └── Register.jsx
│   │    │   ├── categoriesJobSection/
│   │    │   │   ├── CategoriesJobSection.jsx
│   │    │   │   ├── CategoriesJobSection.module.css
│   │    │   │   └── categoryCard/
│   │    │   │       ├── CategoryCard.jsx
│   │    │   │       └── JCategoryCard.module.css
│   │    │   ├── createJob/
│   │    │   │   ├── CreateJob.jsx
│   │    │   │   └── CreateJob.module.css
│   │    │   ├── editJob/
│   │    │   │   └── editJob.jsx
│   │    │   ├── jobDetails/
│   │    │   │   └── jobDetails.jsx
│   │    │   ├── jobsListSection/
│   │    │   │   ├── JobsListSection.jsx
│   │    │   │   ├── JobListSection.module.css
│   │    │   │   └── jobCard/
│   │    │   │       ├── JobCard.jsx
│   │    │   │       └── JobCard.module.css
│   │    │   ├── dashboardEmployer/
│   │    │   │   ├── DashboardEmployer.jsx
│   │    │   │   └── DashboardEmployer.module.css
│   │    │   ├── employer/
│   │    │   │   ├── CreateCompanyProfile.jsx
│   │    │   │   └── EditCompanyProfile.module.css
│   │    │   ├── dashboardEmployee/
│   │    │   │   └── DashboardEmploee.jsx
│   │    │   ├── employee/
│   │    │   ├── addEducation/
│   │    │   │    └── AddEducation.jsx
│   │    │   ├── addExperience/
│   │    │   │    └── AddExperience.jsx
│   │    │   ├── createProfile/
│   │    │   │    └── CreateProfile.jsx
│   │    │   ├── detailsProfile/
│   │    │   │   ├── BasicProfileCard.jsx
│   │    │   │   ├── EducationCard.jsx
│   │    │   │   ├── ExperienceCard.jsx
│   │    │   │   ├── GitHubRepo.jsx
│   │    │   │   └── ProfileCard.module.css
│   │    │   ├── editProfile/
│   │    │   │   ├── BasicProfileEdit.jsx
│   │    │   │   └── EditProfile.module.css
│   │    │   ├── footer/
│   │    │   │   ├── Footer.jsx
│   │    │   │   └── Footer.module.css
│   │    │   ├── navigation/
│   │    │   │   ├── Navigation.jsx
│   │    │   │   └── Navigation.module.css
│   │    │   ├── pagination/
│   │    │   │    ├── Pagination.jsx 
│   │    │   │    └── Pagintion.module.css
│   │    │   ├── scrollToTop/
│   │    │   │    └── ScrollToTop.jsx
│   │    │   ├── searchBar/
│   │    │   │   ├── SearchBar.jsx
│   │    │   │   └── SearchBar.module.css
│   │    │   └── trustedCompaniesSection/
│   │    │       ├── TrustedCompaniesSection.jsx
│   │    │       ├── TrustedCompaniesSection.module.css
│   │    │       └── companyLogo/
│   │    │           └── CompanyLogo.jsx
│   │    ├── contexts/
│   │    │   │   ├── AuthContext.js
│   │    │   │   ├── AuthContextProvider.jsx
│   │    │   │   ├── SearchContext.js
│   │    │   └── └── SearchContextProvider.jsx
│   │    │   
│   │    ├── guards/
│   │    │   │   ├── ProtectedRoute.jsx
│   │    │   │   ├── PublicRoute.jsx
│   │    │   │   ├── RequireCompanyOwnership.jsx
│   │    │   │   ├── RequireEmployerRole.jsx
│   │    │   │   ├── RequireEmployeeRole.jsx
│   │    │   └── └── RequireEmployerOwnership.jsx
│   │    │  
│   │    ├── utils/
│   │    │   ├── createPageURLParams.js
│   │    │   ├── formatDate.js
│   │    │   └── stringUtils.js
│   │    │   
│   │    └── styles/
│   │        ├── base/
│   │        │   ├── globals.css
│   │        │   ├── typography.css
│   │        │   └── utilities.css
│   │        └── index.css
│   ├── App.jsx
│   ├── main.jsx
│   ├── eslint.config.js
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
|
├── Rest-api/ 
├── server/ 
│   ├── config/
│   │   ├── cors.js
│   │   ├── database.js
│   │   └── routes.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── defaultController.js
│   │   ├── employeeProfileController.js
│   │   ├── employerProfileController.js
│   │   ├── jobsController.js
│   │   ├── postsController.js
│   │   └── usersController.js
│   ├── middlewares/
│   │   ├── errorHandler.js
│   │   ├── guards.js
│   │   ├── paginationMiddleware.js
│   │   ├── preload.js
│   │   ├── session.js
│   │   └── validateBodyRequest.js
│   ├── models/
│   │   ├── Company.js
│   │   ├── EmployeeProfile.js
│   │   ├── EmployerProfile.js
│   │   ├── Job.js
│   │   ├── Post.js
│   │   └── User.js
│   ├── services/
│   │   ├── authService.js
│   │   ├── employeeProfileService.js
│   │   ├── employerProfileService.js
│   │   ├── githubService.js
│   │   ├── jobsService.js
│   │   └── postService.js
│   ├── util/
│   │   ├── errorParser.js
│   │   └── formatPaginatedResponse.js
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
├── package.json
└── package-lock.json
```
</details>

</details>

<details>
<summary><h3>3. Database Schema</h3></summary>

<details>
<summary><h4>3.1. Models Overview</h4></summary>

Application uses MongoDB with Mongoose and consists of the following main models:

- **User Model**
  Handles user authentication and basic user information

- **Company Model**
  Stores company information for employers

- **Job Model**
  Represents job listings

- **Profile Models**
  - **EmployeeProfile**
    Stores information for employee
  - **EmployerProfile**
    Stores information for employer

- **Post Model**
  Represents post listings

</details>
<details open>
<summary><h4>3.2. Model Relationships</h4></summary>

![Relationship Models](./assets/images/relationship-models-dev-job-app.png)

**Notation**:

- **1**: exactly one
- **0..1**: zero or one (optional)
- *: many (zero or more)

*Relationship Legend*:

   - User-EmployeeProfile (1 : 0..1): One User can have zero or one EmployeeProfile
   - User-EmployerProfile (1 : 0..1): One User can have zero or one EmployerProfile
   - User-Post (1 : *): One User can create many Posts
   - Company-Job (1 : *): One Company can have many Jobs
   - Company-EmployerProfile (1 : 1): One Company belongs to one EmployerProfile
   - Job-EmployeeProfile (* : *): Many Jobs can have many applicants
   - Post-User (* : *): Many Posts can be liked/commented by many Users
   - EmployerProfile-Job (1 : *): One EmployerProfile can post many Jobs
   - EmployeeProfile-Job (* : *): Many EmployeeProfiles can apply to many Jobs
</details>

</details>

<details open>
<summary><h3>4. API Documentation</h3></summary>

<details>
<summary><h4>4.1. Introduction</h4></summary>

The Dev-Job API is organized around REST. This API has predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes and authentication.
The Dev-Job API doesn’t support bulk updates. You can work on only one object per request.
</details>

<details>
<summary><h4>4.2. URL</h4></summary>

All endpoints are prefixed with "/api". Consequently, during the development phase, the endpoints will be accessible via the following URL: "http://localhost:5001/api".
</details>

<details>
<summary><h4>4.3. Methods</h4></summary>

`GET` | `POST` | `PUT` | `DELETE`
</details>

<details>
<summary><h4>4.4. URL query parameters</h4></summary>

Required: `id=[string]`
</details>

<details>
<summary><h4>4.5. Response</h4></summary>


**Code:** `200 OK`\
 Returns the requested data, at the specified page of the results.

**Code:** `204 No Content`\
 Returned if the data property was removed successfully.

**Code:** `400 Bad Request`\
 Returned if the request is invalid.

**Code:** `401 Unauthorized`\
 Returned if the user is not logged in.

**Code:** `403 No Content`\
 Returned if no credentials available.

**Code:** `404 No Found`\
 Returned if the data property does not exist.

**Code:** `409 Conflict`\
 Returned if the data conflicts with resource's current state.

**Code:** `500 Internal Server Error`\
 The server encountered an unexpected condition that prevented it from fulfilling the request.
</details>

<details open>
<summary><h4>4.6. API Postman documentation</h4></summary>

- Source: [LINK POSTMAN API](https://documenter.getpostman.com/view/28859516/2sB2cUBiYD)
</details>
</details>

<details open>
<summary><h3>5. Environment Setup</h3></summary>

<details>
<summary><h4>5.1. Prerequisites</h4></summary>

- Node.js (v18 or higher)
- MongoDB installed and running locally, or a MongoDB Atlas account
</details>

<details>
<summary><h4>5.2. Installation Steps</h4></summary>

1. Clone the repository
   - `git clone <repository-url>`
   - `cd devjobs-web-app`

2. Install dependencies
   - `npm install`

3. Create Environment Variables
   - Create a `.env` file in the root directory and add the following variables:

<details>
<summary><h5>5.2.1. Server Configuration</h5></summary>

- PORT=5001
- NODE_ENV=development
</details>

<details>
<summary><h5>5.2.2. MongoDB Connection</h5></summary>

- MONGODB_URI=mongodb://localhost:27017/devjobs

**or**

- MONGODB_URI=mongodb+srv://@cluster.mongodb.net/devjobs
</details>

<details>
<summary><h5>5.2.3. JWT Configuration</h5></summary>

- JWT_SECRET=your_jwt_secret_key
</details>

<details>
<summary><h5>5.2.4. Optional: GitHub Integration</h5></summary>

- GITHUB_CLIENT_ID=your_github_client_id
- GITHUB_CLIENT_SECRET=your_github_client_secret
</details>

</details>

<details>
<summary><h4>5.3. Available Scripts</h4></summary>

- Start the server in production mode:
`npm start`

**or**

- Start the server in development mode with nodemon:
`npm run server`
</details>

<details>
<summary><h4>5.4. Dependencies Overview</h4></summary>

<details>
<summary><h5>5.4.1. Main Dependencies</h5></summary>
  
  - **Client**
    - `react`: JavaScript library for creating user interfaces
    - `react-dom`: Serves as the entry point to the DOM and server renderers for React
    - `react-modal`: Library for creating accessible and customizable modal dialogs.
    - `react-router-dom`: Enables routing and navigation in React applications
   
  
  - **Server**
      - `express`: Web framework for Node.js
      - `mongoose`: MongoDB object modeling tool
      - `jsonwebtoken`: JWT implementation for authentication
      - `bcryptjs`: Password hashing
      - `dotenv`: Environment variables management
      - `express-validator`: Input validation middleware
      - `axios`: HTTP client for API requests
      - `gravatar`: Profile picture integration
      - `cookie-parser`: Cookie parsing middleware
      - `cors`: Connect/Express middleware
      - `express-rate-limit`: Limit repeated requests to public APIs
  
</details>

<details>
<summary><h5>5.4.2. Development Dependencies</h5></summary>

- Client 
  - `vite`: Frontend build tool

- Server
  - `nodemon`: Development server with auto-reload
  - `concurrently`: Run multiple commands concurrently
  
</details>
</details>

<details open>
<summary><h4>5.5. Build Setup</h4></summary>

1. Start MongoDB service (must be running before server start)
2. Configure your `.env` file with appropriate values
3. Install dependencies for both server and client:
   
   - Install server dependencies
     - `cd Rest-api`
     - `npm install`
  
   - Install client dependencies
      - `cd ../client`
      - `npm install`

4. Return to Rest-api folder to run both servers concurrently:
    - `cd ../Rest-api`
    - `npm run dev`
  
    This will start:
     - Backend API at `http://localhost:5001`
     - Frontend (Vite) server: `http://localhost:5173`

- **To run servers independently:**
  - For backend only: `npm run server`
  - For frontend only: `npm run dev`
  
- **Note about API Proxy:**
All API requests from the frontend are automatically proxied to the backend server through the Vite configuration. Here's how it works:

  - In your React components, you can make API calls using shorter paths:
     `const response = await fetch('/api/jobs');`

  - The Vite proxy automatically forwards these requests to your backend server:
     `http://localhost:5001/api/jobs`

</details>
</details>

<details open>
<summary><h3>6. Security Measures</h3></summary>

<details open>
<summary><h4>6.1. Authentication</h4></summary>

- JWT-based authentication with secure cookie session storage
- Session duration: 1 hour
- Protected routes using middleware guards:
- `hasUser`: Verifies authenticated user
- `isOwner`: Validates resource ownership
- `checkUserRole`: Role-based access control
- Protected auth routes for logged-in users

</details>

<details>
<summary><h4>6.2. Securing API</h4></summary>

- CORS configuration for secure client-server communication
- Express rate-limiting middleware to prevent DoS attacks. Limits requests per IP to prevent abuse of sensitive endpoints like password reset.
</details>
</details>

<details open>
<summary><h3>7. Error Handling</h3></summary>

<details open>
<summary><h4>7.1. Validation and Error Types</h4></summary>
 
 1. Client
   - Form validation error display and handling
   - API error response parsing and presentation
   - User-friendly error messages for production
   
 2. Server
  - Global Error Handling
  - Pre-request validation with express-validator middleware
  - Model-level Mongoose schema validation
  - Consistent error response format
  - Production-safe error messages for users
</details>
</details>

<details>
<summary><h3>8. References & Resources Used</h3></summary>

- Securing APIs: Express rate limit and slow down
  - Source: [Link](https://developer.mozilla.org/en-US/blog/securing-apis-express-rate-limit-and-slow-down/)
- Express cors middleware
  - Source: [Link](https://expressjs.com/en/resources/middleware/cors.html)
- How to Build Secure and Scalable Authentication System with Node.js and MongoDB
  - Source: [Link](https://sandydev.medium.com/how-to-build-secure-and-scalable-authentication-system-with-node-js-and-mongodb-c50bf51c06b0)
- Build a Login and Logout API using Express.js (Node.js)
   - Source: [Link](https://dev.to/m_josh/build-a-jwt-login-and-logout-system-using-expressjs-nodejs-hd2)
- Simplified Guide to Setting Up a Global Error Handler in Express.js
  - Source: [Link](https://medium.com/@mohsinansari.dev/simplified-guide-to-setting-up-a-global-error-handler-in-express-js-daf8dd640b69)
- Implementing Pagination in an Express.js Application
  - Source: [Link](https://medium.com/@atacanymc/implementing-pagination-in-an-express-js-application-551244b62d48)
- Software documentation guide
   - Source: [Link](https://www.writethedocs.org/guide/index.html)
- How To Build an ER Diagram with Mermaid Chart
   - Source: [Link](https://docs.mermaidchart.com/blog/posts/how-to-build-an-er-diagram-with-mermaid-chart)
- Setup Proxy in Vite React
  - Source: [Link](https://medium.com/@faazfajib7/setup-proxy-in-vite-react-2eb1454bff62)
</details>

