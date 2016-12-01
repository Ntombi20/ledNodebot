var express = require('express');
var five = require("johnny-five");
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();
// var board = new five.Board();

//setup template handlebars as the template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get("/",function(req, res) {
  res.render("home");
});


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

var port = process.env.port || 3000;
app.listen(port, function(){
    console.log('App running at port :' , port)
});
