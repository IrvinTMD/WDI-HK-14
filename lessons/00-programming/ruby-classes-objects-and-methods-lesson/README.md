---
title: Objects & Methods in Ruby
type: lesson
duration: "1:25"
creator:
    name: Micah Rich
    city: LA
competencies: Programming
---

# Objects & Methods in Ruby

### Objectives

- Describe objects and how they differ from a JS objects
- Define object properties and methods
- Write getter methods and setter methods to retrieve and set a property's value
- Explain the phrase "everything is an object" – including abstract things, basic data types, and objects we make up ourselves
- Explain how an object's properties are only accessible with getter methods
- Write a methods that takes no parameters, multiple necessary parameters, and optional parameters
- Demonstrate & explain instantiation

### Preparation

*Before this lesson, students should already be able to:*

- Explain JS objects, conceptually
- Write simple Ruby methods

## Intro (15 mins)

- Everything in Ruby is an object
  - that means that everything has properties and methods contained inside it
  - even the data types you're used to are objects, and we're gonna mess 'em up today to prove it
  - literally everything "inherits" from the Object Class, which just like the real life gene pool, means it gets all it's parents traits


## Codealong - Creating an instance of the Object Class (20 mins)

Let's start with something fun & simple so you can get the hang of it.

```ruby
class BananaStand
end
```

There's no real information in there yet, but now that we've defined it, exists. How do we make a new Banana, then?

```ruby
my_banana = BananaStand.new
```

> Nice, that's called initializing a new _instance_. When thinking in objects, we consider this _class_ kind of like a blueprint for all other bananas (or objects) we make, and an _instance_ is a clone of that class.

> For example, you'd consider the chair you're in now a single _instance_ of _a_ chair - it was created using the known traits of a chair. You would consider the concept of a chair, in general, the class.  All chairs are create using the known traits of the Chair Class, or the concept of a chair.

Using code, let's see if we can find a way to describe what bananas are all about. How would we do this if it were a hash? Maybe something like:

```rb
my_hashed_banana_stand = {
  color: "yellow",
  opened_in: 1953,
  manager: "George Michael",
  money: true
}
```

Those are all excellent properties, let's see how we'd make those into _attributes_ of our object.

```ruby
class BananaStand
  def color
    "yellow"
  end
  def opened_in
    2015
  end
  def manager
    "George Michael"
  end
  def accepts_credit_cards
    true
  end
end

my_banana_stand = BananaStand.new
my_banana_stand.color # => yellow
my_banana_stand.manager # => George Micael
my_banana_stand.money #=> True
# etc.
```

Excellent, we call those "getters" or "getter methods", because they're getting information from inside our object, but the problem _here_ is that our info is hardcoded.

Imagine we're making multiple instances of the model - we want a lot of banana stands - we might need to change who the manager is for each instance of the banana stand.

This is where we start mixing in what we know about variables.  Specifically, instance variables.

```ruby
class BananaStand
  def color
    "yellow"
  end
  def opened_in
    2015
  end
  def accepts_credit_cards
    true
  end

  # getter for "manager"
  def manager
    @manager # this could, for the record, be named whatever you like, but it's best to keep it obvious & simple
  end

  # setter for "manager"
  def manager=(the_name_of_my_manager)
    @manager = the_name_of_my_manager
  end

end
```

That's interesting – it's sort of just a normal method with one argument, it just happens to have an = in the name. `manager=` instead of just `manager`

Let's see it in action.

```ruby
my_banana_stand = BananaStand.new
my_banana.manager # => nil, we haven't set it
my_banana.manager = "Tobias" # hey, look manager=, just with a space
my_banana.manager # => "Tobias"
```

That's fantastic. Now if we made another, separate instance, we could have two different banana stands, both _instances_ of our blueprint _class_.

## Independent Practice (15 minutes)

We're gonna try a little memory exercise. Take 1 minute and make sure what we've done so far is stuck in your memory. Remember the important pieces - we're about to close our computers.

Now, with a marker on the desk, and only from memory, write out a class that defines a student in this room. Think of it first as a blueprint, and then as the actual person. Pick at least one attribute, write a getter & a setter on your desk. Then write out how you'd get & set that attribute beneath it.

When you're done, open up your computer, run it in IRB, and test whether your memory got it all right.

## Some important details – Codealong (10 minutes)

#### Faster Coding Getters/setters

Now that you're experts on getters & setters, you should know that you don't always have to code them by hand. Ruby comes with a shortcut to make using them faster:

```ruby
class BananaStand
  attr_accessor :color, :opened_in, :manager, :money
  # there's also just attr_reader for getters & attr_writer for setters
end
```

That gives you getters & setters for each of those attributes. A little faster, yeah?


## Conclusion (5 mins)

Later on, we'll see some libraries that use this sort of stuff behind the scenes – we'll be creating _models_, which are just fancy word for classes, in a larger application, that we can use to instantiate objects and save to a database.

For now, playing around and creating regular old Ruby objects, initializing them & creating instances, and writing getters & setters will give us a good foundation for creating more advanced models down the road.

- How do you define a Ruby object from scratch?
- What's a getter for? What's a setter for?
- What sort of variable do you use inside an object to share information between methods?
- What's initializing? What's an instance?
