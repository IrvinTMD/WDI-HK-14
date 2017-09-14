---
title: Local Authentication Lab - Username/Password
type: lab
duration: "1:25"
creator:
    name: Gerry Mathe
    city: London
competencies: Server Applications
---

# Local Authentication Lab - Username/Password

## Introduction

> ***Note:*** _This can be a pair programming activity or done independently._

We've seen how to manually implement authentication using `bcrypt`. This can be valid for a simple auth system, but if you want to implement a secure and scalable auth system inside a Node app, you should use passport.js - in this lab, you'll be doing just that!

## Exercise

#### Requirements

- Create a login form with an email and password field
- Use passport-local to implement a login system - find the user and verify their password
- If a user isn't authenticated, make sure they cannot access to the API
- The app should have 4 routes with methods and views:
  - Home (/)
  - Login (/login)
  - Signup (/signup)
  - Profile (/profile)

*Note*: You do not need to put everything in the controllers - if the route handlers are in the app.js file, that's fine.

**Bonus:**

- Create a CRUD resource and allow access to index and show for all users; limit access to create, update and delete to authenticated users
- Add Twitter bootstrap
- Move the route handlers to a separate controller
- Add a navbar that displays different links if the user is signed in 

#### Starter code

The [starter code](starter-code) includes all the files that you need for this app and some comments about what bits of code should be in each file.

#### Deliverable

Take a look at the screenshots below for inspiration:

![Node authentication lab screenshot](http://s15.postimg.org/fkcql2he3/Screen_Shot_2015_08_05_at_15_09_28.png)
![Node authentication lab screenshot](http://s15.postimg.org/3mfrkx30r/Screen_Shot_2015_08_05_at_15_09_34.png)
![Node authentication lab screenshot](http://s15.postimg.org/7g97u2kcr/Screen_Shot_2015_08_05_at_15_09_37.png)
![Node authentication lab screenshot](http://s15.postimg.org/7uajto4gb/Screen_Shot_2015_08_05_at_15_09_40.png)

## Additional Resources

- [PassportJS website](http://passportjs.org/)



