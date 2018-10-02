const CommentModel = require('../models/CommentModel.js');

module.exports = {

    list: function (req, res) {
        CommentModel.find(function (err, Comments) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Comment.',
                    error: err
                });
            }
            return res.json(Comments);
        });
    },

    show: function (req, res) {
        var id = req.params.id;
        CommentModel.findOne({_id: id}, function (err, Comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Comment.',
                    error: err
                });
            }
            if (!Comment) {
                return res.status(404).json({
                    message: 'No such Comment'
                });
            }
            return res.json(Comment);
        });
    },

    create: function (req, res) {
        var Comment = new CommentModel({
          date : req.body.date,
          title : req.body.title,
          message : req.body.message,
          user : req.body.user,
          likes : req.body.likes,
          replies : req.body.replies,
        });

        Comment.save(function (err, Comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Comment',
                    error: err
                });
            }
            return res.status(201).json(Comment);
        });
    },

    update: function (req, res) {
        var id = req.params.id;
        CommentModel.findOne({_id: id}, function (err, Comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Comment',
                    error: err
                });
            }
            if (!Comment) {
                return res.status(404).json({
                    message: 'No such Comment'
                });
            }

            Comment.date = req.body.date ? req.body.date : Comment.date;
            Comment.title = req.body.title ? req.body.title : Comment.title,
            Comment.message = req.body.message ? req.body.message : Comment.message,
            Comment.user = req.body.user ? req.body.user : Comment.user,
            Comment.likes = req.body.likes ? req.body.likes : Comment.likes,
            Comment.replies = req.body.replies ? req.body.replies : Comment.replies,
			
            Comment.save(function (err, Comment) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Comment.',
                        error: err
                    });
                }

                return res.json(Comment);
            });
        });
    },

    remove: function (req, res) {
        var id = req.params.id;
        CommentModel.findByIdAndRemove(id, function (err, Comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Comment.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};