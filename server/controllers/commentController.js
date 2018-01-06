const Comment = require('../models/commentModel.js');

class CommentController {
	static create (req, res, next) {
		let dataNewComment = {
			content: req.body.content,
			photoId: req.params.id,
			author: req.decoded.userId
		}
		Comment.create(dataNewComment)
		.then( data => {
			req.commentId = data._id
			next()
			/*res.status(200).json({
				message: 'Success',
				data: data
			})*/
		})
		.catch( error => {
			res.status(400).json({
				message: 'Failed',
				error : error
			})
		})
	}
	static read (req, res) {
		Comment.find()
		.then( comments => {
			res.status(200).json({
				message: 'Success',
				data : comments
			})
		})
		.catch (error=>{
			res.status(400).json({
				message: 'Error',
				error: error
			})
		})
	}
	static readId (req, res){
		Comment.findOne({'_id': req.params.id})
		.then( comment => {
			res.status(200).json({
				message: 'Success',
				data: comment
			})
		})
		.catch(error=>{
			res.status(400).json({
				message: 'Error',
				error: error
			})
		})
	}
	static update (req, res){
		Comment.findOne({'_id': req.params.comment})
		.then( comment => {
			let dataUpdateComment = {
				content: req.body.content || comment.content,
			}
			Comment.findOneAndUpdate({'_id': req.params.comment}, {$set: dataUpdateComment}, {upsert: true, new : true})
			.then(data=>{
				res.status(200).json({
					message: 'Success',
					data: data
				})
			})
			.catch(error=>{
				res.status(200).json({
					message: 'Error',
					error: error
				})
			})
		})
	}
	static destroy (req, res){
		Comment.remove({'_id': req.params.comment})
		.then(data=>{
			res.status(200).json({
				messsage: 'Success',
				data: data
			})
		})
		.catch(error=>{
			res.status(200).json({
				message: 'Error',
				error: error
			})
		})
	}
}

module.exports = CommentController