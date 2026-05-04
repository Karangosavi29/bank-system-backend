const transactionModel=require("../models/transaction.Model.js")
const ledgerModel=require("../models/ledger.model.js")
const emailService =require("../services/email.services.js")
const accountModel =require("../models/account.Model.js")
const mongoose = require("mongoose");
/* 
    create a new transaction
    the 10 step transaction flow :
    1.validate request
    2.validate idepotency key
    3.check account status
    4.derive sender balance from ledger
    5.create a transaction (pending)
    6.create debit ledger entry
    7.create credit ledger entry
    8. mark transaction as completed
    9.commit mongodb session
    10.send email notification 

 */


async function createTransaction(req,res){
    const {fromAccount ,toAccount,amount ,idempotencyKey} = req.body;
}

async function createInitialFundTransaction(req, res) {
    const { toAccount, amount, idempotencyKey } = req.body

    if (!toAccount || !amount || !idempotencyKey) {
        return res.status(400).json({
            message: "toAccount, amount and idempotencyKey are required"
        })
    }

    const toUserAccount = await accountModel.findOne({
        _id: toAccount,
    })

    if (!toUserAccount) {
        return res.status(400).json({
            message: "Invalid toAccount"
        })
    }

    const fromUserAccount = await accountModel.findOne({
        user: req.user._id
    })

    if (!fromUserAccount) {
        return res.status(400).json({
            message: "System user account not found"
        })
    }


    const session = await mongoose.startSession()
    session.startTransaction()

    const transaction = new transactionModel({
        fromAccount: fromUserAccount._id,
        toAccount,
        amount,
        idempotencyKey,
        status: "PENDING"
    })

    const debitLedgerEntry = await ledgerModel.create([ {
        account: fromUserAccount._id,
        amount: amount,
        transaction: transaction._id,
        type: "DEBIT"
    } ], { session })

    const creditLedgerEntry = await ledgerModel.create([ {
        account: toAccount,
        amount: amount,
        transaction: transaction._id,
        type: "CREDIT"
    } ], { session })

    transaction.status = "COMPLETED"
    await transaction.save({ session })

    await session.commitTransaction()
    session.endSession()

    return res.status(201).json({
        message: "Initial funds transaction completed successfully",
        transaction: transaction
    })


}

module.exports={
    createTransaction,
    createInitialFundTransaction ,
}