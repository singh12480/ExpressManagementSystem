const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');

// 1. REGISTER....
router.post('/register', (req,res,next)=>{
    console.log('backend signup route...')
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            firstName: req.body.firstName ,
            lastName : req.body.lastName,
            email: req.body.email,
             password: hash
        });          
            user.save()
                .then(result=>{                   
                    res.status(201).json({
                        message: "user created...",
                        result : result
                    })
                }).catch(err=>{
                    console.log("3333 error!!")
                    res.status(500).json({
                        error: err
                    })
                })
        })
  });
  
  // 2. LOGIN........
router.post('/login',(req,res,next)=>{
    console.log("login API...");
    let loginUser;
    console.log(req.body);
    User.findOne({email:req.body.email})
        .then(user => {
            
            if(!user){
                console.log("inside...")
                return res.status(401).json({
                    message:"email does not existed!!"
                });
            }
            
            loginUser = user;
            return bcrypt.compare(req.body.password,user.password);
  
        }).then(result=>{
            if(!result){
                return res.status(401).json({
                    message:"password doesn't matched!!"
                });
            }  
  
            const token = jwt.sign({email:loginUser.email,userId:loginUser._id},
                 "secret_this.should_be_longer",
                 {expiresIn:"1h"});
                 res.status(200).json({
                     message : "token created!!",
                     token:token,
                     expiresIn:3600,
                     userId: loginUser._id
                 });
  
        }).catch(err=>{
            return res.status(401).json({
                message:"credentials error!!"
            })
        })
  })

  module.exports = router;