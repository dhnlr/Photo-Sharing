const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const ObjectId = mongoose.Types.ObjectId; 
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		unique: true,
		validate: /([a-z])\w+/
	},
	password: {
		type: String,
		required: true,
	},
	follower: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}],
	following: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}]
})

UserSchema.plugin(uniqueValidator, { message: 'Username {VALUE} already registered' });
const User = mongoose.model('User', UserSchema);

const create = (data, callback) => {
	User.create(data, (error, data)=>{
		if (!error) callback(null, data)
		else {
			callback(error, null)
		}
	})
}

const read = (callback) =>{
	User.find((err, users)=>{
		if (!err) {
			callback(users)
		}
	})	
}

const readId = (id, callback) => {
	User.find({'_id': ObjectId(id)}, (err, user)=>{
		if (!err) {
			callback(user)
		}
	})
}

const readUsername = (username, callback) => {
	User.findOne({'username': username}, (error, data)=>{
		if (!error) {
			callback(null, data)
		} else {
			callback(error, null)
		}
	})
}

const readSearchUsername = (username, callback) => {
	User.find({'username': new RegExp('('+username+')\\w+', "gi")}, (error, data)=>{
		if (!error) {
			callback(null, data)
		} else {
			callback(error, null)
		}
	})
}

const signIn = (username, callback) => {
	User.find({'username': username}, (err, user)=>{
		if (!err) {
			callback(user)
		}
	})
}

const update = (id, data, callback) => {
	User.findOneAndUpdate({'_id': ObjectId(id)}, {$set: data}, {upsert: true, new : true},(error, data)=>{
		if (!error) {
			callback(null)
		}
		else {
			callback(error)
		}
	})
}

const destroy = (id, callback) => {
	User.remove({'_id': ObjectId(id)}, (error) => {
		if (!error) {
			callback(null)
		}
		else {
			callback(error)
		}
	})
}

module.exports = {User, create, read, readId, readUsername, update, destroy, signIn};