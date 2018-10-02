const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserModel = require('./UserModel.js');
const CommentModel = require('./CommentModel.js');
const LikeModel = require('./LikeModel.js');

const PostSchema = new Schema({
	date : Date,
	title : String,
	message : String,
	image : String,
	user : UserModel,
	likes : [LikeModel],
	comments : [CommentModel],
});

module.exports = mongoose.model('Post', PostSchema);