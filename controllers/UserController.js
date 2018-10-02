const UserModel = require('../models/UserModel.js');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

module.exports = {

    list: function (req, res) {
        UserModel.find(function (err, Users) {
            if (err) {
                return res.json({
                    message: 'Error when getting User.',
                    error: err
                });
            }
            return res.json(Users);
        });
    },

    show: function (req, res) {
        var id = req.params.id;
        UserModel.findOne({_id: id})
        .exec(function (err, User) {
            if (err) {
                return res.json({
                    message: 'Error when getting User.',
                    error: err
                });
            }
            if (!User) {
                return res.status(404).json({
                    message: 'No such User'
                });
            }
            return res.json(User);
        });
    },

    login: function (req, res) {
        console.log('LOGIN: ', req.body);
        var username = req.body.username;
        UserModel.findOne({username: username})
        .exec(function (err, User) {
          if (err) {
              console.log('LOGIN ERROR: ', err)
              return res.json({
                  message: 'Login failed.',
                  error: 'Login failed.'
              });
          }
          if (!User) {
              console.log('LOGIN NO USER')
              return res.json({
                  message: 'Login failed.',
                  error: 'Login failed.'
              });
          }

          if (User) {
              if(bcrypt.compareSync(req.body.password, User.password)) {
                  return res.json(User);
              } else {
                  console.log('LOGIN BCRYPT FAIL')
                  return res.json({
                      message: 'Login failed.',
                      error: 'Login failed.'
                  });
              }
          }
            
        });
    },

    create: function (req, res) {
        console.log('CREATE: ', req.body)
        var username = req.body.username;
        UserModel.findOne({username: username}, function (err, User) {
            if (err) {
                return res.json({
                    message: 'Error creating User.',
                    error: err
                });
            }

            if (User) {
                return res.json({
                    message: 'Error creating User.',
                    error: 'Error creating User.'
                });
            }

            if (!User) {
                var User = new UserModel({
                    username : req.body.username,
                    password : req.body.password,
                    email : req.body.email,
                    name : req.body.name,
                    avatar : req.body.avatar,
                    dob : req.body.dob,
                });
                console.log('PASSWORD: ', User.password);
                User.password = bcrypt.hashSync(User.password, salt);

                User.save(function (err, User) {
                    if (err) {
                        return res.json({
                            message: 'Error creating User.',
                            error: err
                        });
                    }
                    return res.json(User);
                });
            }
        });
    },

    update: function (req, res) {
        console.log(req.body)
        var id = req.params.id;
        UserModel.findOne({_id: id}, function (err, User) {
            if (err) {
                return res.json({
                    message: 'Error when getting User',
                    error: err
                });
            }
            if (!User) {
                return res.json({
                    message: 'No such User'
                });
            }
            console.log('USER: ', User)
            
            User.username = req.body.username ? req.body.username : User.username;
            User.password = req.body.password ? req.body.password : User.password;
            User.email = req.body.email ? req.body.email : User.email;
            User.name = req.body.name ? req.body.name : User.name;
            User.avatar = req.body.avatar ? req.body.avatar : User.avatar;
            User.dob = req.body.dob ? req.body.dob : User.dob;
			
            User.save(function (err, User) {
                if (err) {
                    return res.json({
                        message: 'Error when updating User.',
                        error: err
                    });
                }

                return res.json(User);
            });
        });
    },

    remove: function (req, res) {
        var id = req.params.id;
        UserModel.findByIdAndRemove(id, function (err, User) {
            if (err) {
                return res.json({
                    message: 'Error when deleting the User.',
                    error: err
                });
            }
            return res.json();
        });
    }
};