# Customer Service

Customer Service API

## Install

### Dependencies

   npm install

### Start

   npm start

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

   POST http://localhost:3001/customers/{id}/update_loyalty  

   ```json
   {
      "total_sales_price": 150
   }
   ```