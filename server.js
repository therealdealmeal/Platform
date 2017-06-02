var express = require('express');
var path = require('path');
var app = express();
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var port = process.env.PORT || '8000';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './client/static')));
app.use(cookieParser());

app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));

require('./server/config/mongoose.js');
require('./server/config/routes.js');
var routes_setter = require('./server/config/routes.js');
routes_setter(app);

app.listen(port, function() {
  console.log("listening on port " + port);
});
