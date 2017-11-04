const express = require ('express')
const path = require ('path')
const app = express()
const helper = require('../helpers/getRedditPostsBySubreddit.js')
const db = require('../database')
var bcrypt = require('bcrypt-nodejs');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var session = require('express-session');


app.use(express.static(path.join(__dirname, '/../client/build')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({
  secret: 'happy',
  resave: false,
  saveUninitialized: false
}));


var port = 8080;

helper.getRedditData();


// TO-DO:
  // (SIGN-UP PAGE, LOGIN PAGE)

app.get('/',
  function(req, res) {
    if (req.session.user) {
      //Logged in
      res.render('data');
    } else {
      //Not logged in
      res.redirect('/login');
    }
})

app.post('/signup',function(req,res){

  var submittedUsername = req.body.username;
  var submittedPassword = '';
  bcrypt.hash(req.body.password, null,null, function(err,hash){
    submittedPassword = hash;
  });

  new User({ username : submittedUsername , password : submittedPassword }).fetch().then(function(found) {
    if (found) {
        req.session.regenerate(function(){
          req.session.user = found.attributes.username;
          res.writeHead(302,{Location: '/'});
          res.end();
        });
    } else {
        Users.create({
          username: submittedUsername,
          password: submittedPassword,
          userscore: 0
        })
        .then(function(newUser) {
          console.log('****', newUser)
          req.session.regenerate(function(){
            req.session.user = newUser.attributes.username;
            res.writeHead(302,{Location: '/'});
            res.end();
          });
          // res.status(200).send(newUser);
        });
    }
  });
})

app.post('/login', function(request, response) {
  var submittedUsername = request.body.username;
  var submittedPassword = request.body.password;
  var hash = '';
  console.log('user input password ', submittedPassword);
  new User({ username : submittedUsername}).fetch().then(function(found) {
    if (found) {
      console.log('found username and password ', found.attributes.username, found.attributes.password);
      hash = found.attributes.password
      bcrypt.compare(submittedPassword, hash, function(err,res){
        if(res){
          console.log('approved login ');
          request.session.regenerate(function(){
            request.session.user = found.attributes.username;
            request.session.userscore = found.attributes.userscore;
            response.writeHead(302,{Location: '/'});
            response.end();
          });
        } else {
          console.log('**INCORRECT CREDENTIALS');
          response.redirect('/login');
        }
    });
    } else {
      console.log('**INCORRECT CREDENTIALS');
      response.redirect('/login');
    }
  });

  console.log('done login');
});

app.get('/data', function (req, res) {
  db.Gif.findAll({
    //remove if last 3 char of url is not gifv
    where: {
      seen: false
    },
    limit: 3
  }).then(function(gifs){
    //update those 10 provided gifs to be seen
    gifs.forEach(function(gif){
      gif.updateAttributes({ seen: true });
    })
    res.json(gifs);
  })
});

  // (SERVE STATIC LEADERBOARD)
app.get('/leaderboard',function(req,res){


})
  // HANDLE SCORE COUNTS

app.listen(port,function () {
  console.log('Listening on port ' + port)
})
