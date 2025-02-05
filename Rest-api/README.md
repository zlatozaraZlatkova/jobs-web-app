# Dev Job full-stack MERN application

The application is job board platform with features for both employees and employers, including authentication, job postings, user profiles, and GitHub integration that fetches public GitHub profile information. 

This Node.js backend application follows a modular architecture with clear separation of concerns:

1. config/ - Contains configuration files for database and routes
2. controllers/ - Handles HTTP requests and response logic
3. middlewares/ - Contains middleware functions for authentication, session 
4. management, and request preprocessing
5. models/ - Defines data models and schema
6. services/ - Contains business logic and external service integrations
7. util/ - Utility functions and helpers

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