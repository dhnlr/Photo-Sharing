const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId; 
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	content: {
		type: String,
		required: true,
		trim: true,
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	photoId: {
		type: Schema.Types.ObjectId,
		ref: 'Photo',
		required: true
	}
})

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment