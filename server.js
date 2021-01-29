// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();
const { networkInterfaces } = require('os');
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

//const jsonify = (ipaddress, language, software) => ({"ipaddress": ipaddress.toString(),"language":language.toString(),
//"software":software.toString()})



app.get("/api/whoami", function (req, res){
 

  const jsonObject = {
  "ipaddress": null,
  "language": null,
  "software": null
}

jsonObject["ipaddress"] = req.connection.remoteAddress;
jsonObject["language"] = req.headers["accept-language"];
jsonObject["software"] = req.headers["user-agent"];


console.log(jsonObject);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(jsonObject));
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
