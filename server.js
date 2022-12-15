// require("dotenv").load();
// var fs = require('fs');

var express = require("express");
var app = express();
var server = require("http").Server(app);

const dotenv = require("dotenv");
dotenv.config();

var ConnectDB = require("./lib/DataBase.js");
ConnectDB.start();

var ImgGen = require("./lib/ImageGenerator.js");

server.listen(process.env.PORT || 8081, function () {
  console.log("Listening on " + server.address().port);
});

const imageStore = {};

// Allow CORS access to the api server
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// Expose .out folder to serve images to client
app.use("/.out", express.static(__dirname + "/.out"));

// Send test test response when accessing root
app.get("/", function (request, response) {
  response.send("Hello from the root application URL");
});

// Process the API request from a client
app.get(
  "/page/:prompt/:story1/:story2/:story3/:story4",
  function (request, response) {
    // Get the data from the API request and write it to 'id'
    var prompt = request.params.prompt;
    var storyObject = {
      story1: request.params.story1,
      story2: request.params.story2,
      story3: request.params.story3,
      story4: request.params.story4,
    };

    // console.log(storyObject, prompt);
    // Invoke the stability API
    // include the 'response' so we can
    // send something back to the client

    ImgGen.GenerateImage(prompt, response, storyObject);

    // response.writeHead(200, { "Content-Type": "application/json" });
    // response.write(JSON.stringify(obj));
  }
);
