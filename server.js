var gen = require("stability-client");
var express = require("express");
var app = express();
var server = require("http").Server(app);

var myKey = process.env.API_KEY;

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
app.get("/page/:id", function (request, response) {
  // Get the data from the API request and write it to 'id'
  var id = request.params.id;

  // Invoke the stability API
  // include the 'response' so we can
  // send something back to the client
  GenerateImage(id, response);

  // response.writeHead(200, { "Content-Type": "application/json" });
  // response.write(JSON.stringify(obj));
});

var GenerateImage = (text, response) => {
  const api = gen.generate({
    prompt: text,
    apiKey: myKey,
    width: 512,
    height: 512,
  });
  api.on("image", ({ buffer, filePath }) => {
    var imageSrc = filePath.replace(
      // Hiroku fix
      "/app",
      "https://skiesofastaapi.herokuapp.com"
    );
    // Send the image URL back to the client
    response.send(imageSrc);
    console.log("Image", buffer, filePath);
  });
  api.on("end", (data) => {
    console.log("Generating Complete", data);
  });
};

server.listen(process.env.PORT || 8081, function () {
  console.log("Listening on " + server.address().port);
});
