# Sales Service

Sales Service API

## Install

### Dependencies

   npm install

### Start

   npm start

## Requests

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