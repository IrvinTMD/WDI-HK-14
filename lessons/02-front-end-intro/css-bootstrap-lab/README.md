---
title: Hello Bootstrap  
type: lab
duration: "1:25"
creator:
    name: Gerry Mathe
    city: London
competencies: Front-end intro
---

# Hello Bootstrap

## Introduction

> ***Note:*** _This can be a pair programming activity or done independently._

From Wikipedia:

 > Bootstrap is a free and open-source collection of tools for creating websites and web applications. It contains HTML- and CSS-based design templates for typography, forms, buttons, navigation and other interface components, as well as optional JavaScript extensions. It aims to ease the development of dynamic websites and web applications. As of June 2015, it was the most-starred project on GitHub, with over 81,000 stars and more than 32,000 forks.

Let's get practice with Twitter bootstrap!

Get the [starter-code](starter-code) containing a Rails app.

Run `rake db:migrate` to get the database up and running, `bundle` to install the gems, open the starter-code in Sublime, and then start your server with `rails s`. You should see a basic set of templates without any styling.

Below, you will find some screenshots what you should aim to build.  Bootstrap's [documentation[(http://getbootstrap.com/css/) is _fantastic_, so be sure to take a look at all the things you can do with it.

There is a bit of configuration that needs to happen before you can start using Bootstrap, so be sure to take a peek at the tutorial linked below and make the necessary modifications to your `app/views/layouts/application.html.erb` and `Gemfile`.


## Exercise

#### Requirements

- Make this app responsive (`container-fluid`)
- Add a navbar at the top
- Style the index to represent the list of posts
- Style the new page to use all the width within the form
- Style the show page to render a post like in the screenshot

**Bonus:**

- Try to add some Twitter bootstrap themes (search for "Bootstrap theme" on Google)
- Put the form in a modal window

#### Starter code

The [starter-code](starter-code) contains a Rails app with Post and Comment models: a post has many comments and comments for a post are added on the `posts/show` page.

#### Deliverable

Below, you’ll find screenshots of what you should work towards. Remember, your app does not have to look exactly the same - the goal of this lab is to get you exploring Bootstrap, the different CSS classes included, and the grid system.

![Screenshot](http://s17.postimg.org/bqmjqscrj/Screen_Shot_2015_07_20_at_18_26_25.png)
![Screenshot](http://s17.postimg.org/qb3mlm7q7/Screen_Shot_2015_07_20_at_18_27_07.png)
![Screenshot](http://s17.postimg.org/j95ozf44f/Screen_Shot_2015_07_20_at_18_27_19.png)
![Screenshot](http://s17.postimg.org/v0tka7yqn/Screen_Shot_2015_07_20_at_18_28_23.png)
![Screenshot](http://s17.postimg.org/90d7tlg2n/Screen_Shot_2015_07_20_at_18_28_40.png)

## Additional Resources

- A link to [Bootstrap Documentation](http://getbootstrap.com/css/)
- [Tutorial](http://www.gotealeaf.com/blog/integrating-rails-and-bootstrap-part-1) on using Bootstrap with Rails



