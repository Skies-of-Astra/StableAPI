const express = require("express");
const app = express();
const server = require("http").Server(app);

// Run env variables for API key
const dotenv = require("dotenv");
dotenv.config();

// Load custom modules
const imgGen = require("./lib/ImageGenerator.js");
const mongoClient = require("./lib/MongoClient.js");
mongoClient.start();

// --- Configure and run API with express

// Notify that server is running
server.listen(process.env.PORT || 8081, function () {
  console.log("Listening on " + server.address().port);
});

// Allow CORS access to the api server
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// (TODO: remove not needed) Expose .out folder to serve images to client
app.use("/.out", express.static(__dirname + "/.out"));

// Send test response when accessing root
app.get("/", function (request, response) {
  response.send("Hello from the root application URL");
});

// Process the API request from a client
app.get(
  "/page/:prompt/:story1/:story2/:story3/:story4",
  function (request, response) {
    // Get the data from the API request and write it to 'id'
    let prompt = request.params.prompt;

    let storyObject = {
      story1: request.params.story1,
      story2: request.params.story2,
      story3: request.params.story3,
      story4: request.params.story4,
    };
    imgGen.GenerateImage(prompt, response, storyObject);
  }
);
