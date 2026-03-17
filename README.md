NailSpot Dublin

Live Application (AWS EC2 Deployment)
http://54.87.68.184:3000 

GitHub Repository
https://github.com/lovelygregorio/nailspot.git


****************************

NailSpot Dublin is a full-stack web application that helps users discover nail salons and services around Dublin.
Users can create accounts, browse salons, and view the nail services offered by different salons.

This project was developed for the SETU Full Stack Web Development module. 
Some structural elements and testing setup were adapted from the Playtime 0.9 project used in lectures,
 but the application idea, models, APIs, and dataset were redesigned for a nail salon discovery platform.

*****************
MAIN FEATURES
*****************

• User registration and authentication using JWT
• Create and view nail salons
• Add and manage services offered by salons
• REST API for salons, services, and users
• API and model testing using Mocha and Chai
• MongoDB database integration

*****************
TECHNOLOGIES USED

Backend
Node.js
Hapi.js

Database
MongoDB
Mongoose

Authentication
JWT (JSON Web Token)
hapi-auth-jwt2

Testing
Mocha
Chai
Axios

Validation and Utilities
Joi
dotenv
uuid

*********************************************
****INSTALLATION**

Clone the repository
git clone https://github.com/lovelygregorio/nailspot.git
Navigate to the project folder
cd nailspot
Install dependencies
npm install

***RUNNING THE APPLICATION***

Start the server
npm start
The server will run on:
http://localhost:3000

RUNNING TESTS

To run the automated tests:
npm test
The test suite includes:

• Authentication API tests
• Salon API tests
• Service API tests
• User API tests
• Model tests for Salon, Service, and User

AWS EC2 Deployment

The NailSpot Dublin application is deployed on Amazon Web Services (AWS) EC2, allowing the application to run on a cloud server and be accessed online.

An AWS Elastic IP address was allocated and associated with the EC2 instance to ensure the public IP address remains permanent and does not change after instance restarts.

