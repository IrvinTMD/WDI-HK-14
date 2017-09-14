---
title: Authentication with Angular
type: lesson---
title: Authentication with Angular
type: lesson
duration: "2:00"
creator:
    name: Alex Chin & Micah Rich
    city: LDN
competencies: Front-end frameworks
---

# Authentication with Angular

### Objectives
*After this lesson, students will be able to:*

- Authenticate a front-end app with Angular
- Pass JWT tokens to an API
- Restrict access to pages using ng-show & ng-hide

### Preparation
*Before this lesson, students should already be able to:*

- Describe the concepts behind token-based authentication
- Used jsonwebtoken in a Node application
- Built an Angular form

>Note: The current format of this lesson includes dedicates a majority of lesson time to codealongs. If possible, find ways to incorporate independent practice included throughout the lesson.

## Peruse Our API - Demo (10 mins)

Let's take a look at our starter API. It's based on our already-existing MI6 Express/JWT token app but the folks in Q branch have made a few upgrades.

#### Securing All Endpoints, Save Two

Previously, only certain API endpoints were secured, but we've secured all our endpoints now – except `POST` to `authorize` (signing in) and `POST` to `join` (signing up).

```javascript
// JWT access control. Important to have these before our routes!
app
  .use('/api', expressJWT({secret: config.secret})
  .unless({path: ['/api/authorize', '/api/join'], method: 'post'}));
```

While we're checking it out, take a minute to create a few new agents in your database. Write down the details for one of them, a codename and a password, so you can authorize in a minute.

