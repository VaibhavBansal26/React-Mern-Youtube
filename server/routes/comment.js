const express = require('express');
const router = express.Router();
const multer = require ('multer');
var ffmpeg = require('fluent-ffmpeg');
var ffprobe = require('ffprobe');
const { User } = require("../models/User");
const { Video } = require("../models/Video");
const { Comment } = require("../models/Comment");

const { auth } = require("../middleware/auth");




//=================================
//             Comment Route
//=================================


router.post("/saveComment",auth, (req, res) => {
    const comment = new Comment(req.body)
    comment.save((err,comment) => {
        if(err) return res.status(200).json({success:'false',err})
        
        Comment.find({'_id':comment._id})
        .populate('writer')
        .exec((err,result) => {
            if(err) return res.status(400).json({success:false,err});
            return res.status(200).json({success:true,result})
        })
    })
  
 });

 router.post("/getComments", (req, res) => {
   Comment.find({"postId":req.body.videoId})
   .populate('writer')
   .exec((err,comments) => {
       if(err) return res.status(400).send(err)
       res.status(200).json({success:true,comments})
   })
  
 });
 


module.exports = router;
