const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId; 
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
	link: {
		type: String,
		required: true,
		required: true,
	},
	caption: {
		type: String,
		trim: true,
	},
	author: [{
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	}],
	comment: [{
		type: Schema.Types.ObjectId,
		ref: 'Comment',
	}],
	like: [{
		type: Schema.Types.ObjectId,
		ref: 'User',
	}]
})

const Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo