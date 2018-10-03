const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PostSchema = new Schema({
	date : Number,
	message : String,
	image : String,
	user : { type: Schema.Types.ObjectId, ref: 'User' },
});

PostSchema.virtual('likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'post'
})

PostSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post'
})

PostSchema.set('toObject', { virtuals: true });
PostSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Post', PostSchema);