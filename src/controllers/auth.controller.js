const express=require ("express")

const userModel=require("../models/user.Model.js")
const jwt =require("jsonwebtoken")
const emailservices =require("../services/email.services.js")
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
    await emailservices.sendRegistrationEmail(user.email,user.name)

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
/* 
-User Login controller
/api/auth/login
*/
async function userLoginController(req,res) {
   const  {email,password}=req.body
   
   const user=await userModel.findOne({email}).select("+password");
   if(!user){
     return res
     .status(401)
     .json({
         message:"   Email or password is Invalid",
     })
    }

    const isValidpassword =await user.comparepassword(password)
    if(!isValidpassword){
     return res
     .status(401)
     .json({
         message:"   Email or password is Invalid",
     })
    }


    const token=jwt.sign({ userId:user._id},process.env.JWT_SECRET,{expiresIn: "3d"})

    res.cookie("token",token, { httpOnly: true })

    res
    .status(200)
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
    userLoginController,
}