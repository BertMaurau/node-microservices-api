# node-microservices-api
NodeJS RESTful API w/ Microservices linked with a single MySQL database.

Currently only the customer-service

## Install

### Database

Import the "dump.sql" file into the database of your liking and change the "config.js" file content in every "/service-%/config" directory.

### Dependencies

run "npm install" within each "/service-%/" directory.  
run "npm install" in the main "/" directory.

### Start

run "npm start" in the main "/" directory.

This will start both the services on their own port number (can be changed in each config file).

## Requests

   GET http://localhost:3001/customers       (Params: name, email)   
   GET http://localhost:3001/customers/{id}  

   POST http://localhost:3001/customers  

   ```json
   {
      "name": "Post User",
      "email": "post.user@outlook.com"
   }
   ```