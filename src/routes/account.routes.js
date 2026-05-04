const express=require("express")
const {authMiddleware}=require("../middleware/auth.middleware.js")
const { createAccountController,getUserAccountController } = require("../controllers/account.controller.js")


const router =express.Router()

/* 
-post /api/accounts
-create a new account 
-protected route

 */
router.post("/",authMiddleware,createAccountController)


/**
 * -Get /api/account 
 * get all accounts of the logged in user 
 * protected api
 */

router.get("/",authMiddleware,getUserAccountController)
module.exports= router