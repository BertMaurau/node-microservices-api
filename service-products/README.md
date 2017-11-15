# Products Service

Products Service API

## Install

### Dependencies

   npm install

### Start

   npm start

## Requests

   GET http://localhost:3001/products       (Params: name, season, brand, color)   
   GET http://localhost:3001/products/{id}  
   GET http://localhost:3001/products/{id}/sizes  
   GET http://localhost:3001/products/{id}/sizes/{id}  
   GET http://localhost:3001/products/barcode/{barcode}    

   POST http://localhost:3001/products  

   ```json
   {
      "name": "Pencil",
      "season": "Accessoires",
      "brand": "Bic",
      "color": "Yellow",
      "price": 5
   }
   ```