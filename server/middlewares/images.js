'use strict'
require('dotenv').config()
var cloudinary = require('cloudinary').v2;

const uploadCloudinari = (req, res, next) => {
  if (!req.file) {
    return next()
  }
  cloudinary.uploader.upload_stream( {folder: "photoshare/"}, (error, result) => {
    req.photolink = result.url
    next()
  })
  .end( req.file.buffer )
}

const imageeffect = (req, res, next) => {
  if (!req.body.effect) {
    console.log(req.photolink)
    return next()
  } else {
    let effect = "e_art:"+req.body.effect
    let arr = req.photolink.split("/")
    arr.splice(arr.indexOf('upload')+1, 0, effect)
    req.photolink = arr.join('/')
    console.log(req.photolink)
    next()
  }
}

const Multer = require('multer'),
      multer = Multer({
        storage: Multer.MemoryStorage,
        limits: {
          fileSize: 5 * 1024 * 1024
        }
        // dest: '../images'
      })

module.exports = {
  uploadCloudinari,
  imageeffect,
  multer
}