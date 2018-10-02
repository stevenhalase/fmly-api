const PostModel = require('../models/PostModel.js');

module.exports = {

    list: function (req, res) {
        PostModel.find(function (err, Posts) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Post.',
                    error: err
                });
            }
            return res.json(Posts);
        });
    },

    show: function (req, res) {
        var id = req.params.id;
        PostModel.findOne({_id: id}, function (err, Post) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Post.',
                    error: err
                });
            }
            if (!Post) {
                return res.status(404).json({
                    message: 'No such Post'
                });
            }
            return res.json(Post);
        });
    },

    create: function (req, res) {
        var Post = new PostModel({
          date : req.body.date,
          title : req.body.title,
          message : req.body.message,
          image : req.body.image,
          user : req.body.user,
          likes : req.body.likes,
          comments : req.body.comments,
        });

        Post.save(function (err, Post) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Post',
                    error: err
                });
            }
            return res.status(201).json(Post);
        });
    },

    update: function (req, res) {
        var id = req.params.id;
        PostModel.findOne({_id: id}, function (err, Post) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Post',
                    error: err
                });
            }
            if (!Post) {
                return res.status(404).json({
                    message: 'No such Post'
                });
            }

            Post.author = req.body.author ? req.body.author : Post.author;
            Post.date = req.body.date ? req.body.date : Post.date,
            Post.title = req.body.title ? req.body.title : Post.title,
            Post.message = req.body.message ? req.body.message : Post.message,
            Post.image = req.body.image ? req.body.image : Post.image,
            Post.user = req.body.user ? req.body.user : Post.user,
            Post.likes = req.body.likes ? req.body.likes : Post.likes,
            Post.comments = req.body.comments ? req.body.comments : Post.comments,
			
            Post.save(function (err, Post) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Post.',
                        error: err
                    });
                }

                return res.json(Post);
            });
        });
    },

    remove: function (req, res) {
        var id = req.params.id;
        PostModel.findByIdAndRemove(id, function (err, Post) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Post.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};