const Photo = require('../models/photoModel.js');

class PhotoController {
	static create (req, res) {
		let dataNewPhoto = {
			link: req.photolink,
			caption: req.body.caption,
			author: req.decoded.userId
		}
		Photo.create(dataNewPhoto)
		.then( data => {
			res.status(200).json({
				message: 'Success',
				data: data
			})
		})
		.catch( error => {
			res.status(400).json({
				message: 'Failed',
				error : error
			})
		})
	}
	static createComment (req, res){
		Photo.findOne({'_id': req.params.id})
		.then( photo => {
			photo.comment.push(req.commentId)
			Photo.findOneAndUpdate({'_id': req.params.id}, {$set: photo}, {upsert: true, new : true})
			.then(data=>{
				res.status(200).json({
					message: 'Success',
					data: data
				})
			})
			.catch(error=>{
				console.log(error)
				res.status(400).json({
					message: 'Error',
					error: error
				})
			})
		})
		.catch(error => {
			console.log(error)
			res.status(400).json({
				message: 'Error',
				error: error
			})
		})
	}
	static read (req, res) {
		Photo.find()
		.then( photos => {
			res.status(200).json({
				message: 'Success',
				data : photos
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
		Photo.findOne({'_id': req.params.id}).populate('author').populate({path: 'comment',
		    // Get friends of friends - populate the 'friends' array for every friend
		    populate: { path: 'author' }}).exec()
		.then( photo => {
			res.status(200).json({
				message: 'Success',
				data: photo
			})
		})
		.catch(error=>{
			res.status(400).json({
				message: 'Error',
				error: error
			})
		})
	}
	static readUserId (req, res){
		Photo.find({'author': req.params.id}).populate('author').populate('comment').exec()
		.then( photo => {
			res.status(200).json({
				message: 'Success',
				data: photo
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
		Photo.findOne({'_id': req.params.id})
		.then( photo => {
			let dataUpdatePhoto = {
				caption: req.body.caption || photo.caption
			}
			Photo.findOneAndUpdate({'_id': req.params.id}, {$set: dataUpdatePhoto}, {upsert: true, new : true})
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
		Photo.remove({'_id': req.params.id})
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

module.exports = PhotoController