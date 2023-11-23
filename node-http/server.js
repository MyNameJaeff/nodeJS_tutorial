const express = require("express"),
  server = express();

server.set("port", process.env.PORT || 8001);

//Basic routes
server.get("/", (request, response) => {
  response.send("Home page");
});

server.get("/about", (request, response) => {
  response.send("About page");
});

//Express error handling middleware
server.use((request, response) => {
  response.type("text/plain");
  response.status(505);
  response.send("Error page");
});

//Binding to a port
server.listen(8001, () => {
  console.log("Express server started at port 8001");
});
