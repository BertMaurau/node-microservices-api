# node-microservices-api
NodeJS RESTful API w/ Microservices linked with a single MySQL database using http-proxy-middleware to take care of the required forwarding to every service.

## Install

### Database

Import the "db.sql" file into the database of your liking and change the "config.js" file content in every "/service-%/config" directory.

### Dependencies

run "npm install" within each "/service-%/" directory.  
run "npm install" in the main "/" directory.

### Start

run "npm start" in the main "/" directory.

This will start all the services on their own port number (can be changed in each config file) and also the main API "gateway" server (on port 3000).

```shell
PS C:\xampp\htdocs\node-microservices-api> npm start

> microservice-api@1.0.0 start C:\xampp\htdocs\node-microservices-api
> npm run dev

> microservice-api@1.0.0 dev C:\xampp\htdocs\node-microservices-api
> concurrently --kill-others "node api" "npm run service-customers" "npm run service-products" "npm run service-tickets" "npm run service-sales"

[0] [HPM] Proxy created: /customers  ->  https://localhost:3001
[0] [HPM] Subscribed to http-proxy events:  [ 'error', 'close' ]
[0] [HPM] Proxy created: /products  ->  https://localhost:3002
[0] [HPM] Subscribed to http-proxy events:  [ 'error', 'close' ]
[0] [HPM] Proxy created: /tickets  ->  https://localhost:3003
[0] [HPM] Subscribed to http-proxy events:  [ 'error', 'close' ]
[0] [HPM] Proxy created: /sales  ->  https://localhost:3004
[0] [HPM] Subscribed to http-proxy events:  [ 'error', 'close' ]
[0] API listening on 3000
[2]
[2] > microservice-api@1.0.0 service-products C:\xampp\htdocs\node-microservices-api
[2] > npm --prefix service-products/ start
[1] > microservice-api@1.0.0 service-customers C:\xampp\htdocs\node-microservices-api
[1] > npm --prefix service-customers/ start
[3] > microservice-api@1.0.0 service-tickets C:\xampp\htdocs\node-microservices-api
[3] > npm --prefix service-tickets/ start
[4] > microservice-api@1.0.0 service-sales C:\xampp\htdocs\node-microservices-api
[4] > npm --prefix service-sales/ start
[1] > service-customers@1.0.0 start C:\xampp\htdocs\node-microservices-api\service-customers
[1] > node index.js
[4] > service-sales@1.0.0 start C:\xampp\htdocs\node-microservices-api\service-sales
[4] > node index.js
[2] > service-products@1.0.0 start C:\xampp\htdocs\node-microservices-api\service-products
[2] > node index.js
[3] > service-notifications@1.0.0 start C:\xampp\htdocs\node-microservices-api\service-tickets
[3] > node index.js
[3]
[1] ----- Service - Customers -----
[1]  + Connecting to Customers repository...
[1]  + Repo Connected. Starting Server..
[1]  + Server started succesfully. Running on port: 3001.
[2] ----- Service - Products -----
[2]  + Connecting to Products repository...
[2]  + Repo Connected. Starting Server..
[2]  + Server started succesfully. Running on port: 3002.
[3] ----- Service - Tickets -----
[3]  + Connecting to Tickets repository...
[3]  + Repo Connected. Starting Server..
[3]  + Server started succesfully. Running on port: 3003.
[4] ----- Service - Sales -----
[4]  + Connecting to Sales repository...
[4]  + Repo Connected. Starting Server..
[4]  + Server started succesfully. Running on port: 3004.
```

Example screen of every service running and registering a new Sale

![Screen](https://github.com/BertMaurau/node-microservices-api/blob/master/console.png)

## Forwarding

```
   /customers     =>    https://localhost:3001  
   /products      =>    https://localhost:3002
   /tickets       =>    https://localhost:3003
   /sales         =>    https://localhost:3004
```

## Requests

   GET http://localhost:3000/customers       (Params: name, email)   
   GET http://localhost:3000/customers/{id}  

   POST http://localhost:3000/customers  

   ```json
   {
      "name": "Post User",
      "email": "post.user@outlook.com"
   }
   ```

   POST http://localhost:3000/customers/{id}/update_loyalty  

   ```json
   {
      "total_sales_price": 150
   }
   ```

   GET http://localhost:3000/products       (Params: name, season, brand, color)   
   GET http://localhost:3000/products/{id}  
   GET http://localhost:3000/products/{id}/sizes  
   GET http://localhost:3000/products/{id}/sizes/{id}  
   GET http://localhost:3000/products/barcode/{barcode}    

   POST http://localhost:3000/products  

   ```json
   {
      "name": "Pencil",
      "season": "Accessoires",
      "brand": "Bic",
      "color": "Yellow",
      "price": 5
   }
   ```

   POST http://localhost:3000/products/barcode/{barcode}/lower_stock

   ```json
   {
      "quantity": 1
   }
   ```

   GET http://localhost:3000/tickets/{id}

   POST http://localhost:3000/tickets

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

   POST http://localhost:3000/sales

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

   This will:

    - Update the Customer Loyalty Discount (Customer Service)
    - Lower the Stock Values of the given Barcodes (Products Service)
    - Register a new Sale (Sales Service)
    - Create a new Ticket from registered Sale (Tickets Service)
