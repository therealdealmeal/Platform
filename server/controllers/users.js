var mongoose = require('mongoose');
var User = mongoose.model('User');
var User = require('../models/user');
mongoose.Promise = global.Promise;

module.exports = {

  index: function(req,res) {
    User.find({}, function(err,user) {
      if(err) {
        console.log(err);
      } else {
        res.render('index', { users:user });
      }
    });
  },

  create: function(req,res) {
    var user = new User();
    user.email = req.body.email;
    user.password = user.generateHash(req.body.password);
    user.save(function(err) {
      if(err) {
        console.log("Something went wrong with creating new user");
      } else {
        console.log("Successfully created new user");
        res.redirect('/');
      }
    })
  },

  show: function(req,res) {
    var users = User.findOne({_id: req.params.id}, function(err,user) {
      if(err) {
        console.log("Something went wrong with showing user")
      } else {
        console.log("Successfully got show user page");
        res.render('show', { users:user });
      }
    });
  },

  edit: function(req, res) {
    var users = User.findOne({ _id: req.params.id }, function(err, user) {
      if(err) {console.log('something went wrong');
      } else {
        console.log('successfully got to edit page!');
        res.render('edit', { users:user });
      }
    })
  },

  update: function(req, res) {
    User.findOne({_id: req.params.id}, function(err, user) {
      user.email = req.body.email;
      user.password = user.generateHash(req.body.password);
      user.save(function(err) {
        if(err) {console.log('something went wrong with updating user');
        } else {
          console.log('successfully got to update user!');
          res.redirect('/')
        }
      })
    });
  },

  destroy: function(req, res) {
    User.remove({_id: req.params.id}, function(err) {
      if(err) {console.log('something went wrong with deleting user');
      } else {
        console.log('successfully got to delete user!');
        res.redirect('/');
      }
    })
  }
}
