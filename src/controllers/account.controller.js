const accountModel= require("../models/account.Model.js");



async function createAccountController(req,res){

    const user = req.user;
    if(!user){
        return res.status(401).json({
            message: "Unauthorized - user not found in request"
        });
    }
    
    const account =await accountModel.create({
        user:user._id
    })

    res.status(201).json({
        account
    })
}

async function getUserAccountController(req,res) {
    const accounts =await accountModel.find ({user: req.user.id});

    res.status(200).json({
        accounts
    })
}

module.exports={
    createAccountController,
    getUserAccountController,
}