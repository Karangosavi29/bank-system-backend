const express=require ("express")

const userModel=require("../models/user.Models.js")


function userRegisterController(req,res){
    const {email,name,password}=req.body()
}


module.export ={
    userRegisterController,
}