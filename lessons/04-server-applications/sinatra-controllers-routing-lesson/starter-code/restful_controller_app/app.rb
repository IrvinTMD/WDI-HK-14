class RestfulControllerApp < Sinatra::Base

  # GET "/books" - Gets all the books we have

  get "/books" do
    # get all books
  end

  get "/books/new" do
    # get a form for a new book
  end

  # POST "/books" - Create a new book, add it to our list
  post "/books" do
    # posting new book stuff
  end

  # GET "/books/3" - Just get the information associated one specific book (that already exists, book id = 3)
  get "/book/:id" do
    # get specific book
  end

  # GET "/books/3" - Just get the information associated one specific book (that already exists, book id = 3)
  get "/book/:id/edit" do
    # get form to edit a specific book
  end

  # PUT "/books/3" - Updates a specific book
  put "/books/:id" do
    # some code here
  end

  # PATCH "/books/3" - Partially updates a specific book
  patch "/books/:id" do
    # some code here
  end

  # DELETE "/books/3" - Deletes a specific book
  delete "/books/:id" do
    # some code here
  end

end
