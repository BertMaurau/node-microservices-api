# node-microservices-api
NodeJS RESTful API w/ Microservices linked with a single MySQL database.

## Install

### Database

Import the "db.sql" file into the database of your liking and change the "config.js" file content in every "/service-%/config" directory.

### Dependencies

run "npm install" within each "/service-%/" directory.  
run "npm install" in the main "/" directory.

### Start

run "npm start" in the main "/" directory.

This will start both the services on their own port number (can be changed in each config file).


Example screen of every service running and registering a new Sale

![Screen](https://github.com/BertMaurau/node-microservices-api/blob/master/console.png)


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

   GET http://localhost:3002/products       (Params: name, season, brand, color)   
   GET http://localhost:3002/products/{id}  
   GET http://localhost:3002/products/{id}/sizes  
   GET http://localhost:3002/products/{id}/sizes/{id}  
   GET http://localhost:3002/products/barcode/{barcode}    

   POST http://localhost:3002/products  

   ```json
   {
      "name": "Pencil",
      "season": "Accessoires",
      "brand": "Bic",
      "color": "Yellow",
      "price": 5
   }
   ```

   POST http://localhost:3002/products/barcode/{barcode}/lower_stock

   ```json
   {
      "quantity": 1
   }
   ```

   GET http://localhost:3003/tickets/{id}

   POST http://localhost:3003/tickets

   ```json
   {
      "sale": {
         "id": 1,
         "date": "2017-11-14 11:40:03",
         "customer": {
            "id": 6,
            "name": "Post User",
            "email": "post.user@outlook.com"
         },
         "products": [{
            "id":5,
            "name": "Pencil",
            "season": "Accessoires",
            "brand": "Bic",
            "color": "Yellow",
            "price": 5
         },{
            "id":1,
            "name": "Levi Jeans",
            "season": "Winter 2018",
            "brand": "Levi",
            "color": "Blue",
            "price": 20
         }]
      }
   }
   ```

   POST http://localhost:3004/sales

   ```json
   {
      "total" : 150,
      "customer_id":1,
      "barcodes":[{
            "barcode":"132482", 
            "quantity":2
         },{
            "barcode":"123459", 
            "quantity":1
         }]
   }
   ```

   This wil:

    - Update the Customer Loyalty Discount (Customer Service)
    - Lower the Stock Values of the given Barcodes (Products Service)
    - Register a new Sale (Sales Service)
    - Create a new Ticket from registered Sale (Tickets Service)
