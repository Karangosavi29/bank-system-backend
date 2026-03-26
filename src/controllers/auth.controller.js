const express=require ("express")

const userModel=require("../models/user.Models.js")
const jwt =require("jsonwebtoken")

async function userRegisterController(req,res){
    const {email,name,password}=req.body;

    const isExist=await userModel.findOne({
        email:email 
    })
    if(isExist){
        return res
        .status(422)
        .json({message:"user Already Exists", status:"failed"})
    }


    const user= await userModel.create({
        email,password,name
    })

    const token=jwt.sign({ userId:user._id},process.env.JWT_SECRET,{expiresIn: "3d"})

    res.cookie("token",token, { httpOnly: true })

    res
    .status(201)
    .json({
        user:{
            _id:user._id,
            email:user.email,
            name:user.name
        },
        token
    })
}


module.exports ={
    userRegisterController,
}