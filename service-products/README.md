# Products Service

Products Service API

## Install

### Dependencies

   npm install

### Start

   npm start

## Requests

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