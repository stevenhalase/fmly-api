const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserModel = require('./UserModel.js');

const LikeSchema = new Schema({
	date : Date,
	user : UserModel,
});

module.exports = mongoose.model('Like', LikeSchema);