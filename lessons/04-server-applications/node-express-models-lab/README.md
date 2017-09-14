---
title: Encrypted User Model Lab
type: lab
duration: "1:25"
creator:
    name: Gerry Mathe
    city: London
competencies: Server Applications
---


# Encrypted User Model Lab

## Introduction

> ***Note:*** _This can be a pair programming activity or done independently._

This lab is about implementing bcrypt in your server logic, so don’t worry about any front-end implementation. In the starter code, you have been provided with an Express application. Add code to handle two routes: the first one to create a user (where the password will be encrypted) and the second to authenticate users based on an email and a password.

Then, using cURL, test your app’s functionality - your app should respond with different HTTP statuses and JSON responses to handle all requests.

## Exercise

#### Requirements

- Create a user model with these attributes:

  - Name(String)
  - Email(String) (Unique and required)
  - Password(String)


- The app should have these two routes: `/users` and `/users/authenticate`

- `/users` route should expect params like the ones below; if the params are valid, then a user document should be saved and the password encrypted.

```javascript
// `/users` params
    "user" :{
    "name"        : "gerry",
    "email"       : "gerry@ga.co",
    "password"    : "sfgdsfpassword"
  }
```


- `/users/authenticate` route should expect a user object like the one below; if the params are valid, then a verification of the password passed in the params should be performed against the encrypted password and a message should be sent back as a response with the result, authenticated or not.

  ```javascript
  // `/users/authenticate` params
    "user" :{
      "name"        : "gerry",
      "email"       : "gerry@ga.co",
      "password"    : "sfgdsfpassword"
    }
  ```



- All routes must respond with a JSON object like this:

  ```javascript
  {message: "XXXXXX"}
  ```

- The HTTP response status must be either:

  - `200` if the request params are valid and all the processes in the route have been executed as expected
  - `401` if the request params are wrong and/or an error occurred on the server 

**Bonus:**

- Add extra validation
- Give detailed messages for when the params are incorrectly formatted or passed

#### Starter code

The [starter code](starter-code) has all the files and packages you need to get started. 

The file `app.js` contains Middleware to handle errors and the configuration to `decode` the JSON received in the body.

#### Deliverable

Take a look at some cURL commands you can use to test each route:

- For a valid user creation request:

    ```bash
    curl -i -H "Content-Type: application/json" -d '{
      "user" :{
      "email"       : "gerry@ga.co",
      "password"    : "password"
      }

    }' http://localhost:3000/users/authenticate
    ```

- To test an invalid request, try to add a user with the same email twice; it should respond with an error message and a `401` status

- For a valid user authentication request:

  ```bash
  curl -i -H "Content-Type: application/json" -d '{
    "user" :{
    "name"        : "gerry",
    "email"       : "gerry@ga.co",
    "password"    : "password"
    }

  }' http://localhost:3000/users/authenticate
  ```


- For an invalid request user authentication (note: it's invalid because it doesn't have a password):


  ```bash
  curl -i -H "Content-Type: application/json" -d '{
    "user" :{
    "email"       : "gerry@ga.co"
    }

  }' http://localhost:3000/users/authenticate
  ```


## Additional Resources

- [Bcrypt Node](https://github.com/ncb000gt/node.bcrypt.js/)
- [How Bcrypt Works](http://codahale.com/how-to-safely-store-a-password/)



