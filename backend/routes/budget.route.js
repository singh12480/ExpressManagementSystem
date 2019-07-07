const express = require('express');
const router = express.Router();
const Budget = require('../models/budget.model');


router.get("/",(req,res,next)=>{
    Budget.find({}).then(data=>{
        res.status(201).json({
            message:"budget fetched successfully!!", budget:data
        })
    })
})

router.post('/',(req,res,next)=>{
    const value = new Budget({
        value: req.body.value
    });
    console.log(value);

    // saving budget input to the database
        value.save();

    res.status(201).json({message:'budget added succefully'});
});

module.exports = router;
