---
title: Deploying a node Application
type: lesson
duration: "1:15"
creator:
    name: Gerry Mathe
    city: London
competencies: Deployment
---


# Deploying a node Application

### Objectives
*After this lesson, students will be able to:*

- Deploy a Node.js app
- Push and pull from MongoDB using a live web interface
- Compare deployment with Rails and a relational database to Node with a noSQL database

### Preparation
*Before this lesson, students should already be able to:*

- Describe How Heroku works
- Explain what a git remote is and how to push

## Heroku and Node - Intro (10 mins)

We've learned how to use Node.js and mongoDB, but again, a web app hosted on your laptop is not really useful. Today, we'll deploy our Animal Shelter app to a server online so that everyone can access it on the web.  Because we deployed our Rails app to Heroku a few weeks ago, this lesson assumes that you have subscribed to Heroku and that your ssh key is uploaded to Heroku.  There are a few other configurations we must make to our application to ensure we can successfully push to production.

First, we'll need a functioning git repository with our application that includes a package.json file - remember, this is used by Node’s dependency manager.  Just like a `Gemfile`, the package.json file determines the of Node.js used to run your application and includes any dependencies your application needs to run. Upon deployment, Heroku reads this file and installs the correct versions and appropriate dependencies using the  `npm install` command.

## Set up your app for deployment - Codealong (25 mins)

To verify that the Heroku CLI tool belt is properly working , type:

```bash
heroku auth:whoami
```

This should display the email corresponding to the logged in account.

#### Good to go? Let's deploy

Please take the Animal Shelter app - that uses Mongoose and Express - in the starter-code folder. Before deploying, you should be able to run this app locally, so be sure to test it out with `node app.js`

> Note: Make sure students execute this app outside of any git folder.

Once you have the folder with app and verify that it's running, start by initiating git in the app folder:

```bash
git init
```

#### Procfile

A `Procfile` is a text file you create in the root directory of your application to explicitly tell Heroku what commands should be run. For our the purpose of this lesson we only care about one command:

`web: node server.js`

This command is saying that this process type will be attached to the HTTP routing stack of Heroku and take web requests when the application goes live. It is important to note that, by default, Heroku looks to your package.json for your start command, but because we may not have declared a start script, or the start script is specific to non-production needs, it is always best practice to define it within your Procfile.


#### Tell Heroku we are creating an app

`heroku create reddit-workshop-app`

Here we use the `heroku` command to create and name the app we wish to host.

Also, let's set the environment of our Heroku app to production:

`heroku config:set NODE_ENV=production`

#### Generate a production mongoDB URI

First, we must integrate the Heroku add-on, mongolab, into our app. An add-on provides our production app with extra functionality, and in this case, a production Mongo database.

`heroku addons:create mongolab`

Now that we have a production database, we must find its connection URI that has been automatically stored to our app's config variables by mongolab:

`heroku config | grep MONGOLAB_URI`

A production URI will be returned and we export it for use:

`export MONGOLAB_URI=<production URI returned>`

#### Change the database URIs in the app so that they are dynamic

If you take a look in `app.js`, you should see the code that creates the connection to mongoDB:

```
mongoose.connect('mongodb://localhost/animalshelter');
```

The URL `'mongodb://localhost/animalshelter'` is obviously only valid when we are running the app locally, but for Heroku, we need to use the connection URI for our production database we just generated.


To access environment variables in a node app, we can use `process.env`.


```javascript
var mongoUri =  process.env.MONGOLAB_URI || 'mongodb://localhost/animalshelter';
mongoose.connect(mongoUri);
```

Now our conditional statement above simply instructs the application to use MONGOLAB_URI in production if it exists, and if not, use our local database URI.

#### Change the urls for production

We'll have to apply the same logic we wrote for the db connection to the the port where the app is running.  This port will be automatically assigned by Heroku and stored under the key `PORT` in the environment variables. Around the line 22 in our `app.js` file, you can see the port where the app is open:

```javascript
app.listen(3000)
```

Replace this code with:

```javascript
app.listen(process.env.PORT || 3000 )
```

#### Commit all changes and deploy!

`git add` and `git commit` all the changes and then deploy them by typing

```bash
git push heroku master
```

Note that we are deploying to Heroku's remote, and not our typical remote origin. Heroku and GitHub are two totally different clouds that must be given commands explicitly. A push to GitHub will not automatically push to Heroku.

Now run the one-time command `heroku ps:scale web=1` to start up your app's dynos, essentially starting up your app's process!

#### You made it!
Once the deployment is done, open Google Chrome and go to `http://YOURHEROKUAPP.herokuapp.com/animals` and you should see the index page online!  Remember, you can always type in `heroku open` to launch the application from the command line.


## Tools for production in Node - Demo (10 mins)

>Note: Demonstrate the following using the app we deployed previously.

There are a couple of tools we can use in production for troubleshooting and error handling:

`heroku restart` will let us restart our server and make sure all of our configuration details are up-to-date.  You'd be surprised how much can be fixed by simply restarting the server; it's a big reason Heroku restarts every one of its applications daily!

Again, for efficiency, `heroku open` will open up your app in the browser.

If there are errors, you can use the command `heroku logs` to get a print out of the production logs for your application. These are just like the logs we had printing to our console in development mode. With this, you'll be able to search for what caused your application to crash and debug. Remember any changes you make to your application locally will require you to add, commit, and push to Heroku again. You **do not** need to repeat the database configuration.

If the app is not working locally using foreman, don't go further.  It will not work on Heroku. You need to have a working app locally first.


## Your turn to deploy - Independent Practice (25 mins)

Choose any other Express code base you've built and push it live.  Use what you just learned from lecture and the code we wrote, too.  Share the url with your instructor via Slack.


## Conclusion (5 mins)

- Identify the configuration changes we need to make to ensure our application will work on Heroku's production servers.
- How does deployment in Rails compare to Heroku?



