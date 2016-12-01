var express = require('express');
var five = require("johnny-five");
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var github = require('octonode');
var client = github.client({
  username: 'ntombi20',
  password: process.env.PASS
});
var app = express();
var board = new five.Board();
var ghrepo = client.repo('radlee/hub');
var ghpr = client.pr('radlee/hub', 37);

//setup template handlebars as the template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


client.get('/user', {}, function (err, status, body, headers) {
  console.log(body); //json object
});

// var client = github.client({
//   username: 'radlee',
//   password: process.env.PASS
// },{
//   hostname: 'mydomain.com/api/v3'
// });


client.get('/users/pksunkara', {}, function (err, status, body, headers) {
  console.log(body); //json object
});

app.get("/",function(req, res) {
  res.render("home");
});

app.get("/",function(req, res) {
  res.render("home");
});


<<<<<<< HEAD
board.on("ready", function() {

  var pullRequestLED = new five.Led(13);
  var mergeLED = new five.Led(12);
  pullRequestLED.off();

  app.get("/pullRequestOn", function(req, res){
    pullRequestLED.on();
    res.render("home");
  });

  app.get("/mergeOn", function(req, res){
    mergeLED.on();
    res.render("home");
  });

  app.get("/pullRequestOff", function(req, res){
    pullRequestLED.off();
    res.render("home");
  });

  app.get("/mergeOff", function(req, res){
    mergeLED.off();
    res.render("home");
  });


});
=======
// board.on("ready", function() {
//
//   var pullRequestLED = new five.Led(13);
//   var mergeLED = new five.Led(12);
//   pullRequestLED.off();
//
//   app.get("/pullRequestOn", function(req, res){
//     pullRequestLED.on();
//     res.render("home");
//   });
//
//   app.get("/mergeOn", function(req, res){
//     mergeLED.on();
//     res.render("home");
//   });
//
//   app.get("/pullRequestOff", function(req, res){
//     pullRequestLED.off();
//     res.render("home");
//   });
//
//   app.get("/mergeOff", function(req, res){
//     mergeLED.off();
//     res.render("home");
//   });
//
//
// });
>>>>>>> 4829a7a26f4f17040b9a18e8118abb023684b65d

var port = process.env.port || 3000;
app.listen(port, function(){
    console.log('App running at port :' , port)
});
