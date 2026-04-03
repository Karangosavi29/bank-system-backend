const userModel = require("../models/user.Model")
const jwt=require("jsonwebtoken")


async function authMiddleware(req,res,next) {

    const token=req.cookies.token || req.headers.authorization?.split(" ")[1]

    if(!token){
        return res
        .status(401)
        .json({message:"Unauthorized"})
    }


    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)

        const user = await userModel.findById(decoded.userId).select("-password") 
        
        req.user=user
    } catch (error) {
        return res
        .status(401)
        .json({message:"unauthorized access ,token is invalid"})
    }
}

module.exports={
    authMiddleware,
}