If you need help, [here's a few ideas](https://en.wikipedia.org/wiki/00_Agent).

**Note:** You need to make sure that you run your API with:

```bash
$ npm start
```

#### Getting An Auth Token

We're using JWTs, of course, and the way you get one is by `POST`ing to `/authorizations`.

Here's a quick diagram to help refresh your memory on how JWTs work:

![image](https://s3.amazonaws.com/f.cl.ly/items/0P1m1X0L1a01333F2z21/Image%202015-10-25%20at%208.58.28%20PM.png)

In this API, an agent can verify their identity by providing their **codename** and a **password**.

Once in the system, agents can see the list of operatives across the world...

## Setting up our Angular - Codealong (15 mins)

In the field, we don't have time to set up our Angular login interface from scratch, so Q branch have given us some starter code for rapid deployment. Let's take a look at it.

#### External Resources

Let's first have a look at the script tags that have been required:

- [Angular](http://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js)
- [NgResource](http://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-resource.min.js)
- [Angular-JWT](https://cdn.rawgit.com/auth0/angular-jwt/master/dist/angular-jwt.js)

The only _new_ library is for decoding JWT's with Angular - I bet you could have guessed that!

#### Internal Resources

Next, let's look at the Angular files that have been included here (some are empty!)

- `js/app.js`, for setting up our Angular module
- `js/models/agent.js`, an agent resource class
- `js/controllers/agentsController.js`, and an agent controller

#### Routes

If we open up our `app.js` file, we can see that we only have one template, `index.html` which includes all of our content.

#### Forms

Our authorize (signin) and join (sign up) forms' inputs are all linked up with the `ng-model` called `agents.agent`, which we can see in our `agentsController` is being created as an empty object:

```
self.agent = {};
```

Both forms also call `ng-submit` actions in the `agentsController`:

- `agents.authorize()`, for the login form
- `agents.join()`, for the sign up form

#### Startup the code

Let's now turn this starter code on and see what it does!

You need to make sure you run your front-end code either with `http-server` or with the python command:

```bash
$ python -m SimpleHTTPServer
```

## Access the secret database - Codealong (5 mins)

Let's open up the Chrome console. We should see this error:

![xml-error](https://cloud.githubusercontent.com/assets/40461/9657046/8d86e358-5235-11e5-96d8-65f19131de6b.jpg)

This "Access-Control-Allow-Origin" is a bit of a red herring - in this case, it means that we are making a call to an API that is not giving us access. If you navigate to [http://localhost:3000/api/agents/]() you will see:

![json-response](https://cloud.githubusercontent.com/assets/40461/9657503/91257e62-5239-11e5-9c9c-5a69580892da.jpg)

This is because in the `AgentsController` we make a call to `getAgents()`. So, add some logic to prevent this:

Comment the following out for a moment, and we will fix this later:

```javascript
// Load agents only if you are logged in!
// getAgents();
```

## Login & Register - Codealong (15 mins)

To login and register, we need to make `POST` requests to `http://localhost:3000/api/authorize` (login) and `http://localhost:3000/api/join` (register) with the correct details in order for the API to return a valid token.

At the moment, our Agent resource only has the default, built-in methods:

```javascript
{ 'get':       { method: 'GET' },
  'save':      { method: 'POST' },
  'query':     { method: 'GET', isArray: true},
  'remove':    { method: 'DELETE' },
  'delete':    { method: 'DELETE' }
}
```

So, we need to add two custom post methods to the Agent resource:

```javascript
'authorize': {
  url: API + '/authorize',
  method: 'POST'
},
'join': {
  url: API + '/join',
  method: 'POST'
}
```

Next, we need to use these new methods inside the functions being called by the login and register forms. So, inside `AgentController`, let's add:

```javascript
self.authorize = function(){
  Agent.authorize(self.agent, handleLogin);
}

self.join = function() {
  Agent.join(self.agent, handleLogin);
}
```

We needed to pass the data from the form to the HTTP request, represented by `self.agent`.

We have also added a callback function of `handleLogin` to display our API response message back on the page.

#### Receiving the token from the API

To check that this `handleLogin` function is working let's take a look at the Chrome console after submitting the authorize form (**with the correct details!**). We should get:

![after-login](https://cloud.githubusercontent.com/assets/40461/9660009/665df9d6-524b-11e5-8e1c-c47fd7294bca.jpg)

## Storing the token - Codealong (15 mins)

Now that we can login, logout, and sign up, we want to be able to access the restricted resources. After all, we need that secret information to save the world!

To do this, we need to be passing the token that is stored in `localStorage` in the headers of our API requests to the restricted endpoints.

There are lots of ways to save this token but we're going to use **localStorage**.

Let's create a new service to manage saving and deleting of tokens. We're going to call it `tokenService`.

```bash
$ touch js/services/tokenService.js
```

And include it in our HTML:

```html
<script type="text/javascript" src="js/services/tokenService.js"></script>
```

Inside our new service, we need to add some boilerplate code, it should be familiar by now:

```javascript
angular
  .module('mi6')
  .service('TokenService', TokenService)

function TokenService() {
}
```

Now, in order access localStorage, we need to inject a service called [`$window`](https://docs.angularjs.org/api/ng/service/$window). Despite the fact that the `window` global variable is accessible anywhere, `$window` is used as a reference to prevent issues.

```javascript
TokenService.$inject = ["$window"];
function TokenService($window){
  ...
```

Before we move any further, let's namespace `this` inside this constructor function as `self`

```javascript
function TokenService($window){
  var self = this;

  ...
```

Now, let's create a new function that we call when a new user logs in called `saveToken`. Into the `saveToken` function we're going to need to pass in `token` as an argument and subsequently save it to localStorage:

```javascript
self.saveToken = function(token){
  return $window.localStorage.setItem('secret-handshake', token);
}
```

While we're here, we might as well make another method that we can use to get the token once it has been saved!

```javascript
self.getToken = function() {
  return $window.localStorage['secret-handshake'];
}
```

Great! Now we need to use these methods!

## Intercepting HTTP requests - Codealong (15 mins)

All HTTP requests from our site need to be watched and intercepted. (After all, it is a spy app!)

- The **outgoing** requests need to have tokens added to their headers.
- The **incoming** requests need to be checked for tokens so that they can be saved.

We need to make a new service to manage this special job. We're going to call it `authInterceptor.js`.

```bash
$ touch js/services/authInterceptor.js
```

And include that in the HTML too:

```html
<script type="text/javascript" src="js/services/authInterceptor.js"></script>
```

Let's add some boilerplate code again. We also need to inject our new `TokenService` and our `API` constant:

```javascript
angular
  .module('mi6')
  .factory('authInterceptor', AuthInterceptor)

AuthInterceptor.$inject = ["API", "TokenService"];
function AuthInterceptor(API, TokenService) {
}
```

This service needs to follow a very specific pattern in order for it to work. We need to return an object with two functions as properties: one called `request` and one called `response`.

```javascript
return {
  request: function(){
  },

  response: function(){
  },
}
```

#### Saving tokens

Into the `response` function, we need to save the token if there is a token in the response of the API.

We can do this like this:

```javascript
response: function(res) {
  if (res.config.url.indexOf(API) === 0 && res.data.token) {
    TokenService.saveToken(res.data.token);
  }
  return res;
}
```

This is going to act a little bit like middleware in Node! We're going to take the response from a HTTP call, and we're going to check if the URL is the one from our constant (`API` setup in `app.js`).  Also, we'll check if the response has a property called `token`; if it does, we're going to save the token using our method!

In order to make this method work, we need to add some config code in our `app.js`, though.

```javascript
angular
  .module('mi6', ['angular-jwt', 'ngResource'])
  .constant('API', 'http://localhost:3000/api')
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  })
```

#### Checking localStorage

Let's check if this is working and save any new tokens returned in HTTP requests. Before trying to login, let's check that our `localStorage` is empty. In Chrome, let's type:

```
> localStorage
< Storage {}
```

Now, after logging in we should see:

![localstorage](https://cloud.githubusercontent.com/assets/40461/9660530/f9086198-524d-11e5-9a2f-d3afc2a47af4.jpg)

Fantastic work.

#### Adding tokens to HTTP headers

Into our interceptor, we now want to add tokens to any HTTP headers once we have them saved in our local storage.

Let's add this code into our request function:

```javascript
request: function(config) {
  var token = TokenService.getToken();

  if (config.url.indexOf(API) === 0 && token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
},
```

What we are going here is use our `getToken` from our TokenService and then, if present, add it to the headers of our HTTP request.

## Restricting Access - Codealong (10mins)

This is great! But we can't really test if it is working unless we make a call to the API that needs to be able to be authorized. So, let's uncomment the call to `getAgents()`:

```javascript
// Load agents only if you are logged in!
getAgents();
```

The problem is, we don't want make this call if we're not logged in.

#### Injecting TokenService

In order to check if there is a loggedIn user, we need to use the functions inside our TokenService so let's first inject `TokenService` into our `agentsController`:

```javascript
AgentController.$inject = ['Agent', 'TokenService']
function AgentController(Agent, TokenService) {

  ...
```

In AgentsController, we want to make a method to check whether there is a token in localStorage:

```javascript
self.isLoggedIn = function() {
  return !!TokenService.getToken();
}
```

We can then prevent the `getAgents` function from being called by adding:

```javascript
// Load agents only if you are logged in!
if (self.isLoggedIn()) self.getAgents();
```

We can also add this inside our `handleLogin` function:

```javascript
if(token) {
  console.log(res);
  self.getAgents();
}
```

We should now be able to login and get all of the agents in our secret database!

## Remove all traces - Codealong (10mins)

A good agent **always has a clear exit plan**. We need to ensure that we can logout of our system, leaving no traces.

If you remember, in `index.html`, we are calling an `agents.disappear()` function when we click on the disappear link.

```html
<li><a ng-click="agents.disappear()">Disappear</a></li>
```

In order to get this working properly, we need to write a new method in `TokenService` to remove our token from localStorage:

```javascript
self.removeToken = function() {
  return $window.localStorage.removeItem('secret-handshake');
}
```

Let's now call the `TokenService.removeToken` function inside the `self.disappear` function in the `AgentsController`:

```javascript
self.disappear = function(){
  TokenService.removeToken();
  self.agent = {};
  self.all = [];
}
```

Now, we should be able to logout if we click the button! You should check your `localStorage` again to ensure that your token has actually been deleted!

## Independent Practice (20 mins)

> ***Note:*** _This can be a pair programming activity or done independently._

#### Updating the UI

Now that you have a value for `isLoggedIn`, we can update our UI accordingly using `ng-show` and `ng-hide`. Make sure that only logged-in users can see our list of agents.

#### Decoding the Token

We also want to decode our JWT to access the data about our agent who has just been authenticated. We can either do this using the plain `atob` javascript method, or we can do it using the `angular-jwt` module we have included that gives us a service called `jwtHelper`.

We have already included the script and injected it into our Angular `module` in `app.js`. This means we can use the service called `jwtHelper` in our `TokenService` factory.

Show the agent's real name once they have logged in.

> Note: Once students are finished explain and discuss how to use the jwtHelper.

## Conclusion (5 mins)
- What does our interceptor do?
- How do we authenticate a request using a token?
- What built-in angular service sends and receives HTTP requests?

