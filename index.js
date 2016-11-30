var express = require('express');
var five = require("johnny-five");
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();
var board = new five.Board();

//setup template handlebars as the template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get("/",function(req, res) {
  res.render("home");
});


board.on("ready", function() {
  var piezo = new five.Piezo(9);
  var val = 0;


  var led = new five.Led(13);
  var led2 = new five.Led(10);
  led.on();
  var motion = new five.IR.Motion(7);

  // "calibrated" occurs once, at the beginning of a session,
  motion.on("calibrated", function() {
    console.log("calibrated", Date.now());
  });


  // "motionstart" events are fired when the "calibrated"
  // proximal area is disrupted, generally by some form of movement
  motion.on("motionstart", function() {
    console.log("motion detected", Date.now());
  });
  //play sound on motion detection
  this.loop(200, function() {
    if (val ^= 1) {
      // Play note a4 for 1/5 second
      piezo.frequency(five.Piezo.Notes["a4"], 200);
    }
  });

  // "motionend" events are fired following a "motionstart" event
  // when no movement has occurred in X ms
  motion.on("motionend", function() {
    console.log("motion end", Date.now());
  });


  app.get("/on", function(req, res){
    led.on();
    res.render("home");
  });

  app.get("/blink", function(req, res){
    led2.blink(50);
    res.render("home");
  });

  app.get("/stop-blink", function(req, res){
    led2.stop();
    res.render("home");
  });

  app.get("/off", function(req, res){
    led.off();
    res.render("home");
  });


});

var port = process.env.port || 3000;
app.listen(port, function(){
    console.log('App running at port :' , port)
});
