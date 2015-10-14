'use strict';

var app = require('express')(),
    passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
/*
 app.configure(function() {
 app.use(express.static('public'));
 app.use(express.cookieParser());
 app.use(express.bodyParser());
 app.use(express.session({ secret: 'keyboard cat' }));
 app.use(passport.initialize());
 app.use(passport.session());
 app.use(app.router);
 });
 */
app.get('/', function (req, res) {
    res.send('<h1>Hello World</h1>');
});

app.post('/login',
    passport.authenticate('local',
        {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: 'Invalied username or password'
        }));

app.set('port', (process.env.PORT || 5000));
var server = app.listen(app.get('port'), function () {

    var host = server.address().address;
    var port = server.address().port;
    console.log('Listing on http://%s:%s', host, port);
});


var GOOGLE_CONSUMER_KEY = '';
var GOOGLE_CONSUMER_SECRET = '';


passport.use(new GoogleStrategy({
        consumerKey: GOOGLE_CONSUMER_KEY,
        consumerSecret: GOOGLE_CONSUMER_SECRET,
        callbackURL: "http://127.0.0.1:5000/auth/google/callback"
    },
    function (token, tokenSecret, profile, done) {
        User.findOrCreate({googleId: profile.id}, function (err, user) {
            return done(err, user);
        });
    }
));


app.get('/auth/google',
    passport.authenticate('google', {scope: 'https://www.googleapis.com/auth/plus.login'}));

app.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect: '/login'}),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });
