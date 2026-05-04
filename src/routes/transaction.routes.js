const {Router} =require("express")
const { authMiddleware ,authSystemUserMiddleware} = require("../middleware/auth.middleware")
const { createTransaction,createInitialFundTransaction   } = require("../controllers/transaction.controller.js")

const transactionRoutes =Router()

/**
* -post/api/transactions
* -create a new transaction
*/



transactionRoutes.post("/",authMiddleware,createTransaction)

/**
 * - post/api/transaction/system/initial-funds
 * -create a initial fund transaction from system user
 */

transactionRoutes.post("/system/initial-funds",authSystemUserMiddleware,createInitialFundTransaction )
module.exports=transactionRoutes;