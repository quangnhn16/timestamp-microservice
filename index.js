// index.js
// where your node app starts
const {
  isValidDateString,
  isValidUnixString,
} = require("./utils/date.utils.js");

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname + "/public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date", (req, res) => {
  const dateParam = req.params.date;
  if (isValidDateString(dateParam)) {
    let dateObj = new Date(dateParam);
    let unixTimestamp = dateObj.getTime();
    let utcTimestamp = dateObj.toUTCString();
    res.json({ unix: unixTimestamp, utc: utcTimestamp });
  } else if (isValidUnixString(dateParam)) {
    let unixTimestamp = parseInt(dateParam, 10);
    let date = new Date(unixTimestamp);
    let utcTimestamp = date.toUTCString();
    res.json({ unix: unixTimestamp, utc: utcTimestamp });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

app.get("/api", (req, res) => {
  let dateObj = new Date();
  let unixTimestamp = dateObj.getTime();
  let utcTimestamp = dateObj.toUTCString();
  res.json({ unix: unixTimestamp, utc: utcTimestamp });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
