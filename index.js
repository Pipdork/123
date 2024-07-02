// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Helper function to format date to UTC string
const formatDateToUTC = (date) => {
  return date.toUTCString();
};

// API endpoint to handle date input
app.get('/api/:date?', (req, res) => {
  let date;
  const dateString = req.params.date;

  if (!dateString) {
    // No date parameter provided, use current date
    date = new Date();
  } else if (!isNaN(dateString)) {
    // Date parameter is a Unix timestamp in milliseconds
    date = new Date(parseInt(dateString));
  } else {
    // Date parameter is a date string
    date = new Date(dateString);
  }

  // Check for invalid date
  if (date.toString() === 'Invalid Date') {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),
      utc: formatDateToUTC(date)
    });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
