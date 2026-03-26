const express =require("express")
const {userRegisterController, userLoginController}=require("../controllers/auth.controller.js")

const router =express.Router()

//post /api/auth/register
router.post("/register",userRegisterController)

router.post("/login",userLoginController)
module.exports=router