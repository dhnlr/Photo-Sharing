const Photo = require('../models/photoModel.js');
const User = require('../models/userModel.js').User;
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId; 

class FeedController {
	static feed (req, res) {
		User.findOne({'_id': req.decoded.userId})
		.then((user)=>{
			let photoArr = []
			if (user.following.length>0) {
				let counter = user.following.length
				console.log(counter)
				for (var i = user.following.length - 1; i >= 0; i--) {
					Photo.find({'author': user.following[i]}).populate('author').exec()
					.then( photo => {
						console.log(photo, 'punya ', user.following[i])
						photoArr = photoArr.concat(photo)
						counter--
						console.log(counter)
						if (counter == 0) {
						Photo.find({'author': req.decoded.userId}).populate('author').exec()
						.then( photos => {
							console.log(photos, 'punya sendiri')
							photoArr = photoArr.concat(photos)
							console.log(photoArr, 'hasil akhir')
							res.status(200).json({
								message: 'Success',
								data : photoArr
							})
						})
					}
					})
				}
			} else if (user.following.length == 0) {
				Photo.find({'author': req.decoded.userId}).populate('author').exec()
				.then( photos => {
					photoArr = photoArr.concat(photos)
					res.status(200).json({
						message: 'Success',
						data : photoArr
					})
				})
			}
			
		})
		.catch( error => {
			console.log(error)
			res.status(400).json({
				message: 'Error',
				error : error
			})
		})
	}
}

module.exports = FeedController