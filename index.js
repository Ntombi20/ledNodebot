var express = require('express');
var five = require("johnny-five");
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

var client = github.client();

var specificUserFilePool = function(ghUserId, repository_name, cb){

    client
        .get('/repos/' + ghUserId + '/' + repository_name + '/pulls' , function(err, results, data){
          var pullRequest = data.forEach(function(item){
            var detailedUserContentObj ={
              username: item.user,
              comment: item.body,
              close: item.closed_at,
              state: item.state
            }
            console.log(detailedUserContentObj);
            process.nextTick(function(){
                cb(err, detailedUserContentObj);
            })
          })

          board.on("ready", function() {
              console.log(detailedUserContentObj.state);
              var pullRequestLED = new five.Led(13);

              pullRequestLED.off();

              app.get("/pullRequestOn", function(req, res) {
                  pullRequestLED.on();
                  res.render("home");
              });

              app.get("/pullRequestOff", function(req, res) {
                  pullRequestLED.off();
                  res.render("home");
              });

          });

        // var holdFileNames = data.map(function(entry){
        //     var holdAllFiles = entry.name;
        //       return holdAllFiles;
        // })
        // // console.log(holdFileNames.length);
        // var file_No = holdFileNames.length
        // // gather user specifics but without the get user module(Plugin)
        // var detailedUserContentObj = {
        //      ghUserId :  ghUserId,
        //      repository_name : repository_name,
        //      holdFileNames : file_No
        // };
            //make sure it's a true async call


        // console.log(username + " ," + pul);
        // console.log(data);
        // return data?;
          });


};

var trackedUser = 'Ntombi20';
app.get('/', function(req, res){

  specificUserFilePool('Ntombi20', 'ledNodebot', function(err, detailedUserContent){
    // res.send(data)
      res.render('home',{
        filesNameResult : detailedUserContent
    })
  });
});

app.get('/', function(req, res){
	res.render('home');
})

var port = process.env.port || 3000;
app.listen(port, function() {
    console.log('App running at port :', port)
});
