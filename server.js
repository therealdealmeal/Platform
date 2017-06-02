var express = require('express');
var path = require('path');
var app = express();
var morgan = require('morgan');
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var port = process.env.PORT || '8000';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: 'anystring of text for secret session',
                saveUninitialized: true,
                resave: true}));

app.use(express.static(path.join(__dirname, './client/static')));
app.use(cookieParser());

require('./server/config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));

require('./server/config/mongoose.js');
require('./server/config/routes.js');
var routes_setter = require('./server/config/routes.js');
routes_setter(app, passport);

app.listen(port, function() {
  console.log("listening on port " + port);
});
