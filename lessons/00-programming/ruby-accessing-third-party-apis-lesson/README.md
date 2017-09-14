---
title: Accessing third-party APIs
type: lesson
duration: "1:25"
creator:
    name: Gerry Mathe
    city: London
competencies: Programming
---

# Accessing third-party APIs

### Objectives
*After this lesson, students will be able to:*

- Identify all the HTTP Verbs & their uses
- Describe APIs & how we'll cover them in the next unit
- Use a Ruby gem to access public APIs & get information back

### Preparation
*Before this lesson, students should already be able to:*,

- Describe JSON objects
- Explain HTTP
- Run scripts using gems


## What is an API? (10 mins)

Taken from HowStuffWorks.com:

"An application-programming interface (API) is a set of programming instructions and standards for accessing a Web-based software application or Web tool. A software company releases its API to the public so that other software developers can design products that are powered by its service...[it] is a software-to-software interface, not a user interface. With APIs, applications talk to each other without any user knowledge or intervention."

The Guardian is a popular open-source platform used to access all the content the Guardian creates, categorized by tag and section. With over one and a half million items available, from as far back as 1999, Guardian created an API, making it possible to access all the data available on the website a simple web request.  We can access it using [http://open-platform.theguardian.com/]()

If you remember, JSON objects are a type of data collection that we can use to store/send information as developers. Try to go on [http://content.guardianAPIs.com/search?API-key=test](), and you'll notice the data rendered as JSON.  You can probably begin to think about how this will come in handy.

Find some more documentation on [http://open-platform.theguardian.com/documentation/]()

## Introduction to cURL - Demo (15 mins)

> Note: This can be delivered as a codealong.

`cURL` is an awesome, simple tool that allows transferring data and from and to any server from the command line.  It uses various protocols including HTTP.

#### Interacting with protocols

Want the HTML from a particular website?  Enter a web address as a cURL argument:

```bash
$ curl http://espn.com
```

Just like HTTP, cURL makes a `GET` request to the URL you specified and returns the response to the command line.  The only difference is that it's not pretty!  (Only the browser can do that with a response).

The output can be saved to a file using `-O` parameter (`-o` if you want to use your own name for the file).  For example:

```bash
$ curl -O https://pbs.twimg.com/profile_images/529751535115186176/CEUg_Blj.png
```

Try it yourself! Whatever directory you're in is where the file will be saved.

There are two handy parameters, especially useful for debugging:

- `-i` or `\--include` which returns header data from the server in the output
- `-v` or `\--verbose` which returns both header data sent to the server and returned by the server

#### Sending data to the server

`-d` or `\--data` parameter allows us to specify data to send to the HTTP server - just like a form submission. Invoking cURL with the `-d` parameter will make a POST request, instead of the default GET request. cURL will set `Content-Type` as `application/x-www-form-urlencoded` automatically, and multiple parameters or queries should be separated by `&` or specified with a separate `-d` parameter for each field.

    $ curl -d "name='Mr. Ed'" -d 'age=30' -d 'animal=horse' http://animaldata.com/

And we can totally send data in JSON, too. Just like in your HTML, `Content-Type` has to be explicitly set to `application/json` so the server knows how to handle the incoming data.

    $ curl -d '{"user": {"name": "Mr. Ed"}}' -H "Content-Type: application/json" http://server/

The data can be also read from a file or from the standard input:

    $ curl -d @mredsdata.csv http://animaldata.com/dataupload
    $ curl -d @- http://animaldata.com/dataupload
    { "name": "Mr. Ed" }

To work with incoming responses, we can use the `Accept` header, used to tell the server what content types we accept as a client. We'll get a `Content-Type` in the response to inform us about the data being returned. So, `Content-Type` is a header used to specify the data being sent both, from and to the client.


## Use an API with Ruby - Codealong (15 mins)

We're going to write a Ruby script that uses a gem (`HTTParty`) to execute HTTP requests getting movie information as per a user's requests.

#### Pseudocode it

1. The user will be asked to type a movie title in the terminal - with this title the script will execute a request to IMDb API.
2. The response from the API will contain a hash like this

```json
[{"Title"=>"Die Hard", "Year"=>"1988", "imdbID"=>"tt0095016", "Type"=>"movie"}
{"Title"=>"Live Free or Die Hard", "Year"=>"2007", "imdbID"=>"tt0337978", "Type"=>"movie"}]
...

```

3. For each object in the array, the script will request the API to get the data for a specific movie using the key "imdbID" - the response will look like this:

```json

{"Title"=>"Die Hard", "Year"=>"1988", "Rated"=>"R", "Released"=>"20 Jul 1988", "Runtime"=>"131 min", "Genre"=>"Action, Thriller", "Director"=>"John McTiernan", "Writer"=>"Roderick Thorp (novel), Jeb Stuart (screenplay), Steven E. de Souza (screenplay)", "Actors"=>"Bruce Willis, Bonnie Bedelia, Reginald VelJohnson, Paul Gleason", "Plot"=>"New York City Detective John McClane has just arrived in Los Angeles to spend Christmas with his wife, but when a group of terrorists, led by Hans Gruber, holds her and everyone in the Nakatomi Plaza building hostage, it's up to McClane to stop them.",
"Language"=>"English, German, Italian", "Country"=>"USA", "Awards"=>"Nominated for 4 Oscars. Another 6 wins & 2 nominations.", "Poster"=>"http://ia.media-imdb.com/images/M/MV5BMTY4ODM0OTc2M15BMl5BanBnXkFtZTcwNzE0MTk3OA@@._V1_SX300.jpg", "Metascore"=>"70", "imdbRating"=>"8.3", "imdbVotes"=>"522,749", "imdbID"=>"tt0095016", "Type"=>"movie", "Response"=>"True"}


```

#### Code it

Let's install the HTTparty gem, a library that makes is _super_ easy to request and handle responses from APIs:

```
gem install httparty

```

Let's create a ruby file `omdb-cli-API.rb`.  First of all, we're going to require the gem, so open the file and type:


```ruby
require "httparty"

```

This script will always require the same domain (http://www.omdbAPI.com/), thus we will store this domain in a CONSTANT:

```ruby

require "httparty"
URL = "http://www.omdbAPI.com/"

```

Let's play with the API and make a request to the search page for "Die Hard", that we specify as a query parameter with `.encode`:

```ruby

require "httparty"
URL = "http://www.omdbAPI.com/"
result = HTTParty.get URL + URI.encode("?s=Die Hard&r=json")
puts result["Search"]
```

Run it!  This code will print an array containing all the corresponding results, but only the title is included in each object, to get all the details for a specific movie, we need to to a request for this movie using the imdbId:


```ruby

require "httparty"
URL = "http://www.omdbAPI.com/"
result = HTTParty.get URL + URI.encode("?s=Die Hard&r=json")
result["Search"].each do |result|
  movie = HTTParty.get URL + URI.encode("?i=#{result["imdbID"]}&plot=full&r=json")
  puts movie
end
```

Now, the variable `movie` contains all the details for a specific movie that we search for - in this case, Die Hard.

We are repeating a lot of code when we execute a HTTP request - all the HTTParty logic appears two times, so we will move all the code related to HTTP to a method, right after declaring the constant `URL`, add:

```ruby
def get_API_result  query, type = nil
  #by default we search
  uri = if type.nil? || type == :s
    "?s=#{query}&r=json"
  elsif type == :id
    "?i=#{query}&plot=full&r=json"
  end
  HTTParty.get URL + URI.encode(uri)
end
```

> Note: Slowly walk students through this code and what each line is doing.

This method will decide which uri to generate (for a search result in the `if` or for a result by ID in `elsif`) and then execute the request on the last line.  By default, the response will be returned.

Let's update the code to use this method, replace the each loop on the array `result["Search"]` with:

```ruby
get_API_result(search_term)["Search"].each do |result|
  movie = get_API_result(result["imdbID"], :id)
  puts movie
end
```

instead of showing the raw hash `movie`, let's format the data a bit :

```ruby
get_API_result(search_term)["Search"].each do |result|
  movie = get_API_result(result["imdbID"], :id)
  puts "-"* 50
  puts "#{movie["Title"]} (#{movie["Year"]})"
  puts "Genre : #{movie["Genre"]}"
  puts "Rating IMDB : #{movie["imdbRating"]}"
  puts "Actors : #{movie["Actors"]}"
  puts "Plot : #{movie["Plot"][0..300]} ..."
end
```

We can add some header info when the script is run - and another option at the start to quit or do a research - and loop on the user input:

```ruby
puts "\n\n Choose an Option \n 1) Search for a movie by title \n 2) Quit this program \n Type 1 or 2 :"
option = gets.chomp


while option != "2" do
	puts "="* 50
    puts "Please type a movie title: "
    search_term = gets.chomp
    get_API_result(search_term)["Search"].each do |result|
    	...
end
```
Let's take a a look at the entire file:

```ruby


require "httparty"
require "pry"

URL = "http://www.omdbAPI.com/"

# query: search_query or movieId
# type: :nil or :s to get search results or :id to get by id
def get_API_result  query, type = nil
  #by default we search
  uri = if type.nil? || type == :s
    "?s=#{query}&r=json"
  elsif type == :id
    "?i=#{query}&plot=full&r=json"
  end
  HTTParty.get URL + URI.encode(uri)
end

puts `clear`

puts '
 __     __    __     _____     ______           ______     ______   __           ______     __         __
/\ \   /\ "-./  \   /\  __-.  /\  == \         /\  __ \   /\  == \ /\ \         /\  ___\   /\ \       /\ \
\ \ \  \ \ \-./\ \  \ \ \/\ \ \ \  __<         \ \  __ \  \ \  _-/ \ \ \        \ \ \____  \ \ \____  \ \ \  
 \ \_\  \ \_\ \ \_\  \ \____-  \ \_____\        \ \_\ \_\  \ \_\    \ \_\        \ \_____\  \ \_____\  \ \_\
  \/_/   \/_/  \/_/   \/____/   \/_____/         \/_/\/_/   \/_/     \/_/         \/_____/   \/_____/   \/_/
'

puts "\n\n Choose an Option \n 1) Search for a movie by title \n 2) Quit this program \n Type 1 or 2 :"
option = gets.chomp


while option != "2" do
  puts "="* 50
  puts "Please type a movie title: "
  search_term = gets.chomp
  get_API_result(search_term)["Search"].each do |result|
    movie = get_API_result(result["imdbID"], :id)
    puts "-"* 50
    puts "#{movie["Title"]} (#{movie["Year"]})"
    puts "Genre : #{movie["Genre"]}"
    puts "Rating IMDB : #{movie["imdbRating"]}"
    puts "Actors : #{movie["Actors"]}"
    puts "Plot : #{movie["Plot"][0..300]} ..."
  end
end

```

## Independent Practice (20 minutes)

Create a rails app and scaffold a resource(i.e.: `Book` with title and content). Try to access every RESTful method from the controller through `curl`.
You'll need to use some options to change the default HTTP verb `GET` and remember, after `rails s` you'll be `cURL`-ing with `localhost`.

Try to:

- Create two books
- Get a response with all the books
- Get a response with one book
- Delete a book
- Update a book

## Conclusion (5 mins)
We've seen how to consume an API hosted on a server and interact with it using ruby. We will later see how to use an API with Rails, Node, and other frameworks.  Also, we will dive into creating an API and authenticate users through APIs.

- What is an API?
- How does cURL compare to a browser client?
