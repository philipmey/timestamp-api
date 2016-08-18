var express = require('express');
var strftime = require('strftime');
var app = express();

// Static page to serve when no parameters are passed
app.get('/', function (req, res) {
    //console.log(req);
  res.send('<html><body> \
  <h1>API-Projects: Timestamp Microservice</h1> \
  <h2>Functionality: </h2> \
  <ol> \
  <li>I can pass a string as a parameter and it will check to see whether that string contains either a unix timestamp or a natural language date. \
  <ul> \
  <li>If it does, it returns both the Unix timestamp and the natural language form of that date.</li> \
  <li>If it does not, it returns null for those properties.</li> \
  </ul> \
  </li> \
  </ol> \
  <h2>Examples: </h2> \
  <p>https://' + req.headers.host + '/December%2015,%202015<br/>https://' + req.headers.host + '/1450137600<br/>https://' + req.headers.host + '/December 15, 2015</p> \
  <h2>Outputs: </h2> \
  <p>Valid request: { "unix": 1450137600, "natural": "December 15, 2015" }<br/>Invalid request: { "unix": null, "natural": null }</p> \
  </body></html>');
});

// If parameters are passed assign it to the variable "timestamp"
app.get('/:timestamp', function(req, res){
    // Try parsing the timestamp to a date.
    
    var answer = Date.parse(req.params.timestamp);
    
    // If successful return { "unix": unixtime, "natural": %m %DD, %YYYY }
    if (!isNaN(answer))
    {
        res.send({ "unix": (answer/1000), "natural": strftime('%B %d, %Y', new Date(answer))})
    }
    // else return {"unix": null, "natural": null}
    else
    {
        var sampleDate = new Date();
        sampleDate.setTime(Number(req.params.timestamp)*1000);
        if (!isNaN(sampleDate))
        {
            res.send({ "unix": req.params.timestamp, "natural": strftime('%B %d, %Y', sampleDate)})
        }
        else {
        res.send({ "unix": null, "natural": null});
        }
    }
    
    
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});