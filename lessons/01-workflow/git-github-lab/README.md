---
title: Git and GitHub Intro Lab
type: Lab
duration: "1.25"
creator:
    name: Jay Nappy
    city: NYC
competencies: Workflow
---

# Git and GitHub Intro Lab

## Introduction

> ***Note:*** _This can be a pair programming activity or done independently._

Let's apply what we've learned from class to share and update each other's code.  With a partner, you're going going to alternate between who 'drives' and who 'navigates' while following the requirements under "Exercise" below. The goal will be to create a project, have a partner fork, clone, and edit the project, submit the changes as a pull request, and then have the changes merged.  

Be sure to look at the previous lesson for notes and helpful hints.

## Exercise

Partners will be referred to as partner1 and partner2.

### Part 1

**With partner1 driving:**

- create a folder called `git-and-github-practice`

- within that folder create the following files `index.html`, `style.css`, and `scripts.js`
  - 'cd git-and-github-practice'
- copy and paste the code from the [starter-code](starter-code) from the `index.html` and `style.css` into the files you just created
- add `// JavaScript to be added` to your `script.js` file and link to your JavaScript file in your html file
- initiate a git repository, commit your changes, create a GitHub repository, and push to GitHub


**With partner2 driving, from their computer:**

- get the link to your partner's GitHub repository and fork and clone it
- open the project and write JavaScript code to make the 'Join Our Mailing List' button prompt a user for an email:

<p align=”center”>
<img src=”https://i.imgur.com/ogOp68t.png”>
</p>

- commit your changes and submit a pull request back to partner1


**With partner1 driving:**

- merge the pull request from the GitHub interface



### Part 2

**With partner2 driving**:

- create a different folder, outside of the first project, called `git-and-github-practice-two`
-  within that folder create the following files `index.html`, `style.css`, and `script.js`
-  copy and paste the code from the merged pull request files (of your partner’s `git-and-github-practice` project) from each of the appropriate files to the new files in `git-and-github-practice-two`
- initiate a git repository, commit your changes, and push to GitHub
> Note: Partner2 should now have the solution from Part 1 locally

**With partner1 driving:**

- get the link to your partner's new GitHub repository - fork and clone it
- open the project and write JavaScript so that after the user enters their email, the button's text changes and reads, "Thanks for your email!"


<p align=”center”>
<img src=”https://i.imgur.com/Nd4NiSy.png”>
</p>

- commit your changes and submit a pull request back to partner2


**With partner2 driving:**

- merge the pull request from the GitHub interface

**Bonus**:

- use the [syncing a fork](https://help.github.com/articles/syncing-a-fork/) documentation to update partner2's local version of `git-and-github-practice` without copying and pasting any code
- push the updated local copy to GitHub


#### Starter code

We've given you the HTML/CSS needed to get going in the [starter-code](starter-code).

#### Deliverable

You should have two separate GitHub repositories that have merged pull requests.  Try not to, but if you need, peak at the [command line/code answers to part 1](solution-code/command-line-answers.md) for help.

## Additional Resources

- [Git documentation](https://git-scm.com/documentation)
- [Forking on github](https://help.github.com/articles/fork-a-repo/)
- [Syncing a fork](https://help.github.com/articles/syncing-a-fork/)
