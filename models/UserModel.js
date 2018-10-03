const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = new Schema({
	username : String,
	password : String,
	email : String,
	name : String,
	avatar : String,
	dob : Number,
});

module.exports = mongoose.model('User', UserSchema);