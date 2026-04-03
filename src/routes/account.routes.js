const express=require("express")
const {authMiddleware}=require("../middleware/auth.middleware.js")
const { createAccountController } = require("../controllers/account.controller.js")


const router =express.Router()

/* 
-post /api/accounts
-create a new account 
-protected route

 */
router.post("/",authMiddleware,createAccountController)
module.exports= router