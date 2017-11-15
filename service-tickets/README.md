# Tickets Service

Tickets Service API

## Install

### Dependencies

   npm install

### Start

   npm start

## Requests

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