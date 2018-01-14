const {User, create, read, readId, readUsername, readSearchUsername, update, destroy, signIn} = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {
	static getUser(req, res){
		read(users=>{
			if (users) {
				res.status(200).json({
					message: 'Users summoned',
					data: users,
				})
			}
			else {
				res.status(400).json({
					message: 'Error occured'
				})
			}
		})
	}
	static getUserId(req,res){
		readId(req.params.id, (user)=>{
			if (user) {
				res.status(200).json({
					message: 'Users summoned',
					data: user,
				})
			}
			else {
				res.status(400).json({
					message: 'Error occured'
				})
			}
		})
	}
	static getUserUsename(req,res){
		readUsername(req.params.username, (error, user)=>{
			if (user) {
				res.status(200).json({
					message: 'Users summoned',
					data: user,
				})
			}
			else {
				res.status(400).json({
					message: 'Error occured'
				})
			}
		})
	}
	static searchUsername(req,res){
		readSearchUsername(req.query.q, (error, user)=>{
			if (user) {
				res.status(200).json({
					message: 'Users summoned',
					data: user,
				})
			}
			else {
				res.status(400).json({
					message: 'Error occured'
				})
			}
		})
	}
	static signIn(req, res){
		signIn(req.body.username.toLowerCase(), (user)=>{
			if (user.length == 0) {
				res.status(403).json({
					message: 'User not found',
				})
			}
			if (bcrypt.compareSync(req.body.password, user[0].password)) {
				let payload = {
					userId: user[0]._id,
					username : user[0].username,
				}
				jwt.sign(payload, process.env.SECRET_KEY, (error, token)=>{
					if (error) {
						res.status(403).json({message: 'User and password wrong', error: error})
					} else {
						req.headers.token = token;
						res.status(200).json({
							message: 'User signed in successfully',
							data: token,
							username : user[0].username,
							userId: user[0]._id
						})
					}
				})
			}
		})
	}
	static createUser(req,res){
		let data = {
			username: req.body.username.toLowerCase(),
			password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
		}
		create(data, (error, data)=>{
			if (!error) {
				res.status(200).json({
					message: 'Users created',
					data: data,
				})
			}
			else {
				res.status(400).json({
					message: 'Error occured',
					error: error
				})
			}
		})
	}
	static updateUser(req,res){
		readId(req.params.id, (user)=>{
			let data = {
				username: req.body.username.toLowerCase() || user[0].username,
				password: req.body.password || user[0].password,
			}
			update(req.params.id, data, (error)=>{
				if (!error) {
					res.status(200).json({
						message: 'Users updated',
						data: data,
					})
				}
				else {
					res.status(400).json({
						message: 'Error occured',
						data: error
					})
				}
			})
		})
	}
	static deleteUser(req,res){
		destroy(req.params.id, (error)=>{
			if (!error) {
				res.status(200).json({
					message: 'Users delete'
				})
			}
			else {
				res.status(400).json({
					message: 'Error occured',
					data: error
				})
			}
		})
	}
	static followUser(req, res){
		readId(req.params.id, (user)=>{
			if (user[0].follower.indexOf(req.decoded.userId) == -1) {
				user[0].follower.push(req.decoded.userId)
				update(req.params.id, user[0], (error)=>{
					if (!error) {
						readId(req.decoded.userId, (userFollowing)=>{
							if (userFollowing[0].following.indexOf(req.params.id) == -1) {
								userFollowing[0].following.push(req.params.id)
								update(req.decoded.userId, userFollowing[0], (error)=>{
									if (!error) {
										res.status(200).json({
											message: 'Users updated',
										})
									} else {
										res.status(400).json({
											message: 'Error occured',
											data: error
										})
									}
								})
							} else {
								userFollowing[0].following.splice(userFollowing[0].following.indexOf(req.params.id), 1)
								update(req.decoded.userId, userFollowing[0], (error)=>{
									if (!error) {
										res.status(200).json({
											message: 'Users updated',
										})
									} else {
										res.status(400).json({
											message: 'Error occured',
											data: error
										})
									}
								})
							}
						})
					} else {
						res.status(400).json({
							message: 'Error occured',
							data: error
						})
					}
				})
			} else {
				user[0].follower.splice(user[0].follower.indexOf(req.decoded.userId), 1)
				update(req.params.id, user[0], (error)=>{
					if (!error) {
						readId(req.decoded.userId, (userFollowing)=>{
							if (userFollowing[0].following.indexOf(req.params.id) == -1) {
								userFollowing[0].following.push(req.params.id)
								update(req.decoded.userId, userFollowing[0], (error)=>{
									if (!error) {
										res.status(200).json({
											message: 'Users updated',
										})
									} else {
										res.status(400).json({
											message: 'Error occured',
											data: error
										})
									}
								})
							} else {
								userFollowing[0].following.splice(userFollowing[0].following.indexOf(req.params.id), 1)
								update(req.decoded.userId, userFollowing[0], (error)=>{
									if (!error) {
										res.status(200).json({
											message: 'Users updated',
										})
									} else {
										res.status(400).json({
											message: 'Error occured',
											data: error
										})
									}
								})
							}
						})
					} else {
						res.status(400).json({
							message: 'Error occured',
							data: error
						})
					}
				})
			}
		})
	}
}

module.exports = UserController;