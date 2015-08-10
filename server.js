////////// DEPENDENCIES ////////////////////

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var request = require('request');
var twilio = require('twilio');

var accountSid = 'AC90eb6a2c4ccf2c6316a84935ff6dd505';
var authToken = '718006ea9ec5ec0c6bfa82d19f1ae0b9';

var client = twilio(accountSid, authToken);

var app = express();
var port = 3030;

///////// MIDDLEWARE ///////////////////////

app.use(express.static('public'));
app.use(bodyParser());
app.use(cors());

var message = {
  "message": "HELLO WORLD!!"
}


///////// ENDPOINTS ///////////////////////

app.get('/api/message', function(req, res) {
  return res.json(message);
})

app.post('/api/send_text_message', function(req, res) {
  console.log(req.body.message);
  // request.post('https://' + accountSid + ':' + authToken + '@api.twilio.com/2010-04-01/Accounts/')
  client.messages.create({
  	to: "4358625906",
  	from: "+13852357212",
  	body: "Magg's Lashes Reminder: Your Full Set is scheduled for Monday at 9:00am. Thanks!",
  }, function(err, message) {
  	console.log(message.sid);
  });
});


app.listen(port, function() {
  console.log("I'm watching you....", port);
})
