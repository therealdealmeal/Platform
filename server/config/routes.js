var users = require('./../controllers/users.js');

module.exports = function(app) {

  app.get('/', function(req,res) {
    users.index(req,res);
  });

  app.get('/new', function(req, res) {
    res.render('new');
  });

  app.post('/create', function(req, res) {
    users.create(req, res);
  });

  app.get('/:id', function(req, res) {
    users.show(req, res);
  });

  app.get('/:id/edit', function(req, res) {
    users.edit(req, res);
  });

  app.post('/:id/update', function(req, res) {
    users.update(req, res);
  });

  app.post('/:id/destroy', function(req, res) {
    users.destroy(req, res);
  });
}
