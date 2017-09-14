---
title: Grunt
type: Lesson
duration: "1:20"
creator:
    name: Alexander Saldivar
    city: LA
competencies: Workflow
---
# Creating Tasks with Grunt

### Objectives

- Describe what a task runner is and its purpose
- Configure Grunt in an Express app
- Use Grunt to:
  - lint and minify js files
  - run nodemon
  - run specific tasks based off changes in files

### Preparation

- Explain the structure of a MEAN app
- Know how to use npm

## What is a task runner? What is Grunt? - Intro (10 mins)

As we continue to build more and more apps, we can find ourselves repeating a lot of the same tasks ranging anywhere from minification to linting. If you have ever encountered RoR's `rake` gem, it seeks to help automate tasks like these which makes it somewhat of a "task runner."  The purpose of a task runner, such as Grunt, is to free a developer and/or a team of developers from these mundane tasks by better automating the workflow so that we can efficiently speed up our development process. The more tasks we can automate, the better!

Today we will be taking a look at Grunt, a task runner with an especially huge ecosystem that is growing every day. By ecosystem, I'm referring to the hundreds of task-helpers, called plugins, that developers have created and actively maintain.

For the purpose of this exercise, we will be using Grunt to help with tasks involving js minification and Angular annotation.

## What are we working with? - Demo (5 mins)

Open up the app in starter code and examine the file structure:

```javascript
- app/
    - node modules/
        - *
    - public/
        - components/
            - home/
                - home-controller.js
        - app.js
        - index.html
     - package.json
     - server.js
```

The app we are working with is fairly simple but definitely complex enough to fill our needs. The main file to note is the `home-controller.js` which holds our one and only angular controller. The purpose of this controller is to define a grunt object that we will bind to the DOM with the help of `$scope`.

Its contents are as follows:

```javascript
angular.module('gruntApp')

.controller('homeController', function($scope) {
  $scope.grunt = {
    description: 'task runner',
    purpose: 'Automation!'
  };
});
```

And here we're simply putting the angular model, `grunt`, into our HTML so that we can access it's properties in the DOM.

```javascript
...
<body ng-app="gruntApp">
  <div ng-controller="homeController" class="text-center">
    <h1>Grunt is a {{grunt.description}} that is awesome for {{grunt.purpose}}</h1>
  </div>
</body>
...
```

Go ahead and run `npm start` and you should see:

