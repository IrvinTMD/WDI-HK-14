require "httparty"
URL = "http://www.omdbapi.com/"
result = HTTParty.get URL + URI.encode("?s=Die Hard&r=json")
result["Search"].each do |result|
    movie = HTTParty.get URL + URI.encode("?i=#{result["imdbID"]}&plot=full&r=json")
    puts movie
  end
# require "httparty"
# require "pry"

# URL = "http://www.omdbapi.com/"

# # query: search_query or movieId
# # type: :nil or :s to get search results or :id to get by id
# def get_api_result  query, type = nil
#   #by default we search
#   uri = if type.nil? || type == :s
#     "?s=#{query}&r=json"
#   elsif type == :id
#     "?i=#{query}&plot=full&r=json"
#   end
#   HTTParty.get URL + URI.encode(uri)
# end

# puts `clear`

# puts '
#  __     __    __     _____     ______           ______     ______   __           ______     __         __
# /\ \   /\ "-./  \   /\  __-.  /\  == \         /\  __ \   /\  == \ /\ \         /\  ___\   /\ \       /\ \
# \ \ \  \ \ \-./\ \  \ \ \/\ \ \ \  __<         \ \  __ \  \ \  _-/ \ \ \        \ \ \____  \ \ \____  \ \ \
#  \ \_\  \ \_\ \ \_\  \ \____-  \ \_____\        \ \_\ \_\  \ \_\    \ \_\        \ \_____\  \ \_____\  \ \_\
#   \/_/   \/_/  \/_/   \/____/   \/_____/         \/_/\/_/   \/_/     \/_/         \/_____/   \/_____/   \/_/
# '

# puts "\n\n Choose an Option \n 1) Search for a movie by title \n 2) Quit this program \n Type 1 or 2 :"
# option = gets.chomp


# while option != "2" do
#   puts "="* 50
#   puts "Please type a movie title: "
#   search_term = gets.chomp
#   get_api_result(search_term)["Search"].each do |result|
#     movie = get_api_result(result["imdbID"], :id)
#     puts "-"* 50
#     puts "#{movie["Title"]} (#{movie["Year"]})"
#     puts "Genre : #{movie["Genre"]}"
#     puts "Rating IMDB : #{movie["imdbRating"]}"
#     puts "Actors : #{movie["Actors"]}"
#     puts "Plot : #{movie["Plot"][0..300]} ..."
#   end
# end
