# TechDegree-Project-10
 Full Stack Library Application with React and a REST API

 --Description
This project is a library application that allows users to view a list of courses. Users are able to create an account with personal login credentials, then users may login, create courses, and update and delete their own courses. 

Project is a React Front-End with a backend API built with SQLite, Sequelize, and Express.


--Skills and Process
Skills: React, React-Router-Dom, Context API, JS-Cookie, Basic-Auth

-The full-stack application was built with the following process:

    1. Project was initialized with create-react-app. This project was built from scratch utilizing React's built in Context API, React Router DOM, and various other packages.
    2. Project consists of the following key files:
        -- App.js: contains all routes and contextualized components.
        -- Context.js: A higher order component that is called from within App.js to wrap all components requiring Context
        -- Utility.js: A helper file initialized within Context.js that contains a parent api() function, and all subsequent api requests made from within the application to the backend API.
    3. Components are consolidated into a /courses and /users directory corresponding to Course and User related routes, respectively. Otherwise, all other routes called from within App.js are contained within the parent /components directory.
    4. React application contains user friendly error messages. Validation errors provided from the API to the client are displayed if invalid or required information is missing from fields on the UserSignUp, UserSignIn, CreateCourse, and UpdateCourse components. If an individual course, or if an invalid url are requested, users are directed to a "Not Found" page. If users require authentication for a given page, the application will render a "Forbidden" page. All other errors will render a generic "Error" page.
    5. Users may create an account. They may then sign out, and sign in via buttons within the header. The application will persist the logged in state via a cookie stored on the client. To improve the user experience, users who navigate to a protected page will be redirected to signin, then returned to the page upon successfully logging in.
    
--Project Attempt: Exceeds Expectations

-Display user friendly messages

-Persist User Credentials

-Redirecting the user after successfully signing in.

## Overview of the Provided Project Files

The following directories exist in this project: 

/api --> Mostly copied from FSJS TreeHouse TechDegree Project 9, but modified to return information and error messages requried within the React Front-End
/client --> Contains all front-end files for React Application to load on the browser
/starter-files --> Contains project markup files and mockup images.

## Getting Started

First, navigate to the /client directory and install the directory's dependencies using `npm install`.
After installing dependencies, open /api and run `npm run seed`. to seed a new development database.
Start the api with `npm start`.

Navigate to the /api directory and install the directory's dependencies using `npm install`.
Start the client with `npm start`.
Navigate to [localhost:3000] in your browser. The application will automatically redirect to [localhost:3000/courses].

To test the Express server, browse to the URL [http://localhost:5000/].
