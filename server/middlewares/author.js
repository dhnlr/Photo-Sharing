const Photo = require('../models/photoModel.js')

module.exports = (req, res, next) =>{
	Photo.findOne({'_id': req.params.id})
	.then(photo=>{
		if (req.decoded && photo.author == req.decoded.userId) {
			next()
		}
		else {
			res.status(403).json({
				message: 'User not authorize'
			})
		}
	})
}