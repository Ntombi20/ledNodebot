var express = require('express');
var five = require("johnny-five");
<<<<<<< HEAD
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
=======
  button, led;
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var github = require('octonode');
>>>>>>> 8d34fd1db53aa00cbaf741277b7e49f009a46dbc
var app = express();
var board = new five.Board();

//setup template handlebars as the template engine
<<<<<<< HEAD
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
=======
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

var client = github.client('de64335ac833748acba2ad3ad7cdd3baa5f724b3');

var specificUserFilePool = function(ghUserId, repository_name, cb) {

    client
        .get('/repos/' + ghUserId + '/' + repository_name + '/pulls', function(err, results, data) {
            if (err) return cb(err);

            if (!data) {
                return cb(null, {})
            }

            var pullRequests = data.map(function(item) {
                return {
                    username: item.user,
                    comment: item.body,
                    close: item.closed_at,
                    state: item.state
                }
            });
            cb(null, pullRequests)
        });
};

five.board().on("ready", function() {

    var pullRequestLED = new five.Led(13);
    var pullLocal = new five.Led(12);

    var button = new five.Button({
      pin: 2,
      isPullup: true
    });
    pullRequestLED.off();

    button.on("down", function(value) {
      led.on();
    });

    button.on("up", function() {
      led.off();
    });
    setInterval(function() {
        specificUserFilePool('Ntombi20', 'ledNodebot', function(err, pullRequests) {
            if (err) {
                console.log(err);
            }

            if (pullRequests.length === 0) {
                pullRequestLED.off();
                console.log("on");
                pullLocal.on();
            } else {
                // console.log(pullRequests.state);
                var pullRequest = pullRequests[0];
                if (pullRequest.state) {

                    if (pullRequest.state === "open") {
                        pullRequestLED.on();
                    }

                } else {
                    console.log('state not available');
                }
            }

        });
    }, 1000 * 3);

>>>>>>> 8d34fd1db53aa00cbaf741277b7e49f009a46dbc


});

<<<<<<< HEAD
var port = process.env.port || 3000;
app.listen(port, function(){
    console.log('App running at port :' , port)
=======
app.get('/', function(req, res) {
    res.render('home');
})

var port = process.env.port || 3000;
app.listen(port, function() {
    console.log('App running at port :', port)
>>>>>>> 8d34fd1db53aa00cbaf741277b7e49f009a46dbc
});
