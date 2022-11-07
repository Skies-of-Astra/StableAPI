var gen = require("stability-client");
var express = require("express");
var app = express();
var server = require("http").Server(app);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/.out", express.static(__dirname + "/.out"));

app.get("/page/:id", function (request, response) {
  // response.send("Hello from the root application URL");
  var id = request.params.id;
  // do something with id
  // send a response to user based on id
  var obj = { id: id, Content: "content " + id };
  GenerateImage(id, response);
  // response.writeHead(200, { "Content-Type": "application/json" });
  // response.write(JSON.stringify(obj));
});

var GenerateImage = (text, response) => {
  const api = gen.generate({
    prompt: text,
    apiKey: "sk-mNuJohiDTdyYBro38Rp5K42pE1eXOOWC1C2dU8TAdpRaRnLm",
    width: 2048,
    height: 2048,
  });
  api.on("image", ({ buffer, filePath }) => {
    var imageSrc = filePath.replace(
      "/Users/lech/Dropbox/_react_course/firstapp/AIServer",
      "http://localhost:8081"
    );
    var imageSrc = filePath;
    // response.send(`<img src=${imageSrc}>`);
    response.send(imageSrc);
    console.log("Image", buffer, filePath);
  });
  api.on("end", (data) => {
    console.log("Generating Complete", data);
  });
  // return imageSrc;
};

server.listen(process.env.PORT || 8081, function () {
  console.log("Listening on " + server.address().port);
});
