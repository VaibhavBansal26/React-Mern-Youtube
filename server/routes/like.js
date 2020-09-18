
const express = require('express');
const router = express.Router();
const multer = require ('multer');
var ffmpeg = require('fluent-ffmpeg');

const {Like} = require("../models/Like");
const {Dislike} = require("../models/Dislike")
const { auth } = require("../middleware/auth");




//=================================
//             Likes Dislikes
//=================================


router.post("/getLikes", (req, res) => {
    let variable = {}
    if(req.body.videoId){
        variable = {videoId: req.body.videoId}
    }else{
        variable = {commentId: req.body.commentId}
    }

    Like.find(variable)
    .exec((err,likes) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({success:true,likes})
    })
  
 });

 router.post("/getDislikes", (req, res) => {
    let variable = {}
    if(req.body.videoId){
        variable = {videoId: req.body.videoId}
    }else{
        variable = {commentId: req.body.commentId}
    }

    Dislike.find(variable)
    .exec((err,dislikes) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({success:true,dislikes})
    })
  
 });

 router.post("/uplike",auth, (req, res) => {
    let variable = {}
    if(req.body.videoId){
        variable = {videoId: req.body.videoId,userId: req.body.userId}
    }else{
        variable = {commentId: req.body.commentId,userId: req.body.userId}
    }

    const like = new Like(variable)

    //save the like information database
    like.save((err,likeResult) => {
        if(err) return res.json({success:false,err})
        Dislike.findOneAndDelete(variable)
        .exec((err,dislikeResult) => {
            if(err) return res.status(400).json({success:false,err})
            res.status(200).json({success:true})
        })
    })
    
    //Incase dislike is already clicked ,need to derease the like
  
 });
 

 router.post("/unlike",auth, (req, res) => {
    let variable = {}
    if(req.body.videoId){
        variable = {videoId: req.body.videoId,userId: req.body.userId}
    }else{
        variable = {commentId: req.body.commentId,userId: req.body.userId}
    }

    //const like = new Like(variable)

    //save the like information database
    Like.findOneAndDelete(variable)
    .exec((err,result) => {
        if(err) return res.status(400).json({success:false,err})
        res.status(200).json({success:true})

    })
    
    //Incase dislike is already clicked ,need to derease the like
  
 });


 router.post("/unDislike",auth, (req, res) => {
    let variable = {}
    if(req.body.videoId){
        variable = {videoId: req.body.videoId,userId: req.body.userId}
    }else{
        variable = {commentId: req.body.commentId,userId: req.body.userId}
    }

    Dislike.findOneAndDelete(variable)
    .exec((err, result) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true })
    })

    
  
 });

 router.post("/upDislike",auth, (req, res) => {
    let variable = {}
    if(req.body.videoId){
        variable = {videoId: req.body.videoId,userId: req.body.userId}
    }else{
        variable = {commentId: req.body.commentId,userId: req.body.userId}
    }

    const dislike = new Dislike(variable)
    dislike.save((err,dislikeResult) => {
        if(err) return res.json({success:false,err})
        Like.findOneAndDelete(variable)
        .exec((err,likeResult) => {
            if(err) return res.status(400).json({success:false,err})
            res.status(200).json({success:true})
        })
    })

    //save the like information database
    
  
 });
 


module.exports = router;
