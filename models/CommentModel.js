const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserModel = require('./UserModel.js');
const LikeModel = require('./LikeModel.js');

const CommentSchema = new Schema({
	date : Date,
	title : String,
	message : String,
	user : UserModel,
	likes : [LikeModel],
});

CommentSchema.add({ replies: [CommentSchema] });

module.exports = mongoose.model('Comment', CommentSchema);