var express = require('express');
var five = require("johnny-five");
  button, led;
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var github = require('octonode');
var app = express();
var board = new five.Board();

//setup template handlebars as the template engine
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



});

app.get('/', function(req, res) {
    res.render('home');
})

var port = process.env.port || 3000;
app.listen(port, function() {
    console.log('App running at port :', port)
});
