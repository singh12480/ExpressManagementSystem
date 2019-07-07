const express = require('express');
const Expense = require('../models/expense.model');
const router = express.Router();

router.get("/",(req,res,next)=>{
    Expense.find({}).then(data=>{
        res.status(201).json({
            message:"expense fetched successfully!!", expense:data
        })
    })
  });
  
router.delete("/:id",(req,res,next)=>{
    Expense.deleteOne({_id:req.params.id}).then(result => {
      console.log(result);
      res.status(200).json({message:"expense deleted succefully!!"});
    })
  })
  
router.get("/:id",(req,res,next)=>{
    Expense.findById(req.params.id).then(data=>{
      if(data){
        res.status(200).json({message:"fetching expense data by using id!!",expense:data})
      } else{
        res.status(404).json({ message: "Post not found!" });
      }
    })
  })
  
router.put("/:id",(req,res,next)=>{
    console.log(req.body);
    console.log('req.params._id '+ req.params._id);
    console.log('req.body._id ', + req.body._id)
    const expense = new Expense({
      _id: req.body._id,
      category: req.body.category,
      item: req.body.item,
      amount: req.body.amount,
      date: req.body.date
    });
    console.log(expense);
  
    Expense.updateOne({ _id: req.params.id},expense)
            .then(result=>{
              if(result){
                res.status(200).json({
                  message:'updated backside succeefully !!'
                })
              } else{
                res.status(401).json({
                  message:'failed !!'
                })
              }
            
            })
  })
  
router.post('',(req,res,next)=>{
    const expense = new Expense({
      category: req.body.category,
      item: req.body.item,
      amount: req.body.amount,
      date: req.body.date
    });
    console.log(expense);
  
    // saving expense data
    expense.save();
  
    res.status(200).json({
      message:"expense added successfully"
    });
  
  });

  module.exports = router;