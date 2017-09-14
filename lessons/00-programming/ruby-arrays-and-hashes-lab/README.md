---
title: Arrays & Hashes
type: lab
duration: "1:25"
creator:
    name: Micah Rich
    city: LA
competencies: Programming
---

# Arrays & Hashes

## Introduction

To practice using both hashes & arrays, you have a task: You'll use IRB to interactively work with Ruby and develop a handful of methods to create a fake roster for a class you're teaching.

In order to create your class roster, your task is to write a few methods to interact with arrays & hashes to represent students.


## Exercise

#### Requirements

- Write five methods:

- **The first method** should return either our current list of students, or an empty array if we don't have one yet.This method will also allow us to simply call `students` instead of `@students` when we're in IRB

- **The second method** should accept data for a new student, create a hash out of the student's information, and add it to a running array of students.

- **A third method** should read back our list of students we've created in a specific format, sorted by last name:
```
Doe, John - Web Development Immersive
Zelda, Jane - User Experience Immersive
... etc.
```

- **A fourth method** should display a message about how many students are in the class:
```
"There are X students in our class"
```

- And **a final method** should tell us what information any given student hash has in it. For example:
```
- first_name
- last_name
- course_name
etc.
```

#### Deliverable

You should have a ruby file with a handful of methods – named according to what you consider good naming conventions – that follow the requirements listed above.

You should be able to copy & paste into IRB, require it in IRB, or run it in your console and get the correct output for all of the above challenges.

## Additional Resources

Keep in mind: the requirements above will require methods and ideas we haven't yet covered, so you'll need to get on the web and find ways to accomplish these requirements. As part of your journey learning to become a developer, you must utilize documentation to help you write the code that accomplishes your goals.

- http://ruby-doc.org/core-2.2.2/Array.html
- http://ruby-doc.org/core-2.2.2/Hash.html
