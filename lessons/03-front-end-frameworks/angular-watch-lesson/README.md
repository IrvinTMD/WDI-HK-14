---
title: Angular $watch
type: Lesson
duration: "1:20"
creator:
    name: Alexander Saldivar
    city: LA
competencies: Front-end frameworks
---

# Angular $watch

### Objectives

- Describe data-binding using:
  - digest loop
  - dirty-checking
  - $watch list
- Manipulate a model with $watch

### Preparation

- Be able to create an Angular app with controllers

## Angular Magic - Intro (10 mins)

In our _Intro to Angular_ lesson, we covered how to bind controller data into a view by utilizing either $scope or controllerAs syntax. Now that we know the fundamentals in setting up this data-binding functionality, let's take a step back to explain Angular's "magic" under the hood that makes it all possible.

Have a look at this example:

```javascript
...
<input type="text" ng-model="user.name">
<h2>{{user.name}}</h2>
...
```

Here we have two elements: One is an input with ngModel that will bind input to a property on the scope, in our case `user.name`; the other element is an h2 tag that has handlebar templating that will bind a scope property to the DOM, specifically `user.name`.

As you type in the input something magical happens. Each letter appears in the h2 node on every keystroke! We didn't even have to setup an Angular controller! Cool, more Angular magic, but how is this working?! How does Angular not only know to bind the user input to the DOM, but to do so as soon as the user types each character? Is Angular watching us? As creepy as it sounds, yes, Angular is watching us and it has us on its $watch list.


## $watch list - Demo (15 mins)

As you already know, with Javascript the browser listens for events such as clicks and handles them with the appropriate callback in a process that is known as the event loop. Acknowledging the power in being able to have listeners and handlers, Angular extends the event loop by creating what is known as Angular context. Simply, this context is made up of the models that have been attached to the DOM. Every time you extend the "angular context" within your UI, whether it be with {{}} or an ngDirective like ngModel, Angular adds that context/model to its $watch list. It is this $watch list that gives Angular its event listener-type functionality.

```javascript
angular
  .module("secretsApp", [])
  .controller("SecretsController", SecretsController);

  function SecretsController() {
    this.name = "Chris";
    this.age = 27;
  }
```

```javascript
<h1>
  Hi, {{name}}!
</h1>
```

Looking at this code, how many models do you think are on the $watch list? We have two properties declared on the scope - `name` and `age`. However, since only one of them, `name`, is bound to the UI, only one is on the $watch list. Angular doesn't care/doesn't need to watch any property that isn't in the UI because its value has no affect on our view. Now that we've covered what Angular will listen/$watch for, we can move on to how angular will handle a change in the model.

## $digest cycle - Demo (15 mins)

Let's go back to our previous example:

```javascript
...
<input type="text" ng-model="user.name">
<input type="text" ng-model="age">
<h2>Name: {{user.name}}</h2>
<h2>Age: {{age}}</h2>
...
```

Currently, our Angular context contains `user.name` and `user.age` - that means those models have been inserted into the $watch list that is watching them for any change. As soon the user updates either of these models in any way by typing/deleting a value in the input, the $watch listener is triggered and kicks off Angular's version of the js event loop: the $digest loop a.k.a. the $digest cycle.

If we were to type in the input with `ng-model="user.age"`, this is what the $digest cycle would look like:

- `user.name`! Has your value changed?
  - "nope"
- Alright, I'll mosey on down the list and check the others.
- Yo `user.age`, has _your_ value changed?
  - "Actually, now that you've mentioned it, it has! I'm now an 8!""
- Oh really?! Noted! I best start from the top of the list to see if this change affects any of the other models.
- `user.name`, you still the same?
  - "I sure am!"
- And you, `user.age`, you haven't gone and changed since I last checked, have you?
 - "Naw, I'm still carrying the same value.""
- OK then! All changes to the models have been accounted for, so I'm going to go over to the DOM with this info so it can update accordingly. Thanks y'all!

This process of the $digest cycle, of checking a current state to a previous state, is a concept known as "dirty-checking". When the value of a model has an observed change, it is marked as "dirty" and since a model's value may affect another model's value, the $digest cycle starts from the beginning to check for any possible ripple effect. Once all model changes have been accounted for, the $digest cycle ends and the DOM will be updated. This is how Angular knows to update that h2 tag with your input _as_ you type it. Alas, another one of magic's biggest secrets [revealed](https://www.youtube.com/watch?v=JT4YFHB-mvc)!

## $watch - Codealong (20 mins)

Now that we have a pretty solid understanding of how Angular's $digest cycle works, let's tap into its event loop with and create our own $watch.

First, let's open up the starter code and look at the controller (app.js):

```javascript
angular
  .module("registrationApp", [])
  .controller("RegistrationController", RegistrationController);

  function RegistrationController() {
  // nothing going on in here yet
  }
```

Next, attach your controller to the DOM:

```javascript
<div ng-controller="RegistrationController as registration">
  <input type="text" ng-model="registration.name">
  {{registration.name}}
</div>
```

Now that we have our basics setup, let's look utilize our first $watch method!

```javascript
...
  function RegistrationController($scope) {
    var vm = this;

    $scope.$watch(function(){return vm.name}, function(newVal, oldVal) {
      console.log(newVal);
      console.log(oldVal);
    })
  }
```

So there are a several things going on here: first, we inject $scope into our controller that gives use the $watch method; second, we make a reference to the context of the controller so that we can refer to it in our first argument of $watch; then; as we call upon $watch, we pass a function that returns the model that we want to create a $watch for.

We call upon `vm.name` in this funky way because when you use controllerAs syntax and $watch together, you need a way to maintain context. If we were to use $scope syntax, we would just pass the model name, `"name"`, as the first argument. Then, our second argument is a callback to our register $watch listener that will perform whatever functionality we want. Further, it comes back with two arguments. The first argument is always the new value of the model, and the second argument is always the previous value of the model.

Now, go ahead and start typing in the input and you should see your logs!

You should see something like this:

![image](https://s3.amazonaws.com/f.cl.ly/items/281J0I2v383T1R0a1L2e/Image%202015-10-29%20at%2012.06.55%20AM.png)

Pretty cool, eh? Is your mind starting to go wild with ideas? Before we continue, note those `undefined`s we're seeing right off the bat. Those are appearing because the $digest cycle not only runs when a model changes, but it's also initialized right off the bat when your app first renders. To get rid of that, simply throw in an early return if there's no new value entered, `if (!newVal) return`.

Now we can use the $watch to do fun stuff like count the number of characters being typed and bind that value into the DOM.

```javascript
<div ng-controller="RegistrationController as registration">
  <input type="text" ng-model="registration.name">
  {{registration.name}}
  <br>
  <h4>Character count: {{registration.characters}}</h4>
</div>
```

```javascript
...
  function RegistrationController($scope) {
    var vm = this;
    $scope.$watch(function(){return vm.name}, function(newVal, oldVal) {
      vm.characters = newVal.length;
    })
  }
```

## Independent Practice (15 minutes)

Now make this knowledge your own! In pairs, or on your own, use the starter code to validate the email and password inputs. The user must input an `@` for email and have at least five letters. If these requirements are not met, some warning prompt should be shown in the UI.

## Conclusion (5 mins)

Now you know how the "magic" behind Angular's data-binding works. Just as importantly, you also know how to manipulate it and make it your own.

Test your understanding with these questions:

- What is the $digest cycle and what does it have to do with $watch list?
- When is a model added to the $watch list?
- How many times does the $digest cycle run?
- How do you go about creating your own $watch?
