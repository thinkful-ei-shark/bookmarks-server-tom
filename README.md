# Bookmarks Server
(Forked from older repo becayse of git merging issues)
Use the boilerplate to start a new application named bookmarks-server

Configure logging and API key handling middleware on the server

Write a route handler for the endpoint GET /bookmarks that returns a list of bookmarks

Write a route handler for the endpoint GET /bookmarks/:id that returns a single bookmark with the given ID, return 404 Not Found if the ID is not valid

Write a route handler for POST /bookmarks that accepts a JSON object representing a bookmark and adds it to the list of bookmarks after validation.

Write a route handler for the endpoint DELETE /bookmarks/:id that deletes the bookmark with the given ID.