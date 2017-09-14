---
title: Express Restful controller practice lab
type: lab
duration: "1:25"
creator:
    name: Gerry Mathe
    city: London
competencies: Server Applications
---

# Express RESTful controller practice lab

## Introduction

Practice makes perfect!  Imagine you work at an ECommerce site, and you've been tasked with building an internal API to help track orders. Use Express and Mongoose, with nested documents, to make this happen!  

## Exercise

#### Requirements


- Use Express and Body-parser.
- Use Mongoose and create:
  - A Model User
    - Name(String)
    - Gender(String)
    - Dob(Date)
  - A Model product
    - Name(String)
    - Price(Float)
    - Description(String)
  - A Model Order
    - Price(String)
    - CreatedAt(Date)
    - Address(Object)
      - Street(String)
      - Postcode(String)
      - Town(String)
      - Country(String)
    - Products(Array of Product references)
    - User(Embedded User)
- Each resource should have a corresponding controller. For each resource, you should be able to reach the 5 routes (index, show, create, update and delete) using cURL and add the references through cURL
- Please write down the CRUD commands you've used to ensure your app is working
- Each controller should be in a separate file


**Bonus:**

- Add validations to the schema and return the error message when validation fails

#### Starter code


Grab the [starter code](starter-code) and start hacking.


#### Deliverable

Below, we've added the appropriate cURL commands to use to test your app:

-  `Index` cURL Request
  - Users: `curl http://localhost:3000/users`
  - Orders: `curl http://localhost:3000/orders`
  - Products: `curl http://localhost:3000/products`

- `Show` cURL Request
  - Users: `curl http://localhost:3000/users/55afa1f30eb92a607ab9e5c4`
  - Orders: `curl http://localhost:3000/orders/55af7b933b1fa385546c05c4`

  >Note: _Replace ID with the appropriate ID_

- `Create` cURL Request - create a order, a user, and a product:

  ```bash
  # order
  curl -X POST -H "Content-Type: application/json" -d '{  
    "price":   "14.23",
    "releaseDate":  "2015/07/22",
    "products" : [{
      "name" : "Headphones",
      "price" : "39.99",
      "description": "These in-ear headphones are a great accompaniment to a smartphone or mobile device. An inline control with microphone answers/ends calls, controls music/media playback and the volume level on compatible smartphones. Generously equipped with a carry pouch, XS/S/M/L eartips and S/M/L C tips for a comfortable fit. "
    },{
      "name" : "Apple iPod Touch 16GB 5th Generation - Pink",
      "price" : 149.00,
      "description": "iPod touch is more fun than ever. It has an ultra thin design, a 4-inch Retina display, iOS 7, Siri, iMessage, FaceTime, iTunes and the App Store, iTunes Radio, and more."
    }],
    "delivery_address": {
      "street": "68 hanbury street",
      "postcode": "nw6 1dp",
      "country": "United Kingdom"
    }
  }' http://localhost:3000/orders

  # user
  curl -X POST -H "Content-Type: application/json" -d '{  
    "name":   "Gerry",
    "gender":  "M",
    "dob" : "2015/03/23"
  }' http://localhost:3000/users

  # product
  curl -X POST -H "Content-Type: application/json" -d '{
    "name":   "Ipod",
    "price":  "149.99",
    "description" : "this is a revolution"
  }' http://localhost:3000/products
  ```

-  `Update` cURL Request - update each model, too

  ```bash

  #order
  curl -XPUT -H "Content-Type: application/json" -d '{"price":   "188.99"}' http://localhost:3000/orders/55af7e96e8c3145759f70973/edit

  # user
  curl -XPUT -H "Content-Type: application/json" -d '{"name": "Jay"}' http://localhost:3000/users/55afa1f30eb92a607ab9e5c4/edit

  # product
  curl -XPUT -H "Content-Type: application/json" -d '{"price":   "8888.99"}' http://localhost:3000/products/55afc24f104f09d08ab40ccb/edit
  ```

    >Note: _Replace ID with the appropriate ID_



- `Delete` cURL Request for each model


  ```bash

  # user
  curl -XDELETE http://localhost:3000/users/55afa1f30eb92a607ab9e5c4

  # order
  curl -XDELETE http://localhost:3000/orders/55af7b933b1fa385546c05c4

  # product
  curl -XDELETE http://localhost:3000/products/55afb742104f09d08ab40cca

  ```

  >Note: _Replace ID with the appropriate ID_

## Additional Resources

- [Express JS documentation](http://expressjs.com/api.html)
- [Mongoose documentation](http://mongoosejs.com/docs/api.html)