![image](https://s3.amazonaws.com/f.cl.ly/items/2l1h0H1E363l3Q1o1n1S/Image%202015-11-03%20at%2010.11.57%20PM.png)

## Getting started with Grunt - Codealong (45 mins)


#### Grunt CLI and Intro to Gruntfile.js

Ultimately, the automation of our tasks will be triggered with the command `grunt`, so first, we must install (just once and one time only) the Grunt CLI (command line interface) globally on our machines.

 `npm i -g grunt-cli`

By the way, `i` is short for install. `-g`, option g, will install your dependency globally so that you can use it as a command line tool.

Great! Now, that we have the ability to run Grunt, we need to be able to tell Grunt what tasks we want it to run. To perform this communication with our task runner, we need a Gruntfile in our app.

Go ahead and add `Gruntfile.js` to the root of your directory. Your tree should now look like:

```javascript
- app/
    - node modules/
        - *
    - public/
        - components/
            - home/
                - home-controller.js
        - app.js
        - index.html
     - package.json
     - server.js
     - Gruntfile.js
```

Whenever `grunt` is run, Grunt will look for the grunt package locally installed in your app. If it is found, Grunt then searches for your configured `Gruntfile.js` and the tasks to execute within the file.

Note that the `grunt` command can be ran from anywhere in your app.

Since Grunt searches for the grunt dependency in our app, let's go ahead and install it now:

`npm i --save-dev grunt`

Since we are only using grunt for development, we only need to install the package as a development dependency. In other words, we don't need the package for our app to run, we just want it to help with the development cycle.

#### Grunt Plugins

Before we go ahead and start configuring tasks in our `Gruntfile.js`, what will give us the ability to perform the tasks we want? The answer is _gruntplugins_ or _plugins_ for short. If you can think back to the beginning of this lesson, it was mentioned that Grunt has a large ecosystem maintained by developers. Well this ecosystem consists of a whole lot of npm packages, more specifically, plugins! Each of these plugins gives us the ability to configure a different task. So, just like any other npm package, we must `npm i` any plugin whose task ability we wish to utilize.

Because it is a common task to minify your js files before deployment, let's go ahead and install a js minifier plugin:

`npm i --save-dev grunt-contrib-uglify`

"uglify" in the package name stems from a popular JS minifier library, Uglify.js.

You may be asking yourself a very good question right about now: how the heck did this guy know about this package? The answer is probably one you've heard a lot by now, "just Google it." If you Google with keywords such as, "grunt js minification," you'll usually get the plugin you need on the first results page if not the very first result.

#### Gruntfile Setup and Task Configuration

Alright! Time to get this party [started](https://www.youtube.com/watch?v=WccfbPQNMbg)!

Let's go ahead and prep our `Gruntfile.js` for tasks:

```javascript
module.exports = function(grunt) {

}
```

Now we have a "wrapper" function which will give us the ability to use grunt's `initConfig` method to pass our configured tasks to grunt to run.

Next, let's configure our `grunt-contrib-uglify` task:

```javascript
module.exports = function(grunt) {

  grunt.initConfig({

    // minify all js files into app.min.js
    uglify: {
      build: {
        files: {
          'public/dest/js/app.min.js': ['public/app.js', 'public/components/**/*.js']
        }
      }
    }

  });

}
```

The configuration per tasks varies, so you'll have to refer to a plugin's [docs](https://github.com/gruntjs/grunt-contrib-uglify) whenever you use it. In this case we are telling our uglify plugin to minify and concatenate our `app.js` file as well as any js files within any folder lying within the components folder and put the resulting code into a file, that we name `app.min.js`, into a js folder within our dest (destination) folder.

The order matters. The order of our array dictates which file(s) will be minified and concatenated first. If we were to reverse the current array, we would have an angular controller defined upon an angular module that is not yet defined.

#### Load Task and Run By Default

With our first task configured, we now need to "load" the task and tell Grunt to perform it when `grunt` is run from the command line.

To do so, just add:

```javascript
...

  // load tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // default tasks
  grunt.registerTask('default', ['uglify']);

}
```

This portion of code should be quite readable. We are simply loading the task by its package/plugin name and then we register its configuration property name, `uglify`, to run on "default", when `grunt` is ran.

Run `grunt` and observe how `public/dest/js/app.min.js` has been generated for you. BAM! Automation!

#### Mini-Recap

Here's a quick recap and what we did to configure our Gruntfile:

- Create a "wrapper" function
- Configure our task
- Load our task
- Register our task to be run as default

#### Practice makes perfect...so let's configure another plugin!

Take a look at the contents of our new `app.min.js` and you can see it is not quite what we want:

```javascript
angular.module("gruntApp",[]),angular.module("gruntApp").controller("homeController",function(a){a.grunt={description:"task runner",purpose:"Automation!"}});
```

The minification process minified `$scope` to a value that no longer has any meaning, `a`. If we tried to use this code our app would crash with the error `Unknown provider: aProvider <- a <- homeController` because unlike `$scope`, `a` is not a known angular provider.

To fix this let's Google, "grunt angular annotation." Annotating our angular code will help prevent these minification issues. Once you find the right plugin for the task, `grunt-ng-annotate`, go ahead and put it to use. What general steps do you think you'll need to follow in the configuration and use of this plugin?

Install the plugin:

`npm i --save-dev grunt-ng-annotate`

Configure the task:

```javascript
...
  grunt.initConfig({

    // annotate angular dependencies/services in preparation for minification
    ngAnnotate: {
      ngapp: {
        files: {
          'public/components/home/home-controller.js': ['public/components/home/home-controller.js']
        }
      }
    },

    // minify all js files into app.min.js
    uglify: {
...
```

All we're saying here is annotate `home-controller.js` and put the results back into the same file.

Now, load the task and tell it to be ran on default:

```javascript
...
  // load tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ng-annotate');

  // default tasks
  grunt.registerTask('default', ['ngAnnotate', 'uglify']);
...
```

Run `grunt` and check out the contents of `app.min.js` again:

```javascript
angular.module("gruntApp",[]),angular.module("gruntApp").controller("homeController",["$scope",function(a){a.grunt={description:"task runner",purpose:"Automation!"}}]);
```

The parameter within our controller function is still `a` but it now knows `a` refers to `$scope`!

Once again, order matters. When we register our tasks we must keep in mind the order of how each task should be executed. If we were to minify before annotating, well, then there'd be no point of annotating! So, we annotate _before_ we minify so that our injected providers, in this case `$scope`, are not lost in the minification process.

#### Reap What You Sow

Now that we have our awesome `app.min.js` which contains all of our js code, we can go into our `index.html` and swap:

```javascript
...
  <!-- js files -->
  <script src="/app.js"></script>
  <script src="/components/home/home-controller.js"></script>
...
```

for:

```javascript
...
  <!-- js files -->
  <script src="/dest/js/app.min.js"></script>
...
```

Instead of having to use multiple bulky js files, our app is now using only one beautifully minified js file! There are a couple of reasons you should rejoice. First, whenever the browser renders your HTML into what becomes the DOM, it can only render X amount of lines at a time, so by decreasing the line count you're increasing the rendering speed. Further, when you minify your code, you greatly decrease its file size by removing comments and shortening variable names (as you noticed in the Angular annotation section of this lesson). Removing and minifying code aids in a a quicker render; and in the end, a quick render results in your page loading faster meaning a better user experience.

Go ahead, restart the server and visit http://localhost:3000/ one last time to make sure everything looks the same.


## Independent Practice (15 mins)

Now that you know how to use Grunt for development automation, try to add your own task. A very useful and commonly used task is jslint ([grunt-jslint](https://github.com/stephenmathieson/grunt-jslint)) that helps review and validate your js code. You don't want to be pushing sloppy code! Another handy task used in the "real-wolrd" is [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch). This task watches your files and whenever you save a change, it will run tasks you specify it to run. For example, every time you save some new js code, grunt-contrib-watch can run your grunt-jslint task to make sure your new code follows conventional js specs.

Beyond this independent practice, think about incorporating some useful Grunt tasks with your final project to help your development cycle. Have fun with it and automate like a boss!

## Conclusion (5 mins)
- What is a task runner and what is its purpose?
- What are the main components that make up a Grunt file?
- What is a Grunt plugin?
- What are your favorite Grunt plugins and why?



