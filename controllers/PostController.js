const PostModel = require('../models/PostModel.js');

module.exports = {

    list: function (req, res) {
        PostModel.find()
            .populate('user')
            .populate('likes')
            .populate('comments')
            .populate({ 
                path: 'comments',
                populate: {
                    path: 'user'
                } 
            })
            .populate({ 
                path: 'comments',
                populate: {
                    path: 'likes'
                } 
            })
            .populate({ 
                path: 'comments',
                populate: {
                    path: 'replies'
                } 
            })
            .exec(function (err, Posts) {
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
        PostModel.findOne({_id: id})
            .populate('user')
            .populate('likes')
            .populate('comments')
            .populate({ 
                path: 'comments',
                populate: {
                    path: 'user'
                } 
            })
            .populate({ 
                path: 'comments',
                populate: {
                    path: 'likes'
                } 
            })
            .populate({ 
                path: 'comments',
                populate: {
                    path: 'replies'
                } 
            })
            .exec(function (err, Post) {
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
          message : req.body.message,
          image : req.body.image,
          user : req.body.user,
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
            Post.message = req.body.message ? req.body.message : Post.message,
            Post.image = req.body.image ? req.body.image : Post.image,
            Post.user = req.body.user ? req.body.user : Post.user,
			
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