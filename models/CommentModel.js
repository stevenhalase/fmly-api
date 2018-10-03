const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CommentSchema = new Schema({
	date : Number,
	message : String,
	user : { type: Schema.Types.ObjectId, ref: 'User' },
	post : { type: Schema.Types.ObjectId, ref: 'Post' },
	comment : { type: Schema.Types.ObjectId, ref: 'Comment' },
});

CommentSchema.virtual('likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'comment'
})

CommentSchema.virtual('replies', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'comment'
})

CommentSchema.set('toObject', { virtuals: true });
CommentSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Comment', CommentSchema);