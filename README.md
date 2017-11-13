# node-microservices-api
NodeJS RESTful API w/ Microservices linked with a single MySQL database.

Currently only the movies-service and the cinemas-service section.

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

 http://localhost:3001/movies  
 http://localhost:3001/movies/{id}  
 http://localhost:3001/movies/premieres  

 http://localhost:3002/cinemas  
 http://localhost:3002/cinemas/{id}  
 http://localhost:3002/cinemas/{cinemaId}/rooms  
 http://localhost:3002/cinemas/{cinemaId}/rooms/{id}  
 http://localhost:3002/cinemas/{cinemaId}/movies  
 http://localhost:3002/cinemas/{cinemaId}/movies/{id}  
