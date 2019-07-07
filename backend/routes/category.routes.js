const express = require('express');
const router = express.Router();
const Category = require('../models/category.model');



router.get("/", (req,res,next)=>{
   
    Category.find({}).then(data=>{
        res.status(200).json({
            message:'category fetched successfully!!', category: data
        });
    })
    
});

router.post('/',(req,res,next)=>{
    const category = new Category({
        name: req.body.name
    });
    console.log(category);

    // saving category input to the database
        category.save();

    res.status(201).json({message:'category added succefully'});
});

router.delete("/:id",(req,res,next)=>{
    Category.deleteOne({_id:req.params.id}).then(result => {
      console.log(result);
      res.status(200).json({message:"category deleted succefully!!"});
    })
  })

module.exports = router;
