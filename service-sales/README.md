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

   This wil:

    - Update the Customer Loyalty Discount (Customer Service)
    - Lower the Stock Values of the given Barcodes (Products Service)
    - Register a new Sale (Sales Service)
    - Create a new Ticket from registered Sale (Tickets Service)