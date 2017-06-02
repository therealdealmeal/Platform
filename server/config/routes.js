var users = require('./../controllers/users.js');

module.exports = function(app,passport) {

  app.get('/', function(req,res) {
    users.index(req,res);
  });

  app.get('/login', function(req, res) {
    res.render('login', { message: req.flash('loginMessage') })
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));

  app.get('/login', function(req,res) {
    res.render('login');
  });

  app.get('/new', function(req, res) {
    res.render('new');
  });

  app.post('/create', function(req, res) {
    users.create(req, res);
  });

  app.get('/:id', isLoggedIn, function(req, res) {
    users.show(req, res);
  });

  app.get('/:id/edit', isLoggedIn, function(req, res) {
    users.edit(req, res);
  });

  app.post('/:id/update', function(req, res) {
    users.update(req, res);
  });

  app.post('/:id/destroy', function(req, res) {
    users.destroy(req, res);
  });

  function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }

    res.redirect('/login');
  }
}
