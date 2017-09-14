# Your learning experience
Welcome to the web development immersive course.
Over the next 12 weeks you are going to be introduced to a **very** wide range of technologies. Here are some things to think about as you assimilate a lot of new information into your existing mental models.
## Separate the idea from the coding language
<img src="https://c1.staticflickr.com/5/4151/5201272265_4069af4aea_b.jpg" width="300" alt="mental models" align="right" hspace='20'>

When you start to learn coding you're actually doing two things at once - trying to build a mental model of what's going on, and trying to learn how to do that in the specific language you're using.

The first time around is hard. The good news is that it's a **lot** easier when you come to the same concept in a new language.

For example, here's the concept of a 'for' loop: start a counter at zero, then check the counter is less than 10. If less than 10 then do a loop, and for every loop send a message that shows what the counter value is. After each loop, increase the counter by 1 and check again it's still less than 10.

This is what a 'for' loop looks like in JavaScript:
```javascript
for (counter = 0; counter < 10; counter++) {
    console.log('The counter is now: ' + counter);
}
```
And here's the same concept in a different language (php):

```php
<?php
for ($counter = 0; $counter < 10; $counter++) {
    echo "The counter is now: $x <br>";
}
?>
```
There's some odd things going on with '+' signs and weird brackets, but notice how very similar the same idea is in two different languages. The biggest effort is in building the mental model of a loop. Once you've got the concept then most of the time it's simply a matter of looking up how to write it in the next language.

## It doesn't take years to become an expert
<img src='https://images-na.ssl-images-amazon.com/images/I/51RTTYAW2TL.jpg' alt='the Zulu principle' width='200' align='left' hspace='20'>

Jim Slater was a finance guru who wrote a number of books on investment. He was looking around for a suitable title for his first book, and one morning he was listening to his wife talking about an article she had read on Zulus in the National Geographic. He realised that although the article was only a few pages long, she probably knew more about Zulus than everyone in the street.

He then thought that if she was to go to the local library it would probably have half a dozen books on Zulus, and by reading them she would become one of the most knowledgeable people in the county. Add a holiday to South Africa and take in a few documentaries and she could hold an in-depth conversation with any other expert on Zulus.

His point was that by focussing on a narrow area it does **not** take years and years to become an expert. It's the same idea in coding. Aim for a general idea of how all the components fit together, and then focus on one or two specific technologies. You'll be surprised at how quickly you become expert.

## Teachers know a tiny bit about an awful lot
It's often said that a teacher's knowledge is a mile wide and an inch deep. That's because we have to cover a vast array of subject matter that's continually being updated - and out-dated!

We'd like to spend lots more time learning everything we can, but unfortunately we also have to spend time doing administration, planning lessons, and standing in front of you.

This means that while we will certainly shorten the time you need to assimilate new material and save you time by directing your energies, we expect you to become experts very quickly in specific topics. Don't be surprised if you suddenly realise you know more than us. This is a good thing!

## Sometimes a partial model is good enough
Have you learnt to drive? Good, so you know how gears, accelerator, brake and indicators work. What about how the engine works? That could be useful if you need to diagnose a problem. What about the injector system, do you need to understand that? And what about the timing system for the fuel injection, do you need to know how the coordination happens with the induction stroke? And the interplay between the fuel pump and the pressure regulator?

The point is that you have to draw the line somewhere in your search for understanding. Recognizing when you have enough knowledge to code a solution is a skill you'll pick up, but don't be dissapointed if you feel you only partially understand the technology.

Notice that 'partial model' doesn't mean 'no model' - it is **not** acceptable to have no understanding of what a piece of code does and just cut-and-paste, hoping it works. The technical term for people who do this is '[script kiddies](https://en.wikipedia.org/wiki/Script_kiddie)'!

## The key to success in coding: stick at it

<img src='https://i.ebayimg.com/00/s/NDAwWDI2Nw==/z/gucAAOSwCU1Yq9Ew/$_35.JPG' alt='grit' align='right' hspace='20'>
This is probably the biggest differentiator between average and great coders. Writing code that works is not the problem. Writing code that doesn't work and being able to fix it is where the learning starts. How good are you at sticking with a problem and working at it until you find an answer?

Recognize that there are two things happening when you're stuck - fixing the bug is only part of it. You also learn a lot about specific aspects of technology - by searching for solutions, chasing down dead-ends and reading a *lot* of other people's code and comments.

Most of the time, getting code to work isn't about intelligence, it's about grit. For more of an insight into just how important grit is, take a look at [Angela Lee Duckworth's video](https://www.youtube.com/watch?v=H14bBuluwB8&t=133s) on the power of perseverance. It's worth it in the end!


Being stuck is good.


## Bonus
<img src='https://raw.githubusercontent.com/ga-students/WDI-HK-14/master/images/favicon.ico' width='20' alt='terminal work' align='left' hspace='20'> Open a linux terminal and type `sudo apt-get install cowsay`. Type 'yes' if asked in the install. Now type `cowsay "Stick at it..."`

(If you're really bored, type `man cowsay` to get more cowsay options...)
