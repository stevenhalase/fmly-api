const LikeModel = require('../models/LikeModel.js');

module.exports = {

    list: function (req, res) {
        LikeModel.find(function (err, Likes) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Like.',
                    error: err
                });
            }
            return res.json(Likes);
        });
    },

    show: function (req, res) {
        var id = req.params.id;
        LikeModel.findOne({_id: id}, function (err, Like) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Like.',
                    error: err
                });
            }
            if (!Like) {
                return res.status(404).json({
                    message: 'No such Like'
                });
            }
            return res.json(Like);
        });
    },

    create: function (req, res) {
        var Like = new LikeModel({
          date : req.body.date,
          user : req.body.user,
          post : req.body.post,
          comment : req.body.comment,
        });

        Like.save(function (err, Like) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Like',
                    error: err
                });
            }
            return res.status(201).json(Like);
        });
    },

    update: function (req, res) {
        var id = req.params.id;
        LikeModel.findOne({_id: id}, function (err, Like) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Like',
                    error: err
                });
            }
            if (!Like) {
                return res.status(404).json({
                    message: 'No such Like'
                });
            }

            Like.date = req.body.date ? req.body.date : Like.date,
            Like.user = req.body.user ? req.body.user : Like.user,
            Like.post = req.body.post ? req.body.post : Like.post,
            Like.comment = req.body.comment ? req.body.comment : Like.comment,
			
            Like.save(function (err, Like) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Like.',
                        error: err
                    });
                }

                return res.json(Like);
            });
        });
    },

    remove: function (req, res) {
        var id = req.params.id;
        LikeModel.findByIdAndRemove(id, function (err, Like) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Like.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